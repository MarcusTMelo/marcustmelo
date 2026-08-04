import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, notAuthenticated, ok } from "./_auth";

export default defineTool({
  name: "list_contact_requests",
  title: "Listar mensagens de contato",
  description: "Lista as mensagens recebidas pelo formulário de contato, com filtro opcional por não lidas.",
  inputSchema: {
    only_unread: z.boolean().default(false).describe("Retornar somente mensagens não lidas."),
    limit: z.number().int().min(1).max(100).default(20).describe("Número máximo de mensagens."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ only_unread, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;
    let query = supabaseForUser(ctx)
      .from("contact_requests")
      .select("id, name, email, phone, subject, message, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (only_unread) query = query.eq("is_read", false);
    const { data, error } = await query;
    return error ? fail(error.message) : ok(data);
  },
});
