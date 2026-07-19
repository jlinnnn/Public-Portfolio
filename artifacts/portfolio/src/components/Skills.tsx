import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    title: "Analysis & Reporting",
    skills: ["SQL", "Python (Pandas, NumPy)", "Excel", "Data Wrangling", "KPI Definition", "Data Validation", "Relational Databases"]
  },
  {
    title: "Visualization & BI",
    skills: ["Tableau", "Streamlit", "Plotly", "Matplotlib", "Seaborn", "Quarto", "Dashboard Design"]
  },
  {
    title: "Statistical Methods",
    skills: ["Statistical Inference", "Hypothesis Testing", "Regression", "A/B Testing", "Time Series Analysis", "Predictive Modeling"]
  },
  {
    title: "Advanced Analytics",
    skills: ["Machine Learning (Supervised & Unsupervised)", "Deep Learning", "Clustering", "Geospatial Analysis", "NLP"]
  },
  {
    title: "Programming",
    skills: ["Python", "R (tidyverse, ggplot2)", "SQL", "JavaScript", "HTML/CSS", "Git / GitHub"]
  },
  {
    title: "Other",
    skills: ["Google Data Analytics (Certified)", "Mandarin (Fluent)", "Spanish (Beginner)", "Big Data & Cloud Computing"]
  }
];

export default function Skills() {
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
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Capabilities</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
            Technical Toolkit
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
