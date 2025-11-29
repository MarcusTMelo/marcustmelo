import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0D0B12] border-t border-[#5DADE2]/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-8 mb-8">
          {/* Left - About */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">Marcus Túlio Melo</h3>
            <p className="text-lg text-[#C8B8E6]">Automação & IA</p>
            <p className="text-sm text-[#D6D6E0]/80">
              Automação e IA com foco em pequenos negócios — simples, humana e eficiente.
            </p>
          </div>

          {/* Center - Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-all duration-300 text-left hover:translate-x-2"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-all duration-300 text-left hover:translate-x-2"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-all duration-300 text-left hover:translate-x-2"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-all duration-300 text-left hover:translate-x-2"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-all duration-300 text-left hover:translate-x-2"
              >
                Perguntas Frequentes
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-all duration-300 text-left hover:translate-x-2"
              >
                Contato
              </button>
            </nav>
            {/* Legal Links */}
            <div className="flex flex-col space-y-2 pt-4 border-t border-border/30 mt-4">
              <Link
                to="/politica-de-privacidade"
                className="text-sm text-muted-foreground hover:text-[#C8B8E6] transition-all duration-300"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/termos-de-uso"
                className="text-sm text-muted-foreground hover:text-[#C8B8E6] transition-all duration-300"
              >
                Termos de Uso
              </Link>
            </div>
          </div>

          {/* Right - Social Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground mb-4">Conecte-se</h4>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/marcustmelo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-[#C8B8E6] hover:to-[#5DADE2] hover:bg-clip-text transition-all duration-300 hover:translate-x-2 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 group-hover:text-[#C8B8E6] group-hover:drop-shadow-[0_0_8px_rgba(200,184,230,0.6)] transition-all duration-300" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/marcustmelo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-[#C8B8E6] hover:to-[#5DADE2] hover:bg-clip-text transition-all duration-300 hover:translate-x-2 group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 group-hover:text-[#C8B8E6] group-hover:drop-shadow-[0_0_8px_rgba(200,184,230,0.6)] transition-all duration-300" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://wa.me/5561999027520"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-[#C8B8E6] hover:to-[#5DADE2] hover:bg-clip-text transition-all duration-300 hover:translate-x-2 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 group-hover:text-[#C8B8E6] group-hover:drop-shadow-[0_0_8px_rgba(200,184,230,0.6)] transition-all duration-300" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Micro CTA + Copyright */}
        <div className="pt-8 border-t border-border/50 text-center space-y-3">
          <p className="text-xs text-[#D6D6E0]/60">Tem uma ideia? Vamos transformar em realidade.</p>
          <p className="text-sm text-muted-foreground">
            © 2025 Marcus T. Melo • Construído com atenção, IA e design vivo.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
