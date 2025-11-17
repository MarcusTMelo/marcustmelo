import { Check } from "lucide-react";

const About = () => {
  const highlights = [
    "MBA em IA aplicada a negócios (em andamento)",
    "Especialista Microsoft Lists + Power Automate",
    "Administração de servidores e sistemas self-hosted",
    "Foco em comunidade LGBTQIA+ e pequenos negócios",
  ];

  const stats = [
    { value: "10+ anos", label: "de experiência" },
    { value: "15+ projetos", label: "liderados" },
    { value: "100%", label: "humanizado" },
  ];

  return (
    <section id="about" className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#6EC8FF] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent">
            Marcus Túlio Melo
          </h2>
          <p className="text-xl md:text-2xl text-[#D6D6E0]/80">
            Automação & IA Humanizada
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
          {/* Left Column - Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              {/* Gradient frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Image placeholder */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border-2 border-[#4A8CFF]/30 overflow-hidden">
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C7A7FF]/20 to-[#6EC8FF]/20 flex items-center justify-center">
                      <span className="text-6xl">👨‍💻</span>
                    </div>
                    <p className="text-[#D6D6E0]/50 text-sm">Marcus T. Melo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-4 text-[#D6D6E0] text-lg leading-relaxed">
              <p>
                Olá! Sou Marcus, gay, 37 anos, jovial e apaixonado por tecnologia que transforma vidas. 
                Com mais de 10 anos de experiência em automação, IA e transformação digital, liderei projetos 
                como Conecta TI, Conecta Ativos e Conecta Estações na GIZ Brasil.
              </p>
              <p>
                Tenho formação em TI e Gestão, e atualmente faço MBA em Inteligência Artificial aplicada a negócios. 
                Meu foco? Simplificar o complexo, criar soluções acessíveis e trabalhar especialmente com pessoas 
                LGBTQIA+ e pequenos negócios que querem autonomia digital.
              </p>
              <p>
                Acredito que tecnologia deve ser transparente, empática e construída COM pessoas, não PARA pessoas.
              </p>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 pt-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#C7A7FF]/30 to-[#6EC8FF]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#C7A7FF]" />
                  </div>
                  <p className="text-[#D6D6E0]">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl bg-card/50 border-2 border-[#4A8CFF]/30 hover:border-[#4A8CFF]/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(74,140,255,0.2)]"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-[#D6D6E0] text-sm">{stat.label}</div>
              </div>

              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4A8CFF] to-transparent opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
