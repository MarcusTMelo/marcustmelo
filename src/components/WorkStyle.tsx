import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Heart, MessageCircle, Globe, Lightbulb, Users, CheckCircle, Sparkles } from "lucide-react";

const WorkStyle = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  const differentials = [
    { icon: MessageCircle, text: "Falo a linguagem do cliente, sem jargões" },
    { icon: Heart, text: "Explico com calma e clareza" },
    { icon: Globe, text: "Experiência internacional real (Brasil, Paquistão, Alemanha e América Latina)" },
    { icon: Lightbulb, text: "Soluções pensadas para pequenos negócios" },
    { icon: Users, text: "Empatia em primeiro lugar" },
    { icon: CheckCircle, text: "Foco em resolver, não complicar" },
    { icon: Sparkles, text: "Atendimento humanizado, direto e presente" },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      <div ref={elementRef} className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Sobre meu estilo de trabalho
        </h2>

        {/* Description */}
        <p className={`text-center text-foreground/80 text-lg md:text-xl max-w-3xl mx-auto mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Trabalho com tecnologia há mais de 14 anos — mas meu foco sempre foi gente. Minha missão é traduzir o complicado para o simples, trazer clareza e entregar soluções que realmente funcionam no dia a dia.
        </p>

        {/* Differentials Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + index * 50}ms` }}
              >
                <Icon className="w-6 h-6 mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                <p className="text-foreground/90 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>

        {/* Final Quote */}
        <div className={`max-w-3xl mx-auto p-8 rounded-lg bg-gradient-to-r from-primary/10 via-[#6EC8FF]/10 to-[#4A8CFF]/10 border border-primary/20 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-center text-lg md:text-xl font-medium text-foreground italic">
            Tecnologia só funciona quando ajuda pessoas — e é isso que guia tudo o que faço.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkStyle;
