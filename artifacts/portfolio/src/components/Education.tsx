import { motion } from 'framer-motion';

const TIMELINE = [
  {
    school: "Georgetown University",
    location: "Washington, DC",
    degree: "M.S. in Data Science and Analytics",
    period: "Aug 2024 – Dec 2025",
    highlights: [
      "GPA: 3.933 | Returning Student Scholarship Recipient",
      "Teaching Assistant — DSAN Summer Bootcamp & Probabilistic Modeling",
      "DSAN Graduate Peer Mentor",
    ],
    coursework: "Neural Networks & Deep Learning, Applied Time Series, Big Data & Cloud Computing, Data Visualization, Statistical Computing"
  },
  {
    school: "New York University",
    location: "New York, NY",
    degree: "B.S. in Mathematics",
    minor: "Minor in Computer Science",
    period: "Aug 2019 – May 2023",
    highlights: [],
    coursework: "Probability, Combinatorics, Discrete Mathematics, Real Analysis, Data Structures"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 md:px-12 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="font-mono text-sm tracking-widest text-primary uppercase">05 //</span>
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Timeline</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
            Academic Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] md:left-1/2 md:-ml-px top-0 bottom-0 w-px bg-border"></div>

          <div className="space-y-20">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Node */}
                <div className="absolute left-[20px] md:left-1/2 md:-ml-[4px] top-1.5 w-2 h-2 rounded-full bg-primary z-10 shadow-[0_0_10px_rgba(255,51,51,0.5)]"></div>

                <div className="pl-16 md:pl-0 md:w-1/2 flex flex-col justify-start">
                  <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-start' : 'md:items-end text-left md:text-right'}`}>
                    <span className="font-mono text-xs text-primary mb-2 uppercase tracking-widest">
                      {item.period}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-1">
                      {item.school}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground/70 mb-2 uppercase tracking-widest">{item.location}</p>
                    <h4 className="text-lg font-sans text-muted-foreground mb-1">
                      {item.degree}
                    </h4>
                    {item.minor && (
                      <span className="inline-block px-2 py-1 bg-secondary text-xs font-mono mt-2 border border-border">
                        {item.minor}
                      </span>
                    )}
                    {item.highlights.length > 0 && (
                      <ul className={`mt-4 space-y-1 ${idx % 2 === 0 ? '' : 'md:items-end'}`}>
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="text-sm text-foreground/70 flex items-start gap-2">
                            <span className="text-primary mt-1 shrink-0">—</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="text-xs text-foreground/50 font-mono mt-4 leading-relaxed">
                      <span className="text-primary/70 uppercase tracking-widest text-[10px]">Coursework: </span>
                      {item.coursework}
                    </p>
                  </div>
                </div>

                {/* Empty space for the other half */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
