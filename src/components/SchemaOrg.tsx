import { Helmet } from "react-helmet";

interface WebsiteSchemaProps {
  type: "website";
}

interface PersonSchemaProps {
  type: "person";
}

interface BlogPostSchemaProps {
  type: "blogPost";
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  slug: string;
}

interface FAQSchemaProps {
  type: "faq";
  questions: Array<{ question: string; answer: string }>;
}

type SchemaOrgProps = 
  | WebsiteSchemaProps 
  | PersonSchemaProps 
  | BlogPostSchemaProps 
  | FAQSchemaProps;

export const SchemaOrg = (props: SchemaOrgProps) => {
  const baseUrl = "https://marcustmelo.com";

  const getSchema = () => {
    switch (props.type) {
      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Marcus T. Melo",
          description: "Automação e Inteligência Artificial para pequenos negócios. Soluções simples e acessíveis para salões, clínicas, padarias, lojas e mais.",
          url: baseUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/blog?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        };

      case "person":
        return {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Marcus T. Melo",
          description: "Consultoria em Automação e Inteligência Artificial para pequenos negócios",
          url: baseUrl,
          image: `${baseUrl}/og-image.png`,
          telephone: "+55 11 99999-9999",
          email: "contato@marcustmelo.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "São Paulo",
            addressRegion: "SP",
            addressCountry: "BR"
          },
          priceRange: "$$",
          areaServed: {
            "@type": "Country",
            name: "Brasil"
          },
          serviceType: [
            "Automação de Processos",
            "Inteligência Artificial",
            "Chatbots",
            "Atendimento Automatizado"
          ],
          sameAs: [
            "https://www.linkedin.com/in/marcustmelo",
            "https://github.com/marcustmelo"
          ]
        };

      case "blogPost":
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: props.title,
          description: props.description,
          image: props.image || `${baseUrl}/og-image.png`,
          datePublished: props.datePublished,
          dateModified: props.dateModified || props.datePublished,
          author: {
            "@type": "Person",
            name: props.authorName,
            url: baseUrl
          },
          publisher: {
            "@type": "Organization",
            name: "Marcus T. Melo",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/og-image.png`
            }
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${baseUrl}/blog/${props.slug}`
          }
        };

      case "faq":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: props.questions.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        };

      default:
        return null;
    }
  };

  const schema = getSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
