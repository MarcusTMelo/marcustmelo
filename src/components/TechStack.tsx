import { Workflow, Brain, Server } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const TechStack = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const categories = [
    {
      title: "Sites & Presença Digital",
      icon: Workflow,
      iconColor: "#C7A7FF",
      items: [
        "Sites modernos, rápidos e fáceis de usar",
        "Landing pages para captar clientes",
        "Sistemas simples para pedidos, serviços ou atendimentos",
        "Hospedagem segura e sem travamentos",
      ],
    },
    {
      title: "Assistentes Inteligentes (IA)",
      icon: Brain,
      iconColor: "#6EC8FF",
      items: [
        "Uma assistente virtual que conversa como uma pessoa de verdade",
        "Respostas automáticas no WhatsApp, Instagram ou site",
        "Atendimento imediato, mesmo quando você está ocupado",
        "Explica preços, horários, serviços e agenda",
        "Comunicação humanizada e clara",
      ],
    },
    {
      title: "Automação & Organização",
      icon: Server,
      iconColor: "#4A8CFF",
      items: [
        "Mensagens automáticas e lembretes",
        "Agendamentos automáticos",
        "Integração com sistemas que você já usa",
        "Gestão simples de clientes",
        "Processos atualizados sem esforço",
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
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Stack de Tecnologias
        </h2>

        {/* Section Description */}
        <p className={`text-center text-[#D6D6E0] text-lg md:text-xl max-w-4xl mx-auto mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Uso ferramentas modernas e inteligentes para criar sites, organizar seu negócio e automatizar tarefas. Tudo funciona de forma simples e sem complicação — para que você tenha mais tempo para atender, vender e cuidar da sua empresa.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

              {/* Items List */}
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-3 p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-200"
                  >
                    <span className="text-[#6EC8FF] mt-1">•</span>
                    <span className="text-[#D6D6E0] text-sm leading-relaxed">{item}</span>
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
