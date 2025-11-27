import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0D] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#C8B8E6] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Termos de Uso
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-[#D6D6E0]/80">
          <p className="text-lg">
            Última atualização: Janeiro de 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e usar este site, você concorda em cumprir e estar 
              vinculado a estes Termos de Uso. Se você não concordar com 
              qualquer parte destes termos, não deve usar nosso site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              2. Uso do Site
            </h2>
            <p>
              Este site é destinado a fornecer informações sobre serviços de 
              automação e inteligência artificial. O conteúdo é fornecido 
              apenas para fins informativos e não constitui aconselhamento 
              profissional específico.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              3. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo deste site, incluindo textos, imagens, logos e 
              design, é de propriedade de Marcus T. Melo e está protegido por 
              leis de direitos autorais. É proibida a reprodução sem 
              autorização prévia.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              4. Limitação de Responsabilidade
            </h2>
            <p>
              Não nos responsabilizamos por danos diretos, indiretos ou 
              consequentes resultantes do uso ou da impossibilidade de uso 
              deste site ou de seus serviços.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              5. Alterações nos Termos
            </h2>
            <p>
              Reservamos o direito de modificar estes termos a qualquer momento. 
              As alterações entram em vigor imediatamente após a publicação no site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              6. Contato
            </h2>
            <p>
              Para dúvidas sobre estes Termos de Uso, entre em contato através 
              do email: contato@marcustmelo.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
