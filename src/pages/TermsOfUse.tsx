import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  // Garante que a página comece do topo ao ser carregada
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Termos de Uso | Marcus T. Melo";
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <Navbar />
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#C8B8E6] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao início
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Termos de Uso</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-[#D6D6E0]/80">
            <p className="text-lg text-[#D6D6E0]">Última atualização: 29 de novembro de 2025</p>

            <p>
              Obrigado por acessar o site <strong>Marcus T. Melo – Automação &amp; IA Humanizada</strong> (“MTM
              Automação”). Ao utilizar este site, você concorda com estes Termos de Uso. Caso não concorde com alguma
              parte, recomenda-se que não utilize o site.
            </p>

            {/* 1. Quem somos */}
            <section className="space-y-3 pt-4">
              <h2 className="text-xl font-semibold text-foreground">1. Quem somos</h2>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="m-0">
                  <strong className="text-[#C8B8E6]">
                    Marcus T. Melo – Automação &amp; IA Humanizada (MTM Automação)
                  </strong>
                  <br />
                  Site institucional focado em automação, inteligência artificial e consultoria para pequenos negócios.
                  <br />
                  📍 Águas Claras – DF, Brasil
                  <br />
                  📧{" "}
                  <a href="mailto:contato@marcustmelo.com" className="text-[#C8B8E6] hover:underline transition-colors">
                    contato@marcustmelo.com
                  </a>
                  <br />
                  🌐{" "}
                  <a
                    href="https://marcustmelo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8B8E6] hover:underline transition-colors"
                  >
                    https://marcustmelo.com
                  </a>
                </p>
              </div>
            </section>

            {/* 2. Objeto dos Termos */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">2. Objeto destes Termos</h2>
              <p>Estes Termos estabelecem as regras para uso do site marcustmelo.com, incluindo:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 marker:text-[#C8B8E6]">
                <li>acesso a conteúdos informativos;</li>
                <li>uso de formulários de contato;</li>
                <li>interações relacionadas a serviços de automação e IA;</li>
                <li>comunicações institucionais e educacionais.</li>
              </ul>
              <p>
                O site possui caráter institucional e informativo. Não há contratação automática de serviços ou
                pagamentos online; propostas são enviadas individualmente após contato.
              </p>
            </section>

            {/* 3. Uso do site */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">3. Uso do site</h2>
              <p>Ao utilizar o site, você se compromete a:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 marker:text-[#C8B8E6]">
                <li>fornecer informações verdadeiras nos formulários;</li>
                <li>utilizar o site apenas para fins legítimos;</li>
                <li>respeitar estes Termos e a legislação aplicável.</li>
              </ul>
              <p>Não é permitido:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 marker:text-[#C8B8E6]">
                <li>tentar acessar áreas restritas ou sistemas internos;</li>
                <li>usar robôs, scrapers ou automações não autorizadas;</li>
                <li>realizar tentativas de invasão, exploração de falhas ou ações que comprometam a segurança;</li>
                <li>copiar ou reproduzir conteúdo do site sem autorização, além das exceções previstas em lei;</li>
                <li>utilizar o site para fins ilícitos, abusivos, fraudulentos ou que violem direitos de terceiros.</li>
              </ul>
            </section>

            {/* 4. Serviços apresentados */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">4. Serviços apresentados</h2>
              <p>O site apresenta, de forma geral, serviços como:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 marker:text-[#C8B8E6]">
                <li>consultorias em automação de processos;</li>
                <li>soluções em inteligência artificial aplicadas a negócios;</li>
                <li>integrações com ferramentas como n8n, Power Automate, Zapier, Zaia, Supabase e outras;</li>
                <li>projetos de melhoria de fluxos e rotinas;</li>
                <li>conteúdos educativos e explicativos no blog.</li>
              </ul>
              <p>
                As descrições do site são informativas. Escopo, valores e prazos de serviços são definidos caso a caso,
                em proposta específica.
              </p>
            </section>

            {/* 5. Propriedade intelectual */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">5. Propriedade intelectual</h2>
              <p>São protegidos por direitos autorais e outras normas de propriedade intelectual:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 marker:text-[#C8B8E6]">
                <li>textos, artigos e conteúdos informativos;</li>
                <li>layout, identidade visual e elementos gráficos;</li>
                <li>logotipos e marca “MTM Automação”;</li>
                <li>códigos e componentes desenvolvidos para o site;</li>
                <li>materiais produzidos com apoio de ferramentas de IA sob orientação de Marcus T. Melo.</li>
              </ul>
              <p>
                É permitido compartilhar links e trechos de conteúdo para fins informativos, com indicação de autoria e
                link para a página original. Para usos comerciais ou reproduções mais amplas, é necessária autorização
                prévia.
              </p>
            </section>

            {/* 6. Consultorias e propostas */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">6. Consultorias e propostas</h2>
              <p>
                O site não realiza vendas diretas ou pagamentos online. A contratação de serviços segue, em geral, o
                seguinte fluxo:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 marker:text-[#C8B8E6]">
                <li>envio de solicitação por formulário ou e-mail;</li>
                <li>análise da demanda;</li>
                <li>envio de proposta formal com escopo, prazos e valores;</li>
                <li>início dos trabalhos após aceite explícito.</li>
              </ul>
              <p>
                Os contratos, quando existentes, podem conter condições específicas que prevalecem sobre estes Termos
                naquilo que for conflitante.
              </p>
            </section>

            {/* 7. Links externos */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">7. Links e serviços de terceiros</h2>
              <p>
                O site pode conter links para páginas, ferramentas ou serviços de terceiros, como provedores de IA,
                plataformas de automação, hospedagem, entre outros.
              </p>
              <p>
                Esses serviços possuem termos e políticas próprias, pelos quais MTM Automação não se responsabiliza. O
                acesso a sites de terceiros é realizado por decisão da própria pessoa usuária.
              </p>
            </section>

            {/* 8. Responsabilidade */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">8. Limitação de responsabilidade</h2>
              <p>Dentro dos limites permitidos pela legislação, MTM Automação não se responsabiliza por:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 marker:text-[#C8B8E6]">
                <li>indisponibilidades temporárias do site ou falhas de funcionamento;</li>
                <li>danos diretos ou indiretos resultantes do uso ou da impossibilidade de uso do site;</li>
                <li>decisões tomadas com base em conteúdos informativos publicados;</li>
                <li>
                  falhas, erros ou indisponibilidades de serviços prestados por terceiros (como provedores de
                  hospedagem, ferramentas de IA, plataformas de automação, entre outros);
                </li>
                <li>eventuais inconsistências em conteúdos que venham a ser atualizados ao longo do tempo.</li>
              </ul>
              <p>
                Os conteúdos disponibilizados têm caráter geral e educativo e não substituem orientação profissional
                específica.
              </p>
            </section>

            {/* 9. Privacidade */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">9. Privacidade e proteção de dados</h2>
              <p>
                O tratamento de dados pessoais decorrentes do uso deste site é regulado pela{" "}
                <a
                  href="https://marcustmelo.com/politica-de-privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8B8E6] hover:underline transition-colors"
                >
                  Política de Privacidade
                </a>{" "}
                de MTM Automação.
              </p>
              <p>
                Ao utilizar o site, você declara que leu, compreendeu e concorda com a forma como seus dados podem ser
                tratados, conforme a Política de Privacidade.
              </p>
            </section>

            {/* 10. Alterações */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">10. Alterações destes Termos</h2>
              <p>
                Estes Termos de Uso podem ser atualizados periodicamente. A data indicada no início deste documento
                reflete a versão mais recente.
              </p>
              <p>Recomenda-se que você revise esta página de tempos em tempos para acompanhar eventuais alterações.</p>
            </section>

            {/* 11. Legislação e foro */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-foreground">11. Legislação aplicável e foro</h2>
              <p>Estes Termos são regidos pelas leis brasileiras, incluindo, entre outras:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 marker:text-[#C8B8E6]">
                <li>Código Civil;</li>
                <li>Código de Defesa do Consumidor;</li>
                <li>Marco Civil da Internet;</li>
                <li>Lei Geral de Proteção de Dados Pessoais (LGPD).</li>
              </ul>
              <p>
                Fica eleito o foro de Águas Claras/DF para dirimir eventuais conflitos relacionados a estes Termos,
                salvo disposições legais em contrário.
              </p>
            </section>

            {/* 12. Contato e aceitação */}
            <section className="space-y-3 pt-4 border-t border-white/10">
              <h2 className="text-xl font-semibold text-foreground">12. Contato e aceitação</h2>
              <p>Para dúvidas, sugestões ou solicitações relacionadas a estes Termos de Uso:</p>
              <p>
                📧{" "}
                <a href="mailto:contato@marcustmelo.com" className="text-[#C8B8E6] hover:underline transition-colors">
                  contato@marcustmelo.com
                </a>
                <br />
                🌐{" "}
                <a
                  href="https://marcustmelo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8B8E6] hover:underline transition-colors"
                >
                  https://marcustmelo.com
                </a>
                <br />
                📍 Águas Claras – DF
              </p>
              <p>
                Ao continuar navegando neste site, você declara que leu, compreendeu e aceita integralmente estes Termos
                de Uso, comprometendo-se a utilizar o site de forma ética, responsável e em conformidade com a
                legislação vigente.
              </p>
            </section>

            <p className="pt-4 text-sm text-[#D6D6E0]/50 italic">
              Marcus T. Melo – Automação &amp; IA Humanizada
              <br />
              Tecnologia acessível, ética e humana para pequenos negócios.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
