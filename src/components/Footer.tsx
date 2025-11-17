import { Instagram, Linkedin, MessageCircle } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left - About */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">Marcus Túlio Melo</h3>
            <p className="text-lg text-[#C8B8E6]">Automação & IA Humanizada</p>
            <p className="text-sm text-muted-foreground">
              10+ anos em automação • MBA em IA • Gay e orgulhoso 🏳️‍🌈
            </p>
          </div>

          {/* Center - Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-colors text-left"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-colors text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-colors text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-colors text-left"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-muted-foreground hover:text-[#C8B8E6] transition-colors text-left"
              >
                Contato
              </button>
            </nav>
          </div>

          {/* Right - Social Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground mb-4">Conecte-se</h4>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/marcustmelo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-[#C8B8E6] hover:to-[#5DADE2] hover:bg-clip-text transition-all group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/marcustmelo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-[#C8B8E6] hover:to-[#5DADE2] hover:bg-clip-text transition-all group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://wa.me/5561999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-[#C8B8E6] hover:to-[#5DADE2] hover:bg-clip-text transition-all group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Marcus T. Melo • Feito com 💜, tecnologia e orgulho
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
