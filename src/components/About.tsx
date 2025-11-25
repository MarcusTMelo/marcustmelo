import { Check } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const About = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const highlights = [
    "Comunicação simples, clara e humana",
    "Experiência internacional real",
    "Soluções feitas sob medida",
    "14 anos de prática em TI",
    "Automação e IA usadas de forma prática e acessível",
    "Foco total em facilitar a vida de quem empreende",
  ];

  return (
    <section id="about" className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#6EC8FF] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div ref={elementRef} className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Sobre mim — Marcus Túlio Melo
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Left Column - Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative group hover:scale-105 transition-transform duration-500">
              {/* Gradient frame */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Image placeholder */}
              <div className="relative w-[480px] h-[480px] rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border-2 border-[#4A8CFF]/30 overflow-hidden">
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C7A7FF]/20 to-[#6EC8FF]/20 flex items-center justify-center">
                      <span className="text-9xl">👨‍💻</span>
                    </div>
                    <p className="text-[#D6D6E0]/50 text-lg">Marcus T. Melo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-4 text-[#D6D6E0] text-lg leading-relaxed">
              <p>
                Sou da área de TI há mais de 14 anos, com uma trajetória que começou no Brasil e passou por países como Paquistão, Alemanha, Colômbia e México. Vivi culturas diferentes, trabalhei com pessoas do mundo todo e aprendi algo que levo para cada projeto: tecnologia só funciona quando é simples, humana e feita para facilitar a vida das pessoas.
              </p>
              <p>
                Tenho mais de uma década lidando com todo tipo de situação — de problemas rápidos do dia a dia a desafios mais complexos que chegam sem aviso. Nesse caminho, aprendi a resolver tudo com paciência, clareza e empatia, sempre explicando de um jeito fácil e acolhedor.
              </p>
              <p>
                Também participei de iniciativas e projetos internacionais, o que me deu uma visão muito ampla de como a tecnologia pode ajudar negócios de diferentes tamanhos. Essa vivência me ensinou algo que carrego até hoje: traduzir o técnico para o simples, sem complicar o que não precisa ser complicado.
              </p>
              <p>
                Atualmente estou me especializando em Inteligência Artificial aplicada a negócios e busco formas práticas de usar IA no dia a dia, seja para automatizar tarefas, organizar processos, melhorar atendimentos ou deixar a rotina mais leve.
              </p>
              <p>
                E é exatamente isso que trago para pequenos negócios: sites simples, automações inteligentes e soluções que funcionam sem dor de cabeça. Eu explico sem jargão, construo junto com você e deixo a tecnologia trabalhar a seu favor — com leveza, acolhimento e boas risadas no caminho.
              </p>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 pt-6">
              {highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 transition-all duration-500 hover:translate-x-2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#C7A7FF]/30 to-[#6EC8FF]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#C7A7FF]" />
                  </div>
                  <p className="text-[#D6D6E0]">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
