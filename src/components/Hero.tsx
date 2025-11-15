import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4 md:px-6">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-20">
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
      <div className="relative z-10 container mx-auto max-w-7xl">
        <Card className="w-full min-h-[600px] bg-black/[0.96] relative overflow-hidden border-border/20">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            size={300}
          />
          
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 opacity-0 animate-fade-up">
                Experiência interativa
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 opacity-0 animate-fade-up animation-delay-200 leading-tight">
                Automação e IA com{" "}
                <span className="bg-gradient-to-r from-neon-orchid via-neon-coral to-neon-lime bg-clip-text text-transparent">
                  alma, cor e inteligência
                </span>
                .
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed font-body font-light opacity-0 animate-fade-up animation-delay-300">
                Transformo processos, negócios e rotinas através de sistemas inteligentes, 
                design vivo e tecnologia humanizada — com foco em pessoas LGBTQIA+ e pequenos 
                negócios que querem autonomia digital.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-up animation-delay-400">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow-lime text-sm md:text-base px-6 py-5 rounded-full font-medium"
                >
                  Quero simplificar minha vida e meu negócio
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="text-foreground hover:text-primary border-2 border-transparent hover:border-primary/50 text-sm md:text-base px-6 py-5 rounded-full font-medium transition-all duration-300"
                >
                  Falar com o Marcus
                </Button>
              </div>
            </div>

            {/* Right content - Spline Scene */}
            <div className="flex-1 relative min-h-[400px] lg:min-h-[600px]">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
