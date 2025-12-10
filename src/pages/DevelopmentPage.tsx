const DevelopmentPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-deep-graphite p-4">
      <div className="text-center space-y-8 max-w-lg">
        {/* 1. Elemento Visual Sofisticado (Substituindo os ícones simples) */}
        <div className="flex justify-center">
          {/* Poderia ser um componente customizado que exibe o 'M' do seu favicon 
              com um gradiente suave, ou uma esfera de vidro fosco com brilho interno. */}
          <div
            className="w-32 h-32 bg-gradient-to-br from-[#CBA7FF] to-[#7B4FC9] rounded-3xl shadow-2xl 
                      flex items-center justify-center opacity-80 animate-pulse-slow"
          >
            <span className="text-6xl font-serif text-white/90">M</span>
          </div>
        </div>

        {/* 2. Títulos Refinados */}
        <div className="space-y-3">
          <h1 className="text-5xl font-extrabold text-[#EEC6F9]">Em Construção: A Próxima Evolução</h1>
          <p className="text-xl text-[#A9C0FF]">
            Ajustando os algoritmos e polindo a estética. Nosso ecossistema de **Automação & IA Humanizada** retorna em
            breve.
          </p>
        </div>

        {/* 3. CTA e Links (Onde a pessoa pode ir agora) */}
        <div className="pt-6">
          <a
            href="https://www.linkedin.com/in/marcustmelo/" // Assumindo este é o seu perfil
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium 
                       rounded-lg shadow-sm text-deep-graphite bg-[#CBA7FF] hover:bg-[#A9C0FF] transition-colors"
          >
            Acompanhe o Refinamento (LinkedIn)
          </a>
        </div>

        {/* 4. Nota de Rodapé elegante */}
        <div className="space-y-2 pt-8">
          <p className="text-sm text-deep-graphite/40">A tecnologia com alma exige tempo. Agradeço sua compreensão.</p>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPage;
