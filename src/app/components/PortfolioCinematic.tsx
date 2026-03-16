import { useState, useRef } from "react";
import { FeatureFilm } from "./FeatureFilm";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Mail, Linkedin, Instagram, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface Project {
  id: string;
  name: string;
  subtitle?: string; // Optional subtitle for projects
  client: string;
  agency: string;
  production: string;
  director?: string;
  credits: string;
  thumbnail: string;
  videoUrl?: string; // Direct video URL (mp4, webm) or embed URL (YouTube, Vimeo)
  videoType?: "direct" | "youtube" | "vimeo"; // Type of video
  additionalImages?: string[];
  additionalVideos?: Array<{ url: string; type: "direct" | "youtube" | "vimeo"; thumbnail?: string }>;
  year: string;
  videoSeries?: Array<{ // For series projects with multiple videos
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

export function PortfolioCinematic({ projects, featureFilm }: PortfolioCinematicProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedSeriesVideo, setSelectedSeriesVideo] = useState<{ url: string; type: "direct" | "youtube" | "vimeo" } | null>(null);
  const [enlargedStill, setEnlargedStill] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stillsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handlePlayVideo = (projectId: string) => {
    setPlayingVideo(projectId);
    setSelectedSeriesVideo(null); // Reset series video selection
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
      const scrollAmount = 450; // Scroll by one image width + gap
      const currentScroll = stillsRef.scrollLeft;
      const targetScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      stillsRef.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  const getEmbedUrl = (url: string, type: "youtube" | "vimeo") => {
    if (type === "youtube") {
      // Convert YouTube URL to embed format
      const videoId = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (type === "vimeo") {
      // Convert Vimeo URL to embed format
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden">
      {/* Decorative Color Spots */}
      <div className="fixed top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/3 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Video Modal Overlay */}
      {playingVideo && (() => {
        const project = projects.find(p => p.id === playingVideo);
        const hasSeries = project?.videoSeries && project.videoSeries.length > 0;
        
        return (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
            onClick={handleCloseVideo}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container or Series Selection */}
            {hasSeries && !selectedSeriesVideo ? (
              // Show series selection screen
              <div 
                className="w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl md:text-4xl font-light text-center mb-12 tracking-tight">
                  Select a video to watch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                        {/* Thumbnail image or gradient background */}
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-cyan-900/30" />
                        )}
                        
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Decorative gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Play icon */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center backdrop-blur-sm bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all">
                            <Play className="w-7 h-7 ml-1" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xl md:text-2xl text-center mt-4 font-light group-hover:text-cyan-400 transition-colors">
                        {video.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Show video player
              <div 
                className="w-full max-w-7xl aspect-video relative"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  if (!project) return null;
                  
                  // Use selected series video or fall back to regular videoUrl
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
          </div>
        );
      })()}
      
      {/* Hero Section - Full Screen */}
      <section className="h-screen flex items-center justify-center px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900 z-10" />
        <div className="text-center z-20">
          <div className="inline-block relative mb-8">
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] tracking-wide">
              ERIC ZHENG
            </h1>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white tracking-widest uppercase">
              GLOBAL PRODUCER
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-cyan-400/90 italic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
              Bridging Cinematic Storytelling & Global Brands
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="px-6 md:px-16 lg:px-32 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-light">
            I am a global producer blending cinematic storytelling with premium brand campaigns. Over the past 15 years, I've scaled multi-million-dollar productions across the US, Europe, and APAC—spearheading content for Beats, Nike, Tencent, Riot Games and Coach, and producing the Sundance-selected feature film, Brief History of a Family.
          </p>
        </div>
      </section>

      {/* Feature Film Section */}
      {featureFilm && <FeatureFilm film={featureFilm} />}

      {/* Portfolio - Full Width Images */}
      <section className="py-16 relative">
        <h2 className="text-4xl md:text-5xl mb-24 text-center tracking-tight font-light relative">
          SELECTED WORK
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400" />
        </h2>
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="group cursor-pointer relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Main Large Image */}
              <div className="relative h-[50vh] md:h-[65vh] overflow-hidden bg-black">
                <ImageWithFallback
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/40 to-cyan-900/20 group-hover:opacity-50 transition-all duration-500" />
                
                {/* Play Button Overlay - for regular videos or video series */}
                {(project.videoUrl || (project.videoSeries && project.videoSeries.length > 0)) && (
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => handlePlayVideo(project.id)}
                  >
                    <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                  </div>
                )}

                {/* Project Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-purple-400" />
                    <div>
                      <h3 className="text-4xl md:text-6xl lg:text-7xl tracking-tight font-light">
                        {project.name}
                      </h3>
                      {project.subtitle && (
                        <p className="text-sm md:text-base lg:text-lg text-white/50 font-light mt-2 italic" style={{ fontFamily: 'var(--font-serif)' }}>
                          {project.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-lg md:text-xl text-white/70 font-light ml-4">
                    {project.client} · {project.year}
                  </p>
                </div>
              </div>

              {/* Stills - Horizontal Scroll */}
              {project.additionalImages && project.additionalImages.length > 0 && (
                <div className="py-8 relative">
                  <div className="px-6 md:px-16 lg:px-32 mb-4">
                    <h4 className="text-xl font-light tracking-tight text-white/60">Stills</h4>
                  </div>
                  <div className="relative group/stills">
                    {/* Left scroll button */}
                    <button
                      onClick={() => scrollStills(project.id, "left")}
                      className="absolute left-6 md:left-16 lg:left-32 top-1/2 -translate-y-1/2 z-10 opacity-40 group-hover/stills:opacity-100 transition-opacity"
                      aria-label="Scroll left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <ChevronLeft className="w-6 h-6" />
                      </div>
                    </button>
                    
                    {/* Right scroll button */}
                    <button
                      onClick={() => scrollStills(project.id, "right")}
                      className="absolute right-6 md:right-16 lg:right-32 top-1/2 -translate-y-1/2 z-10 opacity-40 group-hover/stills:opacity-100 transition-opacity"
                      aria-label="Scroll right"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </button>

                    <div 
                      className="overflow-x-auto scrollbar-hide px-6 md:px-16 lg:px-32" 
                      ref={(el) => (stillsRefs.current[project.id] = el)}
                    >
                      <div className="flex gap-6 pb-4">
                        {project.additionalImages.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            onClick={() => setEnlargedStill(image)}
                            className="relative flex-shrink-0 w-[400px] aspect-video rounded-lg overflow-hidden shadow-xl group cursor-pointer bg-zinc-800"
                          >
                            <ImageWithFallback
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

              {/* Role/Credits - Prominent Display */}
              <div className="px-6 md:px-16 lg:px-32 py-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-purple-400/30" />
                  <div className="text-center">
                    <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-1">Role</p>
                    <p className="text-2xl md:text-3xl font-light tracking-tight">{project.credits}</p>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-400/30 via-cyan-400/30 to-transparent" />
                </div>
              </div>

              {/* Project Details */}
              <div className="px-6 md:px-16 lg:px-32 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm border-b border-white/10 relative">
                <div className="absolute left-0 bottom-0 w-24 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
                <div>
                  <p className="text-white/40 mb-2 uppercase tracking-wider text-xs">Client</p>
                  <p className="font-light">{project.client}</p>
                </div>
                <div>
                  <p className="text-white/40 mb-2 uppercase tracking-wider text-xs">Agency</p>
                  <p className="font-light">{project.agency}</p>
                </div>
                <div>
                  <p className="text-white/40 mb-2 uppercase tracking-wider text-xs">Production</p>
                  <p className="font-light">{project.production}</p>
                </div>
                {project.director && (
                  <div>
                    <p className="text-white/40 mb-2 uppercase tracking-wider text-xs">Director</p>
                    <p className="font-light">{project.director}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

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

      {/* Contact Section */}
      <section className="px-6 md:px-16 lg:px-32 py-32 md:py-48 relative">
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-5xl md:text-7xl mb-12 tracking-tight font-light">
            Let's Create
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-12" />
          <p className="text-xl text-white/60 mb-16 font-light">
            Open to new projects and collaborations
          </p>
          <div className="space-y-8">
            <a 
              href="mailto:your.email@example.com" 
              className="inline-flex items-center gap-4 text-2xl hover:text-cyan-400 transition-colors font-light border-b border-white/20 hover:border-cyan-400/50 pb-2"
            >
              <Mail className="w-6 h-6" />
              your.email@example.com
            </a>
            <div className="flex gap-8 justify-center pt-8">
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}