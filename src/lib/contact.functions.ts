import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  projectType: z.enum(["Site vitrine", "E-commerce", "Refonte", "Maintenance", "Autre"]),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message trop court").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Best-effort backup copy in Supabase — a failure here must not block
    // the email, which is the primary notification channel.
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("contact_requests").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        project_type: data.projectType,
        budget: data.budget || null,
        message: data.message,
      });
      if (error) console.error("[contact] supabase insert failed", error.message);
    } catch (err) {
      console.error("[contact] supabase insert threw", err);
    }

    const accessKey = process.env["WEB3FORMS_ACCESS_KEY"];
    if (!accessKey) {
      console.error(
        "WEB3FORMS_ACCESS_KEY manquante : ajoutez-la dans les variables d'environnement du projet (Vercel > Settings > Environment Variables).",
      );
      throw new Error("Impossible d'envoyer votre demande pour le moment.");
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nouvelle demande de devis — ${data.projectType}`,
        from_name: "Site Nessim.dev",
        replyto: data.email,
        "Nom complet": data.fullName,
        Email: data.email,
        Téléphone: data.phone || "Non renseigné",
        "Type de projet": data.projectType,
        Budget: data.budget || "Non renseigné",
        Message: data.message,
      }),
    });

    const result = (await response.json().catch(() => null)) as { success?: boolean } | null;

    if (!response.ok || !result?.success) {
      console.error("[contact] Web3Forms send failed", response.status, result);
      throw new Error("Impossible d'envoyer votre demande pour le moment.");
    }

    return { ok: true as const };
  });
