import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, notAuthenticated, ok } from "./_auth";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default defineTool({
  name: "create_blog_post",
  title: "Criar post do blog",
  description: "Cria um novo post do blog. Por padrão salva como rascunho (draft).",
  inputSchema: {
    title: z.string().trim().min(1).describe("Título do post."),
    content: z.string().trim().min(1).describe("Conteúdo do post em HTML."),
    excerpt: z.string().trim().optional().describe("Resumo curto do post."),
    slug: z.string().trim().optional().describe("Slug personalizado; gerado do título se omitido."),
    category: z.string().trim().optional().describe("Nome da categoria."),
    featured_image: z.string().url().optional().describe("URL da imagem de capa."),
    status: z.enum(["draft", "published"]).default("draft").describe("Status de publicação."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;
    const status = input.status ?? "draft";
    const { data, error } = await supabaseForUser(ctx)
      .from("blog_posts")
      .insert({
        title: input.title,
        content: input.content,
        excerpt: input.excerpt ?? null,
        slug: input.slug?.trim() ? slugify(input.slug) : slugify(input.title),
        category: input.category ?? null,
        featured_image: input.featured_image ?? null,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .maybeSingle();
    return error ? fail(error.message) : ok(data);
  },
});
