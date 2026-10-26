import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, Cursor } from "@/components/portfolio";
import { motion } from "framer-motion";

export const Route = createFileRoute("/case-study")({
  component: CaseStudyIndex,
});

const CASE_STUDIES = [
  {
    n: "01",
    workType: "Concept", // "Client work" | "Concept" | "Personal project"
    badge: "AI-Driven",
    company: "VitaMind AI",
    title: "AI Cardiac Risk & Longevity Platform",
    subtitle: "A privacy-first, region-aware health intelligence platform turning raw vitals into predictive care.",
    desc: "I designed VitaMind AI as a single connected system across web and mobile. It replaces disconnected tracking apps and static lab reports with one continuously learning health record, with AI insights designed around trust, risk severity and clear next steps.",
    img: "/vitamind-featured.png",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    authorName: "Amit Tadvi",
    authorRole: "Lead Product Designer",
    approach: [
      { title: "Stakeholder & Clinical", desc: "Cross-functional sessions with advisors and compliance leads" },
      { title: "Regulatory Mapping", desc: "HIPAA and regional privacy audits for data architecture" },
      { title: "Information Architecture", desc: "Single health record bridging vitals, risk, and care plans" },
      { title: "UI System Design", desc: "Scalable, calm interface adapting to risk severity" }
    ],
    results: [
      { stat: "HIPAA", label: "Compliant" },
      { stat: "0→1", label: "Product Lifecycle" },
      { stat: "AI", label: "Risk Engine" }
    ],
    link: "/case-studies/vitamind-ai"
  },
  {
    n: "02",
    workType: "Client work", // "Client work" | "Concept" | "Personal project"
    badge: null,
    company: "AeroSphere",
    title: "Aviation Asset Management Ecosystem",
    subtitle: "Unifying aircraft trading, maintenance, inventory, and compliance into one enterprise platform.",
    desc: "An aircraft's lifecycle doesn't live in one place — trading, maintenance, inventory, and compliance were split across legacy ERP software, spreadsheets, and email. I led the redesign end-to-end: research, information architecture, UX flows, high-fidelity UI, and the design system that unified all five modules into one platform.",
    img: "/aerosphere-featured.png",
    authorImg: "/profile.png",
    authorName: "Amit Tadvi",
    authorRole: "Lead Product Designer",
    approach: [
      { title: "Research & Discovery", desc: "Stakeholder interviews and workflow audits define the problem" },
      { title: "Information Architecture", desc: "One aircraft record structures every module" },
      { title: "UI System Design", desc: "Scalable design system ensures consistency" },
      { title: "Developer Handoff", desc: "Structured specs deliver a production-ready build" }
    ],
    results: [
      { stat: "+2.1M", label: "Monthly Active visitors" },
      { stat: "+95%", label: "Longer Session Duration" },
      { stat: "+37%", label: "Increase in Qualified Leads" }
    ],
    link: "/case-studies/aerosphere"
  },
  {
    n: "03",
    workType: "Client work", // "Client work" | "Concept" | "Personal project"
    badge: null,
    company: "Credin",
    title: "Unified Credit & Leasing App",
    subtitle: "From application to disbursement in one seamless journey.",
    desc: "A single mobile lending platform where individuals and businesses apply for personal loans, business capital, or vehicle and machinery leasing, and track every rupee from application to disbursement in one continuous journey.",
    img: "/credin-featured.png",
    authorImg: "/profile.png",
    authorName: "Amit Tadvi",
    authorRole: "Lead Product Designer",
    approach: [
      { title: "One entry, three branches", desc: "A single 'Apply' action routes into product-specific steps" },
      { title: "Full fee transparency", desc: "Every rate shown before commitment" },
      { title: "Design System", desc: "Scalable dark/light visual language" },
      { title: "Validation", desc: "Usability tested with specific borrower types" }
    ],
    results: [
      { stat: "0→1", label: "Mobile App" },
      { stat: "Dark", label: "Mode First" },
      { stat: "Unified", label: "Architecture" }
    ],
    link: "/case-studies/credin"
  }
];

