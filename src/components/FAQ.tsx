import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      category: "SERVIÇOS",
      questions: [
        {
          question: "Você trabalha com Microsoft 365 e Power Platform?",
          answer: "Sim! Sou especialista em Microsoft Lists, Power Automate e SharePoint. Já liderei projetos como Conecta TI, Conecta Ativos e Conecta Estações na GIZ Brasil, criando soluções completas que organizam operações complexas e eliminam trabalho manual."
        },
        {
          question: "Como funciona a implementação de IA no meu negócio?",
          answer: "Começo entendendo seus processos e identificando onde IA pode gerar valor real. Uso Claude API, OpenAI e outras ferramentas para criar assistentes inteligentes, automatizar decisões e gerar insights práticos. Tudo com foco em resultados mensuráveis, não apenas tecnologia pela tecnologia."
        },
        {
          question: "Você atende pequenos negócios e empreendedores LGBT+?",
          answer: "Com certeza! Tenho um foco especial em trabalhar com a comunidade LGBTQIA+ e pequenos negócios que buscam autonomia digital. Acredito que tecnologia deve ser acessível e construída COM pessoas, não PARA pessoas. Ofereço soluções adaptadas à sua realidade e orçamento."
        }
      ]
    },
    {
      category: "PROCESSOS",
      questions: [
        {
          question: "Como é o processo de trabalho?",
          answer: "Trabalho em etapas claras: 1) Análise do seu negócio e processos atuais, 2) Desenho da solução e prototipagem, 3) Implementação e testes, 4) Treinamento da equipe, 5) Acompanhamento pós-implantação. Tudo com comunicação transparente e feedbacks constantes."
        },
        {
          question: "Quanto tempo leva para automatizar um processo?",
          answer: "Depende da complexidade! Automações simples com Power Automate podem levar de 1 a 2 semanas. Projetos mais complexos com múltiplos sistemas integrados podem levar de 1 a 3 meses. Sempre dou um prazo realista após a análise inicial."
        },
        {
          question: "Você entrega documentação e treinamento?",
          answer: "Sempre! Todos os projetos incluem documentação completa dos processos, fluxos criados e treinamento personalizado para sua equipe. Acredito que a verdadeira transformação digital só acontece quando as pessoas sabem usar as ferramentas com autonomia."
        }
      ]
    },
    {
      category: "INVESTIMENTO",
      questions: [
        {
          question: "Qual o investimento médio para uma automação?",
          answer: "Projetos simples de automação começam a partir de R$ 3.000. Implementações mais complexas envolvendo IA, múltiplos sistemas e infraestrutura podem variar de R$ 10.000 a R$ 50.000. Cada projeto é único, então faço sempre um orçamento personalizado após entender suas necessidades."
        },
        {
          question: "Tem opções para pequenos negócios?",
          answer: "Sim! Ofereço pacotes adaptados para pequenos negócios e empreendedores individuais. Podemos começar com automações menores e ir escalando conforme os resultados aparecem. Também trabalho com consultoria por hora para demandas pontuais."
        },
        {
          question: "Aceita projetos sob demanda ou recorrente?",
          answer: "Aceito ambos! Posso trabalhar em projetos pontuais com escopo fechado ou em regime de retainer mensal para suporte contínuo, melhorias incrementais e novas automações. A escolha depende da sua necessidade e modelo de negócio."
        }
      ]
    },
    {
      category: "EXPERIÊNCIA",
      questions: [
        {
          question: "Quais projetos você já liderou?",
          answer: "Na GIZ Brasil, liderei projetos como Conecta TI (gestão de equipamentos), Conecta Ativos (controle patrimonial) e Conecta Estações (gestão de estações de trabalho). Todos usando Microsoft Lists, Power Automate e SharePoint para criar sistemas robustos que organizam operações complexas."
        },
        {
          question: "Você trabalha sozinho ou tem equipe?",
          answer: "Trabalho de forma independente, mas tenho uma rede de parceiros para projetos maiores que exigem especialidades complementares (design, desenvolvimento web, infraestrutura avançada). Isso me permite oferecer flexibilidade e custos otimizados."
        },
        {
          question: "Tem cases de sucesso para mostrar?",
          answer: "Sim! Posso compartilhar estudos de caso dos projetos Conecta (GIZ Brasil), além de outras implementações de automação e IA que realizei. Durante nossa conversa inicial, apresento exemplos relevantes para o seu segmento e necessidade específica."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="relative bg-background py-20 px-6 md:py-32 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#C7A7FF] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#6EC8FF] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-[#C7A7FF] via-[#6EC8FF] to-[#4A8CFF] bg-clip-text text-transparent">
          Perguntas Frequentes
        </h2>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="rounded-2xl bg-card/50 border-2 border-border/50 hover:border-[#4A8CFF]/30 p-6 md:p-8 transition-all duration-300"
            >
              {/* Category Label */}
              <div className="mb-6">
                <h3 className="text-sm font-bold tracking-wider" style={{ color: "#FF7ACB" }}>
                  {category.category}
                </h3>
              </div>

              {/* Accordion */}
              <Accordion type="single" collapsible className="w-full space-y-4">
                {category.questions.map((item, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`item-${categoryIndex}-${questionIndex}`}
                    className="border-b border-border/30 last:border-0"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-[#C7A7FF] transition-colors duration-200 py-4 text-base md:text-lg font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#D6D6E0] leading-relaxed pb-4 pt-2">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
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
