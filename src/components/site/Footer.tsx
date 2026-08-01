import { Code2, Mail, Linkedin, Github, Twitter } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#apropos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="#accueil" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-accent">
              <Code2 className="size-5 text-accent-foreground" />
            </span>
            <span className="font-display text-lg font-semibold">
              Nessim<span className="text-accent">.dev</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-muted">
            Création de sites web sur-mesure pour particuliers et entreprises. Design moderne, performances et
            accompagnement de A à Z.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide uppercase">Liens rapides</h3>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-navy-muted transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide uppercase">Contact</h3>
          <a
            href="mailto:contact@nessim.dev"
            className="mt-4 flex items-center gap-2 text-sm text-navy-muted transition-colors hover:text-accent"
          >
            <Mail className="size-4" />
            contact@nessim.dev
          </a>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Github, label: "GitHub" },
              { Icon: Twitter, label: "X" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#contact"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-lg border border-navy-muted/25 text-navy-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-navy-muted/15">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-navy-muted">
          © {new Date().getFullYear()} Nessim.dev — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
