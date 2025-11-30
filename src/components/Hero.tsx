"use client";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative w-full min-h-[700px] pt-20 overflow-hidden" style={{ backgroundColor: "#0B0B0D" }}>
      {/* Névoas sutis atmosféricas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0B12] via-[#0B0B0D] to-[#0D0B12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(199,167,255,0.08),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(110,200,255,0.06),transparent_65%)]" />

      {/* Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* Main container */}
      <div className="relative w-full min-h-[700px] px-6 md:px-12 lg:px-20 py-16">
        {/* LEFT: Text content */}
        <div className="relative z-20 max-w-2xl pt-12 md:pt-20 space-y-8">
          {/* Tag de saudação */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-sm border"
            style={{ borderColor: "rgba(199,167,255,0.15)" }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF7ACB] to-[#C7A7FF] animate-pulse" />
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF]">
              Olá, eu sou Marcus
            </span>
          </div>

          {/* Título principal */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-br from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF]"
                style={{ filter: "drop-shadow(0 0 30px rgba(199,167,255,0.3))" }}
              >
                Automação & IA
              </span>
              <span className="block mt-2" style={{ color: "#D6D6E0", opacity: 0.95 }}>
                Humanizada
              </span>
            </h1>

            {/* Linhas decorativas */}
            <div className="flex items-center gap-3">
              <div
                className="h-1 w-20 rounded-full bg-gradient-to-r from-[#FF7ACB] via-[#C7A7FF] to-[#6EC8FF]"
                style={{ boxShadow: "0 0 15px rgba(199,167,255,0.4)" }}
              />
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] opacity-60" />
              <div className="h-1 w-6 rounded-full bg-[#4A8CFF] opacity-40" />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-4" style={{ color: "#D6D6E0", opacity: 0.9 }}>
          <p className="text-lg md:text-xl leading-relaxed">
            Transformo processos, negócios e rotinas através de sistemas inteligentes e automações criadas com{" "}
            <span
              className="font-semibold"
              style={{ color: "#FF7ACB", filter: "drop-shadow(0 0 8px rgba(255,122,203,0.5))" }}
            >
              alma
            </span>
            ,{" "}
            <span
              className="font-semibold"
              style={{ color: "#C7A7FF", filter: "drop-shadow(0 0 8px rgba(199,167,255,0.5))" }}
            >
              cor
            </span>{" "}
            e{" "}
            <span
              className="font-semibold"
              style={{ color: "#6EC8FF", filter: "drop-shadow(0 0 8px rgba(110,200,255,0.5))" }}
            >
              inteligência
            </span>
            , sem jargão técnico e sem soluções engessadas.
          </p>

            <p className="text-base md:text-lg italic leading-relaxed" style={{ color: "#D6D6E0", opacity: 0.7 }}>
              Tecnologia acessível, em linguagem simples, para pessoas reais, negócios reais e problemas reais.
            </p>
          </div>

          {/* Botões CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] text-white hover:shadow-[0_0_30px_rgba(199,167,255,0.4)]"
            >
              <span className="relative z-10">Vamos conversar</span>
            </button>

            <button
              onClick={() => scrollToSection('work-style')}
              className="px-8 py-4 font-semibold rounded-full transition-all duration-300 bg-white/[0.03] backdrop-blur-sm border hover:bg-white/[0.06]"
              style={{ color: "#D6D6E0", borderColor: "rgba(199,167,255,0.2)" }}
            >
              Conheça meu trabalho
            </button>
          </div>
        </div>

        {/* RIGHT: Robot area - Desktop */}
        <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block">
          {/* Watermark */}
          <div className="absolute top-16 left-0 right-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span
              className="text-[50px] xl:text-[70px] font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-br from-white/[0.05] via-[#C7A7FF]/[0.06] to-[#6EC8FF]/[0.04] whitespace-nowrap"
              style={{ filter: "drop-shadow(0 0 20px rgba(199,167,255,0.15))" }}
            >
              MARCUS T. MELO
            </span>
          </div>

          {/* Névoas atmosféricas */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(199,167,255,0.12), rgba(110,200,255,0.10), rgba(74,140,255,0.12))",
              filter: "blur(120px)",
            }}
          />

          <div
            className="absolute top-[25%] left-[45%] w-[350px] h-[350px] rounded-full animate-pulse"
            style={{
              background: "rgba(255,122,203,0.10)",
              filter: "blur(100px)",
              animationDuration: "3s",
              animationDelay: "0.5s",
            }}
          />

          <div
            className="absolute top-[65%] left-[55%] w-[350px] h-[350px] rounded-full animate-pulse"
            style={{
              background: "rgba(110,200,255,0.10)",
              filter: "blur(100px)",
              animationDuration: "3.5s",
              animationDelay: "1s",
            }}
          />

          <div
            className="absolute top-[45%] left-[35%] w-[280px] h-[280px] rounded-full animate-pulse"
            style={{ background: "rgba(199,167,255,0.08)", filter: "blur(90px)", animationDuration: "4s" }}
          />

          {/* Color overlays */}
          <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-30 bg-[radial-gradient(circle_at_48%_35%,rgba(199,167,255,0.45),rgba(110,200,255,0.35),rgba(74,140,255,0.30),transparent_65%)]" />

          <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-20 bg-[radial-gradient(circle_at_52%_50%,rgba(199,167,255,0.35),rgba(110,200,255,0.25),rgba(255,122,203,0.30),transparent_68%)]" />

          {/* 3D Robot */}
          <div className="relative z-10 w-full h-full pointer-events-auto">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          {/* Floating particles */}
          <div className="absolute bottom-16 right-16 flex gap-3 z-20">
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: "#FF7ACB",
                boxShadow: "0 0 15px rgba(255,122,203,0.6)",
                animationDelay: "0s",
                animationDuration: "2s",
              }}
            />
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: "#C7A7FF",
                boxShadow: "0 0 15px rgba(199,167,255,0.6)",
                animationDelay: "0.2s",
                animationDuration: "2s",
              }}
            />
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: "#6EC8FF",
                boxShadow: "0 0 15px rgba(110,200,255,0.6)",
                animationDelay: "0.4s",
                animationDuration: "2s",
              }}
            />
          </div>
        </div>

        {/* Mobile robot */}
        <div className="relative w-full h-[400px] mt-12 lg:hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-md">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(199,167,255,0.10), rgba(110,200,255,0.08), rgba(74,140,255,0.10))",
                  filter: "blur(90px)",
                }}
              />

              <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-35 bg-[radial-gradient(circle_at_50%_50%,rgba(199,167,255,0.4),rgba(110,200,255,0.3),rgba(74,140,255,0.25),transparent_70%)]" />

              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
