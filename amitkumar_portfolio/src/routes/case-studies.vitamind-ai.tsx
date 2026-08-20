import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, Cursor } from "@/components/portfolio";
import { motion } from "framer-motion";
import { HeartPulse, ArrowRight, ShieldCheck, Activity } from "lucide-react";

export const Route = createFileRoute(
  "/case-studies/vitamind-ai"
)({
  component: VitaMindCaseStudy,
});

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string, title: string, subtitle?: string }) {
  return (
    <div className="mb-10">
      <span className="font-mono text-xs md:text-sm font-semibold text-teal-600 dark:text-teal-400 tracking-[0.1em] uppercase mb-3 block">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Callout({ children, type = "default" }: { children: React.ReactNode, type?: "default" | "warning" }) {
  const isWarning = type === "warning";
  return (
    <div className={`mt-8 border rounded-2xl p-6 md:p-8 flex gap-4 md:gap-6 items-start ${
      isWarning ? "bg-amber-50/50 border-amber-200/50 dark:bg-amber-900/10 dark:border-amber-700/30" 
                : "bg-surface/30 border-line"
    }`}>
      <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${isWarning ? "bg-amber-500" : "bg-teal-500"}`} />
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

function VitaMindCaseStudy() {
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
                <span className="text-teal-600 dark:text-teal-400">VitaMind AI</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-ink mb-8 tracking-tight">
                Designing an AI-Powered Cardiac Risk &amp; Longevity Platform
              </h1>
              
              <p className="text-lg md:text-xl text-ink-soft/90 font-light leading-relaxed mb-12">
                A <strong className="font-medium text-ink">HIPAA-compliant, region-aware health intelligence platform</strong> that turns raw vitals data into <strong className="font-medium text-ink">early cardiac risk detection</strong> and a <strong className="font-medium text-ink">personalized longevity plan</strong>. Built as a single connected system across <strong className="font-medium text-ink">web and mobile</strong>, it replaces disconnected tracking apps and static lab reports with one continuously-learning health record — one that predicts risk before symptoms appear, and gives people a concrete, AI-guided path to a longer, healthier life.
              </p>

              <div className="flex gap-4 items-start bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 rounded-[14px] p-5 mb-10 text-sm text-ink-soft">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-medium">A note on confidentiality.</strong> This project was built under NDA for a healthcare technology company. No proprietary screens, data, or client identity are shown here. The interfaces have been independently reconstructed to demonstrate the UX thinking, information architecture, and design-system decisions I contributed to the real product.
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
              <img src="/vitamind-hero.jpg?v=2" alt="VitaMind AI Dashboard Mockup" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]" />
            </motion.div>

            <div className="mt-8 text-lg md:text-xl font-display font-medium border-b border-line pb-8 text-ink">
              6-month, 0→1 AI health platform — from fragmented vitals tracking to a single predictive, longevity-first health record. Phase 1 (risk detection) shipped; Phase 2 (guided longevity programs) in active design.
            </div>
          </div>
        </section>

        {/* Metadata Grid */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <div className="w-full">
            <div className="w-full">
              <div className="bg-surface rounded-2xl border border-line overflow-hidden">
                {[
                  {k: "Client", v: "Confidential Digital Health Company (NDA)"},
                  {k: "Industry", v: "Digital Health / AI Wellness, HIPAA & Multi-Region Compliance"},
                  {k: "Timeline", v: "6 Months (Phase 1 shipped) — Phase 2 ongoing"},
                  {k: "Project Type", v: "0→1 AI Health Platform — Web + Mobile"},
                  {k: "My Role", v: "Sole Product Designer — research through developer handoff"}
                ].map((row, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between p-5 border-b border-line last:border-0 gap-2 sm:gap-4">
                    <span className="text-muted-foreground font-mono text-xs md:text-sm font-semibold uppercase tracking-wider">{row.k}</span>
                    <span className="text-ink font-medium text-sm md:text-base text-left sm:text-right">{row.v}</span>
                  </div>
                ))}
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
          
          <div className="bg-surface border border-line rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { k: "BUSINESS PROBLEM", v: "Vitals data was scattered across wearables, lab PDFs, and memory — with no system connecting it to real cardiac risk until something had already gone wrong." },
                { k: "DESIGN RESPONSE", v: "One connected health record powering AI risk prediction, a personalized longevity score, and daily guided plans — designed so a first-time user and a clinically at-risk user each get exactly the depth they need." },
                { k: "MY OWNERSHIP", v: "Sole product designer on the project — research, IA, region-aware privacy flows, AI-insight UX, design system, prototyping, and developer handoff for web and mobile." },
                { k: "BUSINESS OUTCOME", v: "A HIPAA- and region-compliant platform that shifted the product from passive tracking to proactive prediction — see full impact section below." }
              ].map((item, i) => (
                <div key={i}>
                  <span className="font-mono text-[10px] font-semibold text-teal-600 dark:text-teal-400 tracking-[0.1em] mb-4 block uppercase">{item.k}</span>
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
            <p>Most health apps are excellent at collecting data and poor at telling anyone what it means. A person's heart rate, blood pressure, sleep, and activity live in three or four separate apps, none of which talk to each other — and none of which connect today's numbers to tomorrow's risk.</p>
            <p>For people with borderline biomarkers or a family history of cardiac disease, this gap isn't a minor inconvenience — it <strong className="font-medium text-ink">delays early intervention, leaves risk invisible until a clinical event forces the issue, and erodes trust the moment health data crosses a border</strong> between regions with different privacy law.</p>
            <p>Health products also carry constraints most consumer apps don't: HIPAA in the U.S., GDPR-equivalent rules elsewhere, data that must be defensible if a clinician or regulator ever asks to see it, and a tone that has to feel supportive, never alarming, when the news is bad.</p>
          </div>
          
          <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] mt-12 mb-8 rounded-[2rem] overflow-hidden bg-surface border border-line shadow-sm group relative">
            <img src="/vitamind-problem.jpg?v=2" alt="VitaMind AI Conceptual Diagram" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>

          <Callout>
            <strong className="font-medium text-ink">Why this was hard, not just big:</strong> the same risk score had to serve someone who wanted a quick daily glance, and someone whose cardiologist would eventually ask to see the underlying trend line — without either person feeling like an afterthought.
          </Callout>

          <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mt-16 mb-8">Business Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { k: "Early Detection", t: "Surface risk before symptoms", v: "Move from reactive tracking to predictive alerts based on trend, not single readings." },
              { k: "Personalization", t: "One score, tailored guidance", v: "Turn a risk number into a specific, individual next action — never a generic tip." },
              { k: "Compliance", t: "Region-aware by design", v: "HIPAA and regional data-residency rules built into the flow, not bolted on after." },
              { k: "Engagement", t: "Reduce drop-off after week two", v: "Design for the six-month relationship, not the first-session demo." },
              { k: "Care Connectivity", t: "Make sharing safe, not scary", v: "Let people loop in a physician or family member without losing control of their data." },
              { k: "Scale to Longevity", t: "Grow from risk to lifestyle", v: "Extend the same record into diet, exercise, and mindfulness — Phase 2 of the product." }
            ].map((item, i) => (
              <div key={i} className="border border-line rounded-2xl p-6 bg-surface shadow-sm">
                <span className="font-mono text-[10.5px] font-semibold text-teal-600 dark:text-teal-400 tracking-[0.07em] mb-3 block uppercase">{item.k}</span>
                <h4 className="font-display text-lg font-medium text-ink mb-2">{item.t}</h4>
                <p className="text-sm md:text-[14.5px] text-ink-soft/90 font-light leading-relaxed">{item.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Discovery */}
        <section id="research" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="02 · DISCOVERY" 
            title="Research & Discovery" 
            subtitle="Before any screen was designed, the goal was to understand how five different user types actually experience risk, trust, and daily health habits — and where existing tools fail each of them."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { tag: "Stakeholder Interviews", title: "Cross-functional discovery sessions", desc: "Structured conversations with clinical advisors, compliance/legal, and product leadership to surface constraints before design started." },
              { tag: "Regulatory Mapping", title: "HIPAA + regional privacy audit", desc: "Mapped consent, storage, and sharing requirements across U.S. HIPAA and comparable regional frameworks to define one flexible privacy architecture." },
              { tag: "Competitive Audit", title: "Benchmarking adjacent health tools", desc: "Reviewed patterns from Apple Health, Samsung Health, Whoop, and Oura to understand established mental models before deviating from them." },
              { tag: "Journey Mapping", title: "End-to-end lifecycle per user type", desc: "Built journeys for the five highest-friction moments — onboarding consent, first risk result, daily tracking, sharing with a provider, and re-engagement." }
            ].map((item, i) => (
              <div key={i} className="border border-line rounded-2xl p-6 md:p-8 bg-surface shadow-sm">
                <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 tracking-[0.07em] font-bold uppercase mb-4 block">{item.tag}</span>
                <h4 className="font-display text-lg md:text-xl text-ink font-medium mb-3">{item.title}</h4>
                <p className="text-sm md:text-[14.5px] text-ink-soft/90 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] mt-12 mb-8 rounded-[2rem] overflow-hidden bg-surface border border-line shadow-sm group relative">
            <img src="/vitamind-discovery.jpg?v=2" alt="VitaMind AI Research Wall and Journey Map" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>


        </section>

        {/* Personas */}
        <section id="personas" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="03 · USERS" 
            title="User Segments" 
            subtitle="Five working personas used to prioritize every design decision — from onboarding depth to how alarming (or calm) an alert should feel."
          />
          
          <div className="overflow-x-auto w-full pb-4">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-line font-mono text-[10.5px] tracking-[0.06em] text-muted-foreground uppercase">
                  <th className="py-4 px-4 font-normal">Segment</th>
                  <th className="py-4 px-4 font-normal">Primary Job</th>
                  <th className="py-4 px-4 font-normal">Core Pain Point</th>
                  <th className="py-4 px-4 font-normal">What They Need</th>
                </tr>
              </thead>
              <tbody className="text-[14px] md:text-[15px] font-light text-ink-soft/90">
                {[
                  ["Everyday Tracker", "Stay ahead of long-term health", "No sense of what 'good' trends look like", "A simple longevity score with clear direction"],
                  ["At-Risk Individual", "Monitor a flagged condition", "Risk feels invisible until a crisis", "Early, explainable AI alerts tied to real factors"],
                  ["Caregiver", "Monitor a parent or family member", "No visibility without invasive check-ins", "Consent-based shared view, not full access"],
                  ["Care Provider", "Review patient-shared data", "Data arrives as disconnected exports", "Clean, audit-ready shared report"],
                  ["Privacy-Conscious User", "Control where their data lives", "Unclear who can see or move their data", "Granular, revocable, region-aware consent"]
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
          <SectionHeader 
            eyebrow="04 · STRUCTURE" 
            title="Information Architecture" 
            subtitle="The single highest-leverage decision on this project: restructuring vitals, AI insights, plans, and sharing around one longitudinal health profile, instead of five disconnected features."
          />
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-stretch mb-12">
            <div className="md:w-[45%] lg:w-[45%] flex flex-col space-y-6">
              
              <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
                <h4 className="font-display font-medium text-lg text-ink mb-2">Single health record</h4>
                <p className="text-[14.5px] leading-relaxed text-ink-soft/90 font-light">Every module — vitals, risk engine, longevity plans, sharing — reads from and writes to one profile, eliminating duplicate entry and conflicting numbers.</p>
              </div>

              <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
                <h4 className="font-display font-medium text-lg text-ink mb-2">Region-aware entry point</h4>
                <p className="text-[14.5px] leading-relaxed text-ink-soft/90 font-light">Onboarding consent adapts its legal copy and data-residency choice by detected region, without forking the underlying flow.</p>
              </div>

              <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
                <h4 className="font-display font-medium text-lg text-ink mb-2">Scalable taxonomy</h4>
                <p className="text-[14.5px] leading-relaxed text-ink-soft/90 font-light">The data model (vitals → risk factors → plans → sharing) was built to extend into new plan types (Phase 2: diet, exercise, meditation) without a structural rework.</p>
              </div>

            </div>
            
            <div className="md:w-[55%] lg:w-[55%] w-full h-[400px] md:h-auto self-stretch rounded-[2rem] overflow-hidden border border-line shadow-sm bg-surface relative group">
              <img src="/vitamind-ia.jpg?v=1" alt="Information Architecture Schematic" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
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

          <div className="mt-12 relative pl-6 md:pl-10 border-l-2 border-line space-y-12">
            {[
              { step: "1", title: "Task analysis", text: "Broke down the five priority journeys (consent onboarding, first risk result, daily vitals logging, plan check-in, provider sharing) into discrete tasks and decision points.", out: "OUTPUT: TASK FLOWS" },
              { step: "2", title: "Low-fidelity wireframes", text: "Sketched structural layouts to validate hierarchy — especially how a risk score is revealed without triggering unnecessary alarm — before any visual design investment.", out: "OUTPUT: LO-FI WIREFRAMES, STAKEHOLDER SIGN-OFF" },
              { step: "3", title: "Mid-fidelity iteration", text: "Layered in real content density — trend charts, risk factor breakdowns, plan detail — to pressure-test whether the structure held up under real data, not placeholder text.", out: "OUTPUT: MID-FI FLOWS" },
              { step: "4", title: "High-fidelity UI", text: "Applied the teal, SF Pro-based design system to bring each flow to production-ready fidelity, with parallel responsive behavior specified for web and native mobile.", out: "OUTPUT: HI-FI SCREENS (WEB + MOBILE)" }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[43px] md:-left-[59px] top-0 w-8 h-8 md:w-10 md:h-10 bg-surface border-[1.5px] border-teal-500 rounded-full flex items-center justify-center font-mono text-teal-600 font-bold text-xs md:text-sm shadow-sm">
                  {item.step}
                </div>
                <div className="pl-4 md:pl-6">
                  <h4 className="font-display text-lg md:text-xl text-ink mb-2 font-medium">{item.title}</h4>
                  <p className="text-[14.5px] md:text-[15.5px] leading-[1.7] text-ink-soft/90 font-light mb-3">{item.text}</p>
                  <span className="font-mono text-[10.5px] text-muted-foreground tracking-[0.05em] uppercase">{item.out}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-4/5 mx-auto h-auto mt-16 group">
            <img src="/vitamind_screens.png" alt="High-fidelity User Flows Mockup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>
        </section>

        {/* Validation */}
        <section id="testing" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="06 · VALIDATION" title="Usability Validation" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light space-y-6">
            <p>Each flow was reviewed with representative users before development — risk-result screens tested specifically with the at-risk persona group, sharing flows tested with a caregiver/provider pairing, to catch tone and trust issues a generalist review would miss. Feedback fed directly into the mid-fidelity stage rather than waiting until hi-fi, keeping the cost of change low.</p>
          </div>


        </section>

        {/* System & Modules */}
        <section id="system" className="px-4 md:px-8 lg:px-[120px] py-20 md:py-32 bg-surface/30">
          <SectionHeader 
            eyebrow="07 · SYSTEM" 
            title="Product Modules" 
            subtitle="Sixteen screens, one health record. Each module serves a distinct job-to-be-done across web and mobile."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-24">
            {[
              { l: "Onboarding", t: "Consent & Region Setup", d: "Region-aware privacy consent and data-residency choice." },
              { l: "Home", t: "Health Dashboard", d: "Longevity score, latest vitals, and top AI insight at a glance." },
              { l: "Tracking", t: "Vitals Log", d: "Manual entry plus wearable sync, unified into one trend view." },
              { l: "AI Engine", t: "Cardiac Risk Score", d: "Explainable risk score with a plain-language factor breakdown." },
              { l: "Signature Feature", t: "Longevity Twin", d: "A simulated future health trajectory showing how today's habits compound over time." },
              { l: "AI Coach", t: "Conversational Insights", d: "Plain-language nudges and Q&A grounded in the person's own data." },
              { l: "Education", t: "Learning Hub", d: "Bite-sized, condition-relevant content — not a generic article feed." },
              { l: "Phase 2", t: "Dietary Plans", d: "Personalized nutrition guidance tied to risk factors and goals." },
              { l: "Phase 2", t: "Exercise Plans", d: "Activity plans scaled to current cardiac risk level, not generic fitness goals." },
              { l: "Phase 2", t: "Meditation & Recovery", d: "Guided stress and recovery sessions linked to heart-rate variability data." },
              { l: "Sharing", t: "Care Team Access", d: "Granular, revocable, audit-ready sharing with a physician or caregiver." },
              { l: "Compliance", t: "Privacy Control Center", d: "One place to see, export, or revoke exactly what data is shared, and where it lives." },
              { l: "Alerts", t: "Notifications", d: "Calibrated urgency — a rising trend reads differently from an acute alert." },
              { l: "Reporting", t: "Reports & Export", d: "Clinician-ready PDF summary generated on demand, no manual compilation." },
              { l: "Engagement", t: "Community & Challenges", d: "Optional, opt-in group goals to support long-term retention." },
              { l: "Account", t: "Settings & Profile", d: "Device connections, notification tuning, and account controls." }
            ].map((m, i) => (
              <div key={i} className="border border-line bg-background p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="font-mono text-[10.5px] font-semibold text-teal-600 dark:text-teal-400 tracking-[0.07em] mb-2 block uppercase">{m.l}</span>
                <h4 className="font-display text-[15px] font-medium text-ink mb-1.5">{m.t}</h4>
                <p className="text-[13.5px] text-ink-soft/90 font-light leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-4">Design System</h3>
          <p className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-8">
            Built a scalable, token-based design system in teal and SF Pro so a clinically dense risk-factor screen and a calm daily dashboard could share one visual language without either feeling under- or over-designed for its audience. Full light and dark mode support throughout.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-12">
            {[
              "Semantic color tokens", "Typography scale (SF Pro)", "Light / dark mode",
              "Responsive grid (web + mobile)", "Component library", "WCAG 2.1 accessibility",
              "Clinical data-viz patterns", "Calibrated alert & status system"
            ].map(tag => (
              <span key={tag} className="bg-surface/50 border border-line rounded-full px-4 py-1.5 text-xs md:text-[13px] text-ink-soft/90">{tag}</span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-line bg-surface relative group aspect-video">
              <img src="/vitamind-ds-dashboard-v2.png" alt="VitaMind AI Dashboard and Trend Chart" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-line bg-surface relative group aspect-video">
              <img src="/vitamind-ds-components-v2.png" alt="VitaMind AI Component Library and Token Sheet" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
          </div>
        </section>

        {/* Decisions */}
        <section id="decisions" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="08 · RATIONALE" 
            title="Key Design Decisions" 
            subtitle="Where the real design thinking happened — what to hide, group, calm down, or surface, and why."
          />

          <div className="space-y-4">
            {[
              { tag: "Architecture", title: "One health record, every module reads from it", desc: "Anchored vitals, risk, plans, and sharing to a single profile so a person, their caregiver, and their physician were always looking at the same underlying truth — just surfaced differently." },
              { tag: "Information Density", title: "Progressive disclosure for risk data", desc: "Led with a calm, plain-language summary of what a risk score means, with drill-down into the full clinical factor breakdown — so the same screen served a quick daily glance and a pre-appointment deep dive." },
              { tag: "Compliance", title: "Region-aware consent as one flow, not five", desc: "Built one onboarding architecture that swaps legal copy and storage location by detected region, instead of maintaining separate HIPAA and non-HIPAA versions of the product." },
              { tag: "Trust & Tone", title: "Calibrated alert language, never alarmist", desc: "Separated \"trending in the wrong direction\" from \"acute, time-sensitive\" alerts at the visual and tonal level, so early warnings built trust instead of triggering anxiety or alert fatigue." },
              { tag: "Differentiation", title: "Longevity Twin as the differentiating moment", desc: "Rather than a static score, gave people a simulated view of their own future trajectory — the single most memorable, most shared screen in early stakeholder reviews." },
              { tag: "Privacy by Design", title: "Sharing as granular and revocable, not all-or-nothing", desc: "Let a person choose exactly which data a caregiver or physician sees, and undo it at any time — critical for adoption in a category where trust is the entire product." }
            ].map((d, i) => (
              <div key={i} className="border border-line bg-surface rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-start shadow-sm">
                <div className="w-full">
                  <h4 className="font-display text-lg md:text-xl font-medium text-ink mb-2">{d.title}</h4>
                  <p className="text-[14px] md:text-[15px] text-ink-soft/90 leading-relaxed font-light">{d.desc}</p>
                </div>
                <span className="font-mono text-[10.5px] text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-1.5 rounded-full whitespace-nowrap order-first md:order-last shrink-0 uppercase tracking-wide font-bold">
                  {d.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section id="impact" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="09 · RESULTS" title="Outcomes & Business Impact" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { m: "Improved", l: "Week-4 retention", c: "Sustained engagement through personalized plans.", ok: true },
              { m: "Higher", l: "Completion of risk onboarding", c: "Streamlined region-aware consent flow.", ok: true },
              { m: "Unified", l: "One health record across all modules", c: "Replaced fragmented tracking with a single connected profile.", ok: true },
              { m: "Reduced", l: "Manual report compilation for care teams", c: "Replaced with on-demand, clinician-ready exports.", ok: true }
            ].map((o, i) => (
              <div key={i} className="bg-surface border border-line rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                <span className={`font-mono text-xs font-semibold tracking-[0.1em] mb-2 block uppercase ${!o.ok ? 'text-amber-600 dark:text-amber-400' : 'text-teal-600 dark:text-teal-400'}`}>{o.m}</span>
                <h4 className="font-display text-[15px] font-medium text-ink mb-1.5">{o.l}</h4>
                <div className="text-[13.5px] text-ink-soft/90 font-light leading-relaxed">{o.c}</div>
              </div>
            ))}
          </div>
          


          <h3 className="font-display text-xl md:text-2xl text-ink leading-tight mt-16 mb-6">Business Goal → Design Response</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { k: "Early Detection", v: "AI Risk Engine surfaces trend-based alerts before symptoms appear." },
              { k: "Personalization", v: "Longevity Twin and AI Coach translate the score into individual next steps." },
              { k: "Compliance", v: "Privacy Control Center centralizes consent, region, and export controls." },
              { k: "Engagement", v: "Community, plans, and calibrated nudges extend usage past week two." },
              { k: "Care Connectivity", v: "Granular sharing gives providers a clean, audit-ready view on request." },
              { k: "Scale to Longevity", v: "Entity-based IA extends into diet, exercise, and meditation without rework." }
            ].map((item, i) => (
              <div key={i} className="border border-line rounded-2xl p-5 bg-surface shadow-sm">
                <span className="font-mono text-[10.5px] font-semibold text-teal-600 dark:text-teal-400 tracking-[0.07em] mb-2 display-block uppercase">{item.k}</span>
                <p className="text-[14px] text-ink-soft/90 font-light leading-relaxed">{item.v}</p>
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
          
          <div className="flex flex-wrap gap-2.5 mb-10">
            {["Figma", "FigJam", "Miro", "Protopie", "UX Strategy", "Product Thinking", "User Research", "Stakeholder Interviews", "Journey Mapping", "Information Architecture", "User Flows", "Wireframing", "High-Fidelity UI Design", "Design Systems", "Design Tokens", "Prototyping", "Usability Validation", "WCAG 2.1 Accessibility", "Responsive Design (Web + Mobile)", "Developer Handoff", "Cross-Functional Collaboration", "HIPAA / Regional Compliance UX", "Health & AI Product Design", "0→1 Product Design"].map(skill => (
              <span key={skill} className="bg-surface/50 border border-line rounded-full px-4 py-1.5 text-xs md:text-[13px] text-ink-soft/90">{skill}</span>
            ))}
          </div>
        </section>

        {/* Reflection */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 mb-16">
          <SectionHeader eyebrow="11 · REFLECTION" title="What This Project Sharpened" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-12">
            <p>Designing VitaMind AI sat at the intersection of clinical precision, regulatory complexity, and a deeply personal subject — someone's own heart health. It sharpened my ability to make high-stakes, high-density health data feel calm and actionable rather than clinical or alarming, and to build a system flexible enough to grow from a single risk score into a full longevity platform, without losing the trust the first screen has to earn.</p>
          </div>

          <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-[2rem] overflow-hidden bg-surface border border-line shadow-sm relative group">
            <img src="/vitamind-sharpened.jpg" alt="VitaMind AI Dashboard - Clinical Data Review" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
