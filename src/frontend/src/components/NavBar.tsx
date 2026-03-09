import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Watches", href: "#watches" },
  { label: "Shoes", href: "#shoes" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 group cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="flex flex-col items-start">
            <span className="font-display text-xl font-bold tracking-[0.3em] text-foreground uppercase">
              STORE
            </span>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent my-0.5" />
            <span className="font-display text-xl font-bold tracking-[0.3em] text-gold uppercase">
              LAB
            </span>
          </div>
        </motion.div>

        {/* Desktop nav */}
        <motion.div
          className="hidden md:flex items-center gap-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid="nav.link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative font-body text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="hidden md:flex items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <button
            type="button"
            data-ocid="nav.button"
            onClick={() => handleNavClick("#featured")}
            className="font-body text-sm tracking-[0.2em] uppercase px-6 py-2.5 border border-primary text-gold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-gold-sm"
          >
            Explore
          </button>
        </motion.div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                data-ocid="nav.button"
                onClick={() => handleNavClick("#featured")}
                className="font-body text-sm tracking-[0.2em] uppercase px-6 py-2.5 border border-primary text-gold hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-fit"
              >
                Explore
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
