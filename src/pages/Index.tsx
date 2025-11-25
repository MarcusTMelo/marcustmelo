import Hero from "@/components/Hero";
import HowCanIHelp from "@/components/HowCanIHelp";
import WorkStyle from "@/components/WorkStyle";
import Services from "@/components/Services";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background">
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
