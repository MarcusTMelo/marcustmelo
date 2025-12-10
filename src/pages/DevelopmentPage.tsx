import { Mail } from "lucide-react";
// Assuma que você tem um componente que renderiza sua Logo SVG
import LogoMTM from "./LogoMTM";
import AuroraEffect from "./AuroraEffect";

const DevelopmentPage = () => {
  // Cor Lavender Ice da paleta oficial para destacar a marca
  const LavenderIce = "#CBA7FF";
  const DeepGraphite = "#0B0B0D";

  return (
    // Fundo Profundo com gradiente radial (Layer 1)
    <div
      className="relative flex min-h-screen items-center justify-center text-white overflow-hidden p-4"
      style={{ background: `radial-gradient(circle at center, #1a1a1e 0%, ${DeepGraphite} 100%)` }}
    >
      {/* 1. Efeito Interativo de Aurora Boreal (Layer 2: Luz) */}
      <AuroraEffect />

      {/* 2. Conteúdo Central: Painel de Glassmorphism (Layer 3: Textura e Conteúdo) */}
      <div
        className="relative z-10 text-center space-y-8 max-w-lg p-12 rounded-2xl shadow-2xl transition-all duration-500 ease-out"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.04)", // Sutilmente mais brilhante
          backdropFilter: "blur(12px) brightness(1.2)", // Mais desfoque para mais profundidade
          WebkitBackdropFilter: "blur(12px) brightness(1.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Ícone: Sua Logo SVG, elegante e em destaque */}
        <div className="flex justify-center">
          {/* Adicione um componente SVG que represente sua logo aqui */}
          {/* O círculo de luz ao redor simula a engrenagem, mas com a identidade da marca */}
          <div className="relative flex items-center justify-center h-24 w-24 p-2 rounded-full border-2 border-[#A9C0FF]/60 shadow-lg bg-gradient-to-br from-[#A9C0FF]/10 to-transparent">
            {/* Renderiza sua logo SVG aqui. Ajuste a prop 'className' para a cor desejada. */}
            <span className="text-6xl font-serif text-white/90">
              {/* Se o seu LogoMTM for um componente, use-o assim: */}
              <LogoMTM className="h-16 w-16 text-white" />
              {/* Ou use um placeholder visual temporário: */}
              <span className="text-6xl font-bold" style={{ color: LavenderIce }}>
                M
              </span>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Título: Simples e Direto */}
          <h1 className="text-5xl font-extrabold text-white">Desenvolvimento em Foco</h1>
          {/* Subtítulo: Sem asteriscos, destaque na cor da paleta */}
          <p className="text-xl text-white/80">
            Estamos polindo os detalhes do ecossistema{" "}
            <span style={{ color: LavenderIce }}>Automação & IA Humanizada</span>.
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-base text-white/60">
            A precisão da engenharia e a qualidade do design exigem um tempo dedicado. Agradeço sua elegante paciência.
          </p>
        </div>

        {/* 3. CTA Discreto (E-mail) */}
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
