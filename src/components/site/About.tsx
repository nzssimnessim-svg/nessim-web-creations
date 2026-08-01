import { Check } from "lucide-react";
import { Reveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";

const points = [
  "3 ans d'expérience en développement web",
  "Technologies modernes : React, Next.js, Shopify, WordPress",
  "Optimisation des performances et du référencement (SEO)",
  "Formation à la prise en main de votre site",
];

export function About() {
  return (
    <section id="apropos" className="bg-surface py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">À propos</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Bonjour, moi c'est Nessim
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Développeur web freelance passionné, j'accompagne depuis 3 ans des particuliers, des artisans et des
            entreprises dans la création de leur présence en ligne. J'aime les projets bien faits : un design
            soigné, un code propre et un site qui charge vite.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Ma méthode est simple : on échange sur vos besoins, je vous propose une maquette, puis je développe
            votre site en gardant un contact régulier. Vous savez toujours où en est votre projet.
          </p>

          <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-accent">
                  <Check className="size-3 text-accent-foreground" />
                </span>
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>


          <Button asChild variant="accent" size="lg" className="mt-9">
            <a href="#contact">Parlons de votre projet</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
