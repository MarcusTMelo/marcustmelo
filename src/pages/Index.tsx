import Hero from "@/components/Hero";
import HowCanIHelp from "@/components/HowCanIHelp";
import Services from "@/components/Services";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="bg-background">
      <Hero />
      <HowCanIHelp />
      <Services />
      <About />
      <TechStack />
      <Blog />
      <FAQ />
      <Contact />
    </main>
  );
};

export default Index;
