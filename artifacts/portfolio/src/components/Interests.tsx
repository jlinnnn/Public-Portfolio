import { motion } from 'framer-motion';
import { Shirt, Gamepad2, Dumbbell, ChefHat, Target } from 'lucide-react';

const INTERESTS = [
  {
    title: "Streetwear Design",
    icon: <Shirt className="w-6 h-6" />,
    desc: "Exploring the intersection of geometry, algorithms, and fabric."
  },
  {
    title: "Indie Games",
    icon: <Gamepad2 className="w-6 h-6" />,
    desc: "Crafting small, intentional experiences with mechanics that feel good."
  },
  {
    title: "Chess",
    icon: <Target className="w-6 h-6" />,
    desc: "Practicing calculated aggression and tactical foresight."
  },
  {
    title: "The Gym",
    icon: <Dumbbell className="w-6 h-6" />,
    desc: "Physical discipline as a counterbalance to cognitive labor."
  },
  {
    title: "Cooking",
    icon: <ChefHat className="w-6 h-6" />,
    desc: "Finding the exact ratios that make flavors work."
  }
];

export default function Interests() {
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
            <span className="font-mono text-sm tracking-widest text-primary uppercase">05 //</span>
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Beyond the resume</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold max-w-2xl">
            Because humans are more than their GitHub graphs.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERESTS.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors group flex flex-col gap-6"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-background border border-border text-primary group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
