import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { InteractiveBackground } from "@/components/interactive-background"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <InteractiveBackground />

      <div className="relative z-10">
        <HeroSection />
      
        {/* Main content - positioned to the right of sidebar on desktop */}
        <main className="lg:ml-[33.333%] px-8 lg:px-12 lg:pr-24">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </div>
  )
}
