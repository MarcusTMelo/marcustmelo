import { Code2, Settings, Monitor, Link } from "lucide-react";
import AuroraEffect from "./AuroraEffect"; // Importe o novo componente

const DevelopmentPage = () => {
  return (
    // Fundo Deep Graphite e posição relativa para o Aurora Effect
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B0B0D] text-white overflow-hidden p-4">
      {/* 1. Efeito Interativo de Aurora Boreal (Segue o mouse) */}
      <AuroraEffect />

      {/* 2. Conteúdo Central (Z-Index maior para ficar por cima do efeito) */}
      <div className="relative z-10 text-center space-y-7 max-w-lg bg-deep-graphite/10 backdrop-blur-sm p-8 rounded-xl border border-white/5 shadow-2xl">
        {/* Ícone de Engenharia Refinado: Mais clean e utilizando a paleta */}
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center h-20 w-20 p-2 border-2 border-[#A9C0FF]/60 rounded-full bg-[#CBA7FF]/10">
            <Settings className="h-10 w-10 text-[#CBA7FF]" />
            <Code2 className="h-6 w-6 text-[#A9C0FF] absolute -bottom-1 -right-1 p-1 bg-[#0B0B0D] rounded-full" />
          </div>
        </div>

        <div className="space-y-2">
          {/* Título e Subtítulo Pragmáticos */}
          <h1 className="text-4xl font-bold text-white">Refinando os Detalhes</h1>
          <p className="text-lg text-[#A9C0FF]">
            A engenharia da **Automação & IA Humanizada** está recebendo ajustes finos.
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-sm text-white/70">Estamos migrando sistemas e otimizando a arquitetura Lovable Cloud.</p>
          <p className="text-sm text-white/70">
            O resultado será fluidez e inteligência. Agradeço sua paciência elegante.
          </p>
        </div>

        {/* CTA para o LinkedIn */}
        <div className="pt-4">
          <a
            href="https://www.linkedin.com/in/marcustmelo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium 
                           rounded-md shadow-sm text-[#0B0B0D] bg-[#CBA7FF] hover:bg-[#A9C0FF] transition-colors duration-300"
          >
            <Link className="h-4 w-4" />
            <span>Acompanhe os Bastidores (LinkedIn)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPage;
