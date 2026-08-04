import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, notAuthenticated, ok } from "./_auth";

export default defineTool({
  name: "list_newsletter_subscribers",
  title: "Listar inscritos da newsletter",
  description: "Lista os inscritos da newsletter com origem e data de inscrição.",
  inputSchema: {
    limit: z.number().int().min(1).max(200).default(50).describe("Número máximo de inscritos."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;
    const { data, error } = await supabaseForUser(ctx)
      .from("newsletter_subscribers")
      .select("id, name, email, source, consent, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);
    return error ? fail(error.message) : ok(data);
  },
});
