import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--neon-orchid)) 0%, hsl(var(--neon-coral)) 50%, hsl(var(--neon-lime)) 100%)',
          }}
        />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-up leading-tight">
          Automação e IA com alma,{" "}
          <span className="bg-gradient-to-r from-neon-orchid via-neon-coral to-neon-lime bg-clip-text text-transparent">
            cor e inteligência
          </span>
          .
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto opacity-0 animate-fade-up animation-delay-200 leading-relaxed font-body font-light">
          Transformo processos, negócios e rotinas através de sistemas inteligentes, 
          design vivo e tecnologia humanizada — com foco em pessoas LGBTQIA+ e pequenos 
          negócios que querem autonomia digital.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fade-up animation-delay-400">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow-lime text-base md:text-lg px-8 py-6 rounded-full font-medium"
          >
            Quero simplificar minha vida e meu negócio
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg"
            className="text-foreground hover:text-primary border-2 border-transparent hover:border-primary/50 text-base md:text-lg px-8 py-6 rounded-full font-medium transition-all duration-300"
          >
            Falar com o Marcus
          </Button>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
