import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { FeatureFilm } from "./FeatureFilm";
import { ExperientialSpatial } from "./ExperientialSpatial";
import { SelectClients } from "./SelectClients";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Mail, Linkedin, X, ChevronLeft, ChevronRight, ArrowUpToLine, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ── Shared animation constants ──
const VIEWPORT_ONCE = { once: true, margin: "-100px" as const };
const FADE_UP = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: VIEWPORT_ONCE };

// ── Body scroll lock utility ──
function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
}

// ── Focus trap hook for modals ──
function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    const container = containerRef.current;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus the first focusable element
    requestAnimationFrame(() => {
      const firstFocusable = container.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    });

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusableElements.length === 0) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
      previouslyFocused?.focus?.();
    };
  }, [isActive, containerRef]);
}

export interface Project {
  id: string;
  name: string;
  brandName?: string;
  projectTitle?: string;
  description?: string;
  client: string;
  agency: string;
  production: string;
  director?: string;
  credits: string;
  thumbnail: string;
  videoUrl?: string;
  videoType?: "direct" | "youtube" | "vimeo";
  additionalImages?: string[];
  additionalVideos?: Array<{ url: string; type: "direct" | "youtube" | "vimeo"; thumbnail?: string }>;
  year?: string;
  videoSeries?: Array<{
    name: string;
    url: string;
    type: "direct" | "youtube" | "vimeo";
    thumbnail?: string;
  }>;
}

interface PortfolioCinematicProps {
  projects: Project[];
  showreelUrl?: string;
  featureFilm?: {
    title: string;
    tagline: string;
    year: string;
    poster: string;
    trailerUrl?: string;
    trailerType?: "youtube" | "vimeo" | "direct";
    intro: string;
    awards?: string[];
    credits: {
      role: string;
      name: string;
    }[];
    stills: string[];
  };
}

// ── Custom Cursor Component ──
function CinematicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hasFineCursor, setHasFineCursor] = useState(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    setHasFineCursor(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!hasFineCursor) return;
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      rafId.current = requestAnimationFrame(animate);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .cursor-pointer")) {
        setIsHovering(true);
      }
    };
    const handleOut = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [hasFineCursor]);

  if (!hasFineCursor) return null;

  return createPortal(
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-200 ease-out"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "rgba(34,211,238,0.6)" : "rgba(255,255,255,0.35)"}`,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: "#22d3ee",
        }}
      />
    </>,
    document.body
  );
}

// ── #6: Magnetic Play Button Component ──
function MagneticPlayButton({ onClick }: { onClick: () => void }) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 120;
    if (dist < maxDist) {
      const strength = (1 - dist / maxDist) * 15;
      setOffset({ x: (dx / dist) * strength, y: (dy / dist) * strength });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role="button"
      aria-label="Play video"
      className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 cursor-pointer"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.15s ease-out',
      }}
    >
      <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
    </div>
  );
}

// ── #4: Stagger Title Component ──
function StaggerTitle({ lines, index }: { lines: { text: string; className: string; style?: React.CSSProperties }[]; index: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 25, clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
          viewport={VIEWPORT_ONCE}
        >
          {line.style ? (
            <p className={line.className} style={line.style}>{line.text}</p>
          ) : (
            <h3 className={line.className}>{line.text}</h3>
          )}
        </motion.div>
      ))}
    </>
  );
}

// ── #3: Parallax Image Component ──
function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element top enters viewport bottom, 1 when element bottom leaves viewport top
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      // Map to -20% .. +20% for stronger parallax depth
      const yPercent = (progress - 0.5) * 40;
      inner.style.transform = `translateY(${yPercent}%)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // initial position
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <div ref={innerRef} className="absolute inset-[-30%] will-change-transform">
        <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <ImageWithFallback
            src={src}
            alt={alt}
            className={className || "w-full h-full object-cover"}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

// ── #12: Email Scramble Component ──
function ScrambleEmail({ email }: { email: string }) {
  const [displayText, setDisplayText] = useState(email);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText(
        email.split("").map((char, i) => {
          if (i < iteration) return email[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      iteration += 1 / 2;
      if (iteration >= email.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(email);
        setIsScrambling(false);
      }
    }, 30);
  }, [email, isScrambling]);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-2 sm:gap-4 text-base sm:text-xl md:text-2xl hover:text-cyan-400 transition-colors font-light border-b border-white/20 hover:border-cyan-400/50 pb-2 break-all sm:break-normal"
      onMouseEnter={handleMouseEnter}
    >
      <Mail className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
      <span className="scramble-text">{displayText}</span>
    </a>
  );
}

// ── #10: Sticky Nav Component ──
function StickyNav({ show, activeSection }: { show: boolean; activeSection: string }) {
  const sections = [
    { id: "section-feature-film", label: "Feature Film" },
    { id: "section-selected-work", label: "Productions" },
    { id: "section-experiential", label: "Experiential" },
    { id: "section-contact", label: "Contact" },
  ];

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="sticky-nav"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-12 sm:h-14 flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm sm:text-base tracking-widest text-white/70 hover:text-white transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              ERIC ZHENG
            </button>
            <div className="hidden sm:flex items-center gap-6 md:gap-8">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                  className={`text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    activeSection === s.id ? 'text-cyan-400' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ── #2: Cinematic Intro Overlay ──
