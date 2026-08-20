import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, Cursor } from "@/components/portfolio";
import { motion } from "framer-motion";
import { Layers, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute(
  "/case-studies/aerosphere"
)({
  component: CaseStudyDetail,
});

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string, title: string, subtitle?: string }) {
  return (
    <div className="mb-10">
      <span className="font-mono text-xs md:text-sm font-semibold text-accent tracking-[0.1em] uppercase mb-3 display-block">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 border border-line rounded-2xl bg-surface/30 p-6 md:p-8 flex gap-4 md:gap-6 items-start">
      <div className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0" />
      <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light">
        {children}
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] md:text-xs text-ink-soft/90 border border-line px-4 py-2 rounded-full bg-surface">
      {children}
    </span>
  );
}

function CaseStudyDetail() {
  return (
    <>
      <Cursor />
      <main className="min-h-screen bg-background text-foreground overflow-x-clip font-sans">
        <Nav />

        {/* Hero Section */}
        <section className="pt-28 md:pt-36 pb-0 px-4 md:px-8 lg:px-[120px]">
          <div className="w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div className="font-mono text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                <Link to="/" className="hover:text-ink transition-colors">Home</Link>
                <span>/</span>
                <Link to="/case-study" className="hover:text-ink transition-colors">Case Studies</Link>
                <span>/</span>
                <span className="text-accent">AeroSphere</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-ink mb-8 tracking-tight">
                Designing an Enterprise Aviation Asset Management Ecosystem
              </h1>
              
              <p className="text-lg md:text-xl text-ink-soft/90 font-light leading-relaxed mb-12">
                A unified platform bringing aircraft trading, maintenance planning, parts inventory, compliance management, and executive reporting into one system — replacing five disconnected workflows across procurement, engineering, and compliance teams. By centralizing critical operational data and automating routine tasks, the ecosystem empowers operators to drastically reduce aircraft downtime, optimize maintenance schedules, and make informed strategic decisions that drive long-term profitability. This resulted in a seamless, unified experience that not only improved cross-functional collaboration but also established a scalable foundation for future feature integrations.
              </p>

              <div className="flex gap-4 items-start bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 rounded-[14px] p-5 mb-10 text-sm text-ink-soft">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-medium">A note on confidentiality.</strong> This project was built under NDA for an enterprise aviation operator. No proprietary screens, data, or client identity are shown here. The interfaces have been independently reconstructed to demonstrate the UX thinking, information architecture, and design-system decisions I contributed to the real product.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Visual */}
        <section className="px-4 md:px-8 lg:px-[120px] pt-10 pb-10 md:pb-16">
          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.9, delay: 0.2 }}
              className="w-full h-[600px] md:h-[750px] lg:h-[850px] rounded-[2rem] overflow-hidden bg-surface border border-line relative shadow-xl"
            >
              <img src="/hero-setup.jpg" alt="AeroSphere Dashboard Mockup" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]" />
            </motion.div>

            <div className="mt-8 text-lg md:text-xl font-display font-medium border-b border-line pb-8 text-ink">
              8-month, 0→1 enterprise platform — from fragmented spreadsheets and legacy ERP to one unified aircraft-lifecycle system.
            </div>
          </div>
        </section>

        {/* Metadata Grid */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <div className="w-full">
            <div className="w-full">
              <div className="bg-surface rounded-2xl border border-line overflow-hidden">
                {[
                  {k: "Client", v: "Enterprise Aviation Operator (NDA)"},
                  {k: "Industry", v: "Aviation / Aerospace, B2B Enterprise SaaS"},
                  {k: "Timeline", v: "8 Months"},
                  {k: "Project Type", v: "0→1 Enterprise Web Platform"}
                ].map((row, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between p-5 border-b border-line last:border-0 gap-2 sm:gap-4">
                    <span className="text-muted-foreground font-mono text-sm font-semibold uppercase tracking-wider">{row.k}</span>
                    <span className="text-ink font-medium text-sm md:text-base text-left sm:text-right">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services / Philosophy */}
        <section id="services" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <div className="w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            
            {/* Left side: Image */}
            <div className="w-full h-[400px] md:h-auto rounded-[2rem] overflow-hidden bg-surface border border-line shadow-xl relative group">
              <img 
                src="/services-meeting.png" 
                alt="AeroSphere Strategy Session" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            {/* Right side: Text Content from Template */}
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-8">
                What's Included In The Services?
              </h2>
              <div className="space-y-6 text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light">
                <p>
                  We believe a brand is more than design — it's your reputation, voice, and first impression. Our approach blends creativity with strategy to maximize long-term value.
                </p>
                <p>
                  We deliver solutions that elevate your business, combining timeless identity systems with modern brand experiences. From bold startups to established businesses, we've helped companies create brands that inspire trust and drive growth.
                </p>
                
                <h3 className="text-lg font-medium text-ink mt-10 mb-4 font-display">Our branding philosophy centers on:</h3>
                
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5"></span>
                    <div>
                      <strong className="text-ink font-medium">Research & Strategy</strong> – Building brands on insights, not assumptions.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5"></span>
                    <div>
                      <strong className="text-ink font-medium">Creative Identity</strong> – Designing visuals that stand the test of time.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5"></span>
                    <div>
                      <strong className="text-ink font-medium">Consistency</strong> – Creating standards that keep your brand strong everywhere.
                    </div>
                  </li>
                </ul>
                
                <p className="mt-8 pt-6 border-t border-line text-sm italic">
                  Every brand we build tells a story — and we're here to help you share yours with clarity, creativity, and impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exec Summary */}
        <section id="exec" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="FOR EXECUTIVE REVIEWERS" 
            title="Executive Summary" 
            subtitle="The business case, in the time it takes to read four lines." 
          />
          
          <div className="bg-surface border border-line rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { k: "BUSINESS PROBLEM", v: "Aircraft asset data spread across ERPs, spreadsheets, and email was slowing procurement, delaying maintenance, and creating compliance risk across a multi-million-dollar fleet." },
                { k: "DESIGN RESPONSE", v: "One platform, one aircraft record, five purpose-built modules — designed so procurement, MRO, compliance, and executive teams each get exactly the view their job requires." },
                { k: "MY OWNERSHIP", v: "Sole product designer on the project — research, IA, UX strategy, hi-fi design, design system, prototyping, and developer handoff for an 8-month build." },
                { k: "BUSINESS OUTCOME", v: "Centralized compliance, faster procurement decisions, reduced maintenance delays, and executive-ready reporting — see full Impact section below." }
              ].map((item, i) => (
                <div key={i}>
                  <span className="font-mono text-xs font-semibold text-accent tracking-[0.1em] mb-4 display-block">{item.k}</span>
                  <p className="text-sm md:text-[15px] text-ink-soft/90 leading-relaxed font-light">{item.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="01 · CONTEXT" title="The Problem" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light space-y-6">
            <p>An aircraft's lifecycle doesn't live in one place. Every airframe, engine, APU, and landing gear carries its own maintenance history, regulatory record, service schedule, and financial value. At most operators, that record is split across legacy ERP software, spreadsheets, email threads, and paper documentation.</p>
            <p>For fleet operators, lessors, and MRO teams, this fragmentation wasn't a minor inefficiency — it <strong className="font-medium text-ink">slowed procurement decisions, created maintenance delays, introduced compliance risk, duplicated effort across teams, and raised cognitive load</strong> for everyone from engineers to executives.</p>
            <p>Enterprise aviation asset management also carries constraints most consumer products don't: regulatory documentation that must be audit-defensible, financial exposure in the millions per asset, and a user base ranging from field engineers to C-suite — all needing to trust the same data.</p>
          </div>
          
          <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] mt-12 rounded-[2rem] overflow-hidden bg-surface border border-line relative shadow-sm group">
            <img src="/the-problem.png" alt="Aviation Hangar" className="w-full h-full object-cover object-[50%_75%] transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>



          <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mt-16 mb-8">Business Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { k: "VISIBILITY", v: "Give every stakeholder one source of truth for fleet and asset status." },
              { k: "MAINTENANCE", v: "Reduce scheduling delays through better MRO and engineer allocation." },
              { k: "PROCUREMENT", v: "Simplify aircraft, engine, and parts comparison and acquisition." },
              { k: "COMPLIANCE", v: "Centralize documentation so audits are fast and defensible." },
              { k: "REPORTING", v: "Make executive-level fleet reporting available by default, not by request." },
              { k: "SCALE", v: "Support global aviation operations across multiple fleets and regions." }
            ].map((item, i) => (
              <div key={i} className="border border-line rounded-2xl p-6 bg-surface">
                <span className="font-mono text-xs font-semibold text-accent tracking-[0.1em] mb-3 display-block">{item.k}</span>
                <p className="text-sm text-ink-soft/90 font-medium">{item.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Discovery */}
        <section id="research" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="02 · DISCOVERY" 
            title="Research & Discovery" 
            subtitle="Before any screen was designed, the goal was to understand how nine different user types actually moved through an aircraft's lifecycle today — and where that movement broke down."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { tag: "STAKEHOLDER INTERVIEWS", title: "Cross-functional discovery sessions", desc: "Structured conversations with procurement managers, compliance officers, MRO leads, and executive sponsors to surface where the current tools broke down for each role." },
              { tag: "WORKFLOW / PROCESS AUDIT", title: "Mapping the current fragmented toolchain", desc: "Traced how a single aircraft record actually moved across legacy ERP, spreadsheets, and email — identifying every handoff point where data went stale or got duplicated." },
              { tag: "COMPETITIVE / MARKET AUDIT", title: "Benchmarking adjacent enterprise tools", desc: "Reviewed patterns from enterprise asset management, ERP, and fleet-management software to understand established mental models before deviating from them." },
              { tag: "JOURNEY MAPPING", title: "End-to-end lifecycle mapping per user type", desc: "Built journey maps for the five highest-friction workflows — procurement comparison, maintenance scheduling, compliance sign-off, inventory lookup, and executive reporting." }
            ].map((item, i) => (
              <div key={i} className="border border-line rounded-2xl p-8 bg-surface">
                <span className="font-mono text-[10px] text-accent tracking-[0.1em] mb-4 display-block">{item.tag}</span>
                <h4 className="font-display text-xl text-ink mb-3">{item.title}</h4>
                <p className="text-sm md:text-[15px] text-ink-soft/90 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-[300px] md:h-[400px] mt-12 rounded-[2rem] overflow-hidden bg-surface border border-line relative shadow-sm group">
            <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200" alt="Design Research Session" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>


        </section>

        {/* Personas */}
        <section id="personas" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="03 · USERS" 
            title="User Segments" 
            subtitle="Nine named user types, grouped into five working profiles used to prioritize every design decision."
          />
          
          <div className="overflow-x-auto w-full pb-4">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-line text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  <th className="py-4 px-4 font-normal">Segment</th>
                  <th className="py-4 px-4 font-normal">Primary Job</th>
                  <th className="py-4 px-4 font-normal">Core Pain Point</th>
                  <th className="py-4 px-4 font-normal">What They Needed</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-[15px] font-light text-ink-soft/90">
                {[
                  ["Procurement Manager", "Compare & acquire aircraft, engines, parts", "No single view of pricing, lifecycle, and health together", "Side-by-side comparison with trustworthy, current data"],
                  ["Compliance Officer", "Maintain audit-ready documentation", "Records scattered across paper & email", "Centralized, traceable, audit-defensible document control"],
                  ["MRO / Maintenance Engineer", "Schedule and execute maintenance", "Manual scheduling caused SLA slippage", "Clear allocation, downtime visibility, SLA tracking"],
                  ["Fleet Operator / Airline", "Keep aircraft operational", "Fragmented visibility across own fleet", "Real-time fleet telemetry and alerts"],
                  ["Executive / Lessor", "Make fleet-level financial & risk decisions", "Reporting required manual compilation", "Live KPIs and analytics, no export needed"]
                ].map((row, i) => (
                  <tr key={i} className="border-b border-line last:border-0 hover:bg-surface/50 transition-colors">
                    <td className="py-5 px-4 font-display font-medium text-ink">{row[0]}</td>
                    <td className="py-5 px-4">{row[1]}</td>
                    <td className="py-5 px-4">{row[2]}</td>
                    <td className="py-5 px-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* IA */}
        <section id="ia" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-stretch mb-12">
            <div className="md:w-[45%] lg:w-[40%] flex flex-col">
              <SectionHeader 
                eyebrow="04 · STRUCTURE" 
                title="Information Architecture" 
                subtitle="The single highest-leverage decision on this project: restructuring five previously separate systems into one navigable model, anchored to a single aircraft entity."
              />
              <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-line shrink-0 mt-2.5"></span>
                <div>
                  <strong className="text-ink font-medium block mb-1 font-display">Single source of truth</strong>
                  <p className="text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light">Every module (trading, maintenance, inventory, compliance, reporting) reads from and writes to one aircraft record, eliminating re-entry and version mismatch.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-line shrink-0 mt-2.5"></span>
                <div>
                  <strong className="text-ink font-medium block mb-1 font-display">Role-based entry points</strong>
                  <p className="text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light">Navigation surfaces different default views per role, without duplicating the underlying data model.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-line shrink-0 mt-2.5"></span>
                <div>
                  <strong className="text-ink font-medium block mb-1 font-display">Scalable taxonomy</strong>
                  <p className="text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light">The entity model (aircraft → engine → APU → landing gear → component) was built to extend to future asset types without a structural rework.</p>
                </div>
              </li>
            </ul>
          </div>
            
            <div className="md:w-[55%] lg:w-[60%] h-[400px] md:h-auto rounded-[2rem] overflow-hidden border border-line shadow-sm group relative">
              <img src="/ia-tablet-v2.png" alt="Information Architecture on Tablet" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>


        </section>

        {/* Flows */}
        <section id="flows" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="05 · PROCESS" 
            title="User Flows & Wireframing" 
            subtitle="Low-fidelity first, on the highest-stakes journeys, validated with stakeholders before any visual design began."
          />

          <div className="mt-12 relative pl-4 md:pl-8 border-l border-line space-y-16">
            {[
              { step: "1", title: "Task analysis", text: "Broke each of the five priority journeys (procurement comparison, maintenance scheduling, compliance sign-off, inventory lookup, executive reporting) into discrete tasks and decision points.", out: "OUTPUT: TASK FLOWS" },
              { step: "2", title: "Low-fidelity wireframes", text: "Sketched structural layouts for each core flow to validate hierarchy and grouping with stakeholders before investing in visual design — cheapest point to catch a structural miss.", out: "OUTPUT: LOW-FI WIREFRAMES, STAKEHOLDER SIGN-OFF" },
              { step: "3", title: "Mid-fidelity iteration", text: "Layered in real content density (compliance documents, telemetry data, comparison tables) to pressure-test whether the structure held up under real information load, not placeholder text.", out: "OUTPUT: MID-FI FLOWS" },
              { step: "4", title: "High-fidelity UI", text: "Applied the design system to bring each flow to production-ready fidelity, with responsive behavior specified for the range of devices field and office users worked from.", out: "OUTPUT: HI-FI SCREENS" }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[37px] md:-left-[53px] top-0 w-10 h-10 md:w-12 md:h-12 bg-surface border border-line rounded-full flex items-center justify-center font-mono text-accent text-sm md:text-base">
                  {item.step}
                </div>
                <div className="pl-6 md:pl-10">
                  <h4 className="font-display text-xl text-ink mb-3">{item.title}</h4>
                  <p className="text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light max-w-3xl mb-4">{item.text}</p>
                  <span className="font-mono text-[10px] text-muted-foreground tracking-[0.1em]">{item.out}</span>
                  

                </div>
              </div>
            ))}
          </div>
          
          <div className="w-4/5 mx-auto h-auto mt-16 group">
            <img src="/aerospeherescreens.png" alt="Aerosphere User Flows and Wireframes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </section>

        {/* Validation */}
        <section id="testing" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="06 · VALIDATION" title="Usability Validation" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light space-y-6">
            <p>Each flow was reviewed with representative stakeholders from its primary user group before development — compliance flows walked through with compliance officers, scheduling flows with MRO leads — to catch role-specific misunderstandings that a generalist review would miss.</p>
            <p>Feedback loops fed directly back into the mid-fidelity stage rather than waiting until hi-fi, keeping the cost of change low.</p>
          </div>


        </section>

        {/* System & Modules */}
        <section id="system" className="px-4 md:px-8 lg:px-[120px] py-20 md:py-32 bg-surface/20">
          <SectionHeader 
            eyebrow="07 · SYSTEM" 
            title="Product Modules" 
            subtitle="Five modules, one aircraft record. Each serves a distinct job-to-be-done for a different user segment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {[
              { i: "Command Center", t: "Operations Command Center", d: "Executive KPIs, live fleet telemetry, alerts, and analytics." },
              { i: "Marketplace", t: "Aviation Marketplace", d: "Compare aircraft, engines, APUs, and landing gear by lifecycle, price, health." },
              { i: "Inventory", t: "Parts Inventory", d: "Warehouse visibility, lifecycle tracking, full component traceability." },
              { i: "Compliance", t: "Document Control", d: "Compliance records, approvals, manuals — audit-ready by design." },
              { i: "Scheduler", t: "Maintenance Scheduler", d: "MRO planning, engineer allocation, SLA tracking, downtime optimization." }
            ].map((m, i) => (
              <div key={i} className="border border-line bg-background p-8 rounded-2xl">
                <span className="font-mono text-xs font-semibold text-accent tracking-[0.1em] mb-3 block uppercase">{m.i}</span>
                <h4 className="font-display text-lg text-ink mb-3">{m.t}</h4>
                <p className="text-sm md:text-[15px] text-ink-soft/90 font-light leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-6">Design System</h3>
          <p className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-10">
            Built a scalable, token-based design system so a compliance-heavy document view and an executive KPI dashboard could share one visual language without either feeling under- or over-designed for its audience.
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <Chip>Semantic color tokens</Chip>
            <Chip>Typography scale</Chip>
            <Chip>Responsive grid</Chip>
            <Chip>Component library</Chip>
            <Chip>WCAG 2.1 accessibility</Chip>
            <Chip>Data table patterns</Chip>
            <Chip>Alert & status system</Chip>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-sm group relative aspect-[4/3]">
              <img src="/aero_design_system.png" alt="AeroSphere Design System" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg inline-block font-mono text-[10px] text-white uppercase tracking-wider mb-2">AeroSphere Design System</div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm group relative aspect-[4/3]">
              <img src="/aero_typography.png" alt="AeroSphere Typography" className="w-full h-full object-cover object-left transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg inline-block font-mono text-[10px] text-white uppercase tracking-wider mb-2">Typography</div>
              </div>
            </div>
          </div>
        </section>

        {/* Decisions */}
        <section id="decisions" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="08 · RATIONALE" 
            title="Key Design Decisions" 
            subtitle="Where the real design thinking happened — what to hide, group, or surface, and why."
          />

          <div className="space-y-6">
            {[
              { tag: "ARCHITECTURE", title: "One aircraft entity, five module views", desc: "Anchored everything to a single aircraft record so a compliance officer, engineer, and executive were always looking at the same underlying truth — just surfaced differently. Eliminated the re-entry and version-mismatch problems the old fragmented tools created." },
              { tag: "INFORMATION DENSITY", title: "Progressive disclosure for compliance-heavy screens", desc: "Layered dense, legally sensitive compliance data behind a scan-first summary with drill-down into full audit detail — kept the platform usable for a fleet operator without hiding what a compliance officer needed." },
              { tag: "STAKEHOLDER FIT", title: "Executive reporting as a first-class module", desc: "Executives were a named user group, not an afterthought — the Operations Command Center was built as a real product surface (live KPIs, alerts, telemetry), not a static report bolted on at the end." },
              { tag: "CONTEXT OF USE", title: "Responsive-first for field vs. office contexts", desc: "MRO engineers often worked from tablets on a hangar floor, not a desk. Designing responsive behavior in from the start — rather than retrofitting a desktop-only design — kept the scheduler usable in the field." },
              { tag: "SCALABILITY", title: "Shared component system across five modules", desc: "A single token-based system meant new modules (or future asset types) could be added without a visual or interaction redesign — a direct trade-off in favor of long-term engineering and design velocity over short-term customization." }
            ].map((d, i) => (
              <div key={i} className="border border-line bg-surface rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-start">
                <div className="w-full">
                  <h4 className="font-display text-xl text-ink mb-3">{d.title}</h4>
                  <p className="text-sm md:text-[15px] text-ink-soft/90 leading-relaxed font-light">{d.desc}</p>
                </div>
                <span className="font-mono text-[10px] text-accent border border-accent/20 bg-accent/5 px-4 py-2 rounded-full whitespace-nowrap order-first md:order-last shrink-0">
                  {d.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section id="impact" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="09 · RESULTS" title="Outcomes & Business Impact" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { m: "Accelerated", l: "Procurement decision time", ph: true },
              { m: "Reduced", l: "Maintenance scheduling delays", ph: true },
              { m: "Centralized", l: "Compliance documentation across all modules", ph: false },
              { m: "Reduced", l: "Context switching across procurement, engineering & compliance", ph: false }
            ].map((o, i) => (
              <div key={i} className="bg-surface border border-line rounded-2xl p-8 flex flex-col justify-center">
                <span className="font-mono text-xs font-semibold text-accent tracking-[0.1em] mb-3 block uppercase">{o.m}</span>
                <div className="text-sm text-ink-soft/90 font-medium leading-relaxed">{o.l}</div>
              </div>
            ))}
          </div>
          


          <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mt-16 mb-8">Business Goal → Design Response</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { k: "VISIBILITY", v: "Operations Command Center gives every role one live view of fleet status." },
              { k: "MAINTENANCE", v: "Scheduler module reduces manual coordination for MRO teams." },
              { k: "PROCUREMENT", v: "Marketplace enables direct lifecycle + pricing comparison." },
              { k: "COMPLIANCE", v: "Document Control centralizes and traces every compliance record." },
              { k: "REPORTING", v: "Executive KPIs available live, with no manual compilation." },
              { k: "SCALE", v: "Entity-based IA extends to new asset types without rework." }
            ].map((item, i) => (
              <div key={i} className="border border-line rounded-2xl p-6 bg-surface">
                <span className="font-mono text-xs font-semibold text-accent tracking-[0.1em] mb-3 display-block">{item.k}</span>
                <p className="text-sm text-ink-soft/90 font-medium">{item.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="10 · CAPABILITIES DEMONSTRATED" 
            title="Skills & Methods" 
            subtitle="Keyword-relevant capabilities this project demonstrates end-to-end — useful for ATS parsing and recruiter scanning."
          />
          
          <div className="flex flex-wrap gap-3 mb-12">
            {["Figma", "FigJam", "Miro", "Protopie", "UX Strategy", "Product Thinking", "User Research", "Stakeholder Interviews", "Journey Mapping", "Information Architecture", "User Flows", "Wireframing", "High-Fidelity UI Design", "Design Systems", "Design Tokens", "Prototyping", "Usability Validation", "WCAG 2.1 Accessibility", "Responsive Design", "Developer Handoff", "Cross-Functional Collaboration", "Enterprise SaaS", "0→1 Product Design", "B2B UX"].map(skill => (
              <Chip key={skill}>{skill}</Chip>
            ))}
          </div>
        </section>

        {/* Reflection */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="11 · REFLECTION" title="What This Project Sharpened" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-16">
            <p>Enterprise aviation products sit at the intersection of regulatory precision, operational complexity, and business urgency. Designing AeroSphere strengthened my ability to take high-density, high-stakes workflows and turn them into scalable, decision-focused products — without simplifying away the precision that compliance and engineering teams actually needed.</p>
          </div>

          <div className="w-full h-[400px] rounded-[2rem] overflow-hidden group relative shadow-2xl">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200" alt="Aviation Flight" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
