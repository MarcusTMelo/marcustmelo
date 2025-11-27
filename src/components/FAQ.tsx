import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export const faqItems = [
  {
    question: "Eu preciso entender de tecnologia para usar essas soluções?",
    answer: "Não! Eu configuro tudo pra você. E deixo tudo funcionando do jeito mais simples possível — como apertar um botão. Se você sabe usar WhatsApp, já está pronto para usar IA e automações."
  },
  {
    question: "Isso funciona para pequenos negócios mesmo?",
    answer: "Funciona principalmente para pequenos negócios. Meu foco é ajudar padarias, salões, clínicas, petshops, lojas e serviços locais a ganharem tempo e atender melhor sem gastar muito."
  },
  {
    question: "Quanto custa implementar uma automação ou assistente virtual?",
    answer: "Depende do que você precisa. Mas sempre trabalho com soluções acessíveis, usando IA e ferramentas que cabem no bolso. Depois da primeira conversa, te digo exatamente quanto vai custar — sem surpresas."
  },
  {
    question: "Eu posso mudar ou atualizar as automações depois?",
    answer: "Pode! Posso ajustar os fluxos sempre que seu negócio mudar. E se quiser aprender, posso te ensinar a mexer também."
  },
  {
    question: "Minha empresa é pequena, vale a pena ter uma assistente de IA?",
    answer: "MUITO. Ela responde clientes, tira dúvidas, organiza pedidos e libera você para fazer o que importa: atender bem e vender mais."
  },
  {
    question: "Isso substitui pessoas?",
    answer: "Não. A IA só cuida do básico — perguntas repetidas, horários, informações, agendamentos. As conversas importantes continuam sendo suas."
  },
  {
    question: "Você atende só em Águas Claras?",
    answer: "Atendo Águas Claras, mas posso ajudar qualquer pessoa no Brasil. Tudo acontece online, de forma simples."
  },
  {
    question: "Como funciona o processo para começar?",
    answer: "É assim:\n\n• Você me conta o que precisa\n• Eu analiso seu negócio\n• Te entrego uma proposta clara\n• Configuro tudo e te ensino a usar\n• Fica tudo funcionando no automático"
  },
  {
    question: "Em quanto tempo fica pronto?",
    answer: "Depende da complexidade, mas muitas automações ficam prontas em 1 a 3 dias."
  },
  {
    question: "E se eu tiver problemas depois?",
    answer: "É só me chamar. Dou suporte e ajusto o que for preciso — sem te deixar na mão."
  }
];

const FAQ = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section id="faq" className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#6EC8FF] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div ref={elementRef} className="max-w-3xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Perguntas Frequentes
          </h2>
          <p className={`text-muted-foreground text-base md:text-lg max-w-xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Tire suas dúvidas sobre tecnologia simples, IA e automação — explicado de um jeito fácil.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          className={`rounded-2xl bg-card/50 border-2 border-border/50 hover:border-[#4A8CFF]/30 p-6 md:p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(74,140,255,0.15)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ transitionDelay: '300ms' }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`border-0 ${index > 0 ? 'border-t border-border/20' : ''} py-1`}
              >
                <AccordionTrigger className="text-left text-foreground hover:text-[#C7A7FF] transition-all duration-300 ease-in-out py-5 text-base md:text-lg font-medium [&[data-state=open]>svg]:rotate-180">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#D6D6E0]/80 leading-relaxed pb-5 pt-1 whitespace-pre-line">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-[#FF7ACB] to-transparent opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
