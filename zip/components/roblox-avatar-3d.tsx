"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const modelPath = "/royalwing.obj"
const materialPath = "royalwing.mtl"

export function RobloxAvatar3D() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState("Loading avatar...")

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.set(0, 1.1, 8.5)
    camera.lookAt(0, 1, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.7
    renderer.domElement.style.display = "block"
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = true
    controls.zoomSpeed = 0.9
    controls.minPolarAngle = Math.PI * 0.2
    controls.maxPolarAngle = Math.PI * 0.8
    controls.target.set(0, 0, 0)
    controls.update()

    const keyLight = new THREE.DirectionalLight(0x9ad1ff, 4.2)
    keyLight.position.set(3, 4, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x2e73c8, 2.8)
    fillLight.position.set(-4, 2, 3)
    scene.add(fillLight)

    const ambientLight = new THREE.AmbientLight(0x88b8ff, 3.2)
    scene.add(ambientLight)

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8)
    rimLight.position.set(-2, 3, -4)
    scene.add(rimLight)

    const group = new THREE.Group()
    scene.add(group)

    const fallback = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.6, 1.6),
      new THREE.MeshStandardMaterial({
        color: 0x3682cd,
        roughness: 0.42,
        metalness: 0.08,
      })
    )
    group.add(fallback)

    let frame = 0
    let disposed = false

    const resize = () => {
      const width = mount.clientWidth || 260
      const height = mount.clientHeight || 260
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      controls.update()
      renderer.render(scene, camera)
    }

    const fitCameraToObject = (camera: THREE.PerspectiveCamera, object: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(object)
      const center = box.getCenter(new THREE.Vector3())
      const sphere = new THREE.Sphere()
      box.getBoundingSphere(sphere)
      const radius = Math.max(sphere.radius, Math.max(box.getSize(new THREE.Vector3()).y, box.getSize(new THREE.Vector3()).z) * 0.5)
      const fov = camera.fov * (Math.PI / 180)
      const cameraDistance = radius / Math.sin(fov / 2) * 1.0

      camera.position.set(center.x, center.y + radius * 0.2, center.z + cameraDistance)
      camera.near = Math.max(0.1, radius * 0.02)
      camera.far = Math.max(100, cameraDistance * 10)
      controls.minDistance = Math.max(radius * 1.5, cameraDistance * 0.85)
      controls.maxDistance = cameraDistance * 2.8
      controls.update()
      camera.lookAt(center)
      camera.updateProjectionMatrix()
    }

    const handleModelLoad = (model: THREE.Object3D) => {
      if (disposed) return

      group.remove(...group.children)
      fallback.geometry.dispose()
      if (Array.isArray(fallback.material)) {
        fallback.material.forEach((material) => material.dispose())
      } else {
        fallback.material.dispose()
      }

      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxAxis = Math.max(size.x, size.y, size.z) || 1
      const scale = 2.7 / maxAxis

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true

          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x9bbcff,
              roughness: 0.3,
              metalness: 0.1,
              side: THREE.DoubleSide,
              transparent: false,
              opacity: 1,
            })
          }

          const applyMaterialProps = (material: THREE.Material) => {
            material.side = THREE.DoubleSide
            material.needsUpdate = true
            material.transparent = false
            if ("opacity" in material) {
              ;(material as THREE.Material & { opacity: number }).opacity = 1
            }
          }

          if (Array.isArray(child.material)) {
            child.material.forEach(applyMaterialProps)
          } else if (child.material) {
            applyMaterialProps(child.material)
          }
        }
      })

      model.scale.setScalar(scale)
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
      model.rotation.y = Math.PI

      group.add(model)
      fitCameraToObject(camera, group)
      controls.target.set(0, 0, 0)
      controls.update()
      renderer.render(scene, camera)
      setStatus("")
    }

    const loadObjWithMaterials = (materials?: any) => {
      const objLoader = new OBJLoader()

      if (materials) {
        objLoader.setMaterials(materials)
      }

      objLoader.load(
        modelPath,
        handleModelLoad,
        undefined,
        (error) => {
          console.error("Could not load Roblox OBJ model:", error)
          mount.classList.add("roblox-model-error")
          setStatus("Model could not load")
        }
      )
    }

    const loadObjOrFallback = () => {
      const mtlLoader = new MTLLoader()
      mtlLoader.setPath("/")
      mtlLoader.setResourcePath("/")
      mtlLoader.load(
        materialPath,
        (materials) => {
          if (disposed) return
          materials.preload()
          loadObjWithMaterials(materials)
        },
        undefined,
        (error) => {
          console.warn("Could not load Roblox materials, falling back to OBJ only:", error)
          loadObjWithMaterials()
        }
      )
    }

    loadObjOrFallback()

    const animate = () => {
      frame = requestAnimationFrame(animate)
      group.rotation.y += 0.0035
      controls.update()
      renderer.render(scene, camera)
    }

    resize()
    animate()
    window.addEventListener("resize", resize)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      controls.dispose()
      renderer.dispose()
      mount.replaceChildren()
    }
  }, [])

  return (
    <div className="roblox-model-stage" aria-label="Animated 3D Roblox model">
      <div ref={mountRef} className="roblox-model-canvas" />
      {status && <div className="roblox-model-status">{status}</div>}
      <div className="roblox-model-description">me on Roblox</div>
      <div className="roblox-model-shadow" />
    </div>
  )
}
