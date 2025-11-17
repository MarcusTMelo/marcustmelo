import { Wrench, Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Projects = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  const projects = [
    {
      icon: Wrench,
      title: "Conecta TI",
      description: "Sistema de gestão de chamados e ativos de TI usando Microsoft Lists + Power Automate. Centralizou solicitações, automatizou aprovações e reduziu tempo de resposta da equipe técnica.",
      technologies: ["Microsoft Lists", "Power Automate", "SharePoint"],
      organization: "GIZ Brasil",
      gradientFrom: "#C7A7FF",
      gradientTo: "#6EC8FF",
    },
    {
      icon: Briefcase,
      title: "Conecta Ativos",
      description: "Plataforma de controle patrimonial com rastreamento, manutenção preventiva e relatórios automáticos. Eliminou planilhas manuais e trouxe visibilidade total dos ativos da organização.",
      technologies: ["Microsoft Lists", "Power Automate", "Power BI"],
      organization: "GIZ Brasil",
      gradientFrom: "#6EC8FF",
      gradientTo: "#4A8CFF",
    },
    {
      icon: MapPin,
      title: "Conecta Estações",
      description: "Sistema de gestão operacional de estações de campo com check-ins, registro de incidentes e relatórios em tempo real. Digitalizou processos antes feitos em papel.",
      technologies: ["Microsoft Lists", "Power Automate", "Forms"],
      organization: "GIZ Brasil",
      gradientFrom: "#4A8CFF",
      gradientTo: "#FF7ACB",
    },
  ];

  return (
    <section id="projects" className="relative py-20 px-6 md:py-32 overflow-hidden" style={{ backgroundColor: "#0B0B0D" }}>
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#6EC8FF] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div ref={elementRef} className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Projetos que Transformaram Operações
        </h2>

        {/* Intro Text */}
        <p 
          className={`text-center text-[#D6D6E0] text-lg md:text-xl max-w-4xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          Liderei projetos de automação na GIZ Brasil que organizam operações complexas, eliminam trabalho manual e trazem clareza para equipes inteiras.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-[#0D0B12]/80 backdrop-blur-sm border-2 transition-all duration-500 hover:transform hover:scale-[1.03] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{
                borderImage: `linear-gradient(135deg, ${project.gradientFrom}40, ${project.gradientTo}40) 1`,
                transitionDelay: `${400 + index * 200}ms`,
                boxShadow: '0 0 0 0 transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 40px ${project.gradientFrom}40`;
                e.currentTarget.style.borderImage = `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo}) 1`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
                e.currentTarget.style.borderImage = `linear-gradient(135deg, ${project.gradientFrom}40, ${project.gradientTo}40) 1`;
              }}
            >
              {/* Icon with gradient background */}
              <div
                className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(199,167,255,0.4)]"
                style={{
                  background: `linear-gradient(135deg, ${project.gradientFrom}20, ${project.gradientTo}20)`,
                }}
              >
                <project.icon className="w-8 h-8" style={{ color: project.gradientFrom }} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-[#D6D6E0] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#C7A7FF] group-hover:to-[#6EC8FF] group-hover:bg-clip-text transition-all duration-300">
                {project.title}
              </h3>

              {/* Organization */}
              <p className="text-sm text-[#D6D6E0]/60 mb-4 font-medium">
                {project.organization}
              </p>

              {/* Description */}
              <p className="text-[#D6D6E0]/80 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <Badge
                    key={techIndex}
                    variant="secondary"
                    className="text-xs font-semibold px-3 py-1"
                    style={{
                      backgroundColor: "#4A8CFF",
                      color: "#D6D6E0",
                    }}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
