import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n';

const PROJECTS = [
  {
    id: 1,
    title: "DeepVaR: Portfolio Risk Forecasting",
    date: "Apr 2025",
    description: "Interactive Streamlit app that estimates a stock portfolio's 10-day Value at Risk using DeepAR, a deep-learning probabilistic forecaster (GluonTS). Pulls ~95 NASDAQ-100 tickers, runs Monte Carlo return scenarios, and reports 95% / 99% VaR, PnL, rolling volatility, and asset correlations — each with plain-language explanations.",
    tags: ["Python", "Streamlit", "GluonTS", "DeepAR", "Pandas", "Plotly"],
    image: "/img/deepvar-demo.gif",
    status: "Featured",
    url: "https://github.com/jlinnnn/deepvar-portfolio-risk"
  },
  {
    id: 2,
    title: "Fatal Compassion: Global Incident Risk",
    date: "Apr 2025",
    description: "Transformed 4,337 humanitarian incident reports (1997–2025, 75+ countries) into a tactical intelligence brief on attacks against aid workers — surfacing systemic risk disparities and behavioral threat patterns, and culminating in a machine-learning prototype for real-time risk scoring.",
    tags: ["Python", "Scikit-learn", "Plotly", "Quarto", "Geospatial"],
    image: "/img/cover-fatal-compassion.svg",
    status: "Live",
    url: "https://jl3205-dataviz-scholarship-2025.github.io/fatal-compassion/"
  },
  {
    id: 3,
    title: "Flight Delays: U.S. Airline Performance",
    date: "Dec 2025",
    description: "A Quarto data story on U.S. airline on-time performance built from April 2019 U.S. DOT records. Queried the data in MySQL on AWS and analyzed it in R (tidyverse / ggplot2) to expose delay extremes, airport bottlenecks, and weather-driven cancellations — including a 43-hour maximum delay and 14,488 cancelled flights.",
    tags: ["R", "tidyverse", "ggplot2", "MySQL", "AWS", "Quarto"],
    image: "/img/cover-flight-delays.svg",
    status: "Live",
    url: "https://jlinnnn.github.io/flight-delays-analysis/"
  },
  {
    id: 4,
    title: "NLP Bias Detection in News Headlines",
    date: "Dec 2024",
    description: "Studied New York Times coverage of the Israel–Palestine conflict using sentiment, polarity, and automated bias detection on headlines pulled from the NYT API. Machine-learning classifiers labeled ~86% of coverage pro-Israeli, and K-means clustering surfaced the linguistic features driving each label.",
    tags: ["Python", "NLP", "Dbias", "TextBlob", "Scikit-learn", "Quarto"],
    image: "/img/cover-nlp-bias.svg",
    status: "Live",
    url: "https://jlinnnn.github.io/nyt-bias-analysis/"
  },
  {
    id: 5,
    title: "DataPulse: Retail Analytics Platform",
    date: "2024",
    description: "Retail analytics platform built at the CEWIT 2024 hackathon on the ~10k-order Superstore dataset. I built the React frontend — a multi-page dashboard that renders the ML backend's RFM segmentation, Prophet sales forecasts, and product-recommendation network graphs as interactive Plotly charts, plus a conversational AI assistant.",
    tags: ["React", "Plotly", "Flask", "Scikit-learn", "Prophet"],
    image: "/img/cover-datapulse.svg",
    status: "Hackathon",
    url: "https://github.com/jlinnnn/DataPulse"
  },
  {
    id: 6,
    title: "BetterYou: AI Health & Fitness Planner",
    date: "2024",
    description: "Personalized health app built at VTHax 2024. I owned two backend systems: an AI plan-generation pipeline (LLaMA 3.1 via Ollama) that turns a user profile into a structured weekly diet and workout plan under a strict JSON contract, and a reward engine that scores meals and workouts against clinical macronutrient ranges to gamify healthy habits.",
    tags: ["Python", "Flask", "LLaMA 3.1", "Ollama", "MongoDB"],
    image: "/img/cover-betteryou.svg",
    status: "Hackathon",
    url: "https://jlinnnn.github.io/BetterYou-Backend-VTHax24/"
  },
  {
    id: 7,
    title: "Polymarket CLI",
    date: "2025",
    description: "A fast, read-only terminal interface for Polymarket prediction markets — browse markets, inspect events, and run quantitative trade signals (momentum, SMA, mean-reversion, and cross-market ensembles) against live price history. Renders rich tables and automatically switches to JSON when piped.",
    tags: ["Python", "Typer", "Rich", "Pandas", "REST API"],
    image: "/img/cover-polymarket.svg",
    status: "Open Source",
    url: "https://github.com/jlinnnn/polymarket-cli"
  },
  {
    id: 8,
    title: "Target Switch Bot",
    date: "2024",
    description: "A Selenium automation that searches Target.com for a specific Nintendo Switch listing, adds it to the cart, and dismisses the protection-plan modal — using a stale-element-safe click helper and a bundled offline storefront for a full end-to-end demo. A browser-automation learning project; it stops at the cart.",
    tags: ["Python", "Selenium", "Automation"],
    image: "/img/cover-nintendo.svg",
    status: "Personal",
    url: "https://github.com/jlinnnn/nintendo-bot"
  },
  {
    id: 9,
    title: "Deep Q-Learning: Lunar Lander",
    date: "2024",
    description: "Trained a reinforcement-learning agent to land a spacecraft using a Deep Q-Network with experience replay and a target network. Solved OpenAI Gym's LunarLander-v2 in 534 episodes (~13 minutes), reaching the 200+ average-reward threshold Gym defines as “solved.”",
    tags: ["Python", "TensorFlow", "Keras", "OpenAI Gym", "RL"],
    image: "/img/cover-lunar-lander.svg",
    status: "Live",
    url: "https://jlinnnn.github.io/rl-lunar-lander/"
  }
];

