import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, Cursor } from "@/components/portfolio";
import { motion } from "framer-motion";
import { ChevronRight, HeartPulse, Truck, Users, ShoppingBag, Briefcase, Plane, X, ZoomIn, ZoomOut } from "lucide-react";

export const Route = createFileRoute(
  "/expertise/mobile-app"
)({
  component: MobileAppPage,
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

function MobileAppPage() {
  const [activeScreens, setActiveScreens] = useState<string[] | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  
  const onMouseLeave = () => {
    setIsDragging(false);
  };
  
  const onMouseUp = () => {
    setIsDragging(false);
  };
  
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    setDragDistance(prev => Math.max(prev, Math.abs(x - startX)));
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 1, 3));
  };
  
  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  const closeLightbox = () => {
    setActiveScreens(null);
    setZoomLevel(1);
  };

  return (
    <>
      <Cursor />
      <main className="min-h-screen bg-background text-foreground overflow-x-clip font-sans">
        <Nav />
        
        {/* 2. HERO SECTION */}
        <section className="pt-28 md:pt-36 pb-16 px-4 md:px-8 lg:px-[120px] relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 pointer-events-none" style={{ maskImage: 'radial-gradient(circle at center, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)' }} />
          
          <div className="w-full relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              
              {/* 1. BREADCRUMB */}
              <div className="font-mono text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-accent">Mobile Application Design</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-ink mb-6 tracking-tight">
                Mobile Application Design
              </h1>
              
              <p className="text-lg md:text-xl text-ink-soft/90 font-light leading-relaxed mb-12">
                Designing native-feeling experiences for the screen people reach for first. Whether it's a deeply integrated iOS application, a flexible Android interface, or a unified cross-platform solution, I craft mobile ecosystems that prioritize fluid gestures, offline resilience, and intuitive interactions. Every decision is made to ensure your app feels effortless, performant, and perfectly at home on any device.
              </p>

              <div className="flex flex-wrap gap-3">
                {["iOS & Android", "Design Systems", "Gesture-First UX", "Onboarding Flows", "Offline-Ready UI"].map((chip) => (
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
            title="Why mobile design is its own discipline" 
          />
          <div className="w-full text-base md:text-[17px] leading-[1.8] text-ink-soft/90 font-light space-y-6">
            <p>
              Mobile design works within strict physical constraints — small screens, precise thumb reach zones, frequent environmental interruptions, and variable network conditions. Unlike desktop interfaces where users have a precise cursor and full attention, a mobile app must be brutally efficient. Every UI element and interaction has to earn its space on the glass, ensuring that core tasks remain accessible whether the user is sitting on a couch or walking through a crowded terminal.
            </p>
            <p>
              Platform conventions matter deeply. An application that ignores established iOS Human Interface Guidelines or Android Material Design patterns will always feel foreign to users, regardless of how polished the visual aesthetics are. Users bring years of muscle memory to their devices. By respecting these deeply ingrained expectations—from native navigation stacks to platform-specific haptics—we build applications that feel instantly familiar, trustworthy, and intuitive.
            </p>
            <p>
              In the mobile ecosystem, success isn't measured by visual complexity or screen count; it is measured purely by retention, time-to-first-action, and the elimination of friction. If a user has to think about how to complete a task, the design has failed. We engineer flows that anticipate user intent, reduce cognitive load, and gracefully handle edge cases, ensuring that absolutely nothing stands between the user and their ultimate goal.
            </p>
          </div>
        </section>

        {/* 4. SCENARIO GRID */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16 bg-surface/20">
          <SectionHeader 
            eyebrow="SCENARIOS" 
            title="Built for every kind of app" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HeartPulse, title: "Health & Wellness Apps", desc: "Clarity-first design for sensitive, high-stakes decisions." },
              { icon: Truck, title: "On-Demand & Delivery Apps", desc: "Real-time status and location-driven interfaces." },
              { icon: Users, title: "Social & Community Apps", desc: "Engagement loops and content-first layouts." },
              { icon: ShoppingBag, title: "E-commerce & Shopping Apps", desc: "Browse-to-checkout flows optimized for speed." },
              { icon: Briefcase, title: "Productivity & Utility Apps", desc: "Dense information made scannable in small spaces." },
              { icon: Plane, title: "Travel & Booking Apps", desc: "Itinerary-heavy flows simplified into a few clear taps." },
            ].map((card, i) => (
              <div 
                key={i} 
                className="group border border-line bg-background p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/40 cursor-pointer"
              >
                <card.icon className="w-8 h-8 text-accent mb-6 stroke-[1.5px]" />
                <h4 className="font-display text-xl font-medium text-ink mb-3">{card.title}</h4>
                {/* TODO: replace placeholder */}
                <p className="text-sm md:text-[15px] text-ink-soft/90 font-light leading-relaxed mb-6">{card.desc}</p>
                <span className="text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  View details <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. DESIGN APPROACH */}
        <section className="px-4 md:px-8 lg:px-[120px] py-10 md:py-16">
          <SectionHeader 
            eyebrow="METHODOLOGY" 
            title="How I approach mobile design" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8">
            {[
              { num: "01", title: "Thumb-First Layouts", desc: "Key actions sit where hands naturally rest." },
              { num: "02", title: "Platform-Native Patterns", desc: "Respects iOS Human Interface Guidelines and Material Design where it matters most." },
              { num: "03", title: "Progressive Onboarding", desc: "Teach the app through use, not a wall of tutorial screens." },
              { num: "04", title: "Design for Interruption", desc: "Flows recover gracefully from notifications, calls, and connectivity drops." },
            ].map((approach, i) => (
              <div key={i} className="flex gap-6 border border-line rounded-2xl p-6 bg-surface">
                <div className="shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent font-mono text-sm border border-accent/20">
                    {approach.num}
                  </div>
                </div>
                <div>
                  {/* TODO: replace placeholder */}
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
                title: "Wealthily",
                desc: "A comprehensive personal finance management application that helps you track your money, plan budgets, and gain control.",
                tags: ["Finance", "Budgeting"],
                image: "/01-Wealthily-mockup-mobile.jpg",
                screens: [
                  "/Wealthily/01-01.jpg",
                  "/Wealthily/01-02.jpg",
                  "/Wealthily/01-03.jpg",
                  "/Wealthily/01-04.jpg",
                  "/Wealthily/01-05.jpg",
                  "/Wealthily/01-06.jpg",
                  "/Wealthily/01-07.jpg",
                  "/Wealthily/01-08.jpg",
                  "/Wealthily/01-09.jpg",
                  "/Wealthily/01-10.jpg"
                ]
              },
              {
                title: "Fitness Journey",
                desc: "A comprehensive personal fitness application designed to help you track workouts, schedule training, and manage progress.",
                tags: ["Fitness", "Health", "Workout"],
                image: "/02-Fitness Journey-mockup-mobile.jpg",
                screens: [
                  "/Fitness Journey/02-01.jpg",
                  "/Fitness Journey/02-02.jpg",
                  "/Fitness Journey/02-03.jpg",
                  "/Fitness Journey/02-04.jpg",
                  "/Fitness Journey/02-05.jpg",
                  "/Fitness Journey/02-06.jpg",
                  "/Fitness Journey/02-07.jpg",
                  "/Fitness Journey/02-08.jpg",
                  "/Fitness Journey/02-09.jpg",
                  "/Fitness Journey/02-10.jpg"
                ]
              },
              {
                title: "Compleat Nutrition",
                desc: "A comprehensive health platform designed to help you track your daily nutrition and transform your health.",
                tags: ["Health", "Nutrition"],
                image: "/03-Compleat Nutrition-mockup-mobile.jpg",
                screens: [
                  "/Compleat Nutrition/03-01.jpg",
                  "/Compleat Nutrition/03-02.jpg",
                  "/Compleat Nutrition/03-03.jpg",
                  "/Compleat Nutrition/03-04.jpg",
                  "/Compleat Nutrition/03-05.jpg",
                  "/Compleat Nutrition/03-06.jpg",
                  "/Compleat Nutrition/03-07.jpg",
                  "/Compleat Nutrition/03-08.jpg",
                  "/Compleat Nutrition/03-09.jpg",
                  "/Compleat Nutrition/03-10.jpg"
                ]
              },
              {
                title: "Vibrant Odyssey",
                desc: "A comprehensive travel booking platform designed to help you explore destinations and manage trip logistics.",
                tags: ["Travel", "Booking"],
                image: "/04-Vibrant Odyssey-mockup-mobile.jpg",
                screens: [
                  "/Vibrant Odyssey/04-01.jpg",
                  "/Vibrant Odyssey/04-02.jpg",
                  "/Vibrant Odyssey/04-03.jpg",
                  "/Vibrant Odyssey/04-04.jpg",
                  "/Vibrant Odyssey/04-05.jpg",
                  "/Vibrant Odyssey/04-06.jpg",
                  "/Vibrant Odyssey/04-07.jpg",
                  "/Vibrant Odyssey/04-08.jpg",
                  "/Vibrant Odyssey/04-09.jpg",
                  "/Vibrant Odyssey/04-10.jpg"
                ]
              },
              {
                title: "Timeless",
                desc: "A digital vault application where you can securely store and seal personal memories for your future self.",
                tags: ["Memories", "Capsule"],
                image: "/05-Timeless-mockup-mobile.jpg",
                screens: [
                  "/Timeless/05-01.jpg",
                  "/Timeless/05-02.jpg",
                  "/Timeless/05-03.jpg",
                  "/Timeless/05-04.jpg",
                  "/Timeless/05-05.jpg",
                  "/Timeless/05-06.jpg",
                  "/Timeless/05-07.jpg",
                  "/Timeless/05-08.jpg",
                  "/Timeless/05-09.jpg",
                  "/Timeless/05-10.jpg"
                ]
              },
              {
                title: "Open Fashion",
                desc: "A premium mobile e-commerce platform designed to offer a seamless shopping experience for luxury fashion accessories.",
                tags: ["E-commerce", "Fashion"],
                image: "/06-Open Fashion-mockup-mobile.jpg",
                screens: [
                  "/Open Fashion/06-01.jpg",
                  "/Open Fashion/06-02.jpg",
                  "/Open Fashion/06-03.jpg",
                  "/Open Fashion/06-04.jpg",
                  "/Open Fashion/06-05.jpg",
                  "/Open Fashion/06-06.jpg",
                  "/Open Fashion/06-07.jpg",
                  "/Open Fashion/06-08.jpg",
                  "/Open Fashion/06-09.jpg",
                  "/Open Fashion/06-10.jpg"
                ]
              },
              {
                title: "Lumen",
                desc: "A calm, focused AI workspace designed to help you think out loud and create through writing.",
                tags: ["AI", "Productivity"],
                image: "/07-Lumen-mockup-mobile.jpg",
                screens: [
                  "/Lumen/07-01.jpg",
                  "/Lumen/07-02.jpg",
                  "/Lumen/07-03.jpg",
                  "/Lumen/07-04.jpg",
                  "/Lumen/07-05.jpg",
                  "/Lumen/07-06.jpg",
                  "/Lumen/07-07.jpg",
                  "/Lumen/07-08.jpg",
                  "/Lumen/07-09.jpg",
                  "/Lumen/07-10.jpg"
                ]
              },
              {
                title: "Friendzy",
                desc: "A modern social networking platform designed to help you meet and connect with new people nearby.",
                tags: ["Social", "Connection"],
                image: "/08-Friendzy-mockup-mobile.jpg",
                screens: [
                  "/Friendzy/08-01.jpg",
                  "/Friendzy/08-02.jpg",
                  "/Friendzy/08-03.jpg",
                  "/Friendzy/08-04.jpg",
                  "/Friendzy/08-05.jpg",
                  "/Friendzy/08-06.jpg",
                  "/Friendzy/08-07.jpg",
                  "/Friendzy/08-08.jpg"
                ]
              }
            ].map((project: any, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (project.screens) setActiveScreens(project.screens);
                }}
                className="group rounded-3xl bg-surface border border-line overflow-hidden cursor-pointer shadow-sm flex flex-col h-full"
              >
                {/* TODO: replace placeholder */}
                <div className="aspect-[4/3] bg-line/20 relative overflow-hidden flex items-center justify-center shrink-0">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 md:p-6 flex flex-col grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="font-mono text-[9px] md:text-[10px] px-2.5 py-1 rounded-full border border-teal-500/20 text-teal-600 bg-teal-50 dark:bg-teal-900/30">Concept Exploration</span>
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="font-mono text-[9px] md:text-[10px] px-2.5 py-1 rounded-full border border-line text-ink-soft/90 bg-background">{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-medium text-ink mb-2">{project.title}</h3>
                  <p className="text-xs md:text-[13px] text-ink-soft/90 font-light leading-relaxed mb-4 grow">{project.desc}</p>
                  <span className="inline-flex items-center text-accent text-xs font-medium group-hover:underline mt-auto">
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
            Mobile is where trust is won or lost in seconds.
          </h2>
          <p className="text-base md:text-xl font-light text-ink-soft/90 mb-10 leading-relaxed max-w-2xl">
            {/* TODO: replace placeholder */}
            If you're building an app that needs to feel effortless, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:hello@example.com" className="px-8 py-4 rounded-full bg-ink text-background font-medium hover:bg-accent transition-colors">
              Get in touch
            </a>
            <Link to="/" className="px-8 py-4 rounded-full bg-surface border border-line text-ink hover:bg-surface/80 transition-colors">
              View full portfolio
            </Link>
          </div>
        </section>

        <Footer />
      </main>

      {/* Lightbox */}
      {activeScreens && (
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

          {/* Images Gallery */}
          <div 
            ref={scrollRef}
            className="overflow-auto w-full h-full p-4 md:p-8 select-none" 
            onClick={() => {
              if (dragDistance > 10) return;
              closeLightbox();
            }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            <div 
              className="flex flex-row gap-4 md:gap-8 items-start justify-start min-h-full py-24 px-12 md:px-24 w-max"
              onClick={(e) => {
                e.stopPropagation();
                if (dragDistance > 10) return;
                if (zoomLevel === 3) handleZoomOut(e);
                else handleZoomIn(e);
              }}
              style={{
                cursor: isDragging ? 'grabbing' : (zoomLevel === 3 ? 'zoom-out' : 'zoom-in')
              }}
            >
              {activeScreens.map((screen, idx) => (
                <img 
                  key={idx}
                  src={screen} 
                  alt={`Screen ${idx + 1}`} 
                  className="transition-all duration-300 ease-out bg-surface/5 rounded-[2rem] shadow-xl shrink-0" 
                  style={{ 
                    width: zoomLevel === 1 ? '320px' : (zoomLevel === 2 ? '500px' : '800px'),
                    height: 'auto'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
