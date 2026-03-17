import { motion } from "motion/react";
import logoSprite from "figma:asset/a35e77d23c398eadfd07b9b676e25b35d5e3c33b.png";
import { Play } from "lucide-react";

// 16 logos from Figma sprite, sorted left-to-right by original layout position
const logos: { w: number; h: number; crop: string }[] = [
  { w: 327, h: 330, crop: "h-[711.64%] left-[-282.63%] top-[-248.98%] w-[1233.73%]" },
  { w: 390, h: 225, crop: "h-[1362.29%] left-[-429.51%] top-[-519.43%] w-[1353.28%]" },
  { w: 452, h: 260, crop: "h-[1050.22%] left-[-431.06%] top-[-393.39%] w-[1036.96%]" },
  { w: 473, h: 260, crop: "h-[1088.58%] left-[-529.87%] top-[-402.93%] w-[1029.15%]" },
  { w: 326, h: 291, crop: "h-[819.24%] left-[-775.77%] top-[-295.19%] w-[1256.44%]" },
  { w: 384, h: 260, crop: "h-[819.24%] left-[-670.47%] top-[-295.19%] w-[952.56%]" },
  { w: 321, h: 279, crop: "h-[752.05%] left-[-949.28%] top-[-262.78%] w-[1173.64%]" },
  { w: 352, h: 261, crop: "h-[701.18%] left-[-98.48%] top-[-233.95%] w-[893.42%]" },
  { w: 438, h: 291, crop: "h-[896.25%] left-[-123.17%] top-[-505.02%] w-[1023.26%]" },
  { w: 248, h: 299, crop: "h-[668.16%] left-[-321.03%] top-[-360.05%] w-[1383.07%]" },
  { w: 313, h: 358, crop: "h-[476.8%] left-[-289.24%] top-[-245%] w-[937.3%]" },
  { w: 302, h: 271, crop: "h-[746.31%] left-[-489.41%] top-[-408.17%] w-[1152.42%]" },
  { w: 300, h: 280, crop: "h-[660.71%] left-[-549.1%] top-[-355.21%] w-[1058.4%]" },
  { w: 379, h: 178, crop: "h-[1339.33%] left-[-660.95%] top-[-773.03%] w-[1080.74%]" },
  { w: 404, h: 201, crop: "h-[1186.07%] left-[-713.86%] top-[-680.6%] w-[1013.86%]" },
  { w: 406, h: 201, crop: "h-[1186.07%] left-[-809.11%] top-[-680.6%] w-[1008.87%]" },
];

const LOGO_H = 40;
const GAP = 72; // consistent spacing between logos (px)

function LogoItem({ logo }: { logo: (typeof logos)[0] }) {
  const width = Math.round((logo.w / logo.h) * LOGO_H);
  return (
    <div
      className="relative shrink-0 overflow-hidden opacity-35 hover:opacity-75 transition-opacity duration-500"
      style={{ width, height: LOGO_H }}
      aria-hidden="true"
    >
      <img
        alt=""
        className={`absolute max-w-none ${logo.crop}`}
        src={logoSprite}
        draggable={false}
      />
    </div>
  );
}

export function SelectClients({ onPlayShowreel }: { onPlayShowreel?: () => void }) {
  // Duplicate set for seamless loop
  const strip = [...logos, ...logos];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="flex justify-center mb-10 sm:mb-14">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>

      {/* Showreel CTA */}
      {onPlayShowreel && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 sm:mb-16 flex flex-col items-center gap-5"
        >
          <p
            className="text-white/35 text-xs sm:text-sm tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The Full Picture
          </p>
          <button
            onClick={onPlayShowreel}
            className="group/reel inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/25 hover:border-cyan-400/50 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 cursor-pointer"
            aria-label="Play showreel"
          >
            <span className="w-7 h-7 rounded-full border border-white/40 group-hover/reel:border-cyan-400/60 flex items-center justify-center transition-colors">
              <Play className="w-3 h-3 ml-0.5 text-white/80 group-hover/reel:text-cyan-400 transition-colors" />
            </span>
            <span
              className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/70 group-hover/reel:text-white transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Showreel
            </span>
            <span
              className="text-[10px] text-white/30 group-hover/reel:text-white/50 transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              2:08
            </span>
          </button>
        </motion.div>
      )}

      {/* Marquee */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

        {/* Scrolling strip — flex with fixed gap */}
        <div
          className="flex items-center animate-marquee"
          style={{ gap: GAP }}
        >
          {strip.map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="flex justify-center mt-10 sm:mt-14">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-purple-400/25 to-transparent" />
      </div>
    </section>
  );
}