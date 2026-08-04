import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, notAuthenticated, ok } from "./_auth";

export default defineTool({
  name: "get_blog_post",
  title: "Ver post do blog",
  description: "Retorna o conteúdo completo de um post do blog pelo slug.",
  inputSchema: { slug: z.string().trim().min(1).describe("Slug do post.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;
    const { data, error } = await supabaseForUser(ctx)
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) return fail(error.message);
    if (!data) return fail(`Nenhum post encontrado com o slug "${slug}".`);
    return ok(data);
  },
});