function CaseStudyIndex() {
  return (
    <>
      <Cursor />
      <main className="min-h-screen bg-background text-foreground overflow-x-clip">
        <Nav />
        
        {/* Page Header */}
        <section className="pt-32 md:pt-40 pb-20 px-4 md:px-8 lg:px-[120px]">
          <div className="w-full">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <div className="font-mono text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                  <Link to="/" className="hover:text-ink transition-colors">Home</Link>
                  <span>/</span>
                  <span className="text-ink">Case Studies</span>
                </div>
                <h1 className="font-display text-5xl md:text-7xl leading-[1.1] text-ink mb-8">
                  Featured Case Studies
                </h1>
                <p className="text-xl text-ink/85 max-w-2xl leading-relaxed">
                  Three deep dives into how I design complex products, from research to a shipped, usable experience, including AI-driven healthcare.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies Detailed Cards */}
        <section className="pb-20 md:pb-32 px-4 md:px-8 lg:px-[120px]">
          <div className="flex flex-col gap-12 md:gap-24">
            {CASE_STUDIES.map((c, i) => (
              <motion.div 
                key={c.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <Link
                  to={c.link}
                  className="block rounded-[2.5rem] p-8 md:p-12 border border-line bg-background shadow-sm hover:border-ink/20 hover:shadow-md transition-all duration-300 group cursor-pointer w-full"
                >
                  <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                    
                    {/* Left Column */}
                    <div className="md:col-span-6 flex flex-col justify-between">
                      <div className="flex flex-col h-full">
                        <div className="font-display text-xl font-semibold text-ink mb-8 md:mb-10">
                          {c.company}
                        </div>
                        
                        <h2 className="font-display text-4xl md:text-[3rem] leading-[1.1] text-ink tracking-tight mb-6">
                          {c.title}
                        </h2>
                        
                        <p className="text-xl text-ink/90 font-medium leading-snug mb-8">
                          {c.subtitle}
                        </p>
                        
                        <p className="text-ink/85 leading-relaxed text-[15px] sm:text-base mb-10">
                          {c.desc}
                        </p>
                        
                        {/* My Approach */}
                        <div className="bg-surface p-6 md:p-8 rounded-[2rem] border border-line/50 mb-10 mt-auto">
                          <h3 className="font-display text-xl mb-6 text-ink">My Approach:</h3>
                          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                            {c.approach.map((a, idx) => (
                              <li key={idx}>
                                <div className="font-medium text-ink text-sm flex items-center gap-2 mb-1">
                                  <span className="w-1 h-1 rounded-full bg-ink" /> {a.title}
                                </div>
                                <div className="text-ink/80 text-[14px] sm:text-sm pl-3 leading-normal">{a.desc}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <span className="inline-flex items-center gap-2 text-ink font-semibold border-b border-ink/30 pb-1 group-hover:border-ink transition-colors">
                          Read Case Study &rarr;
                        </span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-6 flex flex-col">
                      <div className="flex flex-wrap justify-end font-mono text-xs text-muted-foreground tracking-widest items-center gap-3 mb-8 md:mb-10">
                        {c.badge && (
                          <span className="font-mono text-[11px] text-ink border border-line px-3 py-1 rounded-full bg-surface tracking-normal font-medium">
                            {c.badge}
                          </span>
                        )}
                        {c.workType && (
                          <span className="font-mono text-[11px] text-muted-foreground border border-line/60 px-3 py-1 rounded-full bg-surface/50 tracking-normal">
                            {c.workType}
                          </span>
                        )}
                        <span>
                          CASE <span className="h-px w-6 bg-line hidden md:inline-block align-middle mx-1" /> ({c.n})
                        </span>
                      </div>
                      
                      <div className="rounded-[2rem] overflow-hidden bg-surface relative group border border-line/50 flex-1 min-h-[300px]">
                        <img src={c.img} alt={c.title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${c.company === "Credin" ? "scale-[1.6] -translate-y-[150px] group-hover:scale-[1.65]" : "group-hover:scale-105"}`} />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
