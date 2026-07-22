import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLang } from '../i18n';

export default function Hero() {
  const { t } = useLang();
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-28 pb-24">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary"></span>
              <span className="font-mono text-sm tracking-widest text-primary uppercase">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight tracking-tight mb-4">
              Joshua Lin
            </h1>

            <h2 className="text-2xl md:text-3xl font-sans text-muted-foreground mb-10 max-w-2xl">
              {t.hero.title}
            </h2>

            <div className="border-s border-border ps-6 max-w-xl">
              <p className="text-lg md:text-xl font-mono text-foreground/80 leading-relaxed italic">
                {t.hero.quote}
              </p>
            </div>
          </motion.div>

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 relative mx-auto w-full max-w-[280px] lg:max-w-none"
          >
            <div className="aspect-[4/5] relative group">
              <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
              <img
                src="/img/headshot.jpg"
                alt="Joshua Lin"
                className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-110 filter group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary"></div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        data-testid="button-scroll-down"
      >
        <span className="font-mono text-xs uppercase tracking-widest">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
