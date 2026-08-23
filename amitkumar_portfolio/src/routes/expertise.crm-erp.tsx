import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, Footer, Cursor, ContactModal } from "@/components/portfolio";
import { motion } from "framer-motion";
import { BarChart3, PackageSearch, Headset, Receipt, Users, Lock, Layers, Grid, Compass, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

export const Route = createFileRoute(
  "/expertise/crm-erp"
)({
  component: CrmErpPage,
});

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string, title: string, subtitle?: string }) {
  return (
    <div className="mb-10">
      <span className="font-mono text-xs md:text-sm font-semibold text-accent tracking-[0.1em] uppercase mb-3 block">
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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] md:text-xs text-ink-soft/90 border border-line px-4 py-2 rounded-full bg-surface">
      {children}
    </span>
  );
}

function CrmErpPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [contactOpen, setContactOpen] = useState(false);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  const closeLightbox = () => {
    setActiveImage(null);
    setZoomLevel(1);
  };

  return (
    <>
      <Cursor />
      <main className="min-h-screen bg-background text-foreground overflow-x-clip font-sans">
        <Nav />
        
        {/* Hero Section */}
        <section className="pt-28 md:pt-36 pb-16 px-4 md:px-8 lg:px-[120px]">
          <div className="w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              
              {/* BREADCRUMB */}
              <div className="font-mono text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                <Link to="/" className="hover:text-ink transition-colors">Home</Link>
                <span>/</span>
                <span className="text-accent">CRM & ERP Systems</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-ink mb-8 tracking-tight">
                CRM & ERP Systems
              </h1>
              
              <p className="text-lg md:text-xl text-ink-soft/90 font-light leading-relaxed mb-12">
                Designing the intelligent systems that power global sales, operations, and finance. I specialize in transforming fragmented, legacy workflows into cohesive, high-performance platforms where complex data feels instantly actionable, intuitive, and remarkably clear.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Dashboards", "Workflow Automation", "Role-Based Access", "Multi-Tenant", "Data Visualization"].map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>

            </motion.div>
          </div>
        </section>

        {/* 3. OVERVIEW SECTION */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="DOMAIN EXPERTISE" 
            title="Why CRM/ERP design is different" 
          />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light space-y-6">
            <p>
              Enterprise CRM and ERP systems are the lifeblood of modern business, managing vast webs of interconnected data across multiple, diverse user roles. The true design challenge in this space isn't about applying a fresh coat of paint or chasing decorative trends—it's about architecting absolute clarity, establishing robust information hierarchies, and building scalable patterns that can adapt to thousands of edge cases without breaking.
            </p>
            <p>
              A single dashboard in these environments often serves entirely different personas simultaneously—from compliance officers needing audit-level precision, to executives seeking high-level fleet telemetry, to field operators navigating tasks on a mobile device. Every screen must intuitively adapt to distinct permissions, workflows, and priorities, demanding a deeply empathetic and context-aware design methodology.
            </p>
            <p>
              In the enterprise domain, the metrics of success are ruthless and pragmatic. A beautiful interface means nothing if it slows an operator down. Success here is measured by a dramatic reduction in cognitive load, fewer required clicks, faster onboarding times, and a sharp decrease in support tickets. It's about taking the most complex business processes in the world and making them feel entirely effortless.
            </p>
          </div>
        </section>

        {/* 4. SCENARIO GRID */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/20">
          <SectionHeader 
            eyebrow="SCENARIOS" 
            title="Built for every operational scenario" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: "Sales Pipeline Management", desc: "Visualizing deal flow and forecasting" },
              { icon: PackageSearch, title: "Inventory & Supply Chain", desc: "Real-time stock and order tracking" },
              { icon: Headset, title: "Customer Support Ticketing", desc: "Queue management and SLA visibility" },
              { icon: Receipt, title: "Financial Reporting", desc: "Dashboards for revenue, expenses, and audits" },
              { icon: Users, title: "HR & Payroll Workflows", desc: "Onboarding, approvals, and compliance" },
              { icon: Lock, title: "Multi-Tenant Admin Console", desc: "Role-based access and org-level controls" },
            ].map((card, i) => (
              <div 
                key={i} 
                className="group border border-line bg-background p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <card.icon className="w-8 h-8 text-accent mb-6 stroke-[1.5px]" />
                <h4 className="font-display text-xl font-medium text-ink mb-3">{card.title}</h4>
                <p className="text-sm md:text-[15px] text-ink-soft/90 font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. DESIGN APPROACH */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="METHODOLOGY" 
            title="How I approach complex systems" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8">
            {[
              { num: "01", icon: Layers, title: "Data Hierarchy First", desc: "Surface what matters most immediately, and progressively disclose the rest." },
              { num: "02", icon: Users, title: "Role-Aware Interfaces", desc: "Every screen adapts its capabilities and layout to the specific user's context and permissions." },
              { num: "03", icon: Compass, title: "Workflow Over Wireframes", desc: "Map the entire operational process before designing the first pixel." },
              { num: "04", icon: Grid, title: "Consistency at Scale", desc: "Systemized components and design tokens that hold up seamlessly across 50+ screens." },
            ].map((approach, i) => (
              <div key={i} className="flex gap-6 border border-line rounded-2xl p-6 bg-surface">
                <div className="shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent font-mono text-sm border border-accent/20">
                    {approach.num}
                  </div>
                </div>
                <div>
                  <h4 className="font-display text-xl text-ink mb-2">{approach.title}</h4>
                  <p className="text-sm md:text-[15px] text-ink-soft/90 leading-relaxed font-light">{approach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FEATURED WORK */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="FEATURED WORK" 
            title="Notable projects in this space" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Coral Shift Manager",
                desc: "A comprehensive staff scheduling and shift management tool.",
                tags: ["HR", "Scheduling"],
                image: "/portfolio-mockup-1.jpg",
                fullImage: "/portfolio-unframed-1.png"
              },
              {
                title: "Team Sync Chat",
                desc: "Real-time communication platform with integrated file sharing.",
                tags: ["Collaboration", "SaaS"],
                image: "/portfolio-mockup-2.jpg",
                fullImage: "/portfolio-unframed-2.png"
              },
              {
                title: "BeatBay Streaming",
                desc: "Music streaming interface with personalized playlists and radio.",
                tags: ["Media", "B2C"],
                image: "/portfolio-mockup-3.jpg",
                fullImage: "/portfolio-unframed-3.png"
              },
              {
                title: "E-Commerce Admin",
                desc: "Inventory and product management dashboard for retail.",
                tags: ["Retail", "Inventory"],
                image: "/portfolio-mockup-4.jpg",
                fullImage: "/portfolio-unframed-4.png"
              },
              {
                title: "Finance Dashboard",
                desc: "Personal wealth tracking, card management, and transfers.",
                tags: ["FinTech", "Banking"],
                image: "/portfolio-mockup-5.jpg",
                fullImage: "/portfolio-unframed-5.png"
              },
              {
                title: "Coffee POS System",
                desc: "Point of sale interface for quick service restaurants.",
                tags: ["POS", "Food & Beverage"],
                image: "/portfolio-mockup-6.jpg",
                fullImage: "/portfolio-unframed-6.png"
              },
              {
                title: "E-Learning Portal",
                desc: "Video course platform with assignments and progress tracking.",
                tags: ["EdTech", "Platform"],
                image: "/portfolio-mockup-7.jpg",
                fullImage: "/portfolio-unframed-7.png"
              },
              {
                title: "Property Manager",
                desc: "Real estate dashboard tracking sales, maintenance, and revenue.",
                tags: ["Real Estate", "Analytics"],
                image: "/portfolio-mockup-8.jpg",
                fullImage: "/portfolio-unframed-8.png"
              }
            ].map((project, i) => (
              <div 
                key={i} 
                className="group rounded-3xl bg-surface border border-line overflow-hidden cursor-pointer shadow-sm flex flex-col h-full"
                onClick={() => setActiveImage(project.fullImage)}
              >
                <div className="aspect-[4/3] bg-line/20 relative overflow-hidden flex items-center justify-center shrink-0">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 flex flex-col grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-teal-500/20 text-teal-600 bg-teal-50 dark:bg-teal-900/30">Concept Exploration</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-line text-ink-soft/90 bg-background">{project.tags[0]}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-line text-ink-soft/90 bg-background">{project.tags[1]}</span>
                  </div>
                  <h3 className="font-display text-lg font-medium text-ink mb-2">{project.title}</h3>
                  <p className="text-xs md:text-sm text-ink-soft/90 font-light leading-relaxed mb-6 grow">{project.desc}</p>
                  <span className="inline-flex items-center text-accent text-sm font-medium group-hover:underline mt-auto">
                    View project <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CONCLUSION / CTA */}
        <section className="px-4 md:px-8 lg:px-[120px] py-20 md:py-32 flex flex-col items-center justify-center text-center">
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-6">
            Let's build better systems
          </h2>
          <p className="text-base md:text-xl font-light text-ink-soft/90 mb-10 leading-relaxed max-w-2xl">
            Complex systems don't have to feel complicated. If you're building a CRM or ERP product and want it to feel this clear, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <button onClick={() => setContactOpen(true)} className="w-full sm:flex-1 py-4 rounded-full bg-ink text-background font-medium hover:bg-accent transition-colors text-center">
              Get in touch
            </button>
            <Link to="/" className="w-full sm:flex-1 py-4 rounded-full bg-surface border border-line text-ink hover:bg-surface/80 transition-colors text-center">
              View full portfolio
            </Link>
          </div>
        </section>

        <Footer />
      </main>

      {/* Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
          {/* Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
            <button onClick={handleZoomOut} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" title="Zoom Out">
              <ZoomOut className="w-5 h-5" />
            </button>
            <button onClick={handleZoomIn} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" title="Zoom In">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button onClick={closeLightbox} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors ml-4" title="Close">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image */}
          <div className="overflow-auto w-full h-full flex items-center justify-center p-8" onClick={closeLightbox}>
            <img 
              src={activeImage} 
              alt="Project Fullscreen" 
              className="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-300 ease-out" 
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
