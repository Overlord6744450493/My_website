import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { LetterReveal } from "./letter-reveal"
import { ScrollReveal } from "./scroll-reveal"

const projects = [
  {
    title: "Greenwood Studios Owner & Developer",
    description:
      "Own and operate Greenwood Studios, a Roblox studio selling custom assets for a range of games and fulfilling team orders for builders and developers.",
    tags: ["Studio Owner", "Custom Assets", "Team Orders", "Roblox Development"],
    link: "https://www.roblox.com/users/2380028412/profile",
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
    title: "Polarstar Studios Projects",
    description:
      "Released frequent free game asset drops through Polarstar Studios so creators can grab high-quality Roblox assets at no cost.",
    tags: ["Free Assets", "Community Support", "Roblox Development", "Game Assets"],
    link: "https://www.roblox.com/communities/5615635/Polarstar-Studios#!/about",
    year: "2024",
    featured: true,
  },
  {
    title: "School Database Management",
    description:
      "Built a Roblox school database system managing over 1,000 students with class schedules, attendance tracking, and user-friendly data dashboards.",
    tags: ["Python", "Database", "Student Management", "Data Tracking"],
    link: "https://www.roblox.com/users/2380028412/profile",
    year: "2024",
    featured: false,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 lg:py-32">
      <ScrollReveal>
        <LetterReveal
          as="h3"
          text="Featured Projects"
          className="text-sm font-medium tracking-wider uppercase text-primary mb-12"
          stagger={28}
        />
      </ScrollReveal>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <ScrollReveal key={index} delay={index * 90}>
            <Link
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
                    <LetterReveal text={project.title} stagger={18} />
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
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-12">
        <Link
          href="https://www.roblox.com/users/2380028412/profile"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
        >
          View My Roblox Profile
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </ScrollReveal>
    </section>
  )
}
