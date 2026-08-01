import { Smartphone, Timer, Euro, HeartHandshake } from "lucide-react";
import { Reveal } from "@/hooks/use-reveal";

const items = [
  {
    icon: Smartphone,
    title: "Design moderne & responsive",
    text: "Un rendu impeccable sur mobile, tablette et ordinateur, avec une attention réelle aux détails.",
  },
  {
    icon: Timer,
    title: "Délais rapides",
    text: "Une landing page en quelques jours, un site vitrine complet en deux semaines en moyenne.",
  },
  {
    icon: Euro,
    title: "Prix transparents",
    text: "Un devis clair et détaillé avant de commencer. Aucun frais caché, aucune mauvaise surprise.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement personnalisé",
    text: "Un interlocuteur unique, disponible, qui vous explique tout sans jargon technique.",
  },
];

export function Advantages() {
  return (
    <section className="bg-gradient-hero py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">Pourquoi me choisir</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-foreground sm:text-4xl">
            Un freelance, zéro intermédiaire
          </h2>
          <p className="mt-4 text-navy-muted">
            Vous travaillez directement avec la personne qui code votre site. Plus simple, plus rapide, moins cher.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <div className="flex h-full gap-5 rounded-2xl border border-navy-muted/15 bg-navy-foreground/5 p-7 backdrop-blur-sm transition-colors hover:border-accent/40">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-accent text-accent-foreground shadow-accent">
                  <it.icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-muted">{it.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
