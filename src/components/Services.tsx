import { Bot, Boxes, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Services = () => {
  const services = [
    {
      icon: Boxes,
      title: "Automação Empresarial Microsoft 365",
      description:
        "Especialista em Microsoft Lists, Power Automate e SharePoint. Já liderei projetos como Conecta TI, Conecta Ativos e Conecta Estações na GIZ Brasil — soluções que organizam operações complexas e eliminam trabalho manual.",
      badge: "Microsoft Specialist",
      gradientFrom: "#C7A7FF",
      gradientTo: "#6EC8FF",
    },
    {
      icon: Bot,
      title: "IA Estratégica para Negócios",
      description:
        "MBA em Inteligência Artificial aplicada a negócios. Uso Claude, OpenAI e automação inteligente para criar assistentes, automatizar decisões e gerar insights práticos do seu dia a dia.",
      badge: "AI Expert",
      gradientFrom: "#6EC8FF",
      gradientTo: "#4A8CFF",
    },
    {
      icon: Lightbulb,
      title: "Consultoria em Transformação Digital",
      description:
        "10+ anos liderando equipes multidisciplinares e projetos de transformação. Desenho processos, organizo operações e crio sistemas self-hosted que sua equipe realmente usa.",
      badge: "Tech Leader",
      gradientFrom: "#4A8CFF",
      gradientTo: "#FF7ACB",
    },
  ];

  return (
    <section className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4A8CFF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent">
          Serviços
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card/50 border-2 border-[#4A8CFF]/20 hover:border-[#4A8CFF]/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(74,140,255,0.3)]"
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
              <p className="text-[#D6D6E0] leading-relaxed">
                {service.description}
              </p>

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
