import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const experiences = [
  {
    title: "Founder & Owner",
    company: "Your Studio Name",
    companyUrl: "https://roblox.com",
    period: "2024 — Present",
    description:
      "Founded and run a Roblox studio specializing in premium assets for roleplay games. Created and sold high-quality building assets, managing both creative development and business operations.",
    tags: ["Studio Management", "Asset Creation", "Roleplay Games", "Business"],
  },
  {
    title: "Community Developer",
    company: "Blizzard Studios",
    companyUrl: "https://roblox.com",
    period: "2024 — Present",
    description:
      "Contributing as a community developer at Blizzard Studios, one of the well-known communities in the Roblox ecosystem. Collaborating with talented developers on large-scale projects.",
    tags: ["Community Dev", "Collaboration", "Building", "Team Projects"],
  },
  {
    title: "Freelance Builder",
    company: "Roblox Platform",
    companyUrl: "https://roblox.com",
    period: "2024",
    description:
      "Contributed building work to over 30 games on Roblox, specializing in detailed environments, structures, and immersive world design for various game genres.",
    tags: ["Building", "Environment Design", "30+ Games", "World Creation"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 lg:py-32">
      <h3 className="text-sm font-medium tracking-wider uppercase text-primary mb-12">
        Experience
      </h3>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="group">
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
          </div>
        ))}
      </div>
    </section>
  )
}
