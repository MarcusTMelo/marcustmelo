import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, notAuthenticated, ok } from "./_auth";

export default defineTool({
  name: "list_blog_posts",
  title: "Listar posts do blog",
  description: "Lista os posts do blog com filtro opcional por status (draft/published) e busca por título.",
  inputSchema: {
    status: z.enum(["draft", "published"]).optional().describe("Filtra por status do post."),
    search: z.string().trim().min(1).optional().describe("Busca por parte do título."),
    limit: z.number().int().min(1).max(100).default(20).describe("Número máximo de posts."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, search, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;
    let query = supabaseForUser(ctx)
      .from("blog_posts")
      .select("id, title, slug, status, category, excerpt, published_at, updated_at, views_count")
      .order("updated_at", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    if (search) query = query.ilike("title", `%${search}%`);
    const { data, error } = await query;
    return error ? fail(error.message) : ok(data);
  },
});
