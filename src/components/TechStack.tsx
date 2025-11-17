import { Workflow, Brain, Server, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const TechStack = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const categories = [
    {
      title: "Automação & No-Code",
      icon: Workflow,
      iconColor: "#C7A7FF",
      technologies: [
        { name: "Microsoft Lists", badge: "Especialista" },
        { name: "Power Automate", badge: "Avançado" },
        { name: "SharePoint", badge: null },
        { name: "n8n", badge: null },
        { name: "Make", badge: null },
        { name: "Zapier", badge: null },
      ],
    },
    {
      title: "Inteligência Artificial",
      icon: Brain,
      iconColor: "#6EC8FF",
      technologies: [
        { name: "Claude API", badge: null },
        { name: "OpenAI / ChatGPT", badge: null },
        { name: "LangChain", badge: null },
        { name: "Prompt Engineering", badge: null },
      ],
    },
    {
      title: "Infraestrutura & DevOps",
      icon: Server,
      iconColor: "#4A8CFF",
      technologies: [
        { name: "Servidores dedicados", badge: null },
        { name: "WordPress", badge: null },
        { name: "Sistemas self-hosted", badge: null },
        { name: "Linux", badge: null },
      ],
    },
    {
      title: "Dados & Análise",
      icon: Database,
      iconColor: "#FF7ACB",
      technologies: [
        { name: "Excel avançado", badge: null },
        { name: "Power BI", badge: null },
        { name: "Google Sheets", badge: null },
      ],
    },
  ];

  return (
    <section id="tech-stack" className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A8CFF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7ACB] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div ref={elementRef} className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Stack de Tecnologias
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`group relative p-6 rounded-2xl bg-[#0D0B12] border-2 border-[#4A8CFF]/20 hover:border-[#4A8CFF]/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,140,255,0.2)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + categoryIndex * 100}ms` }}
            >
              {/* Category Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${category.iconColor}20, ${category.iconColor}10)`,
                  }}
                >
                  <category.icon className="w-6 h-6" style={{ color: category.iconColor }} />
                </div>
              </div>

              {/* Category Title */}
              <h3 className="text-lg font-bold text-foreground mb-4">
                {category.title}
              </h3>

              {/* Technologies List */}
              <div className="space-y-3">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-background/50 hover:bg-background/80 hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-[#D6D6E0] text-sm">{tech.name}</span>
                    {tech.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs font-semibold px-2 py-0.5 bg-[#FF7ACB] text-[#0B0B0D] border-0"
                      >
                        {tech.badge}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Decorative gradient line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${category.iconColor}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-[#4A8CFF] to-transparent opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
