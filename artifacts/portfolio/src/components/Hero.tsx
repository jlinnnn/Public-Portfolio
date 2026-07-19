import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto z-10 flex flex-col items-start w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-primary"></span>
            <span className="font-mono text-sm tracking-widest text-primary uppercase">Portfolio</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight tracking-tight mb-4">
            Joshua Lin
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-sans text-muted-foreground mb-12 max-w-2xl">
            Data Analyst
          </h2>
          
          <div className="border-l border-border pl-6 max-w-3xl">
            <p className="text-lg md:text-xl font-mono text-foreground/80 leading-relaxed italic">
              "Mathematician by foundation, data scientist by training, software developer by passion."
            </p>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        data-testid="button-scroll-down"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll to explore</span>
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
