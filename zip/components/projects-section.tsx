import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "Roleplay Asset Store",
    description:
      "Founded and operate a Roblox studio creating premium assets for roleplay games. Designed and sold building assets including interiors, exteriors, props, and complete environment packages.",
    tags: ["Studio Owner", "Asset Creation", "Roleplay", "Business"],
    link: "https://roblox.com",
    year: "2024",
    featured: true,
  },
  {
    title: "30+ Game Contributions",
    description:
      "Contributed detailed building work to over 30 games on Roblox, including environment design, structural builds, and immersive world creation for various roleplay and adventure games.",
    tags: ["Building", "Environment Design", "World Creation", "Roblox Studio"],
    link: "https://roblox.com",
    year: "2024",
    featured: true,
  },
  {
    title: "Blizzard Studios Projects",
    description:
      "As a community developer at Blizzard Studios, contributed to major community projects and collaborated with talented developers on high-profile Roblox experiences.",
    tags: ["Community Dev", "Collaboration", "Large-Scale", "Team Projects"],
    link: "https://roblox.com",
    year: "2024",
    featured: true,
  },
  {
    title: "Custom Roleplay Environments",
    description:
      "Specialized in creating immersive roleplay environments including detailed buildings, neighborhoods, and interactive spaces that enhance player engagement and storytelling.",
    tags: ["Roleplay", "Interiors", "Exteriors", "Player Experience"],
    link: "https://roblox.com",
    year: "2024",
    featured: false,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 lg:py-32">
      <h3 className="text-sm font-medium tracking-wider uppercase text-primary mb-12">
        Featured Projects
      </h3>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 -mx-6 rounded-lg hover:bg-card transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <span className="text-sm text-muted-foreground font-mono lg:w-24 shrink-0">
                {project.year}
              </span>
              
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h4>
                
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="https://roblox.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
        >
          View My Roblox Profile
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
