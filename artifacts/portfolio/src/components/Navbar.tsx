import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Download, Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useLang, LANGS } from '../i18n';

const NAV_ITEMS = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'education', href: '#education' },
  { key: 'interests', href: '#interests' },
  { key: 'contact', href: '#contact' },
] as const;

const RESUME_URL = `${import.meta.env.BASE_URL}Joshua-Lin-Resume.pdf`.replace(/\/\//g, '/');

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" aria-hidden />;

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Change language"
        onClick={() => setOpen((o) => !o)}
        className="h-9 px-2.5 flex items-center gap-1.5 border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="font-mono text-xs uppercase tracking-widest">{current.label}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 mt-2 min-w-[160px] bg-background border border-border shadow-lg z-50 py-1"
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-sm font-sans hover:bg-secondary transition-colors ${l.code === lang ? 'text-primary' : 'text-foreground'}`}
                >
                  <span>{l.name}</span>
                  {l.code === lang && <Check className="w-4 h-4" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-border py-4'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-serif font-bold tracking-tight text-foreground hover:text-primary transition-colors"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            JL.
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {NAV_ITEMS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {t.nav[link.key]}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3 ps-6 border-s border-border">
              <a
                href={RESUME_URL}
                download
                className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                <Download className="w-4 h-4" />
                {t.nav.resume}
              </a>
              <LangSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <LangSwitcher />
            <ThemeToggle />
            <button
              className="text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((link, i) => (
              <motion.a
                key={link.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-3xl font-serif text-foreground hover:text-primary transition-colors"
              >
                {t.nav[link.key]}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.08 }}
              href={RESUME_URL}
              download
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center gap-3 text-lg font-mono uppercase tracking-widest text-primary"
            >
              <Download className="w-5 h-5" />
              {t.nav.resume}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
