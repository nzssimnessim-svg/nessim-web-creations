import { Reveal } from "@/hooks/use-reveal";
import projet1 from "@/assets/projet-1.jpg";
import projet2 from "@/assets/projet-2.jpg";
import projet4 from "@/assets/projet-4.jpg";

const projects = [
  {
    img: projet1,
    tag: "Site vitrine",
    title: "Le Comptoir Marius",
    text: "Site vitrine d'un restaurant avec menu dynamique et réservation en ligne.",
  },
  {
    img: projet2,
    tag: "E-commerce",
    title: "Atelier Nord",
    text: "Boutique de prêt-à-porter : catalogue, panier et paiement sécurisé.",
  },
  {
    img: projet4,
    tag: "Refonte",
    title: "Studio Bâti",
    text: "Refonte complète du site d'un studio d'architecture, plus rapide et mobile-first.",
  },
];


export function Portfolio() {
  return (
    <section id="projets" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">Réalisations</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Quelques projets récents</h2>
          <p className="mt-4 text-muted-foreground">
            Un aperçu de sites conçus pour des commerces, des indépendants et des PME.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2">
          {projects.map((p, i) => {
            const isLast = i === projects.length - 1;
            return (
              <Reveal key={p.title} delay={i * 80} className={isLast ? "sm:col-span-2 sm:flex sm:justify-center" : ""}>
                <article className={`group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${isLast ? "sm:w-[calc(50%-0.875rem)]" : "w-full"}`}>
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={p.img}
                      alt={`Aperçu du projet ${p.title}`}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-hero opacity-0 transition-opacity duration-500 group-hover:opacity-40" />

                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold tracking-wider text-accent uppercase">{p.tag}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
