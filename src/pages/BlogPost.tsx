import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, Home, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import Footer from "@/components/Footer";
import DOMPurify from 'dompurify';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  published_at: string | null;
  views_count: number;
  blog_categories: { name: string } | null;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  excerpt: string | null;
  featured_image: string | null;
  blog_categories: { name: string } | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(name)")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
        fetchRelatedPosts(data.category_id, data.id);
        
        // Increment view count asynchronously
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

  const fetchRelatedPosts = async (categoryId: string | null, currentPostId: string) => {
    try {
      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, category_id, excerpt, featured_image, blog_categories(name)")
        .eq("status", "published")
        .neq("id", currentPostId)
        .limit(3);

      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }

      const { data, error } = await query.order("published_at", { ascending: false });

      if (error) throw error;
      setRelatedPosts(data || []);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  const calculateReadingTime = (content: string | null): number => {
    if (!content) return 1;
    const plainText = content.replace(/<[^>]*>/g, "");
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / 200);
    return Math.max(1, readingTime);
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

  const getShareUrl = () => {
    return typeof window !== "undefined" ? window.location.href : "";
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`${post?.title} - `);
    window.open(`https://wa.me/?text=${text}${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(post?.title || "");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
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

  const readingTime = calculateReadingTime(post.content);

  const getFullUrl = () => {
    return typeof window !== "undefined" ? window.location.href : "";
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || "",
    "image": post.featured_image || "",
    "datePublished": post.published_at || "",
    "dateModified": post.published_at || "",
    "author": {
      "@type": "Person",
      "name": "Marcus T. Melo",
      "url": "https://marcustmelo.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Marcus T. Melo"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": getFullUrl()
    },
    "articleSection": post.blog_categories?.name || "Geral",
    "wordCount": post.content ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length : 0,
    "timeRequired": `PT${readingTime}M`
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Marcus T. Melo</title>
        <meta name="description" content={post.excerpt || ""} />
        <link rel="canonical" href={`https://marcustmelo.com/blog/${post.slug}`} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ""} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://marcustmelo.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.published_at || ""} />
        <meta property="article:section" content={post.blog_categories?.name || "Geral"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ""} />
        {post.featured_image && <meta name="twitter:image" content={post.featured_image} />}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="border-b border-border/50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="flex items-center gap-1 hover:text-[#C7A7FF] transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blog" className="hover:text-[#C7A7FF] transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground truncate max-w-[200px] md:max-w-[400px]">
                {post.title}
              </span>
            </nav>
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

          {/* Category, Date & Reading Time */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            {post.blog_categories?.name && (
              <Badge
                style={{
                  backgroundColor: `${getCategoryColor(post.blog_categories.name)}20`,
                  color: getCategoryColor(post.blog_categories.name),
                  borderColor: `${getCategoryColor(post.blog_categories.name)}30`,
                }}
              >
                {post.blog_categories.name}
              </Badge>
            )}
            {post.published_at && (
              <span className="text-sm text-muted-foreground">
                {format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy")}
              </span>
            )}
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readingTime} min de leitura
            </span>
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

          {/* Social Share */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Compartilhe este artigo:</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnWhatsApp}
                className="border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnLinkedIn}
                className="border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnTwitter}
                className="border-foreground/30 text-foreground hover:bg-foreground/10 hover:border-foreground"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/50">
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent">
                Posts Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => {
                  const relatedCategoryName = relatedPost.blog_categories?.name || null;
                  return (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group relative bg-[#1A1A1F] border border-border/50 rounded-xl overflow-hidden hover:border-[#C7A7FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#C7A7FF]/10"
                    >
                      <div className={`h-32 bg-gradient-to-br ${getCategoryGradient(relatedCategoryName)} relative overflow-hidden`}>
                        {relatedPost.featured_image ? (
                          <img
                            src={relatedPost.featured_image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-2 border-white/20 rounded-full" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F] to-transparent opacity-60" />
                      </div>
                      <div className="p-4">
                        <Badge
                          className="mb-2 text-xs"
                          style={{
                            backgroundColor: `${getCategoryColor(relatedCategoryName)}20`,
                            color: getCategoryColor(relatedCategoryName),
                            borderColor: `${getCategoryColor(relatedCategoryName)}30`,
                          }}
                        >
                          {relatedCategoryName || "Geral"}
                        </Badge>
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-[#C7A7FF] transition-colors">
                          {relatedPost.title}
                        </h3>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-[#C7A7FF]" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <Link to="/blog">
              <Button
                variant="outline"
                className="border-[#C7A7FF]/30 hover:bg-[#C7A7FF]/10 hover:text-[#C7A7FF]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver todos os artigos
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