function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'black' | 'count3' | 'count2' | 'count1' | 'iris' | 'bars' | 'done'>('black');

  useEffect(() => {
    // Phase timeline: black(0) → count3(300) → count2(950) → count1(1600) → iris(2250) → bars(3100) → done(3700)
    const t0 = setTimeout(() => setPhase('count3'), 300);
    const t1 = setTimeout(() => setPhase('count2'), 950);
    const t2 = setTimeout(() => setPhase('count1'), 1600);
    const t3 = setTimeout(() => setPhase('iris'), 2250);
    const t4 = setTimeout(() => setPhase('bars'), 3100);
    const t5 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3700);
    return () => { [t0, t1, t2, t3, t4, t5].forEach(clearTimeout); };
  }, [onComplete]);

  if (phase === 'done') return null;

  const isLeader = phase === 'count3' || phase === 'count2' || phase === 'count1';
  const countdownNumber = phase === 'count3' ? 3 : phase === 'count2' ? 2 : 1;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none"
      animate={{ opacity: phase === 'bars' ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Black overlay — hidden during iris so the mask can work */}
      {phase !== 'iris' && phase !== 'bars' && (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* Film Leader Countdown — each number fades in/out independently */}
      {isLeader && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          {/* Rotating crosshair rings — persistent across all counts */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
            className="absolute w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-white/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
            className="absolute w-24 h-24 sm:w-36 sm:h-36 rounded-full border border-white/10"
          />
          {/* Crosshair lines */}
          <div className="absolute w-40 sm:w-56 h-px bg-white/15" />
          <div className="absolute h-40 sm:h-56 w-px bg-white/15" />
          {/* Countdown number — key change triggers independent animation */}
          <AnimatePresence mode="popLayout">
            <motion.span
              key={countdownNumber}
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl sm:text-9xl text-white/80 tabular-nums absolute"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
            >
              {countdownNumber}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {/* Iris Wipe Open — black mask with expanding circular hole using box-shadow */}
      {phase === 'iris' && (
        <div className="absolute inset-0 z-20 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            initial={{ width: 0, height: 0 }}
            animate={{ width: '250vmax', height: '250vmax' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              boxShadow: '0 0 0 100vmax black',
            }}
          />
        </div>
      )}

      {/* Letterbox bars slide in during iris phase */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-black z-30"
        initial={{ height: '50%' }}
        animate={{
          height: phase === 'iris' || phase === 'bars' ? '0%' : '50%',
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black z-30"
        initial={{ height: '50%' }}
        animate={{
          height: phase === 'iris' || phase === 'bars' ? '0%' : '50%',
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Center line accent during iris */}
      {phase === 'iris' && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-25"
          initial={{ width: 0, opacity: 1 }}
          animate={{ width: '60%', opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
    </motion.div>,
    document.body
  );
}

// ── #5: Blur-Up Image Component ──
function BlurUpImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Shimmer placeholder */}
      <div
        className="absolute inset-0 bg-zinc-800 transition-opacity duration-500"
        style={{ opacity: loaded ? 0 : 1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: loaded ? 'none' : 'shimmer 1.5s ease-in-out infinite',
          }}
        />
      </div>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className || ''} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export function PortfolioCinematic({ projects, showreelUrl, featureFilm }: PortfolioCinematicProps) {
  const uniqueProjects = projects.filter((project, index, self) =>
    index === self.findIndex((p) => p.id === project.id)
  );

  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedSeriesVideo, setSelectedSeriesVideo] = useState<{ url: string; type: "direct" | "youtube" | "vimeo" } | null>(null);
  const [enlargedStill, setEnlargedStill] = useState<{ src: string; images: string[]; index: number } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [introComplete, setIntroComplete] = useState(false);
  const [showreelModal, setShowreelModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stillsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const videoModalRef = useRef<HTMLDivElement>(null);
  const stillModalRef = useRef<HTMLDivElement>(null);
  const showreelModalRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  // ── Body scroll lock for modals ──
  useBodyScrollLock(!!playingVideo || !!enlargedStill || showreelModal);

  // ── Focus traps for modals ──
  useFocusTrap(!!playingVideo, videoModalRef);
  useFocusTrap(!!enlargedStill, stillModalRef);
  useFocusTrap(showreelModal, showreelModalRef);

  // ── Hash-based scroll on page load ──
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Delay to ensure DOM is ready after intro
      const timeout = setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, introComplete ? 100 : 4000);
      return () => clearTimeout(timeout);
    }
  }, [introComplete]);

  // ── Scroll handler: back-to-top + progress bar + sticky nav + active section ──
  useEffect(() => {
    const sectionIds = ["section-feature-film", "section-selected-work", "section-experiential", "section-contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > window.innerHeight);
      setShowNav(scrollY > window.innerHeight * 0.8);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      // Determine active section
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 200) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Gallery navigation ──
  const openStillGallery = useCallback((image: string, allImages: string[]) => {
    const index = allImages.indexOf(image);
    setEnlargedStill({ src: image, images: allImages, index: index >= 0 ? index : 0 });
  }, []);

  const navigateStill = useCallback((direction: number) => {
    setEnlargedStill(prev => {
      if (!prev) return null;
      const newIndex = (prev.index + direction + prev.images.length) % prev.images.length;
      return { src: prev.images[newIndex], images: prev.images, index: newIndex };
    });
  }, []);

  // ── Escape key handler for all modals ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (enlargedStill) setEnlargedStill(null);
        else if (playingVideo) { setPlayingVideo(null); setSelectedSeriesVideo(null); }
        else if (showreelModal) setShowreelModal(false);
      }
      if (enlargedStill) {
        if (e.key === "ArrowLeft") navigateStill(-1);
        if (e.key === "ArrowRight") navigateStill(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedStill, playingVideo, navigateStill, showreelModal]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePlayVideo = (projectId: string) => {
    setPlayingVideo(projectId);
    setSelectedSeriesVideo(null);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
    setSelectedSeriesVideo(null);
  };

  const handleSelectSeriesVideo = (video: { url: string; type: "direct" | "youtube" | "vimeo" }) => {
    setSelectedSeriesVideo(video);
  };

  const scrollStills = (projectId: string, direction: "left" | "right") => {
    const stillsRef = stillsRefs.current[projectId];
    if (stillsRef) {
      const scrollAmount = 320;
      stillsRef.scrollTo({
        left: stillsRef.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth"
      });
    }
  };

  const getEmbedUrl = (url: string, type: "youtube" | "vimeo") => {
    if (type === "youtube") {
      const videoId = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (type === "vimeo") {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  // Hero background images (cycle through project thumbnails)
  const heroImages = useMemo(() => uniqueProjects.slice(0, 5).map(p => p.thumbnail), [uniqueProjects]);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setHeroImageIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden">
      {/* #2: Cinematic Intro */}
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* #8: Film Grain Overlay */}
      <div className="film-grain" />

      {/* Custom Cursor */}
      <CinematicCursor />

      {/* #10: Sticky Navigation */}
      <StickyNav show={showNav} activeSection={activeSection} />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Decorative Color Spots — Animated */}
      <div className="fixed top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-orb-1" />
      <div className="fixed bottom-1/3 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-orb-2" />
      <div className="fixed top-1/2 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-orb-3" />
      
      {/* #7: Video Modal Overlay — with Iris Wipe */}
      <AnimatePresence>
        {playingVideo && (() => {
          const project = uniqueProjects.find(p => p.id === playingVideo);
          const hasSeries = project?.videoSeries && project.videoSeries.length > 0;
          
          return (
            <motion.div
              key="video-modal"
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ clipPath: 'circle(100% at 50% 50%)' }}
              exit={{ clipPath: 'circle(0% at 50% 50%)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
              onClick={handleCloseVideo}
              ref={videoModalRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Video player for ${project?.name || 'project'}`}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {hasSeries && !selectedSeriesVideo ? (
                <div 
                  className="w-full max-w-5xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-tight">
                    Select a video to watch
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {project?.videoSeries?.map((video, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleSelectSeriesVideo({ url: video.url, type: video.type })}
                        className="group cursor-pointer"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-white/10 hover:border-cyan-400/50 transition-all duration-300">
                          {video.thumbnail ? (
                            <img src={video.thumbnail} alt={`${video.name} – thumbnail`} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-cyan-900/30" />
                          )}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/80 flex items-center justify-center backdrop-blur-sm bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all">
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1" />
                            </div>
                          </div>
                        </div>
                        <p className="text-lg sm:text-xl md:text-2xl text-center mt-3 sm:mt-4 font-light group-hover:text-cyan-400 transition-colors">
                          {video.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div 
                  className="w-full max-w-7xl aspect-video relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    if (!project) return null;
                    const videoToPlay = selectedSeriesVideo || 
                      (project.videoUrl ? { url: project.videoUrl, type: project.videoType! } : null);
                    if (!videoToPlay) return null;

                    return videoToPlay.type === "direct" ? (
                      <video
                        ref={videoRef}
                        src={videoToPlay.url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain bg-black"
                        style={{ backgroundColor: '#000000', border: 'none' }}
                      />
                    ) : (
                      <iframe
                        src={getEmbedUrl(videoToPlay.url, videoToPlay.type)}
                        className="w-full h-full bg-black"
                        style={{ backgroundColor: '#000000', border: 'none' }}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`${project?.name || 'Project'} video`}
                      />
                    );
                  })()}
                </div>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>
      
      {/* Showreel Modal */}
      <AnimatePresence>
        {showreelModal && (
          <motion.div
            key="showreel-modal"
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(100% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
            onClick={() => setShowreelModal(false)}
            ref={showreelModalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Showreel video player"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setShowreelModal(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10"
              aria-label="Close showreel"
            >
              <X className="w-6 h-6" />
            </motion.button>
            <div
              className="w-full max-w-7xl aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://player.vimeo.com/video/1174467043?autoplay=1"
                className="w-full h-full bg-black"
                style={{ backgroundColor: '#000000', border: 'none' }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Eric Zheng Showreel 2025"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* #1: Hero Section — Full Screen with Background Showreel Video */}
      <section className="h-screen flex items-center justify-center px-4 sm:px-6 md:px-16 relative overflow-hidden">
        {/* Background: Showreel Video or Image Slideshow Fallback */}
        {showreelUrl ? (
          <div className="absolute inset-0">
            <video
              src={showreelUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.35 }}
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={heroImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={heroImages[heroImageIndex]}
                alt="Eric Zheng production showcase"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        )}
        {/* Multi-layer gradient overlay for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-zinc-900/60 to-zinc-900 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/40 via-transparent to-zinc-900/40 z-10" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 z-10" style={{ boxShadow: 'inset 0 0 200px 60px rgba(0,0,0,0.5)' }} />
        
        <div className="text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="inline-block relative mb-4 sm:mb-8"
          >
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] tracking-wide">
              ERIC ZHENG
            </h1>
          </motion.div>
          <div className="space-y-2 sm:space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-widest uppercase"
            >
              GLOBAL PRODUCER
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              className="text-sm sm:text-lg md:text-xl lg:text-2xl text-cyan-400/90 italic px-4"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
            >
              Bridging Cinematic Storytelling & Global Brands
            </motion.p>
          </div>
          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border border-white/30 flex justify-center pt-2"
            >
              <div className="w-1 h-2.5 rounded-full bg-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bio Section — with decorative quote marks */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-16 sm:py-24 md:py-32">
        <motion.div {...FADE_UP} className="max-w-4xl mx-auto text-center relative">
          {/* Decorative quote mark */}
          <span className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 text-6xl sm:text-8xl text-cyan-400/10 select-none pointer-events-none" style={{ fontFamily: 'var(--font-serif)' }}>"</span>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed font-light relative z-10">
            I am a global producer blending cinematic storytelling with premium brand campaigns. Over the past 15 years, I've scaled multi-million-dollar productions across the US, Europe, and APAC—spearheading content for Beats, Nike, Tencent, Riot Games and Coach, and producing the Sundance-selected feature film, Brief History of a Family.
          </p>
          <div className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Feature Film Section */}
      <div id="section-feature-film" />
      {featureFilm && <FeatureFilm film={featureFilm} />}

      {/* Portfolio - Full Width Images */}
      <section id="section-selected-work" className="py-16 relative">
        {/* #9: Gradient Text Section Title */}
        <motion.h2 {...FADE_UP} className="text-3xl sm:text-4xl md:text-5xl mb-16 sm:mb-24 text-center tracking-tight font-light relative">
          <span className="gradient-text">PRODUCTIONS | CAMPAIGNS & FILMS</span>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400" />
        </motion.h2>
        <div className="space-y-20 sm:space-y-32">
          {uniqueProjects.map((project, projectIndex) => (
            <motion.div
              key={project.id}
              {...FADE_UP}
              className="group cursor-pointer relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* #11: Project Number Indicator */}
              <div className="absolute -left-2 sm:left-4 md:left-8 top-4 sm:top-8 z-[5] pointer-events-none">
                <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-light text-white/[0.04] leading-none select-none" style={{ fontFamily: 'var(--font-serif)' }}>
                  {String(projectIndex + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Main Large Image — #3: Parallax */}
              <div className="relative h-[40vh] sm:h-[50vh] md:h-[65vh] overflow-hidden bg-black">
                <ParallaxImage
                  src={project.thumbnail}
                  alt={project.name}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/40 to-cyan-900/20 group-hover:opacity-50 transition-all duration-500" />
                
                {/* #6: Play Button Overlay — Magnetic */}
                {(project.videoUrl || (project.videoSeries && project.videoSeries.length > 0)) && (
                  <div 
                    className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${
                      hoveredProject === project.id ? 'opacity-100' : 'sm:opacity-0 opacity-70'
                    }`}
                    onClick={() => handlePlayVideo(project.id)}
                  >
                    <MagneticPlayButton onClick={() => handlePlayVideo(project.id)} />
                  </div>
                )}

                {/* #4: Project Title Overlay — Staggered */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-16 lg:p-24 pointer-events-none">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      viewport={VIEWPORT_ONCE}
                      className="w-0.5 sm:w-1 h-16 sm:h-32 bg-gradient-to-b from-cyan-400 to-purple-400 flex-shrink-0 mt-1 sm:mt-2 origin-top"
                    />
                    <div>
                      <StaggerTitle
                        index={projectIndex}
                        lines={[
                          { text: project.brandName || project.client, className: "text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight font-light uppercase" },
                          { text: project.projectTitle || project.name, className: "text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight font-light mt-1 sm:mt-2" },
                          ...(project.description ? [{ text: project.description, className: "text-sm sm:text-xl md:text-2xl lg:text-3xl text-white/80 font-light mt-1 sm:mt-2", style: { fontFamily: 'var(--font-serif)' } as React.CSSProperties }] : []),
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stills - Horizontal Scroll */}
              {project.additionalImages && project.additionalImages.length > 0 && (
                <div className="py-6 sm:py-8 relative">
                  <div className="px-4 sm:px-6 md:px-16 lg:px-32 mb-3 sm:mb-4 flex items-center justify-between">
                    <h4 className="text-base sm:text-xl font-light tracking-tight text-white/60">Stills</h4>
                    <span className="text-[10px] text-white/25 uppercase tracking-wider sm:hidden">Swipe →</span>
                  </div>
                  <div className="relative group/stills">
                    <button
                      onClick={() => scrollStills(project.id, "left")}
                      className="absolute left-2 sm:left-6 md:left-16 lg:left-32 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/stills:opacity-100 transition-opacity hidden sm:block"
                      aria-label="Scroll left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <ChevronLeft className="w-6 h-6" />
                      </div>
                    </button>
                    <button
                      onClick={() => scrollStills(project.id, "right")}
                      className="absolute right-2 sm:right-6 md:right-16 lg:right-32 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/stills:opacity-100 transition-opacity hidden sm:block"
                      aria-label="Scroll right"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </button>

                    <div 
                      className="overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-16 lg:px-32" 
                      ref={(el) => (stillsRefs.current[project.id] = el)}
                    >
                      <div className="flex gap-3 sm:gap-6 pb-4">
                        {project.additionalImages.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            onClick={() => openStillGallery(image, project.additionalImages!)}
                            className="relative flex-shrink-0 w-[280px] sm:w-[400px] aspect-video rounded-lg overflow-hidden shadow-xl group cursor-pointer bg-zinc-800"
                          >
                            {/* #5: Blur-Up Image */}
                            <BlurUpImage
                              src={image}
                              alt={`${project.name} - Still ${imgIndex + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Role/Credits */}
              <div className="px-4 sm:px-6 md:px-16 lg:px-32 py-6 sm:py-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-purple-400/30" />
                  <div className="text-center">
                    <p className="text-cyan-400 text-xs sm:text-sm uppercase tracking-[0.3em] mb-1">Role</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight">{project.credits}</p>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-400/30 via-cyan-400/30 to-transparent" />
                </div>
              </div>

              {/* Project Details — compact inline layout */}
              <div className="px-4 sm:px-6 md:px-16 lg:px-32 py-6 sm:py-8 border-b border-white/10 relative">
                <div className="absolute left-0 bottom-0 w-24 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
                <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-4">
                  {[
                    { label: "Client", value: project.client },
                    { label: "Agency", value: project.agency },
                    { label: "Production", value: project.production },
                    ...(project.director ? [{ label: "Director", value: project.director }] : []),
                  ].map((item) => (
                    <div key={item.label} className="flex items-baseline gap-2">
                      <span className="text-white/30 uppercase tracking-wider text-[10px] sm:text-xs">{item.label}</span>
                      <span className="text-white/70 font-light text-sm sm:text-base">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enlarged Still Modal — Gallery Mode */}
      <AnimatePresence>
        {enlargedStill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedStill(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
            ref={stillModalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setEnlargedStill(null)}
              className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {enlargedStill.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateStill(-1); }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateStill(1); }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs sm:text-sm tracking-wider">
              {enlargedStill.index + 1} / {enlargedStill.images.length}
            </div>

            <motion.img
              key={enlargedStill.src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={enlargedStill.src}
              alt={`Production still ${enlargedStill.index + 1} of ${enlargedStill.images.length}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Select Clients */}
      <SelectClients onPlayShowreel={() => setShowreelModal(true)} />

      {/* Experiential & Spatial Section */}
      <ExperientialSpatial />

      {/* Contact Section — Enhanced with #12 Scramble Email */}
      <section id="section-contact" className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 md:py-48 relative">
        <motion.div {...FADE_UP} className="max-w-2xl mx-auto text-center relative">
          {/* #9: Gradient text on contact title */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 tracking-tight font-light">
            <span className="gradient-text">Let's Create</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base font-light mb-8 sm:mb-12" style={{ fontFamily: 'var(--font-sans)' }}>
            Film · Branded Content · Experiential Production
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8 sm:mb-12" />
          <div className="space-y-6 sm:space-y-8">
            <ScrambleEmail email="eric.zheng@drsfilms.com" />
            <div className="flex items-center justify-center gap-2 text-white/30 text-sm font-light pt-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Based in New York · Available Globally</span>
            </div>
            <div className="flex gap-8 justify-center pt-4 sm:pt-8">
              <a 
                href="https://www.linkedin.com/in/ericzhengyue/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
                aria-label="Eric Zheng on LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Back to Top + Nav Dots */}
      {createPortal(
        <AnimatePresence>
          {showBackToTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:right-8 z-40 flex flex-col items-center gap-3 sm:gap-4"
            >
              <button
                onClick={scrollToTop}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 hover:border-cyan-400/40 transition-colors shadow-lg cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUpToLine className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
              </button>

              <div className="hidden sm:flex flex-col items-center gap-3 mt-1">
                <button
                  onClick={() => document.getElementById("section-feature-film")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${activeSection === 'section-feature-film' ? 'bg-cyan-400/80 scale-125' : 'bg-white/25 hover:bg-cyan-400/60'}`}
                  aria-label="Go to Feature Film"
                  title="Feature Film"
                />
                <button
                  onClick={() => document.getElementById("section-selected-work")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${activeSection === 'section-selected-work' ? 'bg-purple-400/80 scale-125' : 'bg-white/25 hover:bg-purple-400/60'}`}
                  aria-label="Go to Productions"
                  title="Productions"
                />
                <button
                  onClick={() => document.getElementById("section-experiential")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${activeSection === 'section-experiential' ? 'bg-pink-400/80 scale-125' : 'bg-white/25 hover:bg-pink-400/60'}`}
                  aria-label="Go to Experiential & Spatial"
                  title="Experiential & Spatial"
                />
                <button
                  onClick={() => document.getElementById("section-contact")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${activeSection === 'section-contact' ? 'bg-cyan-400/80 scale-125' : 'bg-white/25 hover:bg-cyan-400/60'}`}
                  aria-label="Go to Contact"
                  title="Contact"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}