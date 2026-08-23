import { useState, useRef, MouseEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, Cursor, ContactModal } from "@/components/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Target, LayoutTemplate, Calendar, Hourglass, UserCircle, ShoppingCart, X, ZoomIn, ZoomOut } from "lucide-react";

export const Route = createFileRoute(
  "/expertise/web-design"
)({
  component: WebDesignPage,
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

function WebDesignPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [contactOpen, setContactOpen] = useState(false);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 1, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

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
        <section className="pt-28 md:pt-36 pb-16 px-4 md:px-8 lg:px-[120px] relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 pointer-events-none" style={{ maskImage: 'radial-gradient(circle at center, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)' }} />
          
          <div className="w-full relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              
              {/* BREADCRUMB */}
              <div className="font-mono text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-accent">Web & Landing Page Design</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-ink mb-8 tracking-tight">
                Web & Landing Page Design
              </h1>
              
              <p className="text-lg md:text-xl text-ink-soft/90 font-light leading-relaxed mb-12">
                Designing digital experiences that load fast, read clearly, and convert relentlessly. A great landing page isn't just a digital brochure; it is a meticulously engineered first impression designed to guide user behavior. By combining striking aesthetics with strategic visual hierarchy, I create performance-driven web presences that capture attention instantly and turn fleeting visits into lasting engagement.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Landing Pages", "Conversion Design", "Responsive Layouts", "Brand Storytelling", "Motion & Micro-interactions"].map((chip) => (
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
            title="Why landing page design is its own discipline" 
          />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light space-y-6">
            <p>
              A landing page has one job — get a single message across and drive one clear action. Unlike a full product UI which must gracefully juggle dozens of complex workflows, a marketing page thrives on ruthless focus. It is the digital equivalent of an elevator pitch, where every headline, image, and micro-interaction must be purposefully engineered to capture attention, build trust, and seamlessly guide the user toward a singular conversion goal.
            </p>
            <p>
              Every element above the fold is locked in a fierce competition with a visitor's fleeting attention span. In a landscape where users decide whether to stay or bounce in mere milliseconds, visual hierarchy and narrative pacing become critical tools. By meticulously pairing compelling copy with striking aesthetic design, we can craft an intuitive flow that respects the user's time while subtly persuading them to continue exploring the story being told.
            </p>
            <p>
              In this discipline, success is purely objective—measured in scroll depth, click-through rates, and lightning-fast load speeds, rather than visual complexity for its own sake. A high-converting page isn't just about looking premium; it's about eliminating cognitive friction. By prioritizing clean layouts, responsive architectures, and accessible design principles, we ensure the page performs flawlessly, turning passive visitors into active customers.
            </p>
          </div>
        </section>

        {/* 4. SCENARIO GRID */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/20">
          <SectionHeader 
            eyebrow="SCENARIOS" 
            title="Built for every kind of launch" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "SaaS Product Launch", desc: "Hero-to-conversion flow for new software products." },
              { icon: LayoutTemplate, title: "Marketing Campaign Pages", desc: "Focused pages built around a single offer or promotion." },
              { icon: Calendar, title: "Event & Webinar Pages", desc: "Registration-first design with urgency and clarity." },
              { icon: Hourglass, title: "Waitlist & Pre-launch Pages", desc: "Building anticipation before a full product ships." },
              { icon: UserCircle, title: "Portfolio & Personal Brand Sites", desc: "Identity-led design for individuals and studios." },
              { icon: ShoppingCart, title: "E-commerce Product Pages", desc: "Trust-building layouts that reduce cart abandonment." },
            ].map((card, i) => (
              <div 
                key={i} 
                className="group border border-line bg-background p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/40 cursor-pointer"
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
            title="How I approach conversion-focused design" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8">
            {[
              { num: "01", title: "One Page, One Goal", desc: "Every section earns its place by supporting a single action." },
              { num: "02", title: "Scroll Is a Story", desc: "Pacing and reveals guide attention instead of dumping everything at once." },
              { num: "03", title: "Speed Is a Design Decision", desc: "Visuals and animations are chosen with load time in mind." },
              { num: "04", title: "Design Systemized", desc: "Reusable components and tokens even for one-off pages, so iteration is fast." },
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

        {/* 6. SELECTED WORK */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="SELECTED WORK" 
            title="Selected work in this space" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Nicktio",
                desc: "The quickest and easiest online payment platform designed to handle all your digital product payment needs.",
                tags: ["Payments", "FinTech"],
                image: "/nicktio-webdesign-mockup-01.jpg",
                fullImage: "/nicktio-webdesign-full-01.jpg"
              },
              {
                title: "Scheduling",
                desc: "Highly flexible scheduling software built specifically to help you succeed by saving you valuable time daily.",
                tags: ["Scheduling", "Software"],
                image: "/scheduling-webdesign-mockup-02.jpg",
                fullImage: "/scheduling-webdesign-full-02.jpg"
              },
              {
                title: "TechVantage",
                desc: "Streamline your entire professional workflow with advanced tools to manage tasks, team communication, and deep analytics.",
                tags: ["B2B", "SaaS"],
                image: "/techvantage-webdesign-mockup-03.jpg",
                fullImage: "/techvantage-webdesign-full-03.jpg"
              },
              {
                title: "Xinder",
                desc: "A dedicated platform for you to search the work of top artists and manage your collection.",
                tags: ["Art", "Marketplace"],
                image: "/xinder-webdesign-mockup-04.jpg",
                fullImage: "/xinder-webdesign-full-04.jpg"
              },
              {
                title: "MedicalRecov",
                desc: "A comprehensive health platform providing a great place for patients to receive professional and quality care.",
                tags: ["Healthcare", "Medical"],
                image: "/medicalrecov-webdesign-mockup-05.jpg",
                fullImage: "/medicalrecov-webdesign-full-05.jpg"
              },
              {
                title: "Homez",
                desc: "Looking to buy a new property or sell an existing one, Homez provides an awesome solution.",
                tags: ["Real Estate", "Property"],
                image: "/homez-webdesign-mockup-06.jpg",
                fullImage: "/homez-webdesign-full-06.jpg"
              },
              {
                title: "Collers",
                desc: "A specialized online marketplace offering a vast selection of rare and highly desirable collectible premium sneakers.",
                tags: ["Sneakers", "Collectibles"],
                image: "/collers-webdesign-mockup-07.jpg",
                fullImage: "/collers-webdesign-full-07.jpg"
              },
              {
                title: "Mabi",
                desc: "A powerful business platform focused on helping you launch your new app to grow your business.",
                tags: ["App Launch", "Business"],
                image: "/mabi-webdesign-mockup-08.jpg",
                fullImage: "/mabi-webdesign-full-08.jpg"
              }
            ].map((project, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImage(project.fullImage)}
                className="group rounded-3xl bg-surface border border-line overflow-hidden cursor-pointer shadow-sm flex flex-col h-full"
              >
                <div className="aspect-[4/3] bg-line/20 relative overflow-hidden flex items-center justify-center shrink-0">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 flex flex-col grow">
                  <div className="flex gap-2 mb-3">
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
            Ready to convert?
          </h2>
          <p className="text-base md:text-xl font-light text-ink-soft/90 mb-10 leading-relaxed max-w-2xl">
            {/* TODO: replace placeholder */}
            A landing page has seconds to make its case. If you want yours to say the right thing, fast, let's talk.
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
          <div className="overflow-auto w-full h-full p-4 md:p-8" onClick={closeLightbox}>
            <div className="min-h-full flex items-center justify-center m-auto">
              <img 
                src={activeImage} 
                alt="Project Fullscreen" 
                className="transition-all duration-300 ease-out" 
                style={{ 
                  width: zoomLevel === 1 ? 'auto' : (zoomLevel === 2 ? '100%' : '150%'),
                  maxWidth: zoomLevel === 1 ? '90vw' : (zoomLevel === 2 ? '1200px' : 'none'),
                  maxHeight: zoomLevel === 1 ? '90vh' : 'none',
                  height: zoomLevel === 1 ? '100%' : 'auto',
                  objectFit: 'contain',
                  cursor: zoomLevel === 3 ? 'zoom-out' : 'zoom-in'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (zoomLevel === 3) handleZoomOut(e);
                  else handleZoomIn(e);
                }} 
              />
            </div>
          </div>
        </div>
      )}

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
