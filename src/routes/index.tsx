import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Advantages } from "@/components/site/Advantages";
import { Portfolio } from "@/components/site/Portfolio";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "Nessim | Développeur web freelance – Création de sites internet";
const description =
  "Nessim, développeur web freelance : création de sites vitrines, e-commerce et landing pages modernes pour particuliers et entreprises. Devis gratuit sous 24h.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Nessim.dev",
          description,
          areaServed: "FR",
          serviceType: [
            "Création de site vitrine",
            "Création de site e-commerce",
            "Landing page",
            "Refonte de site web",
            "Maintenance de site web",
          ],
          email: "contact@nessim.dev",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Advantages />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
