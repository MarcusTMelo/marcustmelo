import { ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
}

const BlogList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, category, excerpt, featured_image, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string | null) => {
    const colors: Record<string, string> = {
      "Automação": "#C7A7FF",
      "IA": "#6EC8FF",
      "Tech": "#FF7ACB",
      "Negócios": "#4A8CFF",
      "Tutoriais": "#C7A7FF",
    };
    return colors[category || ""] || "#C7A7FF";
  };

  const getCategoryGradient = (category: string | null) => {
    const gradients: Record<string, string> = {
      "Automação": "from-[#C7A7FF] to-[#6EC8FF]",
      "IA": "from-[#6EC8FF] to-[#4A8CFF]",
      "Tech": "from-[#FF7ACB] to-[#C7A7FF]",
      "Negócios": "from-[#4A8CFF] to-[#6EC8FF]",
      "Tutoriais": "from-[#C7A7FF] to-[#FF7ACB]",
    };
    return gradients[category || ""] || "from-[#C7A7FF] to-[#6EC8FF]";
  };

  return (
    <>
      <Helmet>
        <title>Blog & Artigos | Tecnologia, Automação e IA</title>
        <meta
          name="description"
          content="Todos os conteúdos sobre tecnologia simples, automação e IA humanizada para pequenos negócios."
        />
      </Helmet>

      <main className="bg-background min-h-screen">
        <section className="relative py-20 px-6 md:py-32 overflow-hidden">
          {/* Decorative background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#FF7ACB] opacity-5 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-8 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {/* Section Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent">
                Blog & Artigos
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Todos os conteúdos sobre tecnologia simples, automação e IA humanizada para pequenos negócios.
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12 text-muted-foreground">
                Carregando posts...
              </div>
            )}

            {/* Empty State */}
            {!loading && posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Em breve novos artigos...
                </p>
              </div>
            )}

            {/* Blog Grid */}
            {!loading && posts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="group relative bg-[#1A1A1F] border border-border/50 rounded-2xl overflow-hidden hover:border-[#C7A7FF]/50 transition-all duration-500 hover:shadow-lg hover:shadow-[#C7A7FF]/20 cursor-pointer animate-fade-in"
                  >
                    {/* Featured Image or Gradient Placeholder */}
                    <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(post.category)} relative overflow-hidden`}>
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 border-2 border-white/20 rounded-full" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F] to-transparent opacity-60" />
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <Badge
                        className="mb-3"
                        style={{
                          backgroundColor: `${getCategoryColor(post.category)}20`,
                          color: getCategoryColor(post.category),
                          borderColor: `${getCategoryColor(post.category)}30`,
                        }}
                      >
                        {post.category || "Geral"}
                      </Badge>

                      <h2 className="text-xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-[#C7A7FF] group-hover:to-[#6EC8FF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt || ""}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                        <span>
                          {post.published_at
                            ? format(new Date(post.published_at), "dd MMM yyyy")
                            : ""}
                        </span>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-[#C7A7FF]" />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default BlogList;
