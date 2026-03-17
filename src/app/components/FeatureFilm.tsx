import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Play, Award, X, ChevronLeft, ChevronRight } from "lucide-react";
import sundanceLogo from "figma:asset/6299d1215ecba73afc1935c6b75a3fe0eb768f1f.png";
import berlinLogo from "figma:asset/ac2091adb3e2c0ddbae7a4f3265e6130185d8a09.png";

// ── Shared animation constants ──
const VIEWPORT_ONCE = { once: true, margin: "-100px" as const };

interface FeatureFilmProps {
  film: {
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

const accolades = {
  tier1: {
    label: "Major Competitions",
    items: [
      "Sundance (Grand Jury Prize Nominee)",
      "Berlin (Panorama Audience Award Nominee)"
    ]
  },
  tier2: {
    label: "Global Circuit",
    items: ["Cannes", "Karlovy Vary", "Zurich", "Stockholm", "Sydney", "Cairo"]
  },
  tier3: {
    label: "Technical & Specialized",
    items: ["EnergaCAMERIMAGE", "Noir in Festival (Best Film Winner)"]
  },
  tier4: {
    label: "Pan-Asian Excellence",
    items: ["SIFF", "BJIFF", "Busan", "Hong Kong", "Singapore", "Pingyao"]
  }
};

export function FeatureFilm({ film }: FeatureFilmProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [enlargedStill, setEnlargedStill] = useState<{ src: string; index: number } | null>(null);
  const stillsRef = useRef<HTMLDivElement>(null);

  // Reset trailer when collapsing (destroys iframe)
  const handleToggleExpand = () => {
    if (isExpanded) {
      setIsPlayingTrailer(false);
    }
    setIsExpanded(!isExpanded);
  };

  const getEmbedUrl = (url: string, type: string) => {
    if (type === "youtube") {
      const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (type === "vimeo") {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  const scrollStills = (direction: "left" | "right") => {
    if (stillsRef.current) {
      const scrollAmount = 320;
      stillsRef.current.scrollTo({
        left: stillsRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth"
      });
    }
  };

  // Gallery navigation
  const openStillGallery = useCallback((still: string) => {
    const index = film.stills.indexOf(still);
    setEnlargedStill({ src: still, index: index >= 0 ? index : 0 });
  }, [film.stills]);

  const navigateStill = useCallback((direction: number) => {
    setEnlargedStill(prev => {
      if (!prev) return null;
      const newIndex = (prev.index + direction + film.stills.length) % film.stills.length;
      return { src: film.stills[newIndex], index: newIndex };
    });
  }, [film.stills]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && enlargedStill) {
        setEnlargedStill(null);
      }
      if (enlargedStill) {
        if (e.key === "ArrowLeft") navigateStill(-1);
        if (e.key === "ArrowRight") navigateStill(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedStill, navigateStill]);

  return (
    <section className="relative py-10 sm:py-16 overflow-hidden">
      {/* Background gradient orbs — animated */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-cyan-600/20 to-purple-600/20 rounded-full blur-3xl animate-orb-2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Award badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Award className="w-5 h-5 text-yellow-500" />
          <span className="text-sm uppercase tracking-wider text-gray-400">
            Award-Winning Feature Film
          </span>
        </div>

        <motion.div
          layout
          className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

          {/* Compact View */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
              {/* Poster */}
              <motion.div layout className="w-full sm:w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
                <div className="relative group cursor-pointer aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={film.poster}
                    alt={film.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

              {/* Basic Info */}
              <div className="flex-1 flex flex-col justify-between min-h-full">
                <div>
                  <motion.h3 layout className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-3 tracking-tight uppercase" style={{ fontFamily: 'var(--font-serif)' }}>
                    {film.title}
                  </motion.h3>
                  <motion.p layout className="text-base sm:text-lg md:text-xl text-white/70 font-light italic mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                    A Feature Film by Lin Jianjie
                    <a
                      href="https://www.imdb.com/title/tt26749327"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-2 sm:ml-3 align-middle hover:opacity-80 transition-opacity"
                      title="View on IMDb"
                    >
                      <svg className="w-8 h-4 sm:w-10 sm:h-5" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="64" height="32" rx="4" fill="#F5C518" />
                        <text x="32" y="23" textAnchor="middle" fill="#000" style={{ fontSize: '18px', fontWeight: 700, fontStyle: 'normal', fontFamily: 'Arial, sans-serif' }}>IMDb</text>
                      </svg>
                    </a>
                  </motion.p>
                  <motion.div layout className="mb-4 sm:mb-6">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-purple-500" />
                      <span className="text-[10px] sm:text-xs md:text-sm text-white/60 uppercase" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.3em' }}>
                        Official Selection
                      </span>
                      <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-purple-500 to-transparent" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-3">
                        <img src={sundanceLogo} alt="Sundance Film Festival" className="h-6 sm:h-7 md:h-9 object-contain opacity-70" />
                        <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider hidden sm:inline" style={{ fontFamily: 'var(--font-sans)' }}>Sundance Film Festival</span>
                      </div>
                      <div className="hidden sm:block w-px h-6 bg-white/15" />
                      <div className="flex items-center gap-3">
                        <img src={berlinLogo} alt="Berlin International Film Festival" className="h-6 sm:h-7 md:h-9 object-contain opacity-70" />
                        <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider hidden sm:inline" style={{ fontFamily: 'var(--font-sans)' }}>Berlin International Film Festival</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Success Metrics */}
                  <motion.div layout className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <a
                        href="https://www.metacritic.com/movie/brief-history-of-a-family/?ftag=MCD-06-10aaa1c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        title="View on Metacritic"
                      >
                        <div className="w-9 h-9 rounded bg-white/10 border border-white/15 flex items-center justify-center">
                          <span className="text-sm text-emerald-400" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>80</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-white/35" style={{ fontFamily: 'var(--font-sans)' }}>Meta</span>
                      </a>
                      <span className="text-white/15">|</span>
                      <a
                        href="https://www.rottentomatoes.com/m/brief_history_of_a_family"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        title="View on Rotten Tomatoes"
                      >
                        <div className="w-9 h-9 rounded bg-white/10 border border-white/15 flex items-center justify-center">
                          <span className="text-sm text-rose-400" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>92%</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-white/35" style={{ fontFamily: 'var(--font-sans)' }}>RT</span>
                      </a>
                    </div>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light" style={{ fontFamily: 'var(--font-sans)' }}>
                      Achieved rare dual-success with critical acclaim and extensive commercial reach, securing theatrical distribution in 60+ global territories.
                    </p>
                  </motion.div>

                  <motion.p layout className="text-base sm:text-lg text-white/60 font-medium mb-4 sm:mb-6 uppercase tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                    <span className="text-white/40">as</span> Producer
                  </motion.p>
                </div>

                {/* Expand/Collapse Button */}
                <motion.button
                  layout
                  onClick={handleToggleExpand}
                  className="mt-4 sm:mt-6 self-start group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                >
                  <span className="text-xs sm:text-sm uppercase tracking-wider">
                    {isExpanded ? "Show Less" : "Explore Film"}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-8 pb-6 sm:pb-8 space-y-8 sm:space-y-12">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                  {/* Trailer */}
                  {film.trailerUrl && (
                    <div>
                      <h3 className="text-xl sm:text-2xl mb-4 flex items-center gap-2">
                        <Play className="w-6 h-6 text-pink-500" />
                        Official Trailer
                      </h3>
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-2xl">
                        {isPlayingTrailer ? (
                          <iframe
                            src={getEmbedUrl(film.trailerUrl, film.trailerType || "youtube")}
                            className="absolute inset-0 w-full h-full bg-black"
                            style={{ border: 'none' }}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div
                            onClick={() => setIsPlayingTrailer(true)}
                            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                          >
                            <img
                              src={film.poster}
                              alt="Trailer thumbnail"
                              className="absolute inset-0 w-full h-full object-cover opacity-50"
                            />
                            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Accolades Grid */}
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 font-light tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Accolades</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {Object.values(accolades).map((tier, tierIndex) => (
                        <div
                          key={tierIndex}
                          className="p-3 sm:p-5 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/40 hover:border-purple-500/30 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs uppercase tracking-widest text-cyan-400" style={{ fontFamily: 'var(--font-sans)' }}>
                              {tier.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tier.items.map((item, itemIndex) => (
                              <span
                                key={itemIndex}
                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-white/80 bg-white/5 border border-white/10 rounded-full hover:border-yellow-500/30 hover:text-yellow-200 transition-colors duration-300"
                                style={{ fontFamily: 'var(--font-sans)' }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl mb-4 font-light tracking-tight">Synopsis</h3>
                    <p className="text-white/80 leading-relaxed text-base sm:text-lg md:text-xl font-light">
                      {film.intro}
                    </p>
                  </div>

                  {/* Credits Grid */}
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 font-light tracking-tight">Credits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {film.credits.map((credit, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-300"
                        >
                          <div className="text-white/40 uppercase tracking-wider mb-1 text-xs font-light">
                            {credit.role}
                          </div>
                          <div className="text-base font-light">{credit.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Production Stills — Gallery */}
                  {film.stills && film.stills.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight">Stills</h3>
                        <span className="text-[10px] text-white/25 uppercase tracking-wider sm:hidden">Swipe →</span>
                      </div>
                      <div className="relative -mx-4 sm:-mx-8 group/stills">
                        <button
                          onClick={() => scrollStills("left")}
                          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/stills:opacity-100 transition-opacity hidden sm:block"
                          aria-label="Scroll left"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <ChevronLeft className="w-6 h-6" />
                          </div>
                        </button>
                        <button
                          onClick={() => scrollStills("right")}
                          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/stills:opacity-100 transition-opacity hidden sm:block"
                          aria-label="Scroll right"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <ChevronRight className="w-6 h-6" />
                          </div>
                        </button>

                        <div className="overflow-x-auto scrollbar-hide px-4 sm:px-8" ref={stillsRef}>
                          <div className="flex gap-3 sm:gap-6 pb-4">
                            {film.stills.map((still, index) => (
                              <div
                                key={index}
                                onClick={() => openStillGallery(still)}
                                className="relative flex-shrink-0 w-[260px] sm:w-[400px] aspect-video rounded-lg overflow-hidden shadow-xl group cursor-pointer"
                              >
                                <img
                                  src={still}
                                  alt={`Still ${index + 1}`}
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

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
            {film.stills.length > 1 && (
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
              {enlargedStill.index + 1} / {film.stills.length}
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
    </section>
  );
}