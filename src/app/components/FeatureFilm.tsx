import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Play, Award, X, ChevronLeft, ChevronRight } from "lucide-react";

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

export function FeatureFilm({ film }: FeatureFilmProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [enlargedStill, setEnlargedStill] = useState<string | null>(null);
  const stillsRef = useRef<HTMLDivElement>(null);

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
      const scrollAmount = 450; // Scroll by one image width + gap
      const currentScroll = stillsRef.current.scrollLeft;
      const targetScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      stillsRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-cyan-600/20 to-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
          {/* Top accent bar with gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

          {/* Compact View */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Poster */}
              <motion.div layout className="w-full md:w-64 flex-shrink-0">
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
                  <motion.h3 layout className="text-4xl md:text-6xl lg:text-7xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                    {film.title}
                  </motion.h3>
                  <motion.p layout className="text-lg md:text-xl text-white/70 font-light italic mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                    {film.tagline}
                  </motion.p>
                  <motion.p layout className="text-lg text-cyan-400 font-medium mb-1 uppercase tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                    As Producer
                  </motion.p>
                  <motion.p layout className="text-lg text-white/40 font-light mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                    {film.year}
                  </motion.p>

                  {film.awards && film.awards.length > 0 && (
                    <motion.div layout className="flex flex-wrap gap-2 mb-6">
                      {film.awards.slice(0, isExpanded ? undefined : 2).map((award, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full text-sm text-yellow-300"
                        >
                          {award}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Expand/Collapse Button */}
                <motion.button
                  layout
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-6 self-start group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                >
                  <span className="text-sm uppercase tracking-wider">
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
                <div className="px-8 pb-8 space-y-12">
                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                  {/* Trailer Section */}
                  {film.trailerUrl && (
                    <div>
                      <h3 className="text-2xl mb-4 flex items-center gap-2">
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
                            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                              <Play className="w-10 h-10 ml-1" fill="white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Synopsis */}
                  <div>
                    <h3 className="text-2xl md:text-3xl mb-4 font-light tracking-tight">Synopsis</h3>
                    <p className="text-white/80 leading-relaxed text-lg md:text-xl font-light">
                      {film.intro}
                    </p>
                  </div>

                  {/* Credits Grid */}
                  <div>
                    <h3 className="text-2xl md:text-3xl mb-6 font-light tracking-tight">Credits</h3>
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

                  {/* Production Stills */}
                  {film.stills && film.stills.length > 0 && (
                    <div>
                      <h3 className="text-2xl md:text-3xl mb-6 font-light tracking-tight">Stills</h3>
                      <div className="relative -mx-8 group/stills">
                        {/* Left scroll button */}
                        <button
                          onClick={() => scrollStills("left")}
                          className="absolute left-8 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100 transition-opacity"
                          aria-label="Scroll left"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <ChevronLeft className="w-6 h-6" />
                          </div>
                        </button>
                        
                        {/* Right scroll button */}
                        <button
                          onClick={() => scrollStills("right")}
                          className="absolute right-8 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100 transition-opacity"
                          aria-label="Scroll right"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <ChevronRight className="w-6 h-6" />
                          </div>
                        </button>

                        <div className="overflow-x-auto scrollbar-hide px-8" ref={stillsRef}>
                          <div className="flex gap-6 pb-4">
                            {film.stills.map((still, index) => (
                              <div
                                key={index}
                                onClick={() => setEnlargedStill(still)}
                                className="relative flex-shrink-0 w-[400px] aspect-video rounded-lg overflow-hidden shadow-xl group cursor-pointer"
                              >
                                <img
                                  src={still}
                                  alt={`Still ${index + 1}`}
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enlarged Still Modal */}
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
              className="absolute top-8 right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={enlargedStill}
              alt="Enlarged production still"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}