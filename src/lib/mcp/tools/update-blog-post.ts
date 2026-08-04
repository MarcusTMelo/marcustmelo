import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, notAuthenticated, ok } from "./_auth";

export default defineTool({
  name: "update_blog_post",
  title: "Atualizar post do blog",
  description: "Atualiza campos de um post existente identificado pelo slug (título, conteúdo, resumo, categoria, imagem ou status).",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Slug do post a atualizar."),
    title: z.string().trim().min(1).optional(),
    content: z.string().trim().min(1).optional(),
    excerpt: z.string().trim().optional(),
    category: z.string().trim().optional(),
    featured_image: z.string().url().optional(),
    status: z.enum(["draft", "published"]).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  handler: async ({ slug, status, ...fields }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;
    const patch: Record<string, unknown> = { ...fields, updated_at: new Date().toISOString() };
    Object.keys(patch).forEach((key) => patch[key] === undefined && delete patch[key]);
    if (status) {
      patch.status = status;
      if (status === "published") patch.published_at = new Date().toISOString();
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("blog_posts")
      .update(patch)
      .eq("slug", slug)
      .select()
      .maybeSingle();
    if (error) return fail(error.message);
    if (!data) return fail(`Nenhum post encontrado com o slug "${slug}".`);
    return ok(data);
  },
});
