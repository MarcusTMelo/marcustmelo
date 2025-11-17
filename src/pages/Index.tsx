import Hero from "@/components/Hero";
import HowCanIHelp from "@/components/HowCanIHelp";
import Services from "@/components/Services";
import About from "@/components/About";
import TechStack from "@/components/TechStack";

const Index = () => {
  return (
    <main className="bg-background">
      <Hero />
      <HowCanIHelp />
      <Services />
      <About />
      <TechStack />
    </main>
  );
};

export default Index;
