import Hero from "@/components/Hero";
import HowCanIHelp from "@/components/HowCanIHelp";
import WorkStyle from "@/components/WorkStyle";
import Services from "@/components/Services";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Blog from "@/components/Blog";
import FAQ, { faqItems } from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SchemaOrg } from "@/components/SchemaOrg";

const Index = () => {
  return (
    <main className="bg-background">
      <SchemaOrg type="website" />
      <SchemaOrg type="person" />
      <SchemaOrg 
        type="faq" 
        questions={faqItems.map(item => ({
          question: item.question,
          answer: item.answer
        }))}
      />
      <Navbar />
      <Hero />
      <HowCanIHelp />
      <WorkStyle />
      <Services />
      <About />
      <TechStack />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
