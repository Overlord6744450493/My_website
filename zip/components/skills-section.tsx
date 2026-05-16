const skillCategories = [
  {
    title: "Roblox Development",
    skills: ["Roblox Studio", "Building", "Environment Design", "Asset Creation", "Terrain Sculpting"],
  },
  {
    title: "3D & Design",
    skills: ["3D Modeling", "Texturing", "Lighting", "Interior Design", "Exterior Design"],
  },
  {
    title: "Game Development",
    skills: ["Lua Scripting", "Game Design", "Level Design", "Player Experience", "Optimization"],
  },
  {
    title: "Business & Entrepreneurship",
    skills: ["Studio Management", "Asset Sales", "Client Relations", "Community Building", "Project Management"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <h3 className="text-sm font-medium tracking-wider uppercase text-primary mb-12">
        Skills
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="space-y-4">
            <h4 className="text-foreground font-semibold">{category.title}</h4>
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
          </div>
        ))}
      </div>
    </section>
  )
}
