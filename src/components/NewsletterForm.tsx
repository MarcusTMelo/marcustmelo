import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface NewsletterFormProps {
  source: "footer" | "post";
}

const NewsletterForm = ({ source }: NewsletterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações frontend
    if (!email.trim()) {
      toast({
        title: "E-mail obrigatório",
        description: "Por favor, informe seu e-mail.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, informe um e-mail válido.",
        variant: "destructive",
      });
      return;
    }

    if (!consent) {
      toast({
        title: "Consentimento necessário",
        description: "Você precisa aceitar a Política de Privacidade para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (name.trim() && name.length > 100) {
      toast({
        title: "Nome muito longo",
        description: "O nome deve ter no máximo 100 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email: email.trim().toLowerCase(),
          name: name.trim() || null,
          consent: true,
          source: source,
        });

      if (error) {
        // Verifica se é erro de duplicação
        if (error.code === "23505") {
          toast({
            title: "E-mail já cadastrado",
            description: "Este e-mail já está inscrito na nossa newsletter.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setSuccess(true);
        setName("");
        setEmail("");
        setConsent(false);
        
        toast({
          title: "Inscrição realizada!",
          description: "Obrigado por acompanhar meu trabalho ✨",
        });

        // Resetar sucesso após 5 segundos
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Erro ao inscrever",
        description: "Algo deu errado ao enviar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#C7A7FF]/10 to-[#6EC8FF]/10 border border-[#C7A7FF]/30">
        <p className="text-center text-foreground font-medium">
          Inscrição realizada com sucesso! Obrigado por acompanhar meu trabalho ✨
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-[#1A1A1F]/80 border border-border/30">
      <h3 className="text-xl font-semibold mb-2 text-foreground">
        Receba novidades por e-mail
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        Inscreva-se para receber atualizações sobre IA, automação e dicas práticas para pequenos negócios.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor={`name-${source}`} className="text-sm text-muted-foreground">
            Nome (opcional)
          </Label>
          <Input
            id={`name-${source}`}
            type="text"
            placeholder="Seu nome (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="mt-1"
            maxLength={100}
          />
        </div>

        <div>
          <Label htmlFor={`email-${source}`} className="text-sm text-muted-foreground">
            E-mail <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`email-${source}`}
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="mt-1"
          />
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id={`consent-${source}`}
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked as boolean)}
            disabled={loading}
            className="mt-1"
            required
          />
          <Label
            htmlFor={`consent-${source}`}
            className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
          >
            Quero receber novidades por e-mail e aceito a{" "}
            <Link
              to="/politica-de-privacidade"
              className="text-[#C7A7FF] hover:text-[#6EC8FF] underline underline-offset-2 transition-colors"
            >
              Política de Privacidade
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] hover:opacity-90 text-background font-medium"
        >
          {loading ? "Inscrevendo..." : "Inscrever-se"}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Saiba como tratamos seus dados na nossa{" "}
        <Link
          to="/politica-de-privacidade"
          className="text-[#C7A7FF] hover:text-[#6EC8FF] underline underline-offset-2 transition-colors"
        >
          Política de Privacidade
        </Link>
        .
      </p>
    </div>
  );
};

export default NewsletterForm;