import { LetterReveal } from "./letter-reveal"
import { ScrollReveal } from "./scroll-reveal"

const skillCategories = [
  {
    title: "Roblox Development",
    skills: ["Roblox Studio", "Building", "Environment Design", "Asset Creation", "Terrain Sculpting"],
  },
  {
    title: "Python",
    skills: ["Python Programming", "Data Analysis", "Automation", "Web Scraping", "Scripting"],
  },
  {
    title: "Game Development",
    skills: ["Lua Scripting", "Game Design", "Level Design", "Player Experience", "Optimization"],
  },
  {
    title: "SQL & Database",
    skills: ["Database Design", "SQL Queries", "Data Management", "System Architecture", "Backend Organization"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <ScrollReveal>
        <LetterReveal
          as="h3"
          text="Skills"
          className="text-sm font-medium tracking-wider uppercase text-primary mb-12"
          stagger={34}
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <ScrollReveal key={index} className="space-y-4" delay={index * 90}>
            <LetterReveal
              as="h4"
              text={category.title}
              className="text-foreground font-semibold"
              stagger={18}
            />
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm text-muted-foreground bg-secondary rounded-md border border-border hover:border-primary hover:text-foreground transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