const statusColor: Record<string, string> = {
  Featured: 'bg-primary',
  Live: 'bg-emerald-500',
  Complete: 'bg-emerald-500',
  Hackathon: 'bg-violet-500',
  'Open Source': 'bg-sky-500',
  Personal: 'bg-zinc-400',
  WIP: 'bg-orange-500',
  'Coming Soon': 'bg-orange-500',
};

export default function Projects() {
  const { t } = useLang();
  const [featured, ...rest] = PROJECTS;
  const tp = t.projects;

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
              <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{tp.badge}</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
              {tp.heading}
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground font-sans">
            {tp.intro}
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
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-video w-full overflow-hidden bg-muted mb-6 block"
          >
            <div className="absolute inset-0 bg-background/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
            <img
              src={featured.image}
              alt={tp.items[featured.id].title}
              className={`w-full h-full ${featured.image.endsWith('.gif') ? 'object-contain' : 'object-cover'} group-hover:scale-[1.02] transition-transform duration-700 ease-out`}
            />
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-background/90 backdrop-blur px-3 py-1.5 border border-border">
              <span className={`w-2 h-2 rounded-full ${statusColor[featured.status] ?? 'bg-primary'}`}></span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">{tp.statuses[featured.status] ?? featured.status}</span>
            </div>
            <div className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
          </a>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{featured.date}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
                {tp.items[featured.id].title}
              </h3>
              <p className="text-muted-foreground font-sans mb-4 max-w-2xl">
                {tp.items[featured.id].description}
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
                      alt={tp.items[project.id].title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-background/90 backdrop-blur px-3 py-1.5 border border-border">
                      <span className={`w-2 h-2 rounded-full ${statusColor[project.status] ?? 'bg-primary'}`}></span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">{tp.statuses[project.status] ?? project.status}</span>
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
                        {tp.items[project.id].title}
                      </h3>
                      <p className="text-muted-foreground font-sans text-sm mb-4">
                        {tp.items[project.id].description}
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
