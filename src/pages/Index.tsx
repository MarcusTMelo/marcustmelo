import Hero from "@/components/Hero";
import HowCanIHelp from "@/components/HowCanIHelp";
import Services from "@/components/Services";
import About from "@/components/About";

const Index = () => {
  return (
    <main className="bg-background">
      <Hero />
      <HowCanIHelp />
      <Services />
      <About />
    </main>
  );
};

export default Index;
