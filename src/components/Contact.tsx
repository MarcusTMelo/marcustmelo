import { useState } from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { toast } from "sonner";

const Contact = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Mensagem recebida! 💜", {
      description: "Entrarei em contato assim que possível.",
      duration: 6000,
    });
    
    // Clear form
    e.currentTarget.reset();
    setIsSubmitting(false);
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

            <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                <a 
                  href="https://wa.me/5561999027520" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (61) 99902-7520
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Localização</h3>
                <p className="text-muted-foreground">Águas Claras, Distrito Federal</p>
              </div>
            </div>

            {/* Micro-text */}
            <p className="text-sm text-muted-foreground mt-4">
              Use o canal que preferir — estou por aqui.
            </p>
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
                  name="name"
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
                  name="email"
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
                  name="subject"
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
                  name="message"
                  required
                  className="mt-2 min-h-[150px]"
                  placeholder="Conte-me sobre seu projeto ou necessidade..."
                />
                <p className="text-[#D6D6E0]/70 text-xs mt-2">
                  Pode escrever do seu jeito. Vou entender o que você precisa.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#C8B8E6] to-[#5DADE2] hover:opacity-90 text-[#0D0B12] font-semibold"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>

              {/* Micro-texts */}
              <div className="space-y-2 text-center">
                <p className="text-[#D6D6E0]/70 text-sm">
                  Você não precisa saber explicar tudo — eu te guio 🙂
                </p>
                <p className="text-[#D6D6E0]/70 text-xs">
                  Primeiro contato sem compromisso.
                </p>
              </div>

              {/* Quick contact buttons */}
              <div className="pt-4 border-t border-border/30">
                <p className="text-[#D6D6E0]/70 text-xs text-center mb-4">
                  Ou se preferir, fale direto comigo:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-[#C8B8E6] to-[#5DADE2] hover:opacity-90 text-[#0D0B12] font-semibold"
                  >
                    <a 
                      href="https://wa.me/5561999027520" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Falar pelo WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 border-border/50 hover:bg-background/10"
                  >
                    <a href="mailto:contato@marcustmelo.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Email
                    </a>
                  </Button>
                </div>
              </div>

              {/* Response note */}
              <p className="text-muted-foreground text-sm text-center pt-2">
                Responderei assim que possível 🙂
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
