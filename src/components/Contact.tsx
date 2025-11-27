import { useState } from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\+\(\)\-]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length >= 8;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Telefone inválido (mínimo 8 dígitos)";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim() || undefined,
          message: formData.message.trim(),
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        toast.error("Erro ao enviar", {
          description: data.error,
          duration: 6000,
        });
        return;
      }

      toast.success("Mensagem enviada com sucesso! 💜", {
        description: "Vou te responder assim que possível.",
        duration: 6000,
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Não consegui enviar agora", {
        description: "Tente novamente ou me chame no WhatsApp.",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`mt-2 ${errors.name ? 'border-destructive' : ''}`}
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`mt-2 ${errors.email ? 'border-destructive' : ''}`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">
                  Telefone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`mt-2 ${errors.phone ? 'border-destructive' : ''}`}
                  placeholder="(DDD) número"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject" className="text-foreground">
                  Assunto
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
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
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className={`mt-2 min-h-[150px] ${errors.message ? 'border-destructive' : ''}`}
                  placeholder="Conte-me sobre seu projeto ou necessidade..."
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message}</p>
                )}
                <p className="text-muted-foreground/70 text-xs mt-2">
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
                <p className="text-muted-foreground/70 text-sm">
                  Você não precisa saber explicar tudo — eu te guio 🙂
                </p>
                <p className="text-muted-foreground/70 text-xs">
                  Primeiro contato sem compromisso.
                </p>
              </div>

              {/* Quick contact buttons */}
              <div className="pt-4 border-t border-border/30">
                <p className="text-muted-foreground/70 text-xs text-center mb-4">
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
