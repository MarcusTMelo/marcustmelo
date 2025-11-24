import { Bot, Workflow, Puzzle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Services = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const services = [
    {
      icon: Workflow,
      title: "Automação Inteligente com n8n",
      description:
        "Crio automações personalizadas que conectam ferramentas, eliminam tarefas repetitivas e agilizam seu dia a dia. Integro sistemas, organizo fluxos e deixo tudo funcionando automaticamente para você ganhar tempo e clareza.",
      items: [
        "Integrações entre ferramentas",
        "Fluxos automatizados",
        "Webhooks",
        "Mensagens automáticas",
        "Conexões APIs",
        "Processos inteiros automatizados"
      ],
      badge: "n8n Specialist",
      gradientFrom: "#C7A7FF",
      gradientTo: "#6EC8FF",
    },
    {
      icon: Bot,
      title: "IA Estratégica para o seu Negócio",
      description:
        "Uso IA de forma prática: como assistente, como ferramenta de criação ou como parte de um fluxo inteligente. Nada de hype vazio, apenas soluções reais que ajudam você a trabalhar melhor e viver com mais leveza.",
      items: [
        "Assistentes inteligentes",
        "Automação de conteúdo",
        "Resumos automáticos",
        "Atendimento inteligente",
        "Soluções de IA personalizadas"
      ],
      badge: "AI Expert",
      gradientFrom: "#6EC8FF",
      gradientTo: "#4A8CFF",
    },
    {
      icon: Puzzle,
      title: "Soluções Digitais sob Medida",
      description:
        "Nenhum negócio é igual. Por isso, eu desenho sistemas, microaplicações, fluxos e integrações que fazem sentido para você, do jeito que você trabalha e no ritmo que você vive.",
      items: [
        "Organização da rotina",
        "Mapas de processos",
        "Estruturação digital",
        "Integrações específicas",
        "Construção de sistemas simples e humanizados"
      ],
      badge: "Custom Solutions",
      gradientFrom: "#4A8CFF",
      gradientTo: "#FF7ACB",
    },
  ];

  return (
    <section id="services" className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4A8CFF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div ref={elementRef} className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Serviços
        </h2>

        {/* Section Description */}
        <p className={`text-lg md:text-xl text-[#D6D6E0] text-center max-w-4xl mx-auto mb-16 leading-relaxed transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Transformo processos, rotinas e atendimentos em sistemas inteligentes, eficientes e humanos, feitos sob medida para você e para a sua realidade.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-card/50 border-2 border-[#4A8CFF]/20 hover:border-[#4A8CFF]/50 transition-all duration-500 hover:transform hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(74,140,255,0.3)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 200}ms` }}
            >
              {/* Badge */}
              <div className="mb-6">
                <Badge
                  variant="secondary"
                  className="text-xs font-semibold px-3 py-1"
                  style={{
                    background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})`,
                    color: "#0B0B0D",
                  }}
                >
                  {service.badge}
                </Badge>
              </div>

              {/* Icon with gradient background */}
              <div
                className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(199,167,255,0.4)] transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.gradientFrom}20, ${service.gradientTo}20)`,
                }}
              >
                <service.icon className="w-8 h-8" style={{ color: service.gradientFrom }} />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:bg-gradient-to-r group-hover:from-[#C7A7FF] group-hover:to-[#6EC8FF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#D6D6E0] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Items List */}
              <ul className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[#D6D6E0]/80 text-sm flex items-start">
                    <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Decorative gradient line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${service.gradientFrom}, ${service.gradientTo}, transparent)`,
                }}
              />

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
