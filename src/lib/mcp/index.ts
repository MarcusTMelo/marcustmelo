import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import createBlogPost from "./tools/create-blog-post";
import updateBlogPost from "./tools/update-blog-post";
import listContactRequests from "./tools/list-contact-requests";
import listNewsletterSubscribers from "./tools/list-newsletter-subscribers";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "marcus-t-melo-automacao-ia-humanizada",
  title: "Marcus T. Melo Automação & IA Humanizada",
  version: "0.1.0",
  instructions:
    "Ferramentas administrativas do site Marcus T. Melo: gerenciar posts do blog, ler mensagens do formulário de contato e consultar inscritos da newsletter. O usuário conectado precisa ter papel de admin no site.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listBlogPosts,
    getBlogPost,
    createBlogPost,
    updateBlogPost,
    listContactRequests,
    listNewsletterSubscribers,
  ],
});
