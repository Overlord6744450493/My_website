"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import { AnimatedTitle } from "./animated-title"
import { RobloxAvatar3D } from "./roblox-avatar-3d"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "X/Twitter" },
  { icon: Mail, href: "mailto:your@email.com", label: "Email" },
]

export function HeroSection() {
  return (
    <section className="flex flex-col lg:contents">
      {/* Left sidebar */}
      <aside className="min-h-[78vh] lg:min-h-0 lg:w-1/3 lg:fixed lg:h-screen lg:top-0 lg:left-0 p-8 lg:p-12 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <AnimatedTitle text="welcome to daniel.tech :)" />
          </div>
          <h2 className="text-xl lg:text-2xl text-primary font-medium mb-6">
            Developer & Programmer
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            I create immersive experiences on Roblox.
            Studio owner, asset creator, and builder with
            contributions to 30+ games in the community.
          </p>
        </div>

        <RobloxAvatar3D />

        {/* Navigation */}
        <nav className="hidden lg:block my-12">
          <ul className="space-y-4">
            {[
              { label: "About", href: "#about" },
              { label: "Projects", href: "#projects" },
              { label: "Skills", href: "#skills" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="w-8 h-px bg-muted-foreground group-hover:w-16 group-hover:bg-foreground transition-all mr-4" />
                  <span className="text-sm font-medium tracking-wider uppercase">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links */}
        <div className="flex items-center gap-5 mt-8 lg:mt-0">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </aside>
    </section>
  )
}
