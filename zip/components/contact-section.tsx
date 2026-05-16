import { ArrowUpRight, Mail } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <h3 className="text-sm font-medium tracking-wider uppercase text-primary mb-8">
        Contact
      </h3>

      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed max-w-xl">
          {"If you're"} interested in my projects or want to discuss startup ideas and technology,
          feel free to reach out. {"I'd"} love to connect with like-minded people!
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-20">Email</span>
            <Link
              href="mailto:your@email.com"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
            >
              your@email.com
              <Mail className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-20">X/Twitter</span>
            <Link
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
            >
              @yourusername
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-20">LinkedIn</span>
            <Link
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
            >
              yourusername
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-20">GitHub</span>
            <Link
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
            >
              yourusername
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Name. Built with{" "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
          >
            Next.js
          </Link>{" "}
          and deployed on{" "}
          <Link
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
          >
            Vercel
          </Link>
          .
        </p>
      </footer>
    </section>
  )
}
