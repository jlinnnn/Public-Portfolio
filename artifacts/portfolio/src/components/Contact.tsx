import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useLang } from '../i18n';

const RESUME_URL = `${import.meta.env.BASE_URL}Joshua-Lin-Resume.pdf`.replace(/\/\//g, '/');

export default function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="py-32 px-6 md:px-12 border-t border-border bg-secondary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col md:flex-row gap-16 md:gap-8 items-center justify-between">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm tracking-widest text-primary uppercase">07 //</span>
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{t.contact.badge}</h3>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground font-bold leading-tight mb-8">
            {t.contact.heading1} <br/><span className="text-primary italic">{t.contact.heading2}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-sans max-w-md">
            {t.contact.para}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 w-full md:w-auto min-w-[300px]"
        >
          <a 
            href="mailto:jl3205@georgetown.edu" 
            className="group flex items-center justify-between p-6 border border-border bg-background hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">{t.contact.emailLabel}</span>
                <span className="font-sans font-medium text-foreground">jl3205@georgetown.edu</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>

          <a 
            href="https://www.linkedin.com/in/jlinnnn/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 border border-border bg-background hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">{t.contact.linkedinLabel}</span>
                <span className="font-sans font-medium text-foreground">/in/jlinnnn</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>

          <a 
            href="https://github.com/jlinnnn" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 border border-border bg-background hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">{t.contact.githubLabel}</span>
                <span className="font-sans font-medium text-foreground">@jlinnnn</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>

          <a
            href={RESUME_URL}
            download
            className="group flex items-center justify-between p-6 border border-primary/40 bg-primary/5 hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <Download className="w-5 h-5 text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">{t.contact.resumeLabel}</span>
                <span className="font-sans font-medium text-foreground">{t.contact.resumeValue}</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
        </motion.div>

      </div>
      
      {/* Footer */}
      <div className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 container mx-auto max-w-5xl text-center md:text-left">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} Joshua Lin. {t.contact.rights}
        </span>
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          {t.contact.tagline}
          <span className="w-1.5 h-1.5 bg-primary block rounded-full"></span>
        </span>
      </div>
    </section>
  );
}
