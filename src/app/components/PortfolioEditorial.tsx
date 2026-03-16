import { Mail, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Project {
  id: string;
  name: string;
  client: string;
  agency: string;
  production: string;
  credits: string;
  thumbnail: string;
  year: string;
}

interface PortfolioEditorialProps {
  projects: Project[];
}

export function PortfolioEditorial({ projects }: PortfolioEditorialProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="px-6 md:px-16 lg:px-32 py-16 md:py-24 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl mb-6 font-light tracking-tighter">
              YOUR NAME
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-md font-light">
              Producer — Film & Commercial
            </p>
          </div>
          <div className="text-base md:text-lg text-white/80 max-w-md font-light leading-relaxed">
            Crafting compelling narratives through meticulous production. 
            From concept to completion, delivering excellence in every frame.
          </div>
        </div>
      </section>

      {/* Portfolio List */}
      <section className="px-6 md:px-16 lg:px-32 py-16 md:py-24">
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="group cursor-pointer border-b border-white/10 pb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-8">
                  <div className="aspect-[16/10] bg-white/5 overflow-hidden">
                    <ImageWithFallback
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    />
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-sm text-white/40 font-light">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-3xl md:text-4xl mb-8 font-light tracking-tight">
                      {project.name}
                    </h3>
                  </div>
                  <div className="space-y-4 text-sm font-light">
                    <div className="grid grid-cols-[100px_1fr] gap-2">
                      <span className="text-white/40">Client</span>
                      <span>{project.client}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2">
                      <span className="text-white/40">Agency</span>
                      <span>{project.agency}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2">
                      <span className="text-white/40">Production</span>
                      <span>{project.production}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2">
                      <span className="text-white/40">Role</span>
                      <span>{project.credits}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2">
                      <span className="text-white/40">Year</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 md:px-16 lg:px-32 py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl mb-8 font-light tracking-tight">
              Let's Work Together
            </h2>
            <p className="text-white/60 font-light leading-relaxed">
              Available for select projects and collaborations.
            </p>
          </div>
          <div className="space-y-6">
            <a 
              href="mailto:your.email@example.com" 
              className="flex items-center gap-4 text-lg hover:text-white/60 transition-colors font-light group"
            >
              <Mail className="w-5 h-5" />
              <span className="border-b border-white/20 group-hover:border-white/60">
                your.email@example.com
              </span>
            </a>
            <div className="flex gap-6 pt-6">
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
