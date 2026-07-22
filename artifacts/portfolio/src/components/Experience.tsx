import { motion } from 'framer-motion';

const PROFESSIONAL = [
  {
    company: "Louis Li CPA PLLC",
    location: "Queens, NY · On-site",
    role: "Accounting Assistant",
    type: "Part-time",
    period: "Dec 2025 – Jul 2026",
    bullets: [
      "Collected, validated, and organized client financial documents to ensure data completeness and accuracy for tax preparation and audit review.",
    ],
  },
  {
    company: "Astera Holdings",
    location: "Remote, NY",
    role: "Software Engineer Intern",
    type: "Internship",
    period: "Sep 2025 – Dec 2025",
    bullets: [
      "Diagnosed and resolved production UI issues by simplifying conditional render logic, improving application stability and user experience.",
      "Collaborated with product stakeholders to implement and ship a stable, full-screen chat interface, reinforcing end-to-end system reliability.",
    ],
  },
  {
    company: "Accommodations Plus International",
    location: "Melville, NY · On-site",
    role: "Accounts Receivable Specialist",
    type: "Seasonal",
    period: "May 2025 – Aug 2025",
    bullets: [
      "Maintained and reconciled structured financial records using Excel to support revenue tracking and discrepancy resolution.",
    ],
  },
  {
    company: "New York Life Insurance Company",
    location: "New York · Hybrid",
    role: "Insurance Agent",
    type: "Contract",
    period: "Jun 2022 – Oct 2022",
    bullets: [],
  },
  {
    company: "Morgen Evan",
    location: "Shanghai, China · Remote",
    role: "Fall Analyst",
    type: "Internship",
    period: "Nov 2021 – Apr 2022",
    bullets: [
      "Managed and cleaned client relationship data using Excel and Salesforce, supporting CRM migration and improving data accuracy and reporting workflows.",
      "Analyzed and summarized global economic and financial data to develop weekly newsletter insights on IPO and M&A trends.",
    ],
  },
  {
    company: "GIFP",
    location: "New York · Hybrid",
    role: "Summer Intern",
    type: "Internship",
    period: "Jul 2020 – Nov 2020",
    bullets: [
      "Analyzed market, competitor, and demographic data to support marketing strategy decisions for a tutoring center evaluating expansion into the U.S. education market.",
      "Performed comparative analysis of U.S.-based tutoring providers, incorporating historical trends and projected market conditions to inform positioning and go-to-market strategy.",
    ],
  },
  {
    company: "Third EYE Edge, Inc",
    location: "New York",
    role: "Marketing Intern",
    type: "Internship",
    period: "Oct 2019 – Mar 2020",
    bullets: [
      "Analyzed social media engagement metrics (likes, shares, comments) across Twitter, Facebook, and Instagram to support weekly data-informed marketing strategy discussions.",
      "Conducted research on independent artists using platform analytics and industry benchmarks to customize marketing strategies based on artist skills, audience behavior, and platform performance.",
    ],
  },
];

const ADDITIONAL = [
  {
    company: "Teachers Federal Credit Union",
    location: "Smithtown, NY · On-site",
    role: "Bank Teller",
    type: "Part-time",
    period: "Sep 2023 – Mar 2024",
    bullets: [],
  },
  {
    company: "Lowe's Companies, Inc.",
    location: "Smithtown, NY · On-site",
    role: "Head Cashier",
    type: "Part-time",
    period: "Jun 2020 – Aug 2020",
    bullets: [],
  },
];

const GROUPS = [
  { label: "Professional Experience", jobs: PROFESSIONAL },
  { label: "Additional Experience", jobs: ADDITIONAL },
];

type Job = (typeof PROFESSIONAL)[number];

function JobRow({ job, idx }: { job: Job; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: idx * 0.08, duration: 0.5 }}
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
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h4 className="text-base font-sans font-semibold text-foreground/90">{job.role}</h4>
          {job.type && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
              {job.type}
            </span>
          )}
        </div>
        {job.bullets.length > 0 && (
          <ul className="space-y-3">
            {job.bullets.map((bullet, bIdx) => (
              <li key={bIdx} className="flex items-start gap-3 text-sm text-foreground/70 font-sans leading-relaxed">
                <span className="text-primary mt-1 shrink-0">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

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
            <span className="font-mono text-sm tracking-widest text-primary uppercase">04 //</span>
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Work History</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
            Experience
          </h2>
        </motion.div>

        <div className="space-y-16">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-mono text-xs uppercase tracking-widest text-primary mb-2"
              >
                {group.label}
              </motion.h3>
              <div className="space-y-0">
                {group.jobs.map((job, idx) => (
                  <JobRow key={job.company + job.period} job={job} idx={idx} />
                ))}
                <div className="border-t border-border" />
              </div>
            </div>
          ))}
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
