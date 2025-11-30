import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/MarcusTMelo.svg";

interface NavItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { label: "Início", href: "hero" },
  { label: "Como posso ajudar", href: "how-can-i-help" },
  { label: "Serviços", href: "services" },
  { label: "Sobre mim", href: "about" },
  { label: "Blog", href: "/blog", isRoute: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll to section after navigation
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && location.pathname === "/") {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 80; // navbar height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const handleNavClick = (item: NavItem) => {
    setIsOpen(false);

    if (item.isRoute) {
      navigate(item.href);
      return;
    }

    // If we're not on home page, navigate to home with hash
    if (location.pathname !== "/") {
      navigate(`/#${item.href}`);
      return;
    }

    // Scroll to section on home page
    const element = document.getElementById(item.href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleCTAClick = () => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/#contact");
      return;
    }

    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const isActiveLink = (item: NavItem) => {
    if (item.isRoute) {
      return location.pathname === item.href;
    }
    return location.pathname === "/" && location.hash === `#${item.href}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#C7A7FF]/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center hover:opacity-90 transition-all duration-300"
            aria-label="Marcus T. Melo - Automação & IA"
          >
            <img
              src={logo}
              alt="Marcus T. Melo"
              className="h-9 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  isActiveLink(item)
                    ? "text-[#C7A7FF] bg-[#C7A7FF]/10"
                    : "text-[#D6D6E0] hover:text-[#C7A7FF] hover:bg-[#C7A7FF]/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={handleCTAClick}
              className="ml-4 bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] hover:shadow-[0_0_20px_rgba(199,167,255,0.4)] text-[#0B0B0D] font-semibold transition-all duration-300"
            >
              Vamos conversar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#D6D6E0] hover:text-[#C7A7FF] transition-colors"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 py-4 border-t border-[#C7A7FF]/10 bg-[#0B0B0D]/95 backdrop-blur-md rounded-lg">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-3 text-left text-base font-medium rounded-lg transition-all duration-300 ${
                  isActiveLink(item)
                    ? "text-[#C7A7FF] bg-[#C7A7FF]/10 border-l-2 border-[#C7A7FF]"
                    : "text-[#D6D6E0] hover:text-[#C7A7FF] hover:bg-[#C7A7FF]/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={handleCTAClick}
              className="mt-2 bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] hover:shadow-[0_0_20px_rgba(199,167,255,0.4)] text-[#0B0B0D] font-semibold transition-all duration-300"
            >
              Vamos conversar
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
