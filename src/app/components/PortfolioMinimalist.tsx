import { Mail, Linkedin, Instagram } from "lucide-react";
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

interface PortfolioMinimalistProps {
  projects: Project[];
}

export function PortfolioMinimalist({ projects }: PortfolioMinimalistProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="px-6 md:px-16 lg:px-24 py-20 md:py-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight">
            Your Name
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
            Award-winning producer specializing in high-end commercials and film production. 
            Bringing creative visions to life with meticulous attention to detail and seamless execution.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-6 md:px-16 lg:px-24 py-16">
        <h2 className="text-3xl md:text-4xl mb-16 tracking-tight">Selected Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="aspect-video bg-gray-100 mb-6 overflow-hidden">
                <ImageWithFallback
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl tracking-tight">{project.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="text-black">Client:</span> {project.client}</p>
                  <p><span className="text-black">Agency:</span> {project.agency}</p>
                  <p><span className="text-black">Production:</span> {project.production}</p>
                  <p><span className="text-black">Credits:</span> {project.credits}</p>
                  <p className="text-gray-400">{project.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 md:px-16 lg:px-24 py-24 md:py-32 border-t border-gray-200">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl mb-12 tracking-tight">Get In Touch</h2>
          <div className="space-y-6">
            <a 
              href="mailto:your.email@example.com" 
              className="flex items-center gap-4 text-xl hover:text-gray-600 transition-colors"
            >
              <Mail className="w-6 h-6" />
              your.email@example.com
            </a>
            <div className="flex gap-6 pt-6">
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
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
