import { Settings, Mail } from "lucide-react";
// Certifique-se de que o caminho de importação esteja correto:
import AuroraEffect from "./AuroraEffect"; // ou 'caminho/para/AuroraEffect'

const DevelopmentPage = () => {
  return (
    // Fundo Deep Graphite e posição relativa para o Aurora Effect
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B0B0D] text-white overflow-hidden p-4">
      {/* 1. Efeito Interativo de Aurora Boreal (z-0, ANTES do conteúdo) */}
      <AuroraEffect />

      {/* 2. Conteúdo Central (z-10, por cima do efeito de luz) */}
      <div className="relative z-10 text-center space-y-7 max-w-lg bg-[#0B0B0D]/20 backdrop-blur-md p-10 rounded-xl border border-white/5 shadow-2xl">
        {/* Ícone de Engenharia Refinado: Usando a paleta e um ícone de engrenagem para "ajustes" */}
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center h-20 w-20 p-2 border-2 border-[#CBA7FF]/60 rounded-full bg-[#A9C0FF]/10">
            {/* Sapphire Glow (#4A8CFF) para um toque de azul profundo na engrenagem */}
            <Settings className="h-10 w-10 text-[#CBA7FF] animate-spin-slow" />
          </div>
        </div>

        <div className="space-y-2">
          {/* Título e Subtítulo com Autoridade */}
          <h1 className="text-4xl font-bold text-white">Em Processo: Refinamento Estratégico</h1>
          <p className="text-xl text-[#A9C0FF]">
            A **Automação & IA Humanizada** está sendo polida. Estamos otimizando a arquitetura Lovable Cloud.
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-base text-white/70">
            O design editorial e a precisão técnica exigem tempo. Retornamos em breve com a experiência completa.
          </p>
        </div>

        {/* 3. CTA Discreto (Apenas E-mail) */}
        <div className="pt-6">
          <a
            href="mailto:contato@marcustmelo.com" // Substitua pelo seu e-mail de contato
            className="inline-flex items-center space-x-2 px-6 py-3 border border-transparent text-sm font-medium 
                           rounded-lg shadow-lg text-[#0B0B0D] bg-[#CBA7FF] hover:bg-[#EEC6F9] transition-colors duration-300"
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
