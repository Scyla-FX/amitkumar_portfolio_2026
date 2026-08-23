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
import heroOverlay from "../assets/hero-overlay.png";


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
            <span>Amit Tadvi</span>
            <span>Portfolio · 2026</span>
          </div>

          <div className="flex flex-col items-start">
            <RevealText
              text="Designing the systems"
              as="h2"
              className="font-display text-4xl leading-[0.95] text-background sm:text-5xl md:text-5xl"
            />
            <RevealText
              text="behind serious software."
              as="h2"
              className="font-display text-4xl leading-[0.95] text-background/70 sm:text-5xl md:text-5xl"
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
            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-background shadow-2xl flex flex-col border-l border-line overflow-y-auto"
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
                    <a href="mailto:amittadvi1412@gmail.com" className="text-lg font-medium text-ink hover:text-accent transition-colors underline decoration-line underline-offset-4 hover:decoration-accent">amittadvi1412@gmail.com</a>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Contact</span>
                    <a href="tel:+919898086164" className="text-lg font-medium text-ink hover:text-accent transition-colors">+91 98980 86164</a>
                  </div>
                </div>

                <div className="mt-auto pt-10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-4">Connect with me</span>
                  <div className="flex items-center gap-4">
                    <a href="#" aria-label="LinkedIn" className="w-12 h-12 rounded-full border border-line bg-surface flex items-center justify-center hover:border-ink hover:bg-ink hover:text-background transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                    <a href="#" aria-label="Behance" className="w-12 h-12 rounded-full border border-line bg-surface flex items-center justify-center hover:border-ink hover:bg-ink hover:text-background transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.918 2.338-5.312 5.48-5.312 3.058 0 5.422 1.397 5.422 5.068 0 .548-.052 1.096-.135 1.458h-7.391c.081 1.792 1.258 2.502 2.775 2.502 1.636 0 2.368-.962 2.511-1.464h2.003zm-2.855-3.31c-.1-1.378-1.218-1.879-2.327-1.879-1.229 0-2.228.636-2.47 1.879h4.797zm-11.871-3.69c-1.583 0-4.083.473-4.083 4.542 0 4.148 2.51 4.458 4.095 4.458 2.115 0 3.905-1.451 3.905-4.5 0-2.91-1.611-4.5-3.917-4.5zm-5.003-8h5.922c2.095 0 3.791.956 3.791 3.238 0 1.58-1.118 2.449-2.261 2.809 1.411.238 2.72 1.488 2.72 3.324 0 2.59-1.921 3.629-4.28 3.629h-5.892v-13zm4 5.372h1.492c.983 0 1.704-.42 1.704-1.639 0-1.25-.794-1.572-1.63-1.572h-1.566v3.211zm0 5.628h1.765c1.139 0 2.05-.443 2.05-1.999 0-1.582-.951-1.961-2.029-1.961h-1.786v3.96z"/></svg>
                    </a>
                    <a href="#" aria-label="Dribbble" className="w-12 h-12 rounded-full border border-line bg-surface flex items-center justify-center hover:border-ink hover:bg-ink hover:text-background transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8.932 9.071c-.732-.239-2.316-.677-4.22-.924.908-1.722 1.624-3.551 1.936-4.512 1.344 1.365 2.193 3.298 2.284 5.436zm-2.822-6.52c-.328.989-1.077 2.871-2.012 4.636-2.585-.688-5.321-.861-6.195-.898.397-.991 1.708-3.959 3.513-5.26 1.758.261 3.344 1.004 4.694 1.522zm-6.241-1.534c-1.64.939-2.923 3.564-3.411 4.717-1.46.012-3.842.13-6.113.884 1.042-2.879 3.364-5.111 6.302-5.748 1.043.033 2.195.085 3.222.147zm-9.851 6.883c2.378-.718 4.96-.867 6.444-.88 1.488 2.853 2.502 6.136 2.877 7.424-2.89.69-5.914 1.559-7.79 3.219-1.121-1.623-1.782-3.606-1.782-5.746 0-1.408.243-2.766.685-4.017zm2.464 12.015c1.884-1.657 4.981-2.531 7.925-3.235 1.066 3.197 1.558 6.488 1.678 7.336-3.791.432-7.39-.775-9.603-4.101zm11.396.657c-.125-.9-.636-4.225-1.738-7.447 1.956.242 3.652.686 4.417.935-.494 3.03-2.477 5.518-5.011 6.512zm.643-8.528c-.803-.255-2.673-.728-4.802-.957-.358-1.229-1.328-4.469-2.748-7.234.821.036 3.593.189 6.223.896 1.026 1.986 1.493 4.545 1.327 7.295z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
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
          className="relative flex min-h-[50vh] md:min-h-[55vh] flex-col justify-between overflow-hidden rounded-[2rem] shadow-2xl md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white"
        >
          {/* User's Uploaded Image */}
          <img src={heroOverlay} alt="Hero background" className="absolute inset-0 h-full w-full object-cover" />

          {/* 90% Fluid Gradient Overlay */}
          <div className="absolute inset-0 animate-fluid-bg bg-gradient-to-br from-[#c94b3a] via-[#3a7596] to-[#403c62] opacity-90" />

          {/* Darken Tint */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="pointer-events-none absolute inset-0 grain opacity-20" aria-hidden />

          <div className="relative z-10 w-full flex flex-col min-h-[50vh] md:min-h-[55vh] justify-between">
            {/* Top Row */}
            <div className="flex flex-col lg:flex-row justify-between w-full gap-12">
              {/* Left Top */}
              <div className="flex-1 max-w-[650px]">
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="flex items-center gap-3 mb-8">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A855] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8A855]"></span>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/70">Product Designer & Developer</span>
                </motion.div>
                
                <motion.h1 
                  custom={1} variants={fadeUp} initial="hidden" animate="show"
                  className="text-[44px] sm:text-[56px] md:text-[64px] font-bold leading-[1.4] tracking-tight mb-8"
                >
                  We build digital products with <span className="text-[#E8A855] italic font-serif">intent.</span>
                </motion.h1>
              </div>

              {/* Right Top Stats */}
              <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="flex flex-row lg:flex-col gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:items-end">
                <div className="flex flex-col min-w-[120px] lg:text-right">
                  <span className="font-mono text-3xl font-medium text-white tabular-nums">30+</span>
                  <span className="text-xs text-white/60 mt-1 uppercase tracking-widest font-medium">Projects shipped</span>
                </div>
                <div className="flex flex-col min-w-[120px] lg:text-right">
                  <span className="font-mono text-3xl font-medium text-white tabular-nums">9yrs</span>
                  <span className="text-xs text-white/60 mt-1 uppercase tracking-widest font-medium">In practice</span>
                </div>
                <div className="flex flex-col min-w-[120px] lg:text-right">
                  <span className="font-mono text-3xl font-medium text-white tabular-nums">98%</span>
                  <span className="text-xs text-white/60 mt-1 uppercase tracking-widest font-medium">Client return rate</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-col md:flex-row items-start md:items-end justify-between mt-16 md:mt-20 gap-10">
              {/* Left Bottom */}
              <div className="max-w-[450px]">
                <p className="text-[17px] text-white/80 leading-relaxed font-light">
                  Partnering with ambitious founders and engineering teams to transform complex requirements into seamless, scalable user experiences.
                </p>
              </div>
              
              {/* Right Bottom */}
              <div className="flex flex-col items-end gap-6">
                {/* Floating Element - Shifted above trusted founders */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                  whileHover={{ y: -5 }}
                  className="hidden lg:block w-[280px] md:w-[320px] bg-white/5 backdrop-blur-md rounded-[24px] p-2 border border-white/10 shadow-2xl overflow-hidden group cursor-pointer"
                >
                  <Link to={HERO_PROJECTS[projectIndex].link} className="block relative w-full rounded-[16px] overflow-hidden aspect-[32/9] bg-black/20">
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

                <div className="flex items-center gap-5">
                  <div className="flex -space-x-3">
                    <img src="https://i.pravatar.cc/100?img=4" className="h-11 w-11 rounded-full border-2 border-[#1B2A3D] object-cover shadow-sm" />
                    <img src="https://i.pravatar.cc/100?img=5" className="h-11 w-11 rounded-full border-2 border-[#1B2A3D] object-cover shadow-sm" />
                    <img src="https://i.pravatar.cc/100?img=6" className="h-11 w-11 rounded-full border-2 border-[#1B2A3D] object-cover shadow-sm" />
                    <img src="https://i.pravatar.cc/100?img=7" className="h-11 w-11 rounded-full border-2 border-[#1B2A3D] object-cover shadow-sm" />
                  </div>
                  <div className="flex flex-col text-[13px] text-white/90 leading-[1.4] text-left">
                    <span className="font-medium">Trusted by 20+ founders</span>
                    <span className="text-white/60">across US & EU</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
              I design products for forward-thinking companies. The result - products that scale, and impact that lasts.
            </h3>

            <div className="mt-10 md:mt-16 space-y-6 text-base leading-relaxed text-ink-soft md:text-[1.1rem]">
              <p>
                I&apos;m <span className="text-ink font-medium">Amitkumar Tadvi</span> - a Senior Product Designer with
                9+ years of experience leading end-to-end UX strategy and user-centered design for enterprise SaaS products.
                I specialize in turning ambiguous, 0-to-1 requirements into scalable design systems and data-informed interfaces
                that cross-functional teams - product, engineering, and business - actually adopt. My work spans aviation,
                healthcare, HR tech, fintech, and AI copilots, with deep experience in B2B SaaS workflows, usability testing,
                and accessible design.
              </p>
              <p>
                Much like navigating the vastness of space, guiding a product from zero to launch requires a steady hand and a clear trajectory. As a product designer and design leader, I view complex enterprise systems as constellations—each feature a star that must align perfectly to form a cohesive universe. I thrive on bringing order to the chaos of the unknown, mapping out strategic orbits for cross-functional teams, and ensuring we all move at escape velocity toward a singular, stellar product experience. I believe great design goes beyond aesthetics - it solves real business problems. By bridging complex engineering constraints with intuitive user needs, I deliver seamless solutions that reduce friction, improve accessibility, and drive measurable growth.
              </p>
              <p>
                Now, I&apos;m ready for my next cosmic adventure—exploring new galaxies of creativity, co-creating bold ideas, and turning ambitious design dreams into reality. Whether it&apos;s crafting scalable enterprise systems or pioneering <span className="bg-gradient-to-r from-[#FF451A] to-[#FF8A00] bg-clip-text text-transparent font-medium">AI-driven experiences</span>, I am always looking to push the boundaries of what&apos;s possible on the next frontier.
              </p>
            </div>
            
            {/* Horizontal Quick Hits & CTAs */}
            <div className="mt-12 md:mt-16 pt-10 border-t border-line flex flex-col gap-10">
              
              <div className="flex flex-col md:flex-row gap-10 md:gap-16">
                <div className="flex-1">
                  <h4 className="font-display text-lg text-ink mb-4">Core Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Enterprise SaaS", "AI Copilots", "B2B Workflows", "Complex Dashboards", "0→1 Product Design"].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-background border border-line rounded-full text-xs font-medium text-ink-soft">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="font-display text-lg text-ink mb-4">Design Toolkit</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "Design Systems", "Protopie", "UX Strategy", "User Research", "Wireframing", "Interaction Design"].map(tool => (
                      <span key={tool} className="px-3 py-1.5 bg-background border border-line rounded-full text-xs font-medium text-ink-soft">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a href="#" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-accent w-full sm:w-auto text-center">
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
    title: "UX Case Study",
    tags: ["Research", "Strategy", "Wireframing"],
    img: "/featured-ux-case-study.jpg",
    link: "/case-study",
  },
  {
    n: "02",
    title: "SaaS based CRM / ERP",
    tags: ["Enterprise", "Dashboard", "UI/UX"],
    img: "/featured-crm-erp.jpg",
    link: "/expertise/crm-erp",
  },
  {
    n: "03",
    title: "Mobile Application",
    tags: ["iOS", "Android", "Interaction"],
    img: "/featured-mobile-app.jpg",
    link: "/expertise/mobile-app",
  },
  {
    n: "04",
    title: "Webdesign",
    tags: ["Webflow", "Creative", "Animation"],
    img: "/featured-webdesign.jpg",
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

const PROCESS = [
  {
    n: "01",
    t: "Frame",
    b: "Reframe the ask into the business outcome, the operator's job, and the constraints nobody has written down yet.",
    d: "Stakeholder maps · Jobs-to-be-done · Success metrics",
  },
  {
    n: "02",
    t: "Discover",
    b: "Field research with the people doing the work. Journey maps and workflow analysis grounded in real telemetry.",
    d: "Interviews · Shadowing · Workflow instrumentation",
  },
  {
    n: "03",
    t: "Architect",
    b: "Information architecture, state models, and interaction primitives. Decisions made before pixels.",
    d: "IA · State charts · Content model",
  },
  {
    n: "04",
    t: "Design",
    b: "Systemic UI with tokens, primitives, and motion. Every screen composed, not authored.",
    d: "Design system · High-fidelity flows · Motion spec",
  },
  {
    n: "05",
    t: "Ship",
    b: "Paired with engineering. Accessibility, edge cases and empty states specified in the same doc as the happy path.",
    d: "Handoff · A11y · Instrumentation",
  },
  {
    n: "06",
    t: "Compound",
    b: "Post-launch review against north-star metrics. Feed learnings back into the system so the next release is faster.",
    d: "Analytics · Retros · System iteration",
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
        <h2 className="font-display text-4xl leading-[1.2] text-ink md:text-5xl">
          A repeatable path
          <br />
          <span className="text-ink-soft">from ambiguity to release.</span>
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
            <p className="text-sm leading-loose text-ink-soft mb-2">{step.b}</p>
            <div className="mt-auto font-mono text-[10px] uppercase tracking-[0.2em] text-accent pt-2">
              {step.d}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience Timeline                                                */
/* ------------------------------------------------------------------ */

const CORE_TIMELINE = [
  {
    y: "Jun 2024 — Present",
    r: "Product Designer",
    c: "AV DEVS Solutions",
    b: [
      "Own end-to-end product design for mobile and web platforms across aviation, healthcare, and HR tech clients.",
      "Built and maintain a shared design system used across 3+ client products, cutting design-to-dev handoff time significantly.",
      "Run user research and usability testing closely with PMs and engineers to align designs with business goals."
    ],
  },
  {
    y: "Apr 2023 — Jul 2024",
    r: "Senior UX Designer",
    c: "ekZero",
    b: [
      "Led design for core product flows, owning decisions from early concept through final UI in Figma.",
      "Delivered detailed specs and interactive prototypes that reduced development revision cycles across multiple product releases.",
      "Mentored junior designers on process and critique, while shaping roadmap priorities with product and engineering leads."
    ],
  },
  {
    y: "Jul 2021 — Apr 2023",
    r: "UI/UX Designer",
    c: "Upkram Technologies Pvt. Ltd.",
    b: [
      "Designed interfaces for web and mobile products based on ongoing user research and behavioral analysis.",
      "Built wireframes, prototypes, and high-fidelity UI, iterating continuously based on usability testing feedback from users.",
      "Contributed reusable components to a shared design system, improving consistency and efficiency across multiple products."
    ],
  },
  {
    y: "Jan 2020 — May 2021",
    r: "Sr. Designer / UI UX Designer",
    c: "Kanan International Pvt. Ltd.",
    b: [
      "Redesigned the company website, increasing user engagement and significantly reducing bounce rate across key pages.",
      "Led a small design team, setting clear direction on visual and interaction design standards company-wide.",
      "Designed marketing campaign assets aligned to brand identity, using A/B testing to improve interface usability."
    ],
  },
  {
    y: "May 2016 — Sep 2019",
    r: "UI UX Designer",
    c: "Blackfox Media Pvt. Ltd.",
    b: [
      "Designed graphics and UI for several advertising campaigns, significantly improving click-through rates for clients.",
      "Led a small team of designers, maintaining consistency with brand guidelines across all campaign projects.",
      "Worked directly with clients to translate their vision into multimedia and digital design solutions."
    ],
  },
];

const EARLY_TIMELINE = [
  {
    y: "Nov 2015 — Apr 2016",
    r: "Sr. Roto Artist",
    c: "Trace VFX Solutions India Pvt. Ltd.",
    b: [
      "Delivered precise rotoscoping and matte cutting techniques for VFX integration on live-action film projects.",
      "Collaborated closely with the VFX team to meet project timelines and maintain quality standards.",
      "Supported seamless visual effects integration across several high-profile film and television productions."
    ],
  },
  {
    y: "Mar 2012 — Oct 2015",
    r: "Autocad Designer",
    c: "Dhara Fire Service Private Limited",
    b: [
      "Created detailed and compliant AutoCAD designs for fire safety systems across multiple client projects.",
      "Collaborated closely with engineers on technical specifications, ensuring accuracy throughout the design process.",
      "Maintained design templates and documentation to support efficient and timely project delivery."
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
          Over eight years of digital design,
          <br />
          <span className="text-ink-soft">across five distinct and highly complex industries.</span>
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
                <h3 className="font-display text-3xl text-ink md:text-4xl leading-none md:leading-none">{t.r}</h3>
                <div className="mt-3 text-sm text-accent">{t.c}</div>
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
    q: "Amit is the rare designer who improves the product roadmap, not just the pixels. He earned engineering trust in a week. During our time working together, he consistently demonstrated an incredible ability to bridge the gap between high-level business strategy and granular user interface details. His approach to design systems completely transformed our development speed, allowing us to ship features 30% faster without sacrificing visual quality. He doesn't just ask 'what should this look like?', he asks 'what problem are we actually trying to solve?' which fundamentally shifts how the entire product team operates. Highly recommended.",
    n: "VP Product, Aviation SaaS",
  },
  {
    q: "I've had the absolute pleasure of working closely with Amit across two different companies now, first at our previous agency and now in our current enterprise role. As an app developer, it is incredibly rare to find a UI/UX designer who so deeply understands the technical constraints and engineering reality of shipping mobile and web applications. We delivered several complex, high-stakes projects together from scratch. Amit's design handoffs are flawless—his Figma files, component libraries, and interactive prototypes leave absolutely zero ambiguity for the dev team. He's not just a brilliant creative mind; he is a true partner to engineering who makes everyone around him build better software.",
    n: "Harshit Darji — App Developer",
  },
  {
    q: "He turned three years of workflow debt into a coherent system our teams actually use. It's the most consequential design work we've shipped in recent memory. Amit possesses this unique editorial eye that brings elegance to even the most chaotic, data-heavy enterprise dashboards. When he took over the core clinical workflows, he didn't just re-skin the UI; he conducted deep behavioral research with our operators and fundamentally reimagined how the information architecture should flow. The result was a platform that not only looks beautiful but drastically reduces cognitive load for our users. He is a phenomenal senior talent.",
    n: "Head of Design, Healthcare Platform",
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
            <figcaption className="mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
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
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-[100px] text-background md:rounded-[3rem] md:px-16">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(50% 60% at 20% 30%, oklch(0.35 0.14 42/0.6), transparent), radial-gradient(50% 60% at 80% 70%, oklch(0.3 0.12 30/0.55), transparent)",
            }}
          />
          <div className="relative">
            <SectionLabel>
              <span className="text-background/60">Let&apos;s build better products</span>
            </SectionLabel>

            <RevealText
              text="Have a problem "
              as="h2"
              className="font-display text-5xl leading-[1.6] text-background md:text-[6vw]"
            />
            <RevealText
              text={"nobody's cracked yet?\u00A0"}
              as="h2"
              className="font-display text-[52px] font-semibold leading-[1.6] italic text-accent md:text-[6.5vw]"
              delay={0.15}
            />

            <div className="mt-20 grid gap-10 md:grid-cols-12 items-end">
              <p className="md:col-span-6 text-lg leading-loose text-background/80">
                I take on two engagements a quarter — usually zero-to-one AI products, enterprise
                consolidation, or design leadership for teams shipping regulated software.
              </p>

              <div className="md:col-span-6 md:col-start-7 flex flex-col items-start md:items-end gap-6">
                <div className="flex flex-col items-center gap-6">
                  <MagneticButton href="mailto:amittadvi1412@gmail.com">
                    amittadvi1412@gmail.com
                  </MagneticButton>
                  <div className="flex w-full justify-between text-sm text-background/70 px-2">
                    <a href="https://www.linkedin.com/in/amitinnovatesux/" target="_blank" rel="noreferrer" className="story-link hover:text-white transition-colors">
                      LinkedIn
                    </a>
                    <a href="https://www.behance.net/amittadvi" target="_blank" rel="noreferrer" className="story-link hover:text-white transition-colors">
                      Behance
                    </a>
                    <a href="https://dribbble.com/Scyla_FX1412" target="_blank" rel="noreferrer" className="story-link hover:text-white transition-colors">
                      Dribbble
                    </a>
                  </div>
                </div>
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
      <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-background font-display text-lg">
            a
          </span>
          <div>
            <div className="text-sm font-medium text-ink">Amit Tadvi</div>
            <div className="text-xs text-muted-foreground">
              Senior Product Designer · © {new Date().getFullYear()}
            </div>
          </div>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground text-center">
          Charting products through the unknown, one constellation at a time
        </div>
        <Link
          to="/"
          className="text-sm text-ink-soft transition-colors hover:text-ink"
          aria-label="Back to top"
        >
          Back to top ↑
        </Link>
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
      title: "UI/UX Design",
      desc: "We design intuitive, accessible interfaces that improve usability, guide users, and increase engagement.",
      tags: ["0-to-1 Design", "User Research", "UX Flows", "Accessibility", "Prototyping"],
      img: "/expertise-uiux.jpg"
    },
    {
      num: "02",
      title: "Design Systems",
      desc: "We build scalable design systems that ensure visual consistency, speed up execution, and maintain brand integrity.",
      tags: ["Component Libraries", "Design Tokens", "Style Guides", "Dev Handoff", "Auto Layout"],
      img: "/expertise-designsystem.jpg"
    },
    {
      num: "03",
      title: "Brand Identity",
      desc: "We create distinct brand identities that communicate purpose, build trust, and stand out in enterprise markets.",
      tags: ["Visual Identity", "Brand Guidelines", "Typography Systems", "Brand Voice", "Stakeholder Buy-In"],
      img: "/expertise-brand-identity.jpg"
    },
    {
      num: "04",
      title: "Growth Design",
      desc: "We design with data at the core, crafting experiences that improve conversion and retention.",
      tags: ["Data-Informed Design", "A/B Testing", "Funnel Optimization", "Journey Mapping", "Conversion UX"],
      img: "/expertise-growthdesign.jpg"
    },
    {
      num: "05",
      title: "Content Design",
      desc: "We craft clear, purposeful content that guides users and strengthens the product experience.",
      tags: ["UX Writing", "Microcopy", "Information Architecture", "Content Hierarchy", "Design Critique"],
      img: "/expertise-content-design.jpg"
    }
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
              Service
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div className="w-full mb-6 md:mb-10">
          <h2 className="font-display text-4xl leading-[1.2] text-ink md:text-5xl">
            A strategic partner,<br />
            <span className="text-ink-soft">designing systems that scale.</span>
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="flex h-auto w-full flex-col gap-[1px] bg-line overflow-hidden rounded-2xl border border-line md:h-[600px] md:flex-row">
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
                    Service
                  </span>
                  <span className="font-mono text-xs text-ink-soft">({s.num})</span>
                </div>

                {/* Content Area */}
                <div className="relative flex flex-1 flex-col overflow-hidden">
                  {/* Fading Content (Image, Description, Tags) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-1 flex-col p-4 md:p-6"
                      >
                        <div className="relative mb-6 flex-1 overflow-hidden rounded-xl bg-surface min-h-[160px] md:min-h-[200px]">
                          <img
                            src={s.img}
                            alt={s.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-shrink-0 pb-10 md:pb-12">
                          <p className="mb-6 max-w-xl text-sm leading-relaxed text-ink-soft">
                            {s.desc}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {s.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded border border-line px-3 py-1.5 text-xs text-ink-soft"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Desktop Title (Rotates and moves) */}
                  <motion.h3
                    layout
                    initial={false}
                    animate={{ rotate: isActive ? 0 : -90 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`hidden md:block absolute whitespace-nowrap text-3xl font-semibold tracking-tight transition-colors z-10 origin-center ${isActive
                      ? "bottom-6 left-6 text-ink"
                      : "bottom-1/2 left-1/2 text-ink-soft group-hover:text-ink"
                      }`}
                    style={
                      isActive
                        ? { x: 0, y: 0 }
                        : { x: "-50%", y: "50%" }
                    }
                  >
                    {s.title}
                  </motion.h3>

                  {/* Mobile Collapsed Title */}
                  {!isActive && (
                    <div className="flex flex-1 items-center p-4 md:hidden">
                      <span className="text-xl font-semibold text-ink-soft transition-colors group-hover:text-ink">
                        {s.title}
                      </span>
                    </div>
                  )}
                  {/* Mobile Expanded Title */}
                  {isActive && (
                    <div className="absolute bottom-4 left-4 z-10 md:hidden">
                      <span className="text-xl font-semibold text-ink">
                        {s.title}
                      </span>
                    </div>
                  )}
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


