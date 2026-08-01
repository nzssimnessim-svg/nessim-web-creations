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

// Best-effort backup copy in Supabase (needs the secret service-role key,
// so it must stay server-side). The actual email notification is sent
// directly from the browser — see Contact.tsx — because Web3Forms blocks
// server-side requests on the free plan (IP whitelisting required).
export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
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

    return { ok: true as const };
  });
