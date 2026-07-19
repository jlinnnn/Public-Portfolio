import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: "DeepVAR: Portfolio Risk Forecasting",
    date: "Apr 2025",
    description: "Interactive Streamlit dashboard for forecasting 10-day portfolio Value at Risk using DeepAR and DeepVAR deep learning models. Built an end-to-end pipeline from raw return data to probabilistic risk visualizations across 600k+ records.",
    tags: ["Python", "Streamlit", "GluonTS", "DeepAR", "Pandas", "NumPy", "Plotly"],
    image: "/img/deepvar-demo.gif",
    isGif: true,
    status: "Featured"
  },
  {
    id: 2,
    title: "Fatal Compassion: Global Incident Risk",
    date: "Apr 2025",
    description: "Analyzed 4,337 humanitarian incident reports across 75+ countries (1997–2025) to reveal systemic risk disparities and behavioral threat patterns for aid workers. Culminates in a machine learning prototype for real-time risk scoring.",
    tags: ["Python", "Scikit-learn", "Plotly", "Quarto", "Geospatial"],
    image: "/img/fatal-compassion.png",
    status: "Live",
    url: "https://jl3205-dataviz-scholarship-2025.github.io/jl3205-dataviz-scholarship-2025/"
  },
  {
    id: 3,
    title: "U.S. Airline Performance Analysis",
    date: "Dec 2025",
    description: "Analyzed 612,024 U.S. DOT flight records using SQL to extract and validate operational KPIs. Identified performance trends — delays, cancellations, peak travel periods — through advanced SQL queries and exploratory analysis.",
    tags: ["SQL", "Python", "Pandas", "Matplotlib", "Data Engineering"],
    image: "/img/airline-analysis.png",
    status: "Live",
    url: "https://no252-gu.github.io/DSAN_6300_MINI_PROJECT/analysis.html"
  },
  {
    id: 4,
    title: "NLP Bias Detection in News Headlines",
    date: "Dec 2024",
    description: "Analyzed 1,000+ NYT articles on Israel-Palestine coverage using sentiment, polarity, and bias classification. Key finding: 86% of headlines leaned pro-Israeli. Applied Naive Bayes, Random Forest, and K-means models to detect systematic narrative framing patterns in geopolitical reporting.",
    tags: ["Python", "NLP", "TextBlob", "Dbias", "Scikit-learn", "NYT API", "K-means"],
    image: "/img/nlp-bias.jpg",
    status: "Complete"
  },
  {
    id: 5,
    title: "DataPulse: Customer Segmentation",
    date: "Mar 2024",
    description: "Hackathon project segmenting 10,000+ retail customer records to identify behavior-driven loyalty groups. Built real-time dashboards translating analytical outputs into actionable product insights.",
    tags: ["Python", "Pandas", "Clustering", "Dashboard Design"],
    image: "/img/project-4.jpg",
    status: "Hackathon"
  }
];

const statusColor: Record<string, string> = {
  Featured: 'bg-primary',
  Live: 'bg-emerald-500',
  Complete: 'bg-emerald-500',
  Hackathon: 'bg-violet-500',
  WIP: 'bg-orange-500',
  'Coming Soon': 'bg-orange-500',
};

export default function Projects() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-sm tracking-widest text-primary uppercase">03 //</span>
              <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Selected Work</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
              Recent Projects
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground font-sans">
            A selection of work across data science, risk modeling, NLP, and analytics engineering.
          </p>
        </motion.div>

        {/* Featured project — full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="group flex flex-col mb-16"
        >
          <div className="relative w-full overflow-hidden bg-muted mb-6" style={{ maxHeight: '480px' }}>
            <div className="absolute inset-0 bg-background/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              style={{ maxHeight: '480px' }}
            />
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-background/90 backdrop-blur px-3 py-1.5 border border-border">
              <span className={`w-2 h-2 rounded-full ${statusColor[featured.status] ?? 'bg-primary'}`}></span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">{featured.status}</span>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{featured.date}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
                {featured.title}
              </h3>
              <p className="text-muted-foreground font-sans mb-4 max-w-2xl">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.map(tag => (
                  <span key={tag} className="font-mono text-xs text-foreground/70 border border-border px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Remaining projects — 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {rest.map((project, idx) => {
            const CardWrapper = ({ children }: { children: React.ReactNode }) =>
              (project as any).url ? (
                <a
                  href={(project as any).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer flex flex-col"
                >
                  {children}
                </a>
              ) : (
                <div className="group flex flex-col">{children}</div>
              );

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <CardWrapper>
                  <div className="relative aspect-video overflow-hidden bg-muted mb-6">
                    <div className="absolute inset-0 bg-background/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-background/90 backdrop-blur px-3 py-1.5 border border-border">
                      <span className={`w-2 h-2 rounded-full ${statusColor[project.status] ?? 'bg-primary'}`}></span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">{project.status}</span>
                    </div>
                    {(project as any).url && (
                      <div className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">{project.date}</span>
                      <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground font-sans text-sm mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="font-mono text-xs text-foreground/70 border border-border px-2 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
