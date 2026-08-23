import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, Cursor } from "@/components/portfolio";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import credinHeroImg from "@/assets/credin-hero.jpg";
import credinProblemImg from "@/assets/credin-problem.png";
import credinIaImg from "@/assets/credin-ia.jpg";



export const Route = createFileRoute(
  "/case-studies/credin"
)({
  component: CredinCaseStudy,
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

function CredinCaseStudy() {
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
                <span className="text-teal-600 dark:text-teal-400">CREDIN</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-ink mb-8 tracking-tight">
                Designing a Unified Credit & Leasing App — From Application to Disbursement
              </h1>
              
              <p className="text-lg md:text-xl text-ink-soft/90 font-light leading-relaxed mb-12">
                A single mobile lending platform that lets individuals and businesses apply for personal loans, business capital, or vehicle and machinery leasing — and track every rupee from application to disbursement in one continuous, premium-feeling journey. By replacing a fragmented, form-heavy borrowing experience with a fast, transparent, glass-and-dark-mode interface, the product turns loan applications from a source of anxiety into a confident, almost effortless act — while giving the business a single funnel to convert, underwrite, and disburse across three very different credit products.
              </p>
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
              className="w-full flex items-center justify-center relative group bg-transparent mb-[100px]"
            >
              <img src="/credin-hero-mockups-v0.png" alt="Credin Mobile App Overview" className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between mt-16 pb-12 border-b border-line/60">
              <div className="flex flex-col gap-6 w-full md:w-3/4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <span className="font-mono text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">CLIENT</span>
                    <span className="text-[13.5px] md:text-[15px] text-ink font-medium">Fintech Lending Platform</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">INDUSTRY</span>
                    <span className="text-[13.5px] md:text-[15px] text-ink font-medium">Consumer & SME Credit</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">TIMELINE</span>
                    <span className="text-[13.5px] md:text-[15px] text-ink font-medium">6 Months</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">PROJECT TYPE</span>
                    <span className="text-[13.5px] md:text-[15px] text-ink font-medium">0→1 Mobile App (iOS + Android)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="APPROACH" title="What's Included In The Services?" />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-8 space-y-6">
            <p>We believe a lending product is only as trustworthy as its interface — every screen either builds or erodes confidence in a decision involving someone's money. Our approach paired rigorous credit-journey mapping with a premium, restrained visual language.</p>
            <p>Our design philosophy centered on:</p>
            <ul className="list-disc pl-5 mt-6 space-y-4">
              <li><strong className="font-medium text-ink">Trust Through Clarity</strong> — Every number, rate, and fee visible before commitment, never buried in fine print.</li>
              <li><strong className="font-medium text-ink">Frictionless Speed</strong> — Reducing an inherently document-heavy process to the fewest possible taps.</li>
              <li><strong className="font-medium text-ink">Premium Restraint</strong> — Dark-mode-first, glassmorphism used sparingly to signal quality, not decorate for its own sake.</li>
            </ul>
          </div>
          <Callout>
            <em className="font-medium text-ink">Every borrowing journey we design is measured in trust earned per screen, not just conversion per funnel.</em>
          </Callout>
        </section>

        {/* Executive Summary */}
        <section id="executive-summary" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/30">
          <SectionHeader eyebrow="FOR EXECUTIVE REVIEWERS" title="Executive Summary" subtitle="The business case, in the time it takes to read four lines." />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">Business Problem</span>
              <p className="text-[14px] text-ink-soft/90 font-light leading-relaxed">Three loan products had separate, inconsistent application flows causing drop-off and support load.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">Design Response</span>
              <p className="text-[14px] text-ink-soft/90 font-light leading-relaxed">One adaptive application engine branching into specific steps and reconverging to one disbursement flow.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">My Ownership</span>
              <p className="text-[14px] text-ink-soft/90 font-light leading-relaxed">Sole product designer — research, IA, UI, and dark/light system handoff.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">Business Outcome</span>
              <p className="text-[14px] text-ink-soft/90 font-light leading-relaxed">Reduced abandonment, faster turnaround, and a single scalable design system.</p>
            </div>
          </div>
        </section>

        {/* 01 The Problem */}
        <section id="problem" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="01 · CONTEXT" title="The Problem" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-12 space-y-6">
            <p>Borrowing money is already an emotionally loaded act — most digital lending apps make it worse by treating every applicant like a form to be filled rather than a person making a real financial decision. Personal loan seekers, small business owners, and fleet operators leasing vehicles or machinery all land on wildly different flows, built at different times by different teams, with inconsistent language around interest rates, tenure, processing fees, and disbursement timelines.</p>
            <p>For a lending business, this fragmentation isn't a cosmetic issue — it <strong className="font-medium text-ink">directly slows conversion, increases drop-off at KYC and document-upload steps, creates inconsistent data for the underwriting engine, and inflates support-ticket volume</strong> from confused applicants asking "where is my money."</p>
            <p>Lending products also carry constraints most consumer apps don't: every screen touches regulated financial data, trust has to be earned in seconds before a user shares PAN, Aadhaar, or bank statements, and the same core flow has to flex across loan tickets ranging from a ₹25,000 personal loan to a multi-lakh machinery lease.</p>
          </div>

          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden bg-[#F5F5F5] border border-line flex items-center justify-center text-muted-foreground shadow-sm relative group">
            <img src="/credin-problem-v01.jpg" alt="Credin Problem Section Visual" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0 bg-black/35 mix-blend-multiply pointer-events-none transition-opacity duration-700 group-hover:opacity-80"></div>
          </div>

          <Callout>
            <strong className="font-medium text-ink">Why this was hard, not just big:</strong> the same application engine had to feel instant and light for a ₹50,000 personal loan, and rigorous and document-heavy for a business lease — without either applicant feeling like the product wasn't built for them.
          </Callout>

          <h3 className="font-display text-2xl text-ink mt-16 mb-6">Business Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-line bg-surface rounded-2xl p-6">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">CONVERSION</span>
              <p className="text-[14px] text-ink-soft/90 font-light">Reduce drop-off at document upload and KYC steps.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">TRUST</span>
              <p className="text-[14px] text-ink-soft/90 font-light">Make every fee, rate, and deduction visible before the applicant commits.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">SPEED</span>
              <p className="text-[14px] text-ink-soft/90 font-light">Cut the time from "apply" to "disbursed" for pre-qualified users.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">COMPLIANCE</span>
              <p className="text-[14px] text-ink-soft/90 font-light">Capture consistent, structured data at every step to support underwriting and audit needs.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">SCALE</span>
              <p className="text-[14px] text-ink-soft/90 font-light">Build one engine that supports current and future loan/lease products without a redesign.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <span className="font-mono text-[10.5px] font-semibold text-teal-600 tracking-[0.07em] mb-2 block uppercase">RETENTION</span>
              <p className="text-[14px] text-ink-soft/90 font-light">Give repayment and credit-building a first-class in-app experience, not just a transaction log.</p>
            </div>
          </div>
        </section>

        {/* 02 Discovery */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/30">
          <SectionHeader eyebrow="02 · DISCOVERY" title="Research & Discovery" />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-8 space-y-6">
            <p>Before any screen was designed, the goal was to understand how three very different borrower types actually make a borrowing decision — and where trust breaks down in existing lending apps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="font-display text-xl text-ink mb-4">Stakeholder Interviews</h4>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed"><strong className="font-medium text-ink">Cross-functional discovery sessions</strong> — Structured conversations with underwriting, collections, and customer support teams to surface where existing flows caused the most drop-off and the most support tickets.</p>
            </div>
            <div>
              <h4 className="font-display text-xl text-ink mb-4">Competitive / Market Audit</h4>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed"><strong className="font-medium text-ink">Benchmarking premium fintech UX patterns</strong> — Studied interaction language from category-leading consumer fintech apps (CRED, super apps, neobanks) to understand what "premium" and "trustworthy" look like in this space before defining our own visual system.</p>
            </div>
            <div>
              <h4 className="font-display text-xl text-ink mb-4">Journey Mapping</h4>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed"><strong className="font-medium text-ink">End-to-end mapping per loan type</strong> — Built journey maps for personal loans, business loans, and asset leasing separately, then overlaid them to find the common skeleton beneath three different surface flows.</p>
            </div>
            <div>
              <h4 className="font-display text-xl text-ink mb-4">Risk & Trust Audit</h4>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed"><strong className="font-medium text-ink">Trust-drop-off audit</strong> — Identified the exact screens (bank statement upload, e-mandate setup, interest rate disclosure) where applicants historically hesitated or abandoned, to prioritize which moments needed the most design attention.</p>
            </div>
          </div>
          

        </section>

        {/* 03 Users */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="03 · USERS" title="User Segments" />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-8">
            <p>Three named borrower types, plus one internal reviewer role, used to prioritize every design decision.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-4 px-4 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">Segment</th>
                  <th className="py-4 px-4 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primary Job</th>
                  <th className="py-4 px-4 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">Core Pain Point</th>
                  <th className="py-4 px-4 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">What They Need</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                <tr>
                  <td className="py-5 px-4 font-medium text-ink">Personal Loan Borrower</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Get quick funds for a personal need (medical, travel, consolidation)</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Long forms, unclear total repayment amount, hidden fees</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">A 2-minute application, clear EMI breakdown, instant eligibility check</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 font-medium text-ink">Business Owner (SME)</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Access working capital or expansion funds</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Document-heavy process, unclear turnaround time</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Structured document checklist, visible processing status, dedicated support</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 font-medium text-ink">Fleet / Equipment Operator</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Lease a vehicle or machinery instead of buying outright</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Complex asset valuation, long approval cycles</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Asset-specific application path, lease-vs-buy clarity, milestone-based tracking</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 font-medium text-ink">Credit/Risk Reviewer (internal)</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Review and approve applications</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Inconsistent data across loan types slows manual review</td>
                  <td className="py-5 px-4 text-ink-soft/90 font-light">Structured, consistent data capture regardless of loan type</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 04 Structure / IA */}
        <section id="structure" className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/30">
          <SectionHeader eyebrow="04 · STRUCTURE" title="Information Architecture" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-12">
            <p>The single highest-leverage decision on this project: designing one adaptive application engine instead of three parallel flows, so every loan type shares the same skeleton and only diverges where the underlying product genuinely requires it.</p>
            <ul className="list-disc pl-5 mt-6 space-y-4">
              <li><strong className="font-medium text-ink">One entry, three branches</strong> — A single "Apply" action that asks one qualifying question (loan purpose), then routes into a product-specific set of steps without ever feeling like a separate app.</li>
              <li><strong className="font-medium text-ink">Shared core, flexible middle</strong> — Identity verification, income/KYC, and e-signature stages are identical across all three products; only the eligibility, document, and asset-specific steps change.</li>
              <li><strong className="font-medium text-ink">Reconverging end state</strong> — Regardless of entry point, every application lands on the same disbursement, repayment, and credit-tracking experience — one dashboard for the user, no matter what they borrowed for.</li>
            </ul>
          </div>
          
          <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-muted-foreground relative group bg-transparent">
            <img src="/credin-iaa.png" alt="Credin Information Architecture" className="absolute inset-0 w-full h-full object-contain scale-[1.1] transition-transform duration-700 group-hover:scale-[1.15]" />
          </div>
        </section>

        {/* 05 Process */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="05 · PROCESS" title="User Flows & Wireframing" />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-12 space-y-6">
            <p>Low-fidelity first, on the highest-stakes journeys, validated before any visual design began.</p>
            
            <div className="space-y-8 mt-8">
              <div>
                <h4 className="font-medium text-ink text-lg">1. Task analysis</h4>
                <p>Broke each of the three loan journeys — personal, business, asset lease — into discrete tasks and decision points, from purpose selection through to disbursement confirmation.<br/><em className="text-sm text-muted-foreground mt-1 block">Output: task flows</em></p>
              </div>
              <div>
                <h4 className="font-medium text-ink text-lg">2. Low-fidelity wireframes</h4>
                <p>Sketched structural layouts for onboarding, eligibility check, document upload, and disbursement tracking to validate hierarchy before any visual design was applied.<br/><em className="text-sm text-muted-foreground mt-1 block">Output: lo-fi wireframes, stakeholder sign-off</em></p>
              </div>
              <div>
                <h4 className="font-medium text-ink text-lg">3. Mid-fidelity iteration</h4>
                <p>Layered in real content density — actual KYC document types, EMI calculation tables, e-mandate language — to pressure-test whether the structure held up under real financial content, not placeholder text.<br/><em className="text-sm text-muted-foreground mt-1 block">Output: mid-fi flows</em></p>
              </div>
              <div>
                <h4 className="font-medium text-ink text-lg">4. High-fidelity UI</h4>
                <p>Applied the dark/light design system to bring each flow to production-ready fidelity, with the CRED-inspired glassmorphism treatment reserved for key trust moments — credit score reveal, loan offer card, disbursement confirmation.<br/><em className="text-sm text-muted-foreground mt-1 block">Output: hi-fi screens (15–20 screen end-to-end journey)</em></p>
              </div>
            </div>
          </div>

          <h3 className="font-display text-2xl text-ink mb-6">The 15–20 Screen Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              { id: 1, screen: "Splash / Onboarding carousel", purpose: "First-impression brand moment, dark-mode default" },
              { id: 2, screen: "Sign Up / Login (mobile OTP)", purpose: "Fast, low-friction identity entry" },
              { id: 3, screen: "Home Dashboard", purpose: "Credit score ring, active loans, quick-apply CTA" },
              { id: 4, screen: "Loan Purpose Selector", purpose: "Branches into personal / business / lease" },
              { id: 5, screen: "Eligibility Check (instant)", purpose: "Soft-pull credit signal, shows indicative amount" },
              { id: 6, screen: "Loan Amount & Tenure Slider", purpose: "Interactive EMI calculator, glass card" },
              { id: 7, screen: "Personal/Business/Asset Details Form", purpose: "Product-specific data capture" },
              { id: 8, screen: "KYC — PAN/Aadhaar Capture", purpose: "Camera-based document scan" },
              { id: 9, screen: "Income Verification", purpose: "Bank statement / salary slip upload" },
              { id: 10, screen: "Document Checklist (business/lease)", purpose: "Structured multi-doc upload with status" },
              { id: 11, screen: "Asset Valuation (lease only)", purpose: "Vehicle/machinery details, valuation estimate" },
              { id: 12, screen: "Loan Offer Summary", purpose: "Rate, fees, total repayment — full transparency" },
              { id: 13, screen: "e-Mandate / Auto-debit Setup", purpose: "Bank account linking for EMI collection" },
              { id: 14, screen: "e-Signature", purpose: "Digital agreement signing" },
              { id: 15, screen: "Application Review / Status", purpose: "Real-time status tracker" },
              { id: 16, screen: "Disbursement Confirmation", purpose: "Glass-effect celebratory confirmation screen" },
              { id: 17, screen: "Repayment Dashboard", purpose: "EMI schedule, upcoming payments" },
              { id: 18, screen: "Transaction & History", purpose: "Full ledger view" },
              { id: 19, screen: "Credit Score Tracker", purpose: "Score trend over time, tips to improve" },
              { id: 20, screen: "Profile & Settings", purpose: "Account management, theme switch" },
            ].map((step) => (
              <div key={step.id} className="p-5 border border-line bg-surface/50 rounded-xl hover:bg-surface transition-colors group h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-mono font-bold tracking-wider group-hover:bg-teal-500/20 transition-colors">
                    {step.id.toString().padStart(2, '0')}
                  </span>
                  <h5 className="font-medium text-ink text-sm leading-tight mt-1">{step.screen}</h5>
                </div>
                <p className="text-[13px] text-ink-soft/80 font-light leading-relaxed">{step.purpose}</p>
              </div>
            ))}
          </div>

          <div className="w-full mt-16 flex items-center justify-center relative group overflow-hidden rounded-[2rem]">
            <img src="/appscreens.png" alt="Credin User Flows and Screens" className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
          </div>
        </section>

        {/* 06 Validation */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/30">
          <SectionHeader eyebrow="06 · VALIDATION" title="Usability Validation" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-8">
            <p>Each flow was reviewed with representative applicants before development — personal loan flows walked through with individual borrowers, business and lease flows with SME owners — to catch product-specific misunderstandings a generalist review would miss.</p>
            <p className="mt-4"><strong className="font-medium text-ink">Validation Method:</strong> Reviewed with 6 representative applicants across personal, business, and lease borrower types across two rounds of moderated testing. Feedback loops fed directly back into the mid-fidelity stage rather than waiting until hi-fi, keeping the cost of change low and ensuring the complex document-upload steps felt secure and clear to actual borrowers before a single line of code was written.</p>
          </div>
          

        </section>

        {/* 07 System */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="07 · SYSTEM" title="Product Modules" />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-8">
            <p>Three entry paths, one shared engine. Each module serves a distinct borrower job, sharing the same underlying components.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="border border-line bg-surface rounded-2xl p-6">
              <strong className="font-medium text-ink block mb-2">Onboarding & Identity</strong>
              <p className="text-sm text-ink-soft/90 font-light">Sign-up, OTP login, PAN/Aadhaar capture, biometric options</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <strong className="font-medium text-ink block mb-2">Eligibility & Offer Engine</strong>
              <p className="text-sm text-ink-soft/90 font-light">Instant soft-pull check, interactive EMI/tenure slider, transparent offer card</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <strong className="font-medium text-ink block mb-2">Application Intake</strong>
              <p className="text-sm text-ink-soft/90 font-light">Product-specific forms — personal details, business documents, or asset valuation</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <strong className="font-medium text-ink block mb-2">KYC & Compliance</strong>
              <p className="text-sm text-ink-soft/90 font-light">Document upload, e-mandate setup, e-signature, audit-ready data capture</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <strong className="font-medium text-ink block mb-2">Disbursement & Tracking</strong>
              <p className="text-sm text-ink-soft/90 font-light">Real-time status, disbursement confirmation, fund transfer visibility</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6">
              <strong className="font-medium text-ink block mb-2">Repayment & Credit Health</strong>
              <p className="text-sm text-ink-soft/90 font-light">EMI schedule, auto-debit management, credit score tracking, statement history</p>
            </div>
          </div>

          <h3 className="font-display text-2xl text-ink mb-6">Design System</h3>
          <p className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-6">
            Built a scalable, token-based dark/light design system so a ₹25,000 personal loan card and a multi-lakh lease agreement view could share one visual language without either feeling under- or over-designed for its stakes.
          </p>
          <div className="flex flex-wrap gap-2 mb-12">
            {['Semantic color tokens', 'Dark/Light adaptive theming', 'Glassmorphism card system', 'Typography scale', 'Component library', 'Data visualization (EMI, credit score)', 'Micro-interactions', 'WCAG 2.1 accessibility'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-surface border border-line rounded-full text-xs font-mono text-muted-foreground">{tag}</span>
            ))}
          </div>
        </section>

        {/* 08 Rationale */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/30">
          <SectionHeader eyebrow="08 · RATIONALE" title="Key Design Decisions" />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-12">
            <p>Where the real design thinking happened — what to hide, group, or surface, and why.</p>
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-display text-xl text-ink">One application engine, three entry points</h4>
                <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/30 rounded text-[10px] font-mono font-semibold tracking-wider">ARCHITECTURE</span>
              </div>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed">Anchored every loan type to a single underlying flow so a personal loan applicant and a business owner were always moving through the same trusted skeleton — just diverging where the product genuinely required it. Eliminated the inconsistent data-capture problem the old fragmented flows created.</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-display text-xl text-ink">Glassmorphism reserved for trust moments, not decoration</h4>
                <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/30 rounded text-[10px] font-mono font-semibold tracking-wider">VISUAL HIERARCHY</span>
              </div>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed">Rather than applying the CRED-style glass effect uniformly, it was deliberately concentrated on the moments that carry the most emotional weight — the offer card, the disbursement confirmation, the credit score reveal — so the effect signals significance instead of becoming visual noise.</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-display text-xl text-ink">Full fee transparency before commitment</h4>
                <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/30 rounded text-[10px] font-mono font-semibold tracking-wider">TRUST</span>
              </div>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed">Every rate, processing fee, and total repayment amount is shown before the e-mandate step, not disclosed progressively — directly addressing the biggest driver of borrower distrust identified in discovery.</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-display text-xl text-ink">Dark mode as the default, not an afterthought</h4>
                <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/30 rounded text-[10px] font-mono font-semibold tracking-wider">BRAND</span>
              </div>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed">Designed dark-first to match the premium fintech aesthetic borrowers already associate with quality lending products, with light mode built as a fully-supported second theme rather than an inverted afterthought.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-display text-xl text-ink">Progressive disclosure for document-heavy steps</h4>
                <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/30 rounded text-[10px] font-mono font-semibold tracking-wider">INFORMATION DENSITY</span>
              </div>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed">Layered dense KYC and compliance requirements behind a scan-first, checklist-style summary with drill-down detail — kept the business and lease flows usable without hiding what compliance actually needed.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-display text-xl text-ink">Shared component system across all loan types</h4>
                <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/30 rounded text-[10px] font-mono font-semibold tracking-wider">SCALABILITY</span>
              </div>
              <p className="text-base text-ink-soft/90 font-light leading-relaxed">A single token-based system meant a future fourth loan product could be added without a visual or interaction redesign — a direct trade-off in favor of long-term engineering and design velocity over short-term customization.</p>
            </div>
          </div>
        </section>

        {/* 09 Results */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader eyebrow="09 · RESULTS" title="Outcomes & Business Impact" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="border border-line bg-surface rounded-2xl p-6 text-center flex flex-col justify-start">
              <span className="block text-2xl md:text-3xl font-display text-teal-600 dark:text-teal-400 mb-2">REDUCED</span>
              <p className="text-[13px] text-ink-soft/90 font-light mb-3 border-b border-line pb-3">Application drop-off at document/KYC steps.</p>
              <p className="text-[11.5px] text-muted-foreground font-light text-left leading-relaxed">Validated through usability walkthroughs with 6 representative business and lease applicants where progressive disclosure increased form completion confidence.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6 text-center flex flex-col justify-start">
              <span className="block text-2xl md:text-3xl font-display text-teal-600 dark:text-teal-400 mb-2">FASTER</span>
              <p className="text-[13px] text-ink-soft/90 font-light mb-3 border-b border-line pb-3">Time from application to disbursement.</p>
              <p className="text-[11.5px] text-muted-foreground font-light text-left leading-relaxed">Measured via task-analysis benchmarks showing a reduction in required taps and manual data entry during the e-mandate and document upload steps.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6 text-center flex flex-col justify-start">
              <span className="block text-2xl md:text-3xl font-display text-teal-600 dark:text-teal-400 mb-2">CENTRALIZED</span>
              <p className="text-[13px] text-ink-soft/90 font-light mb-3 border-b border-line pb-3">Underwriting data capture across all three loan products.</p>
              <p className="text-[11.5px] text-muted-foreground font-light text-left leading-relaxed">Confirmed during cross-functional discovery with the risk team, mapping one consistent data schema to replace three fragmented legacy tables.</p>
            </div>
            <div className="border border-line bg-surface rounded-2xl p-6 text-center flex flex-col justify-start">
              <span className="block text-2xl md:text-3xl font-display text-teal-600 dark:text-teal-400 mb-2">UNIFIED</span>
              <p className="text-[13px] text-ink-soft/90 font-light mb-3 border-b border-line pb-3">Design system now serves current and future credit products.</p>
              <p className="text-[11.5px] text-muted-foreground font-light text-left leading-relaxed">Demonstrated by building the third module (equipment leasing) using 100% existing design tokens and components without introducing new UI patterns.</p>
            </div>
          </div>



          <h3 className="font-display text-2xl text-ink mt-16 mb-6">Business Goal → Design Response</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 border-b border-line pb-4 gap-4">
              <strong className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-1">CONVERSION</strong>
              <p className="md:col-span-2 text-ink-soft/90 font-light">Adaptive application engine reduces steps and re-entry across all three loan types.</p>
            </div>
            <div className="grid md:grid-cols-3 border-b border-line pb-4 gap-4">
              <strong className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-1">TRUST</strong>
              <p className="md:col-span-2 text-ink-soft/90 font-light">Full fee/rate transparency shown before commitment, at every loan type.</p>
            </div>
            <div className="grid md:grid-cols-3 border-b border-line pb-4 gap-4">
              <strong className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-1">SPEED</strong>
              <p className="md:col-span-2 text-ink-soft/90 font-light">Instant eligibility check and interactive EMI slider shorten decision time.</p>
            </div>
            <div className="grid md:grid-cols-3 border-b border-line pb-4 gap-4">
              <strong className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-1">COMPLIANCE</strong>
              <p className="md:col-span-2 text-ink-soft/90 font-light">Structured KYC and e-mandate flow captures consistent, audit-ready data.</p>
            </div>
            <div className="grid md:grid-cols-3 border-b border-line pb-4 gap-4">
              <strong className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-1">SCALE</strong>
              <p className="md:col-span-2 text-ink-soft/90 font-light">Shared component system and entity-based IA extend to future loan products without rework.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <strong className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-1">RETENTION</strong>
              <p className="md:col-span-2 text-ink-soft/90 font-light">Credit score tracker and repayment dashboard give the app a reason to be opened after disbursement.</p>
            </div>
          </div>
        </section>

        {/* 10 Capabilities */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/30">
          <SectionHeader eyebrow="10 · CAPABILITIES DEMONSTRATED" title="Skills & Methods" />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-8">
            <p>Keyword-relevant capabilities this project demonstrates end-to-end — useful for ATS parsing and recruiter scanning.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {['Figma', 'FigJam', 'Miro', 'Protopie', 'Product Thinking', 'UX Strategy', 'User Research', 'Stakeholder Interviews', 'Journey Mapping', 'Information Architecture', 'User Flows', 'Wireframing', 'High-Fidelity UI Design', 'Design Systems', 'Design Tokens', 'Dark/Light Mode Theming', 'Glassmorphism / Visual Effects', 'Prototyping', 'Usability Validation', 'WCAG 2.1 Accessibility', 'Fintech UX', 'Lending / Credit Product Design', '0→1 Mobile App Design', 'Developer Handoff', 'Cross-Functional Collaboration', 'Fintech Compliance UX', 'EMI/Interest Rate UI'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-background border border-line rounded-lg text-sm text-ink-soft">{tag}</span>
            ))}
          </div>
        </section>

        {/* 11 Reflection */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 mb-16">
          <SectionHeader eyebrow="11 · REFLECTION" title="What This Project Sharpened" />
          
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light mb-12">
            <p>Designing Credin strengthened my ability to take an emotionally-loaded, compliance-heavy financial journey and turn it into something that feels fast and trustworthy at every step — without simplifying away the rigor a lending business actually needs behind the scenes. It sharpened a specific skill: building one flexible system that serves three genuinely different borrower needs, rather than defaulting to three separate, inconsistent products.</p>
          </div>

          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden bg-[#F5F5F5] border border-line flex items-center justify-center text-muted-foreground shadow-sm relative group">
            <img src="/credin-reflection.jpg" alt="Credin Final Reflection" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0 bg-black/35 mix-blend-multiply pointer-events-none transition-opacity duration-700 group-hover:opacity-80"></div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
