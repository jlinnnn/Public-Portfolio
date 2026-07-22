import { motion } from 'framer-motion';
import { Shirt, Gamepad2, Dumbbell, ChefHat, Target, Newspaper, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n';

// Structural (non-translated) data — matches the order of t.interests.items.
// Article titles stay untranslated — they're the real titles of English-language pieces.
const ARTICLES = [
  { title: 'Can A.I. Keep a Parent Alive?', author: 'Gaia Alari', url: 'https://www.newyorker.com/news/as-told-to/can-ai-keep-a-parent-alive' },
  { title: '“Gatekeeping”', author: 'Bryan Washington', url: 'https://www.newyorker.com/magazine/2026/07/20/gatekeeping-fiction-bryan-washington' },
  { title: 'The Voice of Google', author: 'Claire Stapleton', url: 'https://www.newyorker.com/culture/the-weekend-essay/the-voice-of-google' },
  { title: 'Sometimes It’s O.K. to Let a Language Die', author: 'Nikhil Krishnan', url: 'https://www.newyorker.com/magazine/2026/07/27/how-to-kill-a-language-sophia-smith-galer-book-review' },
];

const META: { icon: React.ReactNode; url?: string }[] = [
  { icon: <Shirt className="w-6 h-6" /> },
  { icon: <Gamepad2 className="w-6 h-6" /> },
  { icon: <Target className="w-6 h-6" />, url: 'https://www.chess.com/member/jlinnnn' },
  { icon: <Dumbbell className="w-6 h-6" /> },
  { icon: <ChefHat className="w-6 h-6" /> },
  { icon: <Newspaper className="w-6 h-6" /> },
];

export default function Interests() {
  const { t } = useLang();

  return (
    <section id="interests" className="py-32 px-6 md:px-12 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm tracking-widest text-primary uppercase">06 //</span>
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{t.interests.badge}</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold max-w-2xl">
            {t.interests.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.interests.items.map((item, idx) => {
            const meta = META[idx] ?? {};
            const cardClass = 'relative p-8 border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors group flex flex-col gap-6';
            const inner = (
              <>
                {meta.url && (
                  <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-muted-foreground opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                )}
                <div className="w-12 h-12 flex items-center justify-center bg-background border border-border text-primary group-hover:scale-110 transition-transform">
                  {meta.icon}
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </>
            );

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {meta.url ? (
                  <a href={meta.url} target="_blank" rel="noopener noreferrer" className={`${cardClass} cursor-pointer`}>
                    {inner}
                  </a>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Recent reads — The New Yorker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 pt-10 border-t border-border"
        >
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            {t.interests.readingLabel}
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {ARTICLES.map((a) => (
              <li key={a.url}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 py-4 border-b border-border hover:border-primary transition-colors"
                >
                  <span className="flex flex-col">
                    <span className="font-sans text-foreground group-hover:text-primary transition-colors">
                      {a.title}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground mt-1">{a.author}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
