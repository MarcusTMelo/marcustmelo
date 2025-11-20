import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import Footer from "@/components/Footer";
import DOMPurify from 'dompurify';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  published_at: string | null;
  views_count: number;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
        
        // Increment view count asynchronously (don't block page load)
        supabase
          .rpc("increment_post_views", { post_slug: slug })
          .then(({ error: rpcError }) => {
            if (rpcError) {
              console.error("Error incrementing views:", rpcError);
            } else {
              console.log("View count incremented");
            }
          });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setNotFound(true);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#C7A7FF] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent">
            Post não encontrado
          </h1>
          <p className="text-muted-foreground mb-8">
            O post que você está procurando não existe ou não está mais disponível.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] hover:opacity-90 text-background font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Marcus T. Melo</title>
        <meta name="description" content={post.excerpt || ""} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ""} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="border-b border-border/50">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <Link to="/#blog">
              <Button
                variant="ghost"
                className="hover:bg-[#C7A7FF]/10 hover:text-[#C7A7FF]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-border/50">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            {post.category && (
              <Badge
                style={{
                  backgroundColor: `${getCategoryColor(post.category)}20`,
                  color: getCategoryColor(post.category),
                  borderColor: `${getCategoryColor(post.category)}30`,
                }}
              >
                {post.category}
              </Badge>
            )}
            {post.published_at && (
              <span className="text-sm text-muted-foreground">
                {format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy")}
              </span>
            )}
            {post.views_count > 0 && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                👁️ {post.views_count.toLocaleString('pt-BR')} {post.views_count === 1 ? 'visualização' : 'visualizações'}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-[#D6D6E0]/80 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none blog-content">
            <div
              className="text-[#D6D6E0]/90 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(post.content || "", {
                  ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'u', 's', 'ol', 'ul', 'li', 'blockquote', 'code', 'pre', 'a', 'br', 'hr', 'img'],
                  ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class']
                })
              }}
            />
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <Link to="/#blog">
              <Button
                variant="outline"
                className="border-[#C7A7FF]/30 hover:bg-[#C7A7FF]/10 hover:text-[#C7A7FF]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
