import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      category: "Automação",
      categoryColor: "#C7A7FF",
      title: "Como automatizar processos repetitivos com Power Automate",
      excerpt: "Descubra as melhores práticas para criar fluxos de trabalho inteligentes que economizam horas do seu dia.",
      date: "15 Jan 2024",
      readTime: "5 min",
      gradient: "from-[#C7A7FF] to-[#6EC8FF]",
    },
    {
      category: "IA",
      categoryColor: "#6EC8FF",
      title: "IA Generativa além do ChatGPT: Claude e outras ferramentas",
      excerpt: "Explore alternativas poderosas para integrar inteligência artificial no seu negócio com estratégia.",
      date: "12 Jan 2024",
      readTime: "7 min",
      gradient: "from-[#6EC8FF] to-[#4A8CFF]",
    },
    {
      category: "Tech LGBT+",
      categoryColor: "#FF7ACB",
      title: "Tecnologia inclusiva: criando espaços seguros digitais",
      excerpt: "Como pessoas LGBTQIA+ podem usar tecnologia para construir autonomia e visibilidade em seus negócios.",
      date: "10 Jan 2024",
      readTime: "6 min",
      gradient: "from-[#FF7ACB] to-[#C7A7FF]",
    },
    {
      category: "Negócios",
      categoryColor: "#4A8CFF",
      title: "Transformação digital para pequenos negócios: por onde começar",
      excerpt: "Um guia prático para implementar automação e IA sem grandes investimentos iniciais.",
      date: "8 Jan 2024",
      readTime: "8 min",
      gradient: "from-[#4A8CFF] to-[#6EC8FF]",
    },
    {
      category: "Automação",
      categoryColor: "#C7A7FF",
      title: "Microsoft Lists: o segredo para organizar operações complexas",
      excerpt: "Cases reais de como estruturei soluções como Conecta TI e Conecta Ativos na GIZ Brasil.",
      date: "5 Jan 2024",
      readTime: "10 min",
      gradient: "from-[#C7A7FF] to-[#FF7ACB]",
    },
    {
      category: "IA",
      categoryColor: "#6EC8FF",
      title: "Prompt Engineering: a arte de conversar com IA",
      excerpt: "Técnicas avançadas para obter resultados precisos e criativos usando engenharia de prompts.",
      date: "2 Jan 2024",
      readTime: "6 min",
      gradient: "from-[#6EC8FF] to-[#C7A7FF]",
    },
  ];

  return (
    <section className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#FF7ACB] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent">
            Blog & Artigos
          </h2>
          <p className="text-lg md:text-xl text-[#D6D6E0]/80">
            Insights sobre automação, IA e transformação digital
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group relative rounded-2xl bg-card/50 border-2 border-border/50 hover:border-[#4A8CFF]/50 overflow-hidden transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(74,140,255,0.2)] cursor-pointer"
            >
              {/* Gradient Thumbnail */}
              <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                {/* Overlay pattern */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold px-3 py-1 bg-background/90 backdrop-blur-sm border-0"
                    style={{ color: post.categoryColor }}
                  >
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-[#C7A7FF] group-hover:to-[#6EC8FF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#D6D6E0]/80 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-[#D6D6E0]/60 pt-4 border-t border-border/30">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Decorative gradient line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${post.categoryColor}, transparent)` }}
              />
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] text-background font-semibold hover:shadow-[0_0_40px_rgba(199,167,255,0.4)] transition-all duration-300"
          >
            Ver todos os artigos
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
