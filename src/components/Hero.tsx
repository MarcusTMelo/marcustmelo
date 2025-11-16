import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0B0B0D' }}>
      {/* Atmospheric glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'hsl(var(--primary))', filter: 'blur(120px)' }} />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: 'hsl(var(--secondary))', filter: 'blur(100px)' }} />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full opacity-12" style={{ background: 'hsl(var(--accent))', filter: 'blur(110px)' }} />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--neon-orchid)) 0%, hsl(var(--neon-coral)) 50%, hsl(var(--neon-lime)) 100%)',
          }}
        />
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-quartz-pink opacity-60 animate-float-1" />
      <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-neon-orchid opacity-50 animate-float-2" />
      <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-neon-coral opacity-55 animate-float-3" />
      
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-quartz-pink via-neon-orchid to-neon-coral opacity-40" />
        <div className="absolute top-1/2 right-0 w-40 h-px bg-gradient-to-l from-quartz-pink via-neon-orchid to-neon-coral opacity-40" />
        
        <div className="flex flex-col lg:flex-row min-h-screen lg:items-center">
          {/* Left content */}
          <div className="w-full lg:flex-1 px-4 md:px-8 lg:px-12 py-12 lg:py-0 flex flex-col justify-center">
            <div className="max-w-2xl">
              {/* Greeting tag */}
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-neon-orchid to-neon-coral opacity-0 animate-fade-up">
                <p className="text-xs md:text-sm font-medium" style={{ color: '#D6D6E0' }}>
                  Olá, eu sou Marcus
                </p>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 opacity-0 animate-fade-up animation-delay-200 leading-tight" style={{ color: '#D6D6E0' }}>
                Automação e IA com{" "}
                <span style={{ color: '#FF7AC0' }}>alma</span>
                {", "}
                <span style={{ color: 'hsl(var(--neon-orchid))' }}>cor</span>
                {" e "}
                <span style={{ color: 'hsl(var(--neon-coral))' }}>inteligência</span>
                .
              </h1>
              <p className="mt-4 text-base md:text-lg leading-relaxed font-body font-light opacity-0 animate-fade-up animation-delay-300" style={{ color: '#D6D6E0' }}>
                Transformo processos, negócios e rotinas através de sistemas inteligentes, 
                design vivo e tecnologia humanizada — com foco em pessoas LGBTQIA+ e pequenos 
                negócios que querem autonomia digital.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-up animation-delay-400">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow-lavender text-sm md:text-base px-6 py-5 rounded-full font-medium"
                >
                  Vamos conversar
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="border-2 border-transparent hover:border-primary/50 text-sm md:text-base px-6 py-5 rounded-full font-medium transition-all duration-300"
                  style={{ color: '#D6D6E0' }}
                >
                  Conheça meu trabalho
                </Button>
              </div>
            </div>
          </div>

          {/* Right content - Spline Scene */}
          <div className="w-full lg:w-[55%] relative min-h-[400px] lg:min-h-screen flex items-center justify-center">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold font-heading tracking-wider opacity-5" style={{ color: '#D6D6E0' }}>
                MARCUS T. MELO
              </h2>
            </div>
            
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
