import { Sparkles, Workflow, Target } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const HowCanIHelp = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const features = [
    {
      icon: Workflow,
      title: "Mais organização, menos bagunça digital",
      text: "Sua rotina fica mais clara e mais leve com formulários simples, registros organizados, páginas fáceis de usar e sistemas que fazem sentido para o seu negócio — sem complicação.",
    },
    {
      icon: Sparkles,
      title: "Atendimentos e tarefas funcionando sozinhos",
      text: "Crio automações inteligentes que enviam mensagens, confirmam horários, fazem lembretes e organizam informações automaticamente. Você deixa de fazer tudo manualmente e ganha tempo todos os dias.",
    },
    {
      icon: Target,
      title: "Soluções criadas sob medida pra você",
      text: "Cada negócio tem sua própria forma de funcionar. Por isso, eu analiso sua necessidade e crio pequenas soluções digitais que realmente ajudam a sua rotina — simples, rápidas e personalizadas.",
    },
  ];

  return (
    <section id="how-can-i-help" className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6EC8FF] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div ref={elementRef} className="max-w-6xl mx-auto relative z-10">
        {/* Title with gradient */}
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Como posso transformar seu negócio
        </h2>

        {/* Subtitle */}
        <p className={`text-lg md:text-xl text-[#D6D6E0] text-center max-w-4xl mx-auto mb-16 leading-relaxed transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Eu ajudo pequenas empresas a organizarem a rotina, ganharem tempo e atenderem melhor — usando tecnologia simples, IA e automações que trabalham por você, enquanto você cuida do que importa.
        </p>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 hover:border-[#C7A7FF]/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_40px_rgba(199,167,255,0.2)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Icon with gradient background */}
              <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-[#C7A7FF]/20 to-[#6EC8FF]/20 flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(199,167,255,0.3)] transition-all duration-300">
                <feature.icon className="w-7 h-7 text-[#C7A7FF]" />
              </div>

              {/* Feature title */}
              <h3 className="text-xl font-semibold text-[#D6D6E0] mb-4">
                {feature.title}
              </h3>

              {/* Feature text */}
              <p className="text-[#D6D6E0] text-base leading-relaxed">
                {feature.text}
              </p>

              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C7A7FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Decorative illustration */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-[#C7A7FF] to-transparent opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default HowCanIHelp;
