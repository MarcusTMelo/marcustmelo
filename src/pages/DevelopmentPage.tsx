import { Settings, Mail } from "lucide-react";
import AuroraEffect from "./AuroraEffect"; // Mantenha a importação do efeito

const DevelopmentPage = () => {
  return (
    // Fundo Profundo: Gradiente sutil para dar profundidade (em vez de #0B0B0D puro)
    <div
      className="relative flex min-h-screen items-center justify-center bg-radial-gradient-dark text-white overflow-hidden p-4"
      style={{ background: "radial-gradient(circle at center, #1a1a1e 0%, #0B0B0D 100%)" }}
    >
      {/* 1. Efeito Interativo de Aurora Boreal (Layer 2: Luz) */}
      <AuroraEffect />

      {/* 2. Conteúdo Central: Painel de Glassmorphism (Layer 3: Textura e Conteúdo) */}
      <div
        className="relative z-10 text-center space-y-8 max-w-lg p-12 rounded-2xl shadow-2xl transition-all duration-500 ease-out"
        // Aplicando Glassmorphism e toque editorial
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.03)", // Transparência muito baixa
          backdropFilter: "blur(10px) brightness(1.2)", // Desfoque + um pouco de brilho
          WebkitBackdropFilter: "blur(10px) brightness(1.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)", // Borda sutil para definir o vidro
        }}
      >
        {/* Ícone de Engrenagem (Ajuste o animate-spin-slow se necessário) */}
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center h-24 w-24 p-3 border-4 border-[#CBA7FF]/40 rounded-full bg-[#A9C0FF]/10 shadow-inner">
            <Settings className="h-12 w-12 text-[#CBA7FF] animate-spin-slow" />
          </div>
        </div>

        <div className="space-y-3">
          {/* Título: Simples e Direto */}
          <h1 className="text-5xl font-extrabold text-[#CBA7FF]">Desenvolvimento em Foco</h1>
          {/* Subtítulo: Foca no valor, usando itálico sutil */}
          <p className="text-xl text-white/80">
            Estamos polindo os detalhes do ecossistema *Automação & IA Humanizada*.
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-base text-white/60">
            A precisão da engenharia e a qualidade do design exigem um tempo dedicado. Agradeço sua elegante paciência.
          </p>
        </div>

        {/* CTA Discreto (E-mail) */}
        <div className="pt-6">
          <a
            href="mailto:contato@marcustmelo.com"
            className="inline-flex items-center space-x-2 px-8 py-3 text-base font-medium 
                           rounded-lg shadow-xl text-[#0B0B0D] bg-[#CBA7FF] hover:bg-[#EEC6F9] transition-colors duration-300 transform hover:scale-[1.02]"
          >
            <Mail className="h-5 w-5" />
            <span>Contato Estratégico</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPage;
