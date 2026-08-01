import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Send, Mail, Clock, MapPin } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/hooks/use-reveal";
import { submitContactRequest } from "@/lib/contact.functions";

const projectTypes = ["Site vitrine", "E-commerce", "Landing page", "Refonte", "Maintenance", "Autre"] as const;
const budgets = [
  "Moins de 1 000 €",
  "1 000 € – 3 000 €",
  "3 000 € – 6 000 €",
  "Plus de 6 000 €",
  "À définir ensemble",
];

const schema = z.object({
  fullName: z.string().trim().min(2, "Merci d'indiquer votre nom complet.").max(100),
  email: z.string().trim().email("Adresse email invalide.").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  projectType: z.enum(projectTypes, { errorMap: () => ({ message: "Choisissez un type de projet." }) }),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Décrivez votre projet en quelques mots (10 caractères min.).").max(2000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const initial = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

export function Contact() {
  const submit = useServerFn(submitContactRequest);
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (key: keyof typeof initial, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("sending");
    try {
      await submit({ data: parsed.data });
      setStatus("sent");
      setValues(initial);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-surface py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Parlons de votre projet
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Décrivez-moi votre besoin en quelques lignes. Je vous réponds sous 24h avec une première
            estimation de budget et de délai — sans engagement.
          </p>

          <ul className="mt-9 space-y-5">
            {[
              { Icon: Mail, title: "Email", text: "contact@nessim.dev" },
              { Icon: Clock, title: "Réponse", text: "Sous 24h ouvrées" },
              { Icon: MapPin, title: "Zone", text: "France entière, 100% à distance" },
            ].map(({ Icon, title, text }) => (
              <li key={title} className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-card text-primary shadow-soft">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl border border-border bg-card p-7 shadow-lift sm:p-9">
            {status === "sent" ? (
              <div className="flex min-h-100 flex-col items-center justify-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-gradient-accent shadow-accent">
                  <CheckCircle2 className="size-8 text-accent-foreground" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">Merci !</h3>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Votre demande a bien été envoyée. Je reviens vers vous sous 24h.
                </p>
                <Button variant="outline" className="mt-7" onClick={() => setStatus("idle")}>
                  Envoyer une autre demande
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom complet *</Label>
                    <Input
                      id="fullName"
                      value={values.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                      placeholder="Marie Dupont"
                      maxLength={100}
                    />
                    {errors.fullName ? <p className="text-xs text-destructive">{errors.fullName}</p> : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="marie@entreprise.fr"
                      maxLength={255}
                    />
                    {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone (optionnel)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="06 12 34 56 78"
                      maxLength={30}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType">Type de projet *</Label>
                    <Select value={values.projectType} onValueChange={(v) => set("projectType", v)}>
                      <SelectTrigger id="projectType">
                        <SelectValue placeholder="Choisir…" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.projectType ? (
                      <p className="text-xs text-destructive">{errors.projectType}</p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget approximatif</Label>
                  <Select value={values.budget} onValueChange={(v) => set("budget", v)}>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Choisir…" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Votre projet *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Décrivez votre activité, vos objectifs, vos éventuelles inspirations…"
                    maxLength={2000}
                  />
                  {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
                </div>

                {status === "error" ? (
                  <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Une erreur est survenue. Merci de réessayer ou de m'écrire à contact@nessim.dev.
                  </p>
                ) : null}

                <Button
                  type="submit"
                  variant="accent"
                  size="xl"
                  className="w-full"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                  <Send className="size-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Réponse sous 24h · Vos informations restent confidentielles.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
