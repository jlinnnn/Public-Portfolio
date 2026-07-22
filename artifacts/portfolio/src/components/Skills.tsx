import { motion } from 'framer-motion';
import { useLang } from '../i18n';

export default function Skills() {
  const { t } = useLang();
  const SKILL_CATEGORIES = t.skills.categories;
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-32 px-6 md:px-12 border-b border-border">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm tracking-widest text-primary uppercase">02 //</span>
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{t.skills.badge}</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
            {t.skills.heading}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col">
              <h4 className="font-mono text-sm text-primary uppercase tracking-widest border-b border-border pb-4 mb-6">
                {category.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="font-sans text-lg text-foreground/90 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
