import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-accent)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-muted/25 bg-navy-foreground/5 px-4 py-1.5 text-xs font-medium text-navy-muted">
            <Sparkles className="size-3.5 text-accent" />
            Développeur web freelance · France
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] font-semibold text-navy-foreground sm:text-5xl lg:text-6xl">
            Je crée le site web dont votre <span className="text-gradient-accent">entreprise a besoin</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-muted sm:text-lg">
            Sites modernes, rapides et sur-mesure pour les particuliers et les entreprises. De la première
            maquette à la mise en ligne, je m'occupe de tout — avec des délais courts et des prix clairs.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="xl">
              <a href="#contact">
                Démarrer mon projet
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <a href="#portfolio">Voir mes réalisations</a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              { k: "40+", v: "projets livrés" },
              { k: "10j", v: "délai moyen" },
              { k: "100%", v: "responsive" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-2xl font-semibold text-navy-foreground">{s.k}</dt>
                <dd className="text-xs text-navy-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <img
            src={heroImage}
            alt="Interfaces de sites web modernes conçues par Nessim, développeur freelance"
            width={1600}
            height={1200}
            className="w-full rounded-3xl border border-navy-muted/15 shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}
