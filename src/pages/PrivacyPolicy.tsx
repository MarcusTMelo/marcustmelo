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

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Política de Privacidade
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-[#D6D6E0]/80">
            <p className="text-lg">
              Última atualização: Janeiro de 2025
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                1. Informações que coletamos
              </h2>
              <p>
                Coletamos informações que você nos fornece diretamente, como nome, 
                email e mensagens enviadas através do formulário de contato. Essas 
                informações são utilizadas exclusivamente para responder às suas 
                solicitações e melhorar nossos serviços.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                2. Como usamos suas informações
              </h2>
              <p>
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Responder às suas perguntas e solicitações</li>
                <li>Enviar informações sobre nossos serviços, quando solicitado</li>
                <li>Melhorar a experiência do usuário em nosso site</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                3. Compartilhamento de informações
              </h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais 
                com terceiros, exceto quando necessário para prestar nossos serviços 
                ou quando exigido por lei.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                4. Segurança
              </h2>
              <p>
                Implementamos medidas de segurança adequadas para proteger suas 
                informações contra acesso não autorizado, alteração, divulgação 
                ou destruição.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                5. Contato
              </h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em 
                contato através do email: contato@marcustmelo.com
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
