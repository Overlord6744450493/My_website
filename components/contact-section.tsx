import { ArrowUpRight, Mail } from "lucide-react"
import Link from "next/link"
import { LetterReveal } from "./letter-reveal"
import { ScrollReveal } from "./scroll-reveal"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <ScrollReveal>
        <LetterReveal
          as="h3"
          text="Contact"
          className="text-sm font-medium tracking-wider uppercase text-primary mb-8"
          stagger={34}
        />
      </ScrollReveal>

      <div className="space-y-8">
        <ScrollReveal delay={80}>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            {"If you're"} interested in my projects or want to discuss startup ideas and technology,
            feel free to reach out. {"I'd"} love to connect with like-minded people!
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          <ScrollReveal className="flex items-center gap-4" delay={120}>
            <span className="text-muted-foreground w-20">Email</span>
            <Link
              href="mailto:callmenumber110@gmail.com"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
            >
              callmenumber110@gmail.com
              <Mail className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="flex items-center gap-4" delay={180}>
            <span className="text-muted-foreground w-20">Roblox</span>
            <Link
              href="https://www.roblox.com/users/2380028412/profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
            >
              roblox.com/users/2380028412/profile
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="flex items-center gap-4" delay={240}>
            <span className="text-muted-foreground w-20">LinkedIn</span>
            <Link
              href="https://www.linkedin.com/in/daniel-zhang-74433a3ba/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
            >
              daniel-zhang-74433a3ba
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <ScrollReveal>
      <footer className="mt-24 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Daniel Zhang.
        </p>
      </footer>
      </ScrollReveal>
    </section>
  )
}
