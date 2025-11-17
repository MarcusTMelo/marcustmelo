import { Mail, MessageCircle, MapPin, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Contact = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-24 px-4 bg-[#0B0B0D]">
      <div ref={elementRef} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-foreground mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Vamos Conversar
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Tem um projeto em mente? Vamos transformar sua ideia em realidade.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Left side - Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <a 
                  href="mailto:contato@marcustmelo.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  contato@marcustmelo.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                <a 
                  href="https://wa.me/5561999999999" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (61) 99999-9999
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Localização</h3>
                <p className="text-muted-foreground">Águas Claras, Distrito Federal</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#FF7ACB]/10 text-[#FF7ACB]">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Atendimento Especializado
                </h3>
                <p className="text-muted-foreground">
                  Ambiente acolhedor para a comunidade LGBTQIA+
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Primeira Consulta
                </h3>
                <p className="text-muted-foreground">
                  30 minutos gratuitos para entender seu projeto
                </p>
              </div>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C7A7FF]/30 bg-[#0D0B12] text-sm text-[#D6D6E0]">
                <span>🏳️‍🌈</span>
                <span>LGBT+ Friendly</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C7A7FF]/30 bg-[#0D0B12] text-sm text-[#D6D6E0]">
                <span>⚡</span>
                <span>Resposta em 24h</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C7A7FF]/30 bg-[#0D0B12] text-sm text-[#D6D6E0]">
                <span>✅</span>
                <span>Primeira consulta gratuita</span>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="border border-border/50 rounded-lg p-8 bg-background/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">
                  Nome *
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  className="mt-2"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="mt-2"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-foreground">
                  Assunto
                </Label>
                <Input
                  id="subject"
                  type="text"
                  className="mt-2"
                  placeholder="Sobre o que você quer conversar?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground">
                  Mensagem *
                </Label>
                <Textarea
                  id="message"
                  required
                  className="mt-2 min-h-[150px]"
                  placeholder="Conte-me sobre seu projeto ou necessidade..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#C8B8E6] to-[#5DADE2] hover:opacity-90 text-[#0D0B12] font-semibold"
              >
                Enviar mensagem
              </Button>

              <div className="flex justify-center pt-2">
                <Badge 
                  variant="outline" 
                  className="text-primary border-primary/30 bg-primary/5"
                >
                  ⚡ Resposta em até 24 horas
                </Badge>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
