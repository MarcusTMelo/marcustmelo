import { Bot, Globe, Puzzle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Services = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const services = [
    {
      icon: Globe,
      title: "Criação de Sites Simples e Bonitos",
      description:
        "Seu negócio com uma presença profissional na internet: clara, rápida e fácil de usar. Perfeito para quem precisa de um site que mostre serviços, preços, contato e localização.",
      items: [
        "Página inicial",
        "Apresentação do negócio",
        "Serviços ou cardápio",
        "Botão de WhatsApp",
        "Endereço no Google Maps",
        "Agendamentos simples (opcional)"
      ],
      badge: "Web Design",
      gradientFrom: "#C7A7FF",
      gradientTo: "#6EC8FF",
    },
    {
      icon: Bot,
      title: "Automação do Atendimento e da Rotina",
      description:
        "Mensagens automáticas, lembretes, confirmações e organização sem você precisar fazer tudo manualmente. Automatizações discretas que economizam tempo todos os dias.",
      items: [
        "Resposta automática",
        "Lembretes",
        "Organização automática de contatos",
        "Mensagens pré-agendadas",
        "Mini-fluxos que funcionam sozinhos"
      ],
      badge: "Automação",
      gradientFrom: "#6EC8FF",
      gradientTo: "#4A8CFF",
    },
    {
      icon: Puzzle,
      title: "Soluções Digitais Sob Medida para Seu Negócio",
      description:
        "Pequenos sistemas criados especialmente para sua realidade. Nada complicado — apenas o que você realmente precisa para trabalhar melhor.",
      items: [
        "Formulários personalizados",
        "Registro de clientes",
        "Mini-sistemas de organização",
        "Fluxos simples",
        "Soluções adaptadas ao seu dia a dia"
      ],
      badge: "Sob Medida",
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
          Aqui você encontra soluções simples e diretas para deixar seu negócio mais organizado, mais profissional e funcionando com menos esforço. Eu cuido da parte técnica — você cuida do seu negócio.
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
