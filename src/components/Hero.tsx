"use client";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight as AceternitySpotlight } from "@/components/ui/spotlight";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";

export function SplineHero() {
  return (
    <div className="relative w-full min-h-[700px] overflow-hidden" style={{ backgroundColor: "#0B0B0D" }}>
      {/* Névoas sutis atmosféricas - Queer Premium Elegante */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0B12] via-[#0B0B0D] to-[#0D0B12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,162,255,0.08),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(110,199,255,0.06),transparent_65%)]" />

      {/* Spotlights suaves - opacity muito reduzida para elegância */}
      <AceternitySpotlight className="w-[900px] h-[900px] -top-52 -left-40 opacity-15" />
      <AceternitySpotlight className="w-[800px] h-[800px] top-20 -right-40 opacity-12" />

      {/* Névoa flutuante que segue o cursor - cores premium elegantes */}
      <CursorSpotlight size={300} className="from-[#C8A2FF]/25 via-[#6EC7FF]/20 to-[#8EE8C7]/15" />

      {/* Main container */}
      <div className="relative w-full min-h-[700px] px-6 md:px-12 lg:px-20 py-16">
        {/* LEFT: Text content */}
        <div className="relative z-20 max-w-2xl pt-12 md:pt-20 space-y-8">
          {/* Tag de saudação */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-sm border"
            style={{ borderColor: "rgba(200,162,255,0.15)" }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF7AC0] to-[#C8A2FF] animate-pulse" />
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#C8A2FF] via-[#6EC7FF] to-[#8EE8C7]">
              Olá, eu sou Marcus
            </span>
          </div>

          {/* Título principal */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-br from-[#C8A2FF] via-[#6EC7FF] to-[#8EE8C7]"
                style={{ filter: "drop-shadow(0 0 30px rgba(200,162,255,0.3))" }}
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
                className="h-1 w-20 rounded-full bg-gradient-to-r from-[#FF7AC0] via-[#C8A2FF] to-[#6EC7FF]"
                style={{ boxShadow: "0 0 15px rgba(200,162,255,0.4)" }}
              />
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#C8A2FF] to-[#6EC7FF] opacity-60" />
              <div className="h-1 w-6 rounded-full bg-[#8EE8C7] opacity-40" />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-4" style={{ color: "#D6D6E0", opacity: 0.9 }}>
            <p className="text-lg md:text-xl leading-relaxed">
              Transformo processos, negócios e rotinas através de sistemas inteligentes e automações criadas com{" "}
              <span
                className="font-semibold"
                style={{ color: "#FF7AC0", filter: "drop-shadow(0 0 8px rgba(255,122,192,0.5))" }}
              >
                alma
              </span>
              ,{" "}
              <span
                className="font-semibold"
                style={{ color: "#C8A2FF", filter: "drop-shadow(0 0 8px rgba(200,162,255,0.5))" }}
              >
                cor
              </span>{" "}
              e{" "}
              <span
                className="font-semibold"
                style={{ color: "#6EC7FF", filter: "drop-shadow(0 0 8px rgba(110,199,255,0.5))" }}
              >
                inteligência
              </span>
              .
            </p>

            <p className="text-base md:text-lg italic leading-relaxed" style={{ color: "#D6D6E0", opacity: 0.7 }}>
              Tecnologia acessível, sem jargões — apenas{" "}
              <span className="not-italic" style={{ color: "#C8A2FF", opacity: 0.9 }}>
                soluções humanas
              </span>{" "}
              para{" "}
              <span className="not-italic" style={{ color: "#6EC7FF", opacity: 0.9 }}>
                pessoas reais
              </span>
              .
            </p>
          </div>

          {/* Botões CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              className="group relative px-8 py-4 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#C8A2FF] via-[#6EC7FF] to-[#8EE8C7] text-white"
              style={{ boxShadow: "0 0 0 rgba(200,162,255,0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 30px rgba(200,162,255,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 rgba(200,162,255,0)")}
            >
              <span className="relative z-10">Vamos conversar</span>
            </button>

            <button
              className="px-8 py-4 font-semibold rounded-full transition-all duration-300 bg-white/[0.03] backdrop-blur-sm border"
              style={{ color: "#D6D6E0", borderColor: "rgba(200,162,255,0.2)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(200,162,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(200,162,255,0.2)";
              }}
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
              className="text-[50px] xl:text-[70px] font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-br from-white/[0.04] via-[#C8A2FF]/[0.06] to-[#6EC7FF]/[0.04] whitespace-nowrap"
              style={{ filter: "drop-shadow(0 0 20px rgba(200,162,255,0.15))" }}
            >
              MARCUS T. MELO
            </span>
          </div>

          {/* Névoas atmosféricas */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(200,162,255,0.12), rgba(110,199,255,0.10), rgba(142,232,199,0.12))",
              filter: "blur(120px)",
            }}
          />

          <div
            className="absolute top-[25%] left-[45%] w-[350px] h-[350px] rounded-full animate-pulse"
            style={{
              background: "rgba(255,122,192,0.10)",
              filter: "blur(100px)",
              animationDuration: "3s",
              animationDelay: "0.5s",
            }}
          />

          <div
            className="absolute top-[65%] left-[55%] w-[350px] h-[350px] rounded-full animate-pulse"
            style={{
              background: "rgba(110,199,255,0.10)",
              filter: "blur(100px)",
              animationDuration: "3.5s",
              animationDelay: "1s",
            }}
          />

          <div
            className="absolute top-[45%] left-[35%] w-[280px] h-[280px] rounded-full animate-pulse"
            style={{ background: "rgba(200,162,255,0.08)", filter: "blur(90px)", animationDuration: "4s" }}
          />

          {/* Rim lighting */}
          <div
            className="absolute top-[20%] right-[10%] w-[200px] h-[400px] rounded-full"
            style={{
              background: "linear-gradient(to bottom, rgba(255,122,192,0.08), transparent)",
              filter: "blur(70px)",
            }}
          />

          <div
            className="absolute bottom-[20%] left-[10%] w-[200px] h-[400px] rounded-full"
            style={{ background: "linear-gradient(to top, rgba(142,232,199,0.08), transparent)", filter: "blur(70px)" }}
          />

          {/* Color overlays */}
          <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-30 bg-[radial-gradient(circle_at_48%_35%,rgba(200,162,255,0.45),rgba(110,199,255,0.35),rgba(142,232,199,0.30),transparent_65%)]" />

          <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-20 bg-[radial-gradient(circle_at_52%_50%,rgba(200,162,255,0.35),rgba(110,199,255,0.25),rgba(255,122,192,0.30),transparent_68%)]" />

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
                backgroundColor: "#FF7AC0",
                boxShadow: "0 0 15px rgba(255,122,192,0.6)",
                animationDelay: "0s",
                animationDuration: "2s",
              }}
            />
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: "#C8A2FF",
                boxShadow: "0 0 15px rgba(200,162,255,0.6)",
                animationDelay: "0.2s",
                animationDuration: "2s",
              }}
            />
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: "#6EC7FF",
                boxShadow: "0 0 15px rgba(110,199,255,0.6)",
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
                    "radial-gradient(circle, rgba(200,162,255,0.10), rgba(110,199,255,0.08), rgba(142,232,199,0.10))",
                  filter: "blur(90px)",
                }}
              />

              <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-35 bg-[radial-gradient(circle_at_50%_50%,rgba(200,162,255,0.4),rgba(110,199,255,0.3),rgba(142,232,199,0.25),transparent_70%)]" />

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
}
