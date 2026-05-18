import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { LetterReveal } from "./letter-reveal"
import { ScrollReveal } from "./scroll-reveal"

const experiences = [
  {
    title: "Freelance Roblox Developer",
    company: "Self-Employed",
    companyUrl: "https://www.roblox.com/users/2380028412/profile",
    period: "2024",
    description:
      "Worked as a freelance Roblox developer, primarily creating assets and building environments for roleplay and milsim games.",
    tags: ["Asset Creation", "Environment Design", "Roleplay", "Milsim Games"],
  },
  {
    title: "Community Developer",
    company: "Polarstar Studios",
    companyUrl: "https://www.roblox.com/communities/5615635/Polarstar-Studios#!/about",
    period: "2025 — Present",
    description:
      "Working as a community developer at Polarstar Studios, contributing to Roblox milsim projects and helicopter framework systems.",
    tags: ["Community Dev", "Milsim", "Helicopter Framework", "Roblox"],
  },
  {
    title: "Founder & Operator",
    company: "Greenwood Studio",
    companyUrl: "https://www.roblox.com/users/2380028412/profile",
    period: "2025 — Present",
    description:
      "Founded and operate Greenwood Studio, where we create and sell premium Roblox assets and work on development projects.",
    tags: ["Studio Owner", "Asset Sales", "Development", "Team Orders"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 lg:py-32">
      <ScrollReveal>
        <LetterReveal
          as="h3"
          text="Experience"
          className="text-sm font-medium tracking-wider uppercase text-primary mb-12"
          stagger={34}
        />
      </ScrollReveal>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <ScrollReveal key={index} className="group" delay={index * 100}>
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <span className="text-sm text-muted-foreground font-mono lg:w-36 shrink-0">
                {exp.period}
              </span>

              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">
                  {exp.title} ·{" "}
                  <Link
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {exp.company}
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </h4>

                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
