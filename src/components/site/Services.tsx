import { Layout, ShoppingCart, Rocket, RefreshCw, Wrench } from "lucide-react";
import { Reveal } from "@/hooks/use-reveal";

const services = [
  {
    icon: Layout,
    title: "Site vitrine",
    text: "Présentez votre activité avec un site élégant, rapide et pensé pour convertir vos visiteurs en clients.",
  },
  {
    icon: ShoppingCart,
    title: "Site e-commerce",
    text: "Vendez en ligne avec une boutique fluide : catalogue, paiement sécurisé et gestion simple des commandes.",
  },
  {
    icon: Rocket,
    title: "Landing page",
    text: "Une page unique et percutante, optimisée pour vos campagnes publicitaires et la génération de leads.",
  },
  {
    icon: RefreshCw,
    title: "Refonte de site",
    text: "Votre site vieillit ? Je le modernise : design actuel, performances, mobile et référencement.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    text: "Mises à jour, sauvegardes, sécurité et petites évolutions : votre site reste au top toute l'année.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">Services</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Tout ce qu'il faut pour exister en ligne
          </h2>
          <p className="mt-4 text-muted-foreground">
            Chaque projet est unique : je conçois la solution la plus adaptée à vos objectifs et à votre budget.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article className="group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-gradient-accent group-hover:text-accent-foreground">
                  <s.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
