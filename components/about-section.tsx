import { LetterReveal } from "./letter-reveal"
import { ScrollReveal } from "./scroll-reveal"

export function AboutSection() {
  return (
    <section id="about" className="pt-10 pb-24 lg:pt-12 lg:pb-32">
      <ScrollReveal>
        <LetterReveal
          as="h3"
          text="About Me"
          className="text-sm font-medium tracking-wider uppercase text-primary mb-8 lg:hidden"
          stagger={34}
        />
      </ScrollReveal>
      
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <ScrollReveal delay={80}>
          <p>
            {"I'm"} a Roblox developer and studio owner, focused on creating high-quality assets for roleplay games,
            mainly milsims.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p>
            In 2024, I founded my own Roblox studio where we specialize in creating and selling premium assets for
            roleplay games. {"I've"} had the privilege of contributing building work to over 30 games on the platform,
            helping bring creative visions to life through detailed environments and structures.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <p>
            {"I'm"} also a community developer at <span className="text-primary font-medium">Polarstar Studios</span>, one
            of the well-known communities in the Roblox milsim ecosystem for providing frameworks for helicopters.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <p>
            Outside of Roblox development, I also have experience with Python programming and SQL. I created and manage my
            school’s database system that serves over 1,000 students, which strengthened my understanding of backend
            organization, data handling, and system design.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <p>
            I enjoy combining creativity with technical problem-solving, whether I’m building immersive game environments
            or developing efficient systems and tools.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
