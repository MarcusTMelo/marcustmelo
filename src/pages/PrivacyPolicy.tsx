import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <Navbar />
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#C8B8E6] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Política de Privacidade</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-[#D6D6E0]/80">
            <p className="text-lg">Última atualização: 29 de novembro de 2025</p>

            <p>
              A MTM Automação, operada por Marcus Túlio Melo, respeita sua privacidade e está comprometida em proteger
              seus dados pessoais. Esta Política explica como coletamos, usamos e protegemos suas informações ao
              utilizar nosso site e serviços.
            </p>

            <p>Esta política segue as diretrizes da Lei Geral de Proteção de Dados (LGPD – Lei 13.709/2018).</p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Quem somos</h2>
              <p>
                <strong>Controladora de dados</strong>
                <br />
                Marcus T. Melo – Automação & IA Humanizada (MTM Automação)
                <br />
                Águas Claras – DF, Brasil
                <br />
                📧{" "}
                <a href="mailto:contato@marcustmelo.com" className="text-[#C8B8E6] hover:underline">
                  contato@marcustmelo.com
                </a>
                <br />
                🌐{" "}
                <a
                  href="https://marcustmelo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#C8B8E6] hover:underline"
                >
                  https://marcustmelo.com
                </a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Informações que coletamos</h2>

              <h3 className="text-lg font-semibold text-foreground">2.1. Dados fornecidos por você</h3>
              <p>Coletados quando você usa o formulário de contato, interage com serviços ou solicita informações:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Nome</li>
                <li>E-mail</li>
                <li>Telefone</li>
                <li>Nome da empresa (quando aplicável)</li>
                <li>Mensagem/solicitação</li>
                <li>Área de interesse</li>
              </ul>
              <p>
                <strong>Base legal:</strong> Consentimento (Art. 7º, I) e execução de contrato/prestação de serviços
                (Art. 7º, V).
              </p>

              <h3 className="text-lg font-semibold text-foreground">2.2. Dados coletados automaticamente</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Páginas visitadas e tempo de navegação</li>
                <li>Endereço IP</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Sistema operacional</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
              <p>
                <strong>Base legal:</strong> Legítimo interesse (Art. 7º, IX), para garantir experiência, desempenho e
                segurança.
              </p>

              <h3 className="text-lg font-semibold text-foreground">2.3. Dados obtidos via terceiros</h3>
              <p>Serviços utilizados que podem coletar dados técnicos adicionais:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Google reCAPTCHA v3 – prevenção de spam</li>
                <li>Google Analytics (se implementado) – estatísticas de tráfego</li>
                <li>Supabase – armazenamento da base de dados</li>
                <li>Hostinger – hospedagem</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Como usamos seus dados</h2>

              <h3 className="text-lg font-semibold text-foreground">3.1. Finalidades principais</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Responder suas mensagens</li>
                <li>Enviar orçamentos e propostas de serviço</li>
                <li>Comunicar sobre seu projeto (quando você é cliente)</li>
                <li>Enviar newsletter (apenas com consentimento explícito)</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground">3.2. Finalidades secundárias</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Melhorar desempenho e experiência do site</li>
                <li>Prevenir fraudes, acessos indevidos e abusos</li>
                <li>Cumprir obrigações legais, quando necessário</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground">3.3. Marketing</h3>
              <p>
                Enviamos comunicações sobre novos conteúdos e serviços somente com seu consentimento, que pode ser
                revogado a qualquer momento.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Compartilhamento de dados</h2>

              <h3 className="text-lg font-semibold text-foreground">4.1. Nunca vendemos dados pessoais</h3>
              <p>
                Seu dado nunca será comercializado. Nosso negócio é prestação de serviços, não venda de informações.
              </p>

              <h3 className="text-lg font-semibold text-foreground">4.2. Compartilhamento estritamente necessário</h3>
              <p>Compartilhamos dados apenas com prestadores que atuam no funcionamento do site e serviços:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Supabase (EUA/Europa)</li>
                <li>Google (EUA)</li>
                <li>Hostinger (Lituânia/Brasil)</li>
                <li>Zaia.app (Brasil), quando aplicável</li>
              </ul>
              <p>Todos seguem contratos e padrões de uso limitado dos dados.</p>

              <h3 className="text-lg font-semibold text-foreground">4.3. Transferência internacional</h3>
              <p>
                Quando seus dados forem armazenados fora do Brasil, adotamos mecanismos previstos pela LGPD e buscamos
                parceiros que sigam padrões adequados de proteção.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Cookies</h2>

              <h3 className="text-lg font-semibold text-foreground">5.1. O que são</h3>
              <p>Pequenos arquivos usados para melhorar navegação e segurança.</p>

              <h3 className="text-lg font-semibold text-foreground">5.2. Tipos usados</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Essenciais: funcionamento básico do site</li>
                <li>Desempenho: métricas e proteção (ex.: reCAPTCHA, Analytics)</li>
                <li>Preferências: lembram configurações</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground">5.3. Como gerenciar</h3>
              <p>Você pode desativar cookies no navegador. Isso pode limitar algumas funcionalidades.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Seus direitos (LGPD)</h2>
              <p>Você pode solicitar:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Confirmação de tratamento</li>
                <li>Acesso aos dados</li>
                <li>Correção de dados incompletos ou incorretos</li>
                <li>Anonimização, bloqueio ou exclusão</li>
                <li>Informação sobre compartilhamento</li>
                <li>Portabilidade</li>
                <li>Revogação de consentimento</li>
                <li>Oposição ao tratamento quando aplicável</li>
              </ul>
              <p>
                <strong>Como exercer:</strong>
                <br />
                Envie e-mail para{" "}
                <a href="mailto:contato@marcustmelo.com" className="text-[#C8B8E6] hover:underline">
                  contato@marcustmelo.com
                </a>{" "}
                com o assunto:
                <br />
                <em>“Solicitação LGPD – [direito desejado]”</em>
                <br />
                Prazo de resposta: até 15 dias.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Segurança dos dados</h2>

              <h3 className="text-lg font-semibold text-foreground">7.1. Medidas adotadas</h3>
              <p>Utilizamos práticas de segurança como:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Criptografia (HTTPS)</li>
                <li>Controle de acesso</li>
                <li>Autenticação segura</li>
                <li>Backups regulares</li>
                <li>Isolamento de ambientes</li>
                <li>Monitoramento básico para prevenção de abusos</li>
              </ul>
              <p>Sem mencionar ferramentas específicas, para evitar fragilidade jurídica no futuro.</p>

              <h3 className="text-lg font-semibold text-foreground">7.2. Retenção</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Dados de contato: até solicitação de exclusão ou 5 anos de inatividade</li>
                <li>Dados de projetos: durante execução + 5 anos (obrigações legais)</li>
                <li>Logs técnicos: 6 meses</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground">7.3. Incidentes de segurança</h3>
              <p>Se ocorrer incidente relevante, você será informada(o) em até 72 horas, conforme LGPD.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Dados de menores</h2>
              <p>
                Este site e serviços se destinam a pessoas maiores de 18 anos. Não coletamos intencionalmente dados de
                menores. Se identificarmos coleta indevida, os dados serão excluídos imediatamente.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Uso de Inteligência Artificial</h2>
              <p>
                Alguns conteúdos ou interações podem utilizar tecnologias de IA fornecidas por terceiros (ex.: OpenAI,
                Anthropic, Google).
              </p>
              <p>
                Embora revisemos os resultados quando necessário, conteúdos gerados por IA podem conter imprecisões,
                vieses ou desatualizações.
              </p>
              <p>Ao utilizar recursos apoiados por IA, você reconhece que:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Informações geradas não substituem aconselhamento técnico, jurídico ou profissional individualizado
                </li>
                <li>Decisões tomadas com base nessas informações são de sua responsabilidade</li>
                <li>O uso de IA segue também os termos dessas plataformas terceiras</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">10. Alterações nesta política</h2>
              <p>Podemos atualizar esta Política periodicamente. Quando isso ocorrer:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>A data de “Última atualização” será modificada</li>
                <li>Alterações relevantes poderão ser informadas por e-mail (se cadastrado)</li>
              </ul>
              <p>Recomendamos revisão periódica desta página.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">11. Legislação e foro</h2>
              <p>Esta Política é regida pelas leis brasileiras, incluindo:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>LGPD – Lei 13.709/2018</li>
                <li>Marco Civil da Internet – Lei 12.965/2014</li>
                <li>Código de Defesa do Consumidor – Lei 8.078/1990</li>
              </ul>
              <p>Foro: Águas Claras/DF.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">12. Contato</h2>
              <p>
                📧{" "}
                <a href="mailto:contato@marcustmelo.com" className="text-[#C8B8E6] hover:underline">
                  contato@marcustmelo.com
                </a>
                <br />
                🌐{" "}
                <a
                  href="https://marcustmelo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#C8B8E6] hover:underline"
                >
                  https://marcustmelo.com
                </a>
                <br />
                📍 Águas Claras – DF
                <br />
                DPO (Encarregado de Dados): Marcus Túlio Melo
              </p>
            </section>

            <p className="pt-4 text-sm text-[#D6D6E0]/70">
              Marcus T. Melo – Automação & IA Humanizada
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

export default PrivacyPolicy;
