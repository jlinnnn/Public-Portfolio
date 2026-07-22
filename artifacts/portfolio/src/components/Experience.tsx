import { motion } from 'framer-motion';
import { useLang } from '../i18n';

// Structural (non-translated) data. Role + bullets come from i18n keyed by company.
const PROFESSIONAL = [
  { company: 'Louis Li CPA PLLC', location: 'Queens, NY · On-site', type: 'Part-time', period: 'Dec 2025 – Jul 2026' },
  { company: 'Astera Holdings', location: 'Remote, NY', type: 'Internship', period: 'Sep 2025 – Dec 2025' },
  { company: 'Accommodations Plus International', location: 'Melville, NY · On-site', type: 'Seasonal', period: 'May 2025 – Aug 2025' },
  { company: 'New York Life Insurance Company', location: 'New York · Hybrid', type: 'Contract', period: 'Jun 2022 – Oct 2022' },
  { company: 'Morgen Evan', location: 'Shanghai, China · Remote', type: 'Internship', period: 'Nov 2021 – Apr 2022' },
  { company: 'GIFP', location: 'New York · Hybrid', type: 'Internship', period: 'Jul 2020 – Nov 2020' },
  { company: 'Third EYE Edge, Inc', location: 'New York', type: 'Internship', period: 'Oct 2019 – Mar 2020' },
];

const ADDITIONAL = [
  { company: 'Teachers Federal Credit Union', location: 'Smithtown, NY · On-site', type: 'Part-time', period: 'Sep 2023 – Mar 2024' },
  { company: "Lowe's Companies, Inc.", location: 'Smithtown, NY · On-site', type: 'Part-time', period: 'Jun 2020 – Aug 2020' },
];

const COMMUNITY = ["Martha's Table Volunteer", 'R Gov Volunteer', 'NYC Half-Marathon Volunteer', "St Catherine's Nursing Home"];

type Job = (typeof PROFESSIONAL)[number];

function JobRow({ job, idx }: { job: Job; idx: number }) {
  const { t } = useLang();
  const info = t.experience.roles[job.company] ?? { role: '', bullets: [] };
  const typeLabel = t.experience.types[job.type] ?? job.type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
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
          <h4 className="text-base font-sans font-semibold text-foreground/90">{info.role}</h4>
          {typeLabel && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
              {typeLabel}
            </span>
          )}
        </div>
        {info.bullets.length > 0 && (
          <ul className="space-y-3">
            {info.bullets.map((bullet, bIdx) => (
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
  const { t } = useLang();
  const GROUPS = [
    { label: t.experience.groups.professional, jobs: PROFESSIONAL },
    { label: t.experience.groups.additional, jobs: ADDITIONAL },
  ];

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
            <h3 className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{t.experience.badge}</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
            {t.experience.heading}
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
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">{t.experience.communityLabel}</h4>
          <div className="flex flex-wrap gap-4">
            {COMMUNITY.map((item) => (
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
