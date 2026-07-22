import { motion } from 'framer-motion';
import { useLang } from '../i18n';

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-secondary/30 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] relative group">
              <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
              <img 
                src="/img/portrait.jpg" 
                alt="Abstract Portrait" 
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 filter group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary"></div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-sm tracking-widest text-primary uppercase">01 //</span>
                <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{t.about.badge}</h3>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold mb-8">
                {t.about.heading}
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="pt-8 border-t border-border flex gap-8 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              <div className="flex flex-col gap-2">
                <span className="text-primary">{t.about.locationLabel}</span>
                <span className="text-foreground">{t.about.locationValue}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary">{t.about.statusLabel}</span>
                <span className="text-foreground">{t.about.statusValue}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
