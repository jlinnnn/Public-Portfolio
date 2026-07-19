import { motion } from 'framer-motion';

const EXPERIENCE = [
  {
    company: "Louis Li CPA PLLC",
    location: "Queens, NY",
    role: "Accounting & Audit Support Assistant",
    period: "Dec 2025 – Jul 2026",
    bullets: [
      "Collected, validated, and organized client financial documents to ensure data completeness and accuracy for tax preparation and audit review.",
      "Assisted with bookkeeping and audit support by categorizing transactions in QuickBooks, performing reconciliation checks, and flagging discrepancies for CPA review.",
    ],
  },
  {
    company: "Astera Holdings",
    location: "Remote, NY",
    role: "Software Engineer Intern",
    period: "Sep 2025 – Dec 2025",
    bullets: [
      "Diagnosed and resolved production UI issues by simplifying conditional render logic, improving application stability and user experience.",
      "Collaborated with product stakeholders to implement and ship a stable, full-screen chat interface, reinforcing end-to-end system reliability.",
    ],
  },
  {
    company: "API Global Solutions",
    location: "Melville, NY",
    role: "Accounts Receivable Specialist",
    period: "Jun 2025 – Aug 2025",
    bullets: [
      "Maintained and reconciled structured financial records using Excel to support revenue tracking and discrepancy resolution.",
      "Coordinated with corporate travel vendors to validate hotel folios and ensure accurate documentation across internal systems.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm tracking-widest text-primary uppercase">05 //</span>
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Work History</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
            Experience
          </h2>
        </motion.div>

        <div className="space-y-0">
          {EXPERIENCE.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              className="group border-t border-border py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
            >
              {/* Left — company + meta */}
              <div className="md:col-span-4 flex flex-col gap-1">
                <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                  {job.company}
                </h3>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{job.location}</p>
                <span className="font-mono text-xs text-primary/80 mt-2 uppercase tracking-widest">{job.period}</span>
              </div>

              {/* Right — role + bullets */}
              <div className="md:col-span-8">
                <h4 className="text-base font-sans font-semibold text-foreground/90 mb-4">{job.role}</h4>
                <ul className="space-y-3">
                  {job.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-foreground/70 font-sans leading-relaxed">
                      <span className="text-primary mt-1 shrink-0">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>

        {/* Community */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-10 border-t border-border"
        >
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Community</h4>
          <div className="flex flex-wrap gap-4">
            {["Martha's Table Volunteer", "R Gov Volunteer", "NYC Half-Marathon Volunteer"].map((item) => (
              <span key={item} className="font-mono text-sm text-foreground/70 border border-border px-4 py-2">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
