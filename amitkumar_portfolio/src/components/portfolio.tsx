import architectureImg from "../assets/architecture.png";
import { Link, useLocation } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useInView,
  useMotionValueEvent,
  animate,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  Sparkles,
  Compass,
  Layers,
  LineChart,
  Users,
  Workflow,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import heroCardImg from "../assets/hero_card.png";
import contactBg from "../assets/Contact_bg.jpg";
import productCaseStudiesImg from "../assets/Product Case Studies.png";
import enterpriseSaasImg from "../assets/Enterprise SaaS Platforms.png";
import mobileProductDesignImg from "../assets/Mobile Product Design.png";
import webLandingPagesImg from "../assets/Web and Landing Pages.png";


/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.06 },
  }),
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Split words for staggered reveal. */
function RevealText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
          <motion.span
            className="inline-block origin-bottom-left pt-2 -mt-2"
            initial={{ y: "110%", filter: "blur(8px)", rotate: 4, opacity: 0 }}
            animate={inView ? { y: "0%", filter: "blur(0px)", rotate: 0, opacity: 1 } : { y: "110%", filter: "blur(8px)", rotate: 4, opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

export function Section({
  id,
  eyebrow,
  className = "",
  children,
}: {
  id?: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative px-4 md:px-8 lg:px-[120px] ${className}`}>
      {eyebrow && (
        <div className="w-full">
          <SectionLabel>{eyebrow}</SectionLabel>
        </div>
      )}
      <div className="w-full">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
    >
      <span className="h-px w-8 bg-line" />
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  href,
  variant = "primary",
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-ink text-background hover:bg-accent"
      : "border border-line text-ink hover:bg-surface";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={`${base} ${styles}`}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles}`}
    >
      {inner}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Loader                                                             */
/* ------------------------------------------------------------------ */

export function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const DURATION = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 text-background md:px-10 md:py-10"
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-background/60">
            <span>Amitkumar Tadvi</span>
            <span>Portfolio · 2026</span>
          </div>

          <div className="flex flex-col items-start gap-3">
            <RevealText
              text="Designing the systems"
              as="h2"
              className="font-display text-5xl leading-[0.95] text-background sm:text-6xl md:text-7xl"
            />
            <RevealText
              text="behind serious software."
              as="h2"
              className="font-display text-5xl leading-[0.95] text-background/70 sm:text-6xl md:text-7xl"
              delay={0.25}
            />
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="w-full max-w-md">
              <div className="h-px w-full overflow-hidden bg-background/20">
                <motion.div
                  className="h-full bg-background"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
            <div className="font-mono text-xs tabular-nums text-background/70">
              {String(progress).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Cursor                                                             */
/* ------------------------------------------------------------------ */

export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 40 });
  const sy = useSpring(y, { stiffness: 400, damping: 40 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;
    setVisible(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, reduced]);

  if (!visible) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ scale: hover ? 2.4 : 1, opacity: hover ? 0.9 : 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="-ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-background"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setScrolled(latest > 24);

    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 px-4 md:px-8 lg:px-[120px] transition-colors duration-500 ${scrolled ? "bg-background/70 backdrop-blur-md border-b border-line/50" : ""
          }`}
      >
        <div
          className={`w-full flex items-center justify-between py-5 md:py-6 transition-colors`}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-12 w-12 overflow-hidden rounded-full border border-line bg-surface">
              <img src="/profile_v01.png" alt="Profile" className="h-full w-full object-cover text-transparent" />
            </div>
          </Link>
          {isHome && (
            <nav className="hidden items-center gap-1 rounded-full border border-line/70 bg-background/60 backdrop-blur md:flex px-2 py-1.5">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          )}
          <div className="hidden md:block">
            <MagneticButton onClick={() => setContactOpen(true)}>Get in touch</MagneticButton>
          </div>
          {isHome && (
            <button
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink text-background md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl">Amit</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-background/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-6 px-6">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                  className="font-display text-5xl text-background"
                >
                  {l.label}.
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}

        {contactOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            {/* Centered Modal */}
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="w-full max-w-[500px] max-h-[90vh] bg-background shadow-2xl rounded-3xl flex flex-col border border-line overflow-y-auto pointer-events-auto"
              >
                <div className="flex items-center justify-between p-6 border-b border-line">
                  <span className="font-display text-2xl text-ink">Get in touch</span>
                  <button
                    aria-label="Close contact"
                    onClick={() => setContactOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-surface transition-colors"
                  >
                    <X className="h-5 w-5 text-ink" />
                  </button>
                </div>

                <div className="p-8 flex flex-col gap-10 flex-1">
                  <div>
                    <h3 className="font-display text-3xl text-ink mb-2">Let's build something great.</h3>
                    <p className="text-ink-soft/90 font-light leading-relaxed">
                      I'm always open to discussing product design work, partnerships, or consulting opportunities.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Name</span>
                      <span className="text-lg font-medium text-ink">Tadvi Amitkumar Dhirajbhai</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Email</span>
                      <a href="mailto:amittadvi1412@gmail.com" onClick={() => setContactOpen(false)} className="text-lg font-medium text-ink hover:text-accent transition-colors underline decoration-line underline-offset-4 hover:decoration-accent">amittadvi1412@gmail.com</a>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Contact</span>
                      <a href="tel:+919898086164" onClick={() => setContactOpen(false)} className="text-lg font-medium text-ink hover:text-accent transition-colors">+91 98980 86164</a>
                    </div>
                  </div>

                  <div className="mt-auto pt-10">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-4">Connect with me</span>
                    <div className="flex items-center gap-4">
                      <a href="https://www.linkedin.com/in/amitinnovatesux/" onClick={() => setContactOpen(false)} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 hover:opacity-80 transition-opacity">
                        <img src="/linkedin-app-icon.png" alt="LinkedIn" className="w-full h-full object-contain" />
                      </a>
                      <a href="https://www.behance.net/amittadvi" onClick={() => setContactOpen(false)} target="_blank" rel="noopener noreferrer" aria-label="Behance" className="w-10 h-10 hover:opacity-80 transition-opacity">
                        <img src="/behance-square-color-icon.png" alt="Behance" className="w-full h-full object-contain" />
                      </a>
                      <a href="https://dribbble.com/Scyla_FX1412" onClick={() => setContactOpen(false)} target="_blank" rel="noopener noreferrer" aria-label="Dribbble" className="w-10 h-10 hover:opacity-80 transition-opacity">
                        <img src="/dribbble-square-color-icon.png" alt="Dribbble" className="w-full h-full object-contain" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function SocialButton({ icon }: { icon: string }) {
  return (
    <a href="#" className="flex h-10 w-10 items-center justify-center rounded bg-white/90 text-ink shadow-sm backdrop-blur transition-all hover:bg-white hover:scale-105">
      {icon === "in" && (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
      )}
      {icon === "x" && (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      )}
      {icon === "fb" && (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
      )}
      {icon === "ig" && (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
      )}
    </a>
  );
}




const HERO_PROJECTS = [
  { img: "/aerosphere-featured.png", link: "/case-studies/aerosphere" },
  { img: "/vitamind-featured.png", link: "/case-studies/vitamind-ai" },
  { img: "/credin-featured.png", link: "/case-studies/credin" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [projectIndex, setProjectIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % HERO_PROJECTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="top" ref={ref} className="relative px-4 pb-12 pt-28 md:px-8 lg:px-[120px] md:pt-[130px] overflow-hidden font-sans">
      <div className="w-full">
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-ink shadow-2xl md:rounded-[2.5rem] p-8 sm:p-12 md:p-16 lg:px-16 lg:py-28 min-h-[630px] md:min-h-[710px] lg:min-h-[770px] text-white"
        >
          {/* Base Radial Gradient Atmosphere */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 20% 30%, oklch(0.35 0.14 42/0.6), transparent), radial-gradient(50% 60% at 80% 70%, oklch(0.3 0.12 30/0.55), transparent)",
            }}
          />

          {/* Hero Card Image with overlay blending effect */}
          <img
            src={heroCardImg}
            alt="Hero background"
            className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-50 pointer-events-none"
            style={{ mixBlendMode: "overlay", opacity: 0.5 }}
          />

          {/* Subtle text readability scrim on left text area */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

          <div className="pointer-events-none absolute inset-0 grain opacity-20" aria-hidden />

          <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 my-auto">
            {/* Left Column: Eyebrow + Main Heading + Description + CTA */}
            <div className="flex-1 max-w-[640px] flex flex-col">
              {/* Eyebrow */}
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A855] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8A855]"></span>
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/70">Product Designer · AI-Enabled Products</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="text-[36px] sm:text-[46px] md:text-[52px] lg:text-[58px] font-bold leading-[1.25] sm:leading-[1.28] md:leading-[1.3] tracking-tight mb-0"
              >
                I design AI{"\u2011"}enabled products for complex, regulated industries.
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="mt-8 md:mt-10 lg:mt-12 text-[16px] sm:text-[17px] md:text-[18px] text-white/85 leading-[2.1] sm:leading-[2.18] md:leading-[2.25] font-light max-w-[580px]"
              >
                9+ years turning ambiguous workflows into scalable products and design systems across healthcare, aviation and enterprise software. I prototype with AI in days, so ideas are tested with real users before they’re built.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap items-center gap-4 mt-9 md:mt-12 lg:mt-14"
              >
                <Link
                  to="/case-study"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white text-[#0a0a0a] font-medium text-sm transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  View case studies
                </Link>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Download resume
                </a>
              </motion.div>
            </div>

            {/* Right Column: Stats (Top) & Floating Element (Bottom) */}
            <div className="flex flex-col justify-between items-start lg:items-end gap-10 pt-4 lg:pt-0">
              {/* Stats */}
              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="grid grid-cols-3 gap-4 sm:gap-6 lg:flex lg:flex-col lg:gap-10 lg:items-end w-full lg:w-auto pt-6 lg:pt-0 border-t border-white/15 lg:border-t-0"
              >
                <div className="flex flex-col lg:text-right">
                  <span className="font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums">9+ yrs</span>
                  <span className="text-[11px] sm:text-xs text-white/60 mt-2 uppercase tracking-wider font-medium leading-[1.85]">In practice</span>
                </div>
                <div className="flex flex-col lg:text-right lg:max-w-[240px]">
                  <span className="font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums">4</span>
                  <span className="text-[11px] sm:text-xs text-white/60 mt-2 uppercase tracking-wider font-medium leading-[1.85]">Industries · Aviation, Healthcare, HR Tech, Fintech</span>
                </div>
                <div className="flex flex-col lg:text-right lg:max-w-[260px]">
                  <span className="font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums">5+</span>
                  <span className="text-[11px] sm:text-xs text-white/60 mt-2 uppercase tracking-wider font-medium leading-[1.85]">AI-driven projects · Healthcare, Legal, Mental Health, Learning</span>
                </div>
              </motion.div>

              {/* Floating Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                whileHover={{ y: -5 }}
                className="hidden lg:block w-[280px] md:w-[320px] bg-white/5 backdrop-blur-md rounded-[20px] p-2 border border-white/10 shadow-2xl overflow-hidden group cursor-pointer"
              >
                <Link to={HERO_PROJECTS[projectIndex].link} className="block relative w-full rounded-[14px] overflow-hidden aspect-[32/9] bg-black/20">
                  {HERO_PROJECTS.map((proj, idx) => (
                    <img
                      key={idx}
                      src={proj.img}
                      alt="Featured Case Study"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${idx === projectIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    />
                  ))}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#1B2A3D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute z-30 top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute z-30 bottom-3 left-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-wider font-medium text-white shadow-sm">
                      View Project
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



export function AboutMe() {
  return (
    <section id="about" className="relative bg-surface/60">
      <div className="w-full px-4 py-20 md:px-8 md:py-32 lg:px-[120px]">

        {/* Section Header */}
        <div className="flex items-center justify-between gap-6 mb-6 md:mb-10 w-full">
          <h2 className="font-display text-xl tracking-tight text-[#FF451A] md:text-3xl leading-none">
            Profile
          </h2>
          <div className="flex-1 h-px bg-line hidden md:block mx-6" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="h-1.5 w-1.5 bg-[#FF451A]" />
            <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              About Me
            </span>
          </div>
        </div>

        {/* Header Block */}
        <div className="flex flex-col gap-10 md:gap-16">
          <div className="w-full">
            <h3 className="text-3xl font-medium leading-[1.25] tracking-tight text-ink md:text-4xl lg:text-5xl">
              I design products for complex, regulated industries, and use AI to get to the right answer faster.
            </h3>

            <div className="mt-10 md:mt-16 space-y-6 text-base leading-relaxed text-ink-soft md:text-[1.1rem]">
              <p>
                I&apos;m <span className="text-ink font-medium">Amitkumar Tadvi</span>, a Product Designer with 9+ years of experience designing enterprise SaaS, mobile and web products across healthcare, aviation, HR tech and fintech. I turn ambiguous, zero-to-one requirements into scalable design systems and clear workflows that product, engineering and business teams actually adopt.
              </p>
              <p>
                I treat complex products as systems, not screens. Every workflow, permission model and edge case has to hold together as the product grows. I start with the operational reality, then design the interface that fits it, working closely with engineers so decisions survive handoff.
              </p>
              <p>
                I use AI throughout my process, from research synthesis to working prototypes, so ideas can be tested with real users in days instead of weeks. I also know where AI falls short, and I design the human-in-the-loop moments that build trust. I&apos;m currently open to Product Designer roles and select zero-to-one engagements, especially in healthcare, aviation and other operationally complex industries.
              </p>
            </div>

            {/* Horizontal Quick Hits & CTAs */}
            <div className="mt-12 md:mt-16 pt-10 border-t border-line flex flex-col gap-10">

              <div className="flex flex-col md:flex-row gap-10 md:gap-16">
                <div className="flex-1">
                  <h4 className="font-display text-lg text-ink mb-4">Core Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Enterprise SaaS",
                      "AI-Enabled Product Design",
                      "Design Systems",
                      "B2B Workflows",
                      "Complex Dashboards",
                      "0→1 Product Design",
                    ].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-background border border-line rounded-full text-xs font-medium text-ink-soft">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="font-display text-lg text-ink mb-4">Design Toolkit</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Figma",
                      "Design Systems",
                      "Prototyping",
                      "User Research",
                      "Usability Testing",
                      "Interaction Design",
                      "Accessibility",
                      "AI-Assisted Prototyping",
                    ].map(tool => (
                      <span key={tool} className="px-3 py-1.5 bg-background border border-line rounded-full text-xs font-medium text-ink-soft">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-accent w-full sm:w-auto text-center">
                  Download Resume
                </a>
                <a href="https://www.linkedin.com/in/amitinnovatesux/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-surface w-full sm:w-auto text-center">
                  Connect on LinkedIn
                </a>
              </div>
            </div>

          </div>
        </div>


      </div>

    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Work                                                      */
/* ------------------------------------------------------------------ */

const FEATURED_PROJECTS = [
  {
    n: "01",
    title: "Product Case Studies",
    tags: ["Research", "Strategy", "Prototypes"],
    img: productCaseStudiesImg,
    link: "/case-study",
  },
  {
    n: "02",
    title: "Enterprise SaaS Platforms",
    tags: ["Dashboards", "Workflows", "Data Tables"],
    img: enterpriseSaasImg,
    link: "/expertise/crm-erp",
  },
  {
    n: "03",
    title: "Mobile Product Design",
    tags: ["iOS", "Android", "Interaction"],
    img: mobileProductDesignImg,
    link: "/expertise/mobile-app",
  },
  {
    n: "04",
    title: "Web and Landing Pages",
    tags: ["Webflow", "Responsive", "Motion"],
    img: webLandingPagesImg,
    link: "/expertise/web-design",
  },
];

function FeaturedCard({ p, i, total }: { p: typeof FEATURED_PROJECTS[0] & { link?: string }; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress for 3D tilt entry effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const content = (
    <div className="relative w-full max-w-[1200px] mx-auto mb-16 md:mb-32">
      <motion.div
        ref={ref}
        style={{
          rotateX,
          scale,
          opacity,
          transformPerspective: 1200
        }}
        className="group w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-surface aspect-[3/2] md:aspect-[2/1] block cursor-pointer shadow-2xl relative"
      >
        {/* Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#0a0a0a]">
          <motion.img
            src={p.img}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
        </div>
      </motion.div>

      {/* Bottom Bar Content */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-20 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between rounded-[1rem] bg-black/60 backdrop-blur-lg border border-white/10 px-6 py-5 transition-colors duration-500">

          {/* Left side: Number & Title */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/50">({p.n})</span>
            <h3 className="font-display text-xl md:text-2xl font-medium text-white tracking-wide">
              {p.title}
            </h3>
          </div>

          {/* Line Separator (Visible on md+) */}
          <div className="hidden md:block h-px flex-1 mx-8 bg-white/10" />

          {/* Right side: Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-0 font-medium text-[11px] md:text-sm text-white/80">
            {p.tags.map((tag, idx) => (
              <span key={tag} className="flex items-center gap-2 h-6 md:h-8 px-2 rounded-full border border-white/10 bg-white/5">
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );

  return p.link ? (
    <Link to={p.link} className="block w-full">
      {content}
    </Link>
  ) : (
    content
  );
}

export function FeaturedWork() {
  return (
    <Section id="work" className="pt-[100px] pb-32 md:pb-48 bg-[#0a0a0a]">
      {/* Header matching Avoora style */}
      <div className="flex items-center justify-between gap-6 mb-24 md:mb-32">
        <h2 className="font-display text-xl tracking-tight text-[#FF451A] md:text-3xl leading-none">
          Featured Work
        </h2>
        <div className="flex-1 h-px bg-white/10 hidden md:block mx-6" />
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 bg-[#FF451A]" />
          <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Work Portfolio
          </span>
        </div>
      </div>

      {/* Cards List Sequential Layout */}
      <div className="flex flex-col items-center w-full">
        {FEATURED_PROJECTS.map((p, i) => (
          <FeaturedCard key={p.n} p={p} i={i} total={FEATURED_PROJECTS.length} />
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Philosophy                                                         */
/* ------------------------------------------------------------------ */

const PRINCIPLES = [
  {
    n: "01",
    t: "Systems before screens.",
    b: "A screen is the last artifact. The system underneath — tokens, patterns, mental models — is what compounds.",
  },
  {
    n: "02",
    t: "Clarity is a business metric.",
    b: "Latency in understanding is latency in revenue. I design for the fastest correct decision, not the prettiest surface.",
  },
  {
    n: "03",
    t: "Ship the workflow, not the wireframe.",
    b: "Deliverables end at the flow boundary. I pair with engineering until the workflow behaves like the prototype.",
  },
  {
    n: "04",
    t: "AI belongs in the seam.",
    b: "The best AI features remove steps you were forced to invent. Trust comes from provenance, not personality.",
  },
];

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <Section className="py-20 md:py-28">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-6 mb-6 md:mb-10 w-full">
        <h2 className="font-display text-xl tracking-tight text-[#FF451A] md:text-3xl leading-none">
          Philosophy
        </h2>
        <div className="flex-1 h-px bg-line hidden md:block mx-6" />
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 bg-[#FF451A]" />
          <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Design Philosophy
          </span>
        </div>
      </div>

      <div className="grid gap-16 md:grid-cols-12">
        <div ref={ref} className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <motion.div style={{ y }}>
            <h2 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl lg:text-[3.5rem]">
              I design software <br className="hidden lg:block" />
              <span className="text-ink-soft">for people who don't have </span>
              <br className="hidden md:block lg:hidden" />
              <span className="italic text-accent">time to be delighted.</span>
            </h2>
            <div className="mt-12 flex flex-col gap-6 max-w-md">
              <p className="text-lg md:text-xl leading-relaxed text-ink">
                Enterprise operators judge software by whether it removes friction from an already
                hard job. Aesthetic is table stakes.
              </p>
              <p className="text-base leading-relaxed text-ink-soft">
                I don't just draw rectangles. I partner with engineering and product to map out the deepest layers of user intent, turning complex constraints into seamless workflows that drive product-led growth.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-6 md:col-start-7 space-y-14">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className={`pt-8 ${i !== 0 ? "border-t border-line" : ""}`}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-muted-foreground">{p.n}</span>
                <div>
                  <h3 className="font-display text-3xl leading-tight text-ink md:text-4xl">
                    {p.t}
                  </h3>
                  <p className="mt-3 w-full text-base leading-relaxed text-ink-soft">{p.b}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Capabilities                                                       */
/* ------------------------------------------------------------------ */

const CAPS = [
  {
    icon: Compass,
    t: "Product discovery",
    b: "Framing ambiguous business problems into researchable questions and measurable outcomes.",
  },
  {
    icon: Users,
    t: "User research",
    b: "Generative and evaluative research with operators, executives, clinicians, and controllers.",
  },
  {
    icon: Workflow,
    t: "Workflow architecture",
    b: "IA, state modeling, and end-to-end workflows for regulated multi-role software.",
  },
  {
    icon: Layers,
    t: "Design systems",
    b: "Token architecture, primitives, patterns, and governance across product and marketing.",
  },
  {
    icon: Cpu,
    t: "AI-native UX",
    b: "Copilots, agentic flows, provenance, and the trust surface required to ship them safely.",
  },
  {
    icon: LineChart,
    t: "Strategy & metrics",
    b: "North-star metrics, activation loops, and business-first prioritization frameworks.",
  },
  {
    icon: ShieldCheck,
    t: "Accessibility",
    b: "WCAG 2.2 AA as a floor. Keyboard-first, screen-reader-first flows in every project.",
  },
  {
    icon: Sparkles,
    t: "Craft & motion",
    b: "Typography, interaction, and motion tuned to enterprise density — never decorative.",
  },
];

export function Capabilities() {
  return (
    <Section className="py-20 md:py-28">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-6 mb-6 md:mb-10 w-full">
        <h2 className="font-display text-xl tracking-tight text-[#FF451A] md:text-3xl leading-none">
          My Expertise
        </h2>
        <div className="flex-1 h-px bg-line hidden md:block mx-6" />
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 bg-[#FF451A]" />
          <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Service
          </span>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto">
        <h2 className="font-display text-4xl leading-[1.2] text-ink md:text-5xl">
          A senior design surface,<br />
          <span className="text-ink-soft">not a checklist of tools.</span>
        </h2>
      </div>

      <div className="mt-8 md:mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {CAPS.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
              className="group relative bg-background p-8 transition-colors hover:bg-surface md:p-10"
            >
              <Icon className="h-6 w-6 text-accent transition-transform duration-500 ease-out group-hover:-translate-y-0.5" />
              <h3 className="mt-8 font-display text-2xl text-ink">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.b}</p>
              <span className="pointer-events-none absolute inset-x-8 bottom-6 h-px scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100 md:inset-x-10" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */

const PROCESS: Array<{ n: string; t: string; b: string; d?: string }> = [
  {
    n: "01",
    t: "Discover",
    b: "Interview stakeholders and users, then use AI to summarize notes and surface recurring patterns faster.",
  },
  {
    n: "02",
    t: "Define",
    b: "Frame the real problem, map workflows, and set clear success metrics before any screens exist.",
  },
  {
    n: "03",
    t: "Explore",
    b: "Sketch flows and layouts, use AI for quick variations, then choose using sound design judgment.",
  },
  {
    n: "04",
    t: "Prototype",
    b: "Build interactive Figma and coded prototypes using AI tools so ideas get tested within days.",
  },
  {
    n: "05",
    t: "Validate",
    b: "Run usability tests with real users, then refine designs using evidence, not opinions or assumptions.",
  },
  {
    n: "06",
    t: "Deliver",
    b: "Hand off specs, tokens, and documentation to developers, then closely support build and post-launch iteration.",
  },
];

export function Process() {
  return (
    <Section id="process" className="py-20 md:py-28">
      {/* Header */}
      <div className="flex items-center justify-between gap-6 mb-6 md:mb-10 w-full">
        <h2 className="font-display text-xl tracking-tight text-[#FF451A] md:text-3xl leading-none">
          Process
        </h2>
        <div className="flex-1 h-px bg-line hidden md:block mx-6" />
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 bg-[#FF451A]" />
          <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Methodology
          </span>
        </div>
      </div>

      <div className="w-full">
        <h2 className="font-display text-4xl leading-[1.2] text-ink md:text-5xl max-w-3xl">
          How I move from ambiguity <br className="hidden sm:block" />
          <span className="text-ink-soft">to shipped product.</span>
        </h2>
      </div>

      <div className="mt-8 md:mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {PROCESS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.07 }}
            className="relative bg-background p-8 md:p-10 flex flex-col group hover:bg-surface/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Step {step.n}
              </span>
              <span className="h-px w-12 bg-line group-hover:bg-accent/50 transition-colors" />
            </div>
            <h3 className="font-display text-3xl text-ink mb-2">{step.t}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{step.b}</p>
            {step.d && (
              <div className="mt-auto font-mono text-[10px] uppercase tracking-[0.2em] text-accent pt-4">
                {step.d}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience Timeline                                                */
/* ------------------------------------------------------------------ */

interface TimelineEntry {
  y: string;
  r: string;
  scope?: string;
  c: string;
  s?: string;
  b: string[];
}

const CORE_TIMELINE: TimelineEntry[] = [
  {
    y: "Jun 2024 — Sep 2026",
    r: "UI/UX Designer",
    scope: "Product Design Scope",
    c: "AV DEVS Solutions Pvt. Ltd.",
    s: "Product designer on aviation, healthcare and HR tech platforms, from discovery to developer handoff.",
    b: [
      "Own end-to-end design for web and mobile products, from research and flows to final UI and specs.",
      "Built and maintain a shared design system across 3+ client products, giving developers one source of truth.",
      "Run research and usability testing with PMs and engineers, using AI tools to synthesize findings and prototype faster.",
    ],
  },
  {
    y: "Apr 2023 — Jun 2024",
    r: "Senior UX Designer",
    c: "ekZero Enterprise Software Services Pvt Ltd.",
    b: [
      "Led design for core product flows, owning decisions from early concept through final UI in Figma.",
      "Delivered specs and interactive prototypes that cut development revision cycles by [X%] across multiple releases.",
      "Mentored junior designers on process and critique while shaping roadmap priorities with product and engineering leads.",
    ],
  },
  {
    y: "Jul 2021 — Apr 2023",
    r: "UI/UX Designer",
    c: "Upkram Technologies Pvt. Ltd.",
    b: [
      "Designed web and mobile interfaces informed by ongoing user research and behavioral analysis.",
      "Built wireframes, prototypes and high-fidelity UI, iterating on usability testing feedback.",
      "Contributed reusable components to a shared design system, improving consistency across multiple products.",
    ],
  },
  {
    y: "Jan 2020 — May 2021",
    r: "Sr. Designer / UI UX Designer",
    c: "Kanan International Pvt. Ltd.",
    b: [
      "Redesigned the company website, [increasing engagement / reducing bounce rate by X%] on key pages.",
      "Led a small design team, setting visual and interaction standards and using A/B testing to improve usability.",
    ],
  },
  {
    y: "May 2016 — Sep 2019",
    r: "UI UX Designer",
    c: "Blackfox Media Pvt. Ltd.",
    b: [
      "Designed UI and graphics for advertising campaigns, improving client click-through rates by [X%].",
      "Led a small design team and worked directly with clients to turn briefs into digital design solutions.",
    ],
  },
];

const EARLY_TIMELINE = [
  {
    y: "Nov 2015 — Apr 2016",
    r: "Sr. Roto Artist",
    c: "Trace VFX Solutions India Pvt. Ltd.",
    b: [
      "Rotoscoping and matte work for live-action film and television VFX.",
    ],
  },
  {
    y: "Mar 2012 — Oct 2015",
    r: "AutoCAD Designer",
    c: "Dhara Fire Service Private Limited",
    b: [
      "Compliant AutoCAD designs for fire safety systems, built with engineers.",
    ],
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  return (
    <Section id="experience" className="py-20 md:py-28">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-6 mb-6 md:mb-10 w-full">
          <h2 className="font-display text-xl tracking-tight text-[#FF451A] md:text-3xl leading-none">
            Experience
          </h2>
          <div className="flex-1 h-px bg-line hidden md:block mx-6" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="h-1.5 w-1.5 bg-[#FF451A]" />
            <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Career Timeline
            </span>
          </div>
        </div>
        <h2 className="font-display text-4xl leading-[1.2] text-ink md:text-5xl">
          9+ years of design, <br className="hidden sm:block" />
          <span className="text-ink-soft">now focused on AI-enabled products.</span>
        </h2>
      </div>

      <div ref={ref} className="relative mt-8 md:mt-10 pl-6 md:pl-14">
        <div className="absolute left-[5px] top-0 h-full w-px bg-line md:left-[19px]" aria-hidden />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[5px] top-0 h-full w-px origin-top bg-ink md:left-[19px]"
          aria-hidden
        />
        <div className="space-y-16">
          {CORE_TIMELINE.map((t, i) => (
            <motion.div
              key={t.y}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
              className="relative grid gap-4 md:grid-cols-12"
            >
              <span className="absolute -left-6 top-1.5 grid h-3 w-3 place-items-center rounded-full bg-background ring-1 ring-ink md:-left-[42px] md:top-4">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              <div className="md:col-span-2 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground mt-1 md:mt-3.5">
                {t.y}
              </div>
              <div className="md:col-span-10">
                <h3 className="font-display text-3xl text-ink md:text-4xl leading-tight">
                  {t.r}
                  {t.scope && (
                    <span className="text-ink-soft text-xl md:text-2xl font-light ml-2.5">
                      · {t.scope}
                    </span>
                  )}
                </h3>
                <div className="mt-3 text-sm text-accent">{t.c}</div>
                {t.s && (
                  <p className="mt-3 text-base font-medium text-ink leading-relaxed">
                    {t.s}
                  </p>
                )}
                <ul className="mt-4 w-full list-disc list-outside ml-4 space-y-2 text-base leading-relaxed text-ink-soft">
                  {t.b.map((item, idx) => (
                    <li key={idx} className="pl-2">{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Early Background Separator */}
        <div className="mt-20 mb-12 flex items-center gap-6">
          <div className="flex-1 h-px bg-line" />
          <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft shrink-0">
            Early Technical Background
          </h4>
          <div className="flex-1 h-px bg-line" />
        </div>

        {/* Early Timeline */}
        <div className="space-y-16">
          {EARLY_TIMELINE.map((t, i) => (
            <motion.div
              key={t.y}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              className="relative grid gap-4 md:grid-cols-12"
            >
              <span className="absolute -left-6 top-1.5 grid h-3 w-3 place-items-center rounded-full bg-background ring-1 ring-line md:-left-[42px] md:top-4">
                <span className="h-1.5 w-1.5 rounded-full bg-line" />
              </span>
              <div className="md:col-span-2 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground mt-1 md:mt-3.5">
                {t.y}
              </div>
              <div className="md:col-span-10">
                <h3 className="font-display text-3xl text-ink-soft md:text-4xl leading-none md:leading-none">{t.r}</h3>
                <div className="mt-3 text-sm text-accent">{t.c}</div>
                <ul className="mt-4 w-full list-disc list-outside ml-4 space-y-2 text-base leading-relaxed text-ink-soft opacity-80">
                  {t.b.map((item, idx) => (
                    <li key={idx} className="pl-2">{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Design Systems & Tools                                             */
/* ------------------------------------------------------------------ */

const TOOL_GROUPS = [
  {
    h: "Design & prototype",
    items: ["Figma", "Framer", "Rive", "Origami Studio", "ProtoPie"],
  },
  {
    h: "Research & strategy",
    items: ["Dovetail", "Maze", "Notion", "Amplitude", "Hotjar"],
  },
  {
    h: "Systems & handoff",
    items: ["Storybook", "Tokens Studio", "Radix / shadcn", "Zeroheight", "Linear"],
  },
  {
    h: "AI & build",
    items: ["GPT-5 / Claude", "Vercel v0", "Cursor", "React + Tailwind", "Supabase"],
  },
];

export function Toolkit() {
  return (
    <Section eyebrow="Design systems & tools" className="py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="font-display text-5xl leading-[0.95] text-ink md:text-5xl">
            The toolkit
            <br />
            <span className="text-ink-soft">underneath the work.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Tools are opinions. These are the ones that hold up under enterprise weight — from
            first sketch to production instrumentation.
          </p>
        </div>

        <div className="md:col-span-7 grid gap-8 sm:grid-cols-2">
          {TOOL_GROUPS.map((g, i) => (
            <motion.div
              key={g.h}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              className="rounded-2xl border border-line bg-card p-6"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                {g.h}
              </div>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-ink">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

const QUOTES = [
  {
    q: "Amit is the rare designer who improves the product roadmap, not just the pixels. He earned engineering trust in a week. During our time working together, he consistently demonstrated an incredible ability to bridge the gap between high-level business strategy and granular user interface details. His approach to design systems completely transformed our development speed, allowing us to ship features noticeably faster without sacrificing visual quality. He doesn't just ask 'what should this look like?', he asks 'what problem are we actually trying to solve?' which fundamentally shifts how the entire product team operates. Highly recommended.",
    n: "VP Product, Aviation SaaS (client details withheld under NDA)",
  },
  {
    q: "I've had the absolute pleasure of working closely with Amit across two different companies now, first at our previous agency and now in our current enterprise role. As an app developer, it is incredibly rare to find a UI/UX designer who so deeply understands the technical constraints and engineering reality of shipping mobile and web applications. We delivered several complex, high-stakes projects together from scratch. Amit's design handoffs are flawless—his Figma files, component libraries, and interactive prototypes leave absolutely zero ambiguity for the dev team. He's not just a brilliant creative mind; he is a true partner to engineering who makes everyone around him build better software.",
    n: "Harshit Darji — App Developer\nekZero",
  },
  {
    q: "He turned three years of workflow debt into a coherent system our teams actually use. It's the most consequential design work we've shipped in recent memory. Amit possesses this unique editorial eye that brings elegance to even the most chaotic, data-heavy enterprise dashboards. When he took over the core clinical workflows, he didn't just re-skin the UI; he conducted deep behavioral research with our operators and fundamentally reimagined how the information architecture should flow. The result was a platform that not only looks beautiful but drastically reduces cognitive load for our users. He is a phenomenal senior talent.",
    n: "Client, Healthcare Platform (client details withheld under NDA)",
  },
];

export function Testimonials() {
  return (
    <Section className="py-20 md:py-28">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-6 mb-6 md:mb-10 w-full">
        <h2 className="font-display text-xl tracking-tight text-[#FF451A] md:text-3xl leading-none">
          Testimonials
        </h2>
        <div className="flex-1 h-px bg-line hidden md:block mx-6" />
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 bg-[#FF451A]" />
          <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Endorsements
          </span>
        </div>
      </div>

      <div className="w-full">
        <h2 className="font-display text-4xl leading-[1.2] text-ink md:text-5xl">
          What colleagues and clients say
          <br />
          <span className="text-ink-soft">after we work together.</span>
        </h2>
      </div>

      <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            className="relative flex flex-col justify-between rounded-3xl border border-line bg-card p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-ink/20 group"
          >
            <span className="absolute -top-8 left-5 px-2 font-display text-8xl leading-none text-[#FF451A] group-hover:text-ink transition-colors duration-500">“</span>
            <blockquote className="pt-4 text-sm md:text-base leading-relaxed text-ink-soft">
              {q.q}
            </blockquote>
            <figcaption className="mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground whitespace-pre-line">
              {q.n}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export function About() {
  return (
    <Section id="about" eyebrow="About" className="py-20 md:py-28">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            text="I design because"
            as="h2"
            className="font-display text-4xl leading-[0.95] text-ink md:text-5xl"
          />
          <RevealText
            text="the interface is where"
            as="h2"
            className="font-display text-4xl leading-[0.95] text-ink-soft md:text-5xl"
            delay={0.12}
          />
          <RevealText
            text="strategy meets reality."
            as="h2"
            className="font-display text-4xl leading-[0.95] italic text-accent md:text-5xl"
            delay={0.24}
          />

          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-ink-soft">
            <p>
              I started in consumer fintech in 2016 and spent the last six years designing for the
              operators who keep serious industries running — pilots, controllers, clinicians,
              people ops leads.
            </p>
            <p>
              Today I focus on AI-native enterprise products: systems where trust, provenance, and
              speed of decision matter more than novelty. I lead through the work — not from the
              side of it.
            </p>
            <p>
              Off the clock: long-form writing on product craft, mentoring designers moving from IC
              to lead, and studying industrial design history.
            </p>
          </div>
        </div>

        <div className="md:col-span-5 md:pt-10">
          <div className="rounded-3xl border border-line bg-card p-8 md:p-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Currently
            </div>
            <ul className="mt-6 space-y-4 text-sm text-ink">
              <li className="flex justify-between gap-6">
                <span className="text-ink-soft">Role</span>
                <span>Founding Designer, Ledger AI</span>
              </li>
              <li className="flex justify-between gap-6">
                <span className="text-ink-soft">Focus</span>
                <span>AI-native enterprise UX</span>
              </li>
              <li className="flex justify-between gap-6">
                <span className="text-ink-soft">Based</span>
                <span>Bengaluru · Remote-first</span>
              </li>
              <li className="flex justify-between gap-6">
                <span className="text-ink-soft">Open to</span>
                <span>Staff / Principal / Head of Design</span>
              </li>
              <li className="flex justify-between gap-6">
                <span className="text-ink-soft">Advisory</span>
                <span>Two seats — Q4 2026</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-3xl border border-line bg-ink p-8 text-background md:p-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-background/60">
              Recognitions
            </div>
            <ul className="mt-6 space-y-3 text-sm text-background/90">
              <li>Awwwards SOTD — Fintech copilot, 2025</li>
              <li>CSS Design Awards — Best UX, Aviation Ops, 2024</li>
              <li>Speaker, Config APAC — Systems at scale, 2023</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export function Contact() {
  return (
    <section id="contact" className="relative px-4 md:px-8 lg:px-[120px] py-20 md:py-32">
      <div className="w-full">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-16 sm:py-20 md:rounded-[3rem] md:px-16 md:py-24 text-background border border-line/20 shadow-2xl">
          {/* Base Radial Gradient Atmosphere */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 20% 30%, oklch(0.35 0.14 42/0.6), transparent), radial-gradient(50% 60% at 80% 70%, oklch(0.3 0.12 30/0.55), transparent)",
            }}
          />

          {/* Contact Background Image with lighter / screen blending effect */}
          <img
            src={contactBg}
            alt="Workspace setup"
            className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none mix-blend-screen opacity-[0.07]"
            style={{ mixBlendMode: "screen", opacity: 0.07 }}
          />

          {/* Subtle readability scrim so text remains crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-8 md:gap-10">
            {/* Section label */}
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
              <span className="h-px w-8 bg-white/20" />
              <span>Contact</span>
            </div>

            {/* Heading */}
            <RevealText
              text="Let’s build better products."
              as="h2"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.1] tracking-tight text-white max-w-4xl"
            />

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/80 max-w-2xl">
              I’m open to Product Designer roles and select zero-to-one projects. If you’re building something complex, I’d like to hear about it.
            </p>

            {/* Availability line & Buttons */}
            <div className="pt-2 flex flex-col gap-6">
              {/* Availability line */}
              <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-white/70">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>Open to Product Designer roles · Available to start soon</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:amittadvi1412@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-ink font-medium text-sm transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Email me</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/amitinnovatesux/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm shadow-sm backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {/* Other links */}
              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-white/60 pt-2">
                <span>Also find me on</span>
                <a href="https://www.behance.net/amittadvi" target="_blank" rel="noreferrer" className="text-white/90 hover:text-accent transition-colors underline underline-offset-4">
                  Behance
                </a>
                <span>·</span>
                <a href="https://dribbble.com/Scyla_FX1412" target="_blank" rel="noreferrer" className="text-white/90 hover:text-accent transition-colors underline underline-offset-4">
                  Dribbble
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-12 md:px-8 lg:px-[120px]">
      <div className="relative flex w-full flex-col items-center gap-6 md:flex-row md:justify-center">
        <div className="flex items-center gap-3 md:absolute md:left-0">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-background font-display text-lg">
            a
          </span>
          <div>
            <div className="text-sm font-medium text-ink">Amit Tadvi</div>
            <div className="text-xs text-muted-foreground">
              Product Designer · © {new Date().getFullYear()}
            </div>
          </div>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground text-center max-w-full">
          Charting products through the unknown, one constellation at a time
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Legacy exports (kept for compatibility with existing route)        */
/* ------------------------------------------------------------------ */


export const SelectedWork = FeaturedWork;

export function Expertise() {
  const [active, setActive] = useState(0);

  const services = [
    {
      num: "01",
      label: "Design",
      title: "Enterprise Product Design",
      desc: "End-to-end design for web and mobile products, from early concept to final UI and handoff.",
      tags: ["0→1 Design", "UX Flows", "Accessibility"],
      img: "/Design.png",
    },
    {
      num: "02",
      label: "Systems",
      title: "Design System Development",
      desc: "Reusable tokens and components that keep web and mobile products consistent and speed up handoff.",
      tags: ["Design Tokens", "Component Libraries", "Documentation"],
      img: "/Systems.png",
    },
    {
      num: "03",
      label: "Research",
      title: "Research and Testing",
      desc: "Interviews, usability testing and workflow analysis with users to guide decisions before and after launch.",
      tags: ["User Research", "Usability Testing", "Journey Mapping"],
      img: "/Research.png",
    },
    {
      num: "04",
      label: "Prototyping",
      title: "AI-Assisted Rapid Prototyping",
      desc: "Using AI tools to turn ideas into testable prototypes quickly, then validating them with users.",
      tags: ["Figma", "AI Tools", "Interactive Prototypes"],
      img: "/Prototyping.png",
    },
  ];

  return (
    <section id="expertise" className="relative px-4 py-24 md:px-8 md:py-32 lg:px-[120px] bg-background">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-6 mb-6 md:mb-10 w-full">
          <h2 className="font-display text-xl tracking-tight text-[#FF451A] md:text-3xl leading-none">
            My Expertise
          </h2>
          <div className="flex-1 h-px bg-line hidden md:block mx-6" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="h-1.5 w-1.5 bg-[#FF451A]" />
            <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              EXPERTISE
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div className="w-full mb-8 md:mb-12">
          <h2 className="font-display text-4xl leading-[1.2] text-ink md:text-5xl max-w-3xl">
            Skills I bring to product teams.
          </h2>
          <p className="mt-4 text-base md:text-lg text-ink-soft font-light max-w-2xl">
            Four areas where I help teams move from ambiguity to shipped, usable products.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="flex h-auto w-full flex-col gap-[1px] bg-line overflow-hidden rounded-2xl border border-line md:h-[620px] md:flex-row">
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={s.num}
                layout
                onClick={() => setActive(i)}
                className={`group relative flex cursor-pointer flex-col transition-colors ${isActive ? "md:flex-[3] bg-background" : "md:flex-1 bg-surface hover:bg-surface-2"
                  }`}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Panel Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-line p-4 md:p-6">
                  <span className="font-mono text-xs text-ink-soft uppercase tracking-widest">
                    {s.label}
                  </span>
                  <span className="font-mono text-xs text-ink-soft">({s.num})</span>
                </div>

                {/* Content Area */}
                <div className="relative flex flex-1 flex-col overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key={`expanded-${s.num}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-1 flex-col p-6 md:p-8 justify-between"
                      >
                        <div className="relative mb-6 flex-1 overflow-hidden rounded-xl bg-surface min-h-[160px] md:min-h-[220px]">
                          <img
                            src={s.img}
                            alt={s.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-shrink-0">
                          <p className="mb-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                            {s.desc}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {s.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded border border-line px-3 py-1.5 text-xs text-ink-soft bg-surface/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-semibold text-ink tracking-tight">
                            {s.title}
                          </h3>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`collapsed-${s.num}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col justify-end items-center pb-8 w-full"
                      >
                        {/* Desktop Collapsed Vertical Title */}
                        <div className="hidden md:flex flex-col items-center justify-end w-full flex-1">
                          <span className="text-lg lg:text-xl font-semibold tracking-tight text-ink-soft group-hover:text-ink transition-colors whitespace-nowrap [writing-mode:vertical-rl] rotate-180 select-none">
                            {s.title}
                          </span>
                        </div>

                        {/* Mobile Collapsed Title */}
                        <div className="flex w-full items-center p-4 md:hidden">
                          <span className="text-lg font-semibold text-ink-soft transition-colors group-hover:text-ink">
                            {s.title}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ArchitectureBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <div ref={ref} className="w-full py-16 md:py-32 overflow-hidden relative flex flex-col items-center justify-center pointer-events-none">
      <motion.div
        style={{ y, scale }}
        className="w-full max-w-[1400px] px-4 md:px-12 relative flex justify-center items-center"
      >
        {/* Glowing pulse effect behind the center of the diagram */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-1/2 h-1/2 bg-[#0088FF]/10 blur-[120px] rounded-full -z-10"
        />

        <motion.img
          initial={{ opacity: 0, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-10% 0px" }}
          src={architectureImg}
          alt="System Architecture Schematic"
          className="w-full h-auto object-contain opacity-90 drop-shadow-sm"
        />
      </motion.div>
    </div>
  );
}

export function ContactModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[500px] max-h-[90vh] bg-background shadow-2xl rounded-3xl flex flex-col border border-line overflow-y-auto pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-line shrink-0">
                <span className="font-display text-2xl text-ink">Get in touch</span>
                <button
                  aria-label="Close contact"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-surface transition-colors"
                >
                  <X className="h-5 w-5 text-ink" />
                </button>
              </div>
              <div className="p-8 flex flex-col gap-10 flex-1">
                <div>
                  <h3 className="font-display text-3xl text-ink mb-2">Let's build something great.</h3>
                  <p className="text-ink-soft/90 font-light leading-relaxed">
                    I'm always open to discussing product design work, partnerships, or consulting opportunities.
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Name</span>
                    <span className="text-lg font-medium text-ink">Tadvi Amitkumar Dhirajbhai</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Email</span>
                    <a href="mailto:amittadvi1412@gmail.com" onClick={onClose} className="text-lg font-medium text-ink hover:text-accent transition-colors underline decoration-line underline-offset-4 hover:decoration-accent">amittadvi1412@gmail.com</a>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Contact</span>
                    <a href="tel:+919898086164" onClick={onClose} className="text-lg font-medium text-ink hover:text-accent transition-colors">+91 98980 86164</a>
                  </div>
                </div>
                <div className="mt-auto pt-10 border-t border-line shrink-0">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-4">Connect with me</span>
                  <div className="flex items-center gap-4">
                    <a href="https://www.linkedin.com/in/amitinnovatesux/" onClick={onClose} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 hover:opacity-80 transition-opacity">
                      <img src="/linkedin-app-icon.png" alt="LinkedIn" className="w-full h-full object-contain" />
                    </a>
                    <a href="https://www.behance.net/amittadvi" onClick={onClose} target="_blank" rel="noopener noreferrer" aria-label="Behance" className="w-10 h-10 hover:opacity-80 transition-opacity">
                      <img src="/behance-square-color-icon.png" alt="Behance" className="w-full h-full object-contain" />
                    </a>
                    <a href="https://dribbble.com/Scyla_FX1412" onClick={onClose} target="_blank" rel="noopener noreferrer" aria-label="Dribbble" className="w-10 h-10 hover:opacity-80 transition-opacity">
                      <img src="/dribbble-square-color-icon.png" alt="Dribbble" className="w-full h-full object-contain" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}


