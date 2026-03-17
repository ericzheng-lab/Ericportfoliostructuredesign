import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { FeatureFilm } from "./FeatureFilm";
import { ExperientialSpatial } from "./ExperientialSpatial";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Mail, Linkedin, X, ChevronLeft, ChevronRight, ArrowUpToLine, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ── Shared animation constants ──
const VIEWPORT_ONCE = { once: true, margin: "-100px" as const };
const FADE_UP = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: VIEWPORT_ONCE };

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

  // Step 1: detect pointer capability
  useEffect(() => {
    setHasFineCursor(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // Step 2: after DOM is rendered with refs attached, set up tracking
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

export function PortfolioCinematic({ projects, featureFilm }: PortfolioCinematicProps) {
  const uniqueProjects = projects.filter((project, index, self) =>
    index === self.findIndex((p) => p.id === project.id)
  );

  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedSeriesVideo, setSelectedSeriesVideo] = useState<{ url: string; type: "direct" | "youtube" | "vimeo" } | null>(null);
  const [enlargedStill, setEnlargedStill] = useState<{ src: string; images: string[]; index: number } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stillsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // ── Scroll handler: back-to-top + progress bar ──
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
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
      }
      // Gallery left/right navigation
      if (enlargedStill) {
        if (e.key === "ArrowLeft") navigateStill(-1);
        if (e.key === "ArrowRight") navigateStill(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedStill, playingVideo, navigateStill]);

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

  return (
    <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden">
      {/* Custom Cursor */}
      <CinematicCursor />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Decorative Color Spots — Animated */}
      <div className="fixed top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-orb-1" />
      <div className="fixed bottom-1/3 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-orb-2" />
      <div className="fixed top-1/2 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-orb-3" />
      
      {/* Video Modal Overlay */}
      <AnimatePresence>
        {playingVideo && (() => {
          const project = uniqueProjects.find(p => p.id === playingVideo);
          const hasSeries = project?.videoSeries && project.videoSeries.length > 0;
          
          return (
            <motion.div
              key="video-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
              onClick={handleCloseVideo}
            >
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>

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
                            <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover" loading="lazy" />
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
                      />
                    );
                  })()}
                </div>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>
      
      {/* Hero Section - Full Screen with Entrance Animation */}
      <section className="h-screen flex items-center justify-center px-4 sm:px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900 z-10" />
        <div className="text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-widest uppercase"
            >
              GLOBAL PRODUCER
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
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
            animate={{ opacity: 1 }}
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
        <motion.h2 {...FADE_UP} className="text-3xl sm:text-4xl md:text-5xl mb-16 sm:mb-24 text-center tracking-tight font-light relative">
          SELECTED WORK
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400" />
        </motion.h2>
        <div className="space-y-20 sm:space-y-32">
          {uniqueProjects.map((project) => (
            <motion.div
              key={project.id}
              {...FADE_UP}
              className="group cursor-pointer relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Main Large Image */}
              <div className="relative h-[40vh] sm:h-[50vh] md:h-[65vh] overflow-hidden bg-black">
                <ImageWithFallback
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/40 to-cyan-900/20 group-hover:opacity-50 transition-all duration-500" />
                
                {/* Play Button Overlay */}
                {(project.videoUrl || (project.videoSeries && project.videoSeries.length > 0)) && (
                  <div 
                    className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${
                      hoveredProject === project.id ? 'opacity-100' : 'sm:opacity-0 opacity-70'
                    }`}
                    onClick={() => handlePlayVideo(project.id)}
                  >
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                    </div>
                  </div>
                )}

                {/* Project Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-16 lg:p-24 pointer-events-none">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-0.5 sm:w-1 h-16 sm:h-32 bg-gradient-to-b from-cyan-400 to-purple-400 flex-shrink-0 mt-1 sm:mt-2" />
                    <div>
                      <h3 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight font-light uppercase">
                        {project.brandName || project.client}
                      </h3>
                      <h3 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight font-light mt-1 sm:mt-2">
                        {project.projectTitle || project.name}
                      </h3>
                      {project.description && (
                        <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-white/80 font-light mt-1 sm:mt-2" style={{ fontFamily: 'var(--font-serif)' }}>
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stills - Horizontal Scroll */}
              {project.additionalImages && project.additionalImages.length > 0 && (
                <div className="py-6 sm:py-8 relative">
                  <div className="px-4 sm:px-6 md:px-16 lg:px-32 mb-3 sm:mb-4 flex items-center justify-between">
                    <h4 className="text-base sm:text-xl font-light tracking-tight text-white/60">Stills</h4>
                    {/* Touch scroll hint on mobile */}
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
                            <ImageWithFallback
                              src={image}
                              alt={`${project.name} - Still ${imgIndex + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
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
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setEnlargedStill(null)}
              className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Gallery Navigation */}
            {enlargedStill.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateStill(-1); }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateStill(1); }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Counter */}
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
              alt="Enlarged production still"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experiential & Spatial Section */}
      <ExperientialSpatial />

      {/* Contact Section — Enhanced */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 md:py-48 relative">
        <motion.div {...FADE_UP} className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 tracking-tight font-light">
            Let's Create
          </h2>
          <p className="text-white/40 text-sm sm:text-base font-light mb-8 sm:mb-12" style={{ fontFamily: 'var(--font-sans)' }}>
            Film · Branded Content · Experiential Production
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8 sm:mb-12" />
          <div className="space-y-6 sm:space-y-8">
            <a 
              href="mailto:eric.zheng@drsfilms.com" 
              className="inline-flex items-center gap-2 sm:gap-4 text-base sm:text-xl md:text-2xl hover:text-cyan-400 transition-colors font-light border-b border-white/20 hover:border-cyan-400/50 pb-2 break-all sm:break-normal"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              eric.zheng@drsfilms.com
            </a>
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
                  className="w-2.5 h-2.5 rounded-full bg-white/25 hover:bg-cyan-400/60 transition-colors cursor-pointer"
                  aria-label="Go to Feature Film"
                  title="Feature Film"
                />
                <button
                  onClick={() => document.getElementById("section-selected-work")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-2.5 h-2.5 rounded-full bg-white/25 hover:bg-purple-400/60 transition-colors cursor-pointer"
                  aria-label="Go to Selected Work"
                  title="Selected Work"
                />
                <button
                  onClick={() => document.getElementById("section-experiential")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-2.5 h-2.5 rounded-full bg-white/25 hover:bg-pink-400/60 transition-colors cursor-pointer"
                  aria-label="Go to Experiential & Spatial"
                  title="Experiential & Spatial"
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