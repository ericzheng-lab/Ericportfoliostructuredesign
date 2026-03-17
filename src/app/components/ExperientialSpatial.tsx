import { motion } from "motion/react";

// ── Shared animation constants ──
const VIEWPORT_ONCE = { once: true, margin: "-100px" as const };
const FADE_UP = { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: VIEWPORT_ONCE };

// ONE PARK CAMBODIA images
import oneParkMain from "figma:asset/4ea742809c04ddea5b28abccc1ea9ce88899ca6d.png";
import oneParkDetail1 from "figma:asset/203d3b1fec1286ced697017608ec068d85be03b6.png";
import oneParkDetail2 from "figma:asset/e5f1f8e59184d1aab9e7dd2d183ea132ea16e3e9.png";

// SHANGHAI BAY images
import shanghaiBayHero from "figma:asset/26c71a71a09097e10d14099d232bcedc5558d408.png";
import shanghaiBayLounge from "figma:asset/2cf47f666abc79b92487a58181c98a86fc95a16a.png";
import shanghaiBayLiving from "figma:asset/d5bfd10ac9027cf62da5c3ff5f685d7e6b613cab.png";
import shanghaiBayDining from "figma:asset/8c8819427e29c752ee851174b4cd7af769cbf9be.png";

// DESIGN SHANGHAI images
import designShanghaiMain from "figma:asset/0b223153d4efa3ae1bb97c0576b063c9455a8b7e.png";
import designShanghaiDetail1 from "figma:asset/01eef394ebb764813add0ba72644f35c9591b19c.png";
import designShanghaiDetail2 from "figma:asset/6d84c78208c64682283b5591ab52e25287e05ac0.png";
import designShanghaiKV from "figma:asset/8e5f34ff0a4388a4d26a66124d6d79068d2106ef.png";

// ONE PARK SHANGHAI images
import opsSofa from "figma:asset/a037c667f5bae221f32b87cadcf9ecb4f9736c82.png";
import opsBedroom from "figma:asset/d76b49c526453a81172b189f7d0292d4e2f1333a.png";
import opsDetail1 from "figma:asset/c02ebe5c42d80c7326db598a42b5ce44f67972c4.png";
import opsDining from "figma:asset/f30892d7e0f0aebc5a7b00470a4326f3e72ca722.png";

// FINAL FRONTIER | SILK – Geometric Landscapes Exhibition images
import silkGalleryWide from "figma:asset/cc2b6f230da5491a8b7369c80075d508cd36fbd3.png";
import silkStorefront from "figma:asset/e6199252181919d6132496a5eec9796ef729b23e.png";
import silkBookDetail from "figma:asset/9efc2f3a2e05ab98b5943e853d64a53b638876c2.png";
import silkOpening from "figma:asset/50d712c92f1288aaa3b689fc83c5aa2169d6fa4b.png";
import silkGalleryView from "figma:asset/138991ac508abb568c8f5dc756b2e84cb62b368e.png";
import silkNightExterior from "figma:asset/e9c8844245a63f761e132c617fdc62659fbb9e40.png";

/* ──────────────────────────────────────────────────────────
   1. ONE PARK CAMBODIA – 3-column collage (large left, two right)
   ────────────────────────────────────────��───────────────── */
function OneParkCambodiaCard() {
  return (
    <motion.div {...FADE_UP} className="group">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-2 rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-2xl">
        <div className="relative md:row-span-1 aspect-[16/10] overflow-hidden">
          <img src={oneParkMain} alt="One Park Cambodia – Full-scale 1:1 mockup room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="relative aspect-[16/10] sm:aspect-[3/4] md:aspect-auto overflow-hidden">
          <img src={oneParkDetail1} alt="One Park Cambodia – Furnishing detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
        <div className="relative aspect-[16/10] sm:aspect-[3/4] md:aspect-auto overflow-hidden">
          <img src={oneParkDetail2} alt="One Park Cambodia – Interior vignette" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>ONE PARK CAMBODIA</h3>
        <p className="text-base sm:text-lg md:text-xl text-white/80 font-light" style={{ fontFamily: "var(--font-serif)" }}>150,000 sq ft Serviced Apartment FF&E Mockup</p>
        <p className="text-[10px] sm:text-xs md:text-sm text-white/35 font-light uppercase" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}>Cross-border Production · Shanghai Design Studio → Phnom Penh 1:1 Validation</p>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap gap-4 sm:gap-6 md:gap-10">
        {[
          { label: "Scale", value: "150,000 sq ft" },
          { label: "Scope", value: "Full FF&E Design & Production" },
          { label: "Workflow", value: "Shanghai → Factory → Phnom Penh" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <span className="text-[10px] md:text-xs text-white/30 uppercase" style={{ letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}>{m.label}</span>
            <span className="text-xs sm:text-sm md:text-base text-white/70 font-light" style={{ fontFamily: "var(--font-sans)" }}>{m.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   2. SHANGHAI BAY – panoramic hero + three rooms below
   ────────────────────────────────────────────────────────── */
function ShanghaiBayCard() {
  return (
    <motion.div {...FADE_UP} className="group">
      <div className="flex flex-col gap-2 rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-2xl">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
          <img src={shanghaiBayHero} alt="Shanghai Bay – Panoramic bow-window living room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { src: shanghaiBayLounge, label: "Atrium Lounge" },
            { src: shanghaiBayLiving, label: "West Living Room" },
            { src: shanghaiBayDining, label: "West Dining Room" },
          ].map((img) => (
            <div key={img.label} className="relative aspect-[4/3] overflow-hidden">
              <img src={img.src} alt={`Shanghai Bay – ${img.label}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>{img.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>SHANGHAI BAY</h3>
        <p className="text-base sm:text-lg md:text-xl text-white/80 font-light" style={{ fontFamily: "var(--font-serif)" }}>13,000 sq ft Residence & Private Club</p>
        <p className="text-[10px] sm:text-xs md:text-sm text-white/35 font-light uppercase" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}>Award-winning Interior · Gallery Living Concept · Bespoke FF&E Curation</p>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap gap-4 sm:gap-6 md:gap-10">
        {[
          { label: "Scale", value: "13,000 sq ft" },
          { label: "Location", value: "West Bund, Huangpu River" },
          { label: "Recognition", value: "Bronze A' Design Award 2018–2019" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <span className="text-[10px] md:text-xs text-white/30 uppercase" style={{ letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}>{m.label}</span>
            <span className="text-xs sm:text-sm md:text-base text-white/70 font-light" style={{ fontFamily: "var(--font-sans)" }}>{m.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. DESIGN SHANGHAI – asymmetric: large left + stacked right
   ────────────────────────────────────────────────────────── */
function DesignShanghaiCard() {
  return (
    <motion.div {...FADE_UP} className="group">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2 rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-2xl">
        <div className="relative aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden">
          <img src={designShanghaiMain} alt="Playground – Full installation view at Design Shanghai" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={designShanghaiDetail1} alt="Playground – Kaleidoscope interior detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Interior Detail</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={designShanghaiDetail2} alt="Playground – Geometric pattern overhead" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Overhead View</span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={designShanghaiKV} alt="Playground – Key visual" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Key Visual</span>
          </div>
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>DESIGN SHANGHAI</h3>
        <p className="text-base sm:text-lg md:text-xl text-white/80 font-light" style={{ fontFamily: "var(--font-serif)" }}>Playground: An Installation for Seesaw Roundtable's Debut</p>
        <p className="text-[10px] sm:text-xs md:text-sm text-white/35 font-light uppercase" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}>Spatial Deconstruction · Human Scale Exploration · Immersive Kaleidoscope</p>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap gap-4 sm:gap-6 md:gap-10">
        {[
          { label: "Scale", value: "9m × 9m Installation" },
          { label: "Event", value: "Design Shanghai 2021" },
          { label: "Concept", value: "Seesaw Roundtable · Spatial Reconstruction" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <span className="text-[10px] md:text-xs text-white/30 uppercase" style={{ letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}>{m.label}</span>
            <span className="text-xs sm:text-sm md:text-base text-white/70 font-light" style={{ fontFamily: "var(--font-sans)" }}>{m.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   4. ONE PARK SHANGHAI – large left, medium center, two stacked right
   ────────────────────────────────────────────────────────── */
function OneParkShanghaiCard() {
  return (
    <motion.div {...FADE_UP} className="group">
      <div className="grid grid-cols-2 md:grid-cols-[5fr_3fr_2fr] md:grid-rows-2 gap-2 rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-2xl">
        {/* Large left – Living room, spans 2 rows */}
        <div className="relative aspect-[16/10] md:aspect-auto col-span-2 md:col-span-1 md:row-span-2 overflow-hidden">
          <img src={opsSofa} alt="One Park Shanghai – Living room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Living Room</span>
        </div>
        {/* Medium center – Bedroom, spans 2 rows */}
        <div className="relative aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden">
          <img src={opsBedroom} alt="One Park Shanghai – Master bedroom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Master Bedroom</span>
        </div>
        {/* Top-right – Decorative detail */}
        <div className="relative aspect-[4/3] md:aspect-[1/1] overflow-hidden">
          <img src={opsDetail1} alt="One Park Shanghai – Decorative detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
        {/* Bottom-right – Dining detail */}
        <div className="relative aspect-[4/3] md:aspect-[1/1] overflow-hidden">
          <img src={opsDining} alt="One Park Shanghai – Dining table detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>ONE PARK SHANGHAI</h3>
        <p className="text-base sm:text-lg md:text-xl text-white/80 font-light" style={{ fontFamily: "var(--font-serif)" }}>Luxury Apartment FF&E Curation</p>
        <p className="text-[10px] sm:text-xs md:text-sm text-white/35 font-light uppercase" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}>Bespoke Soft Furnishing · Domestic & International Sourcing · Tonal Palette Design</p>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap gap-4 sm:gap-6 md:gap-10">
        {[
          { label: "Scale", value: "4,300 sq ft" },
          { label: "Location", value: "Shanghai" },
          { label: "Scope", value: "Full Soft Furnishing & Styling" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <span className="text-[10px] md:text-xs text-white/30 uppercase" style={{ letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}>{m.label}</span>
            <span className="text-xs sm:text-sm md:text-base text-white/70 font-light" style={{ fontFamily: "var(--font-sans)" }}>{m.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   5. FINAL FRONTIER | SILK – Geometric Landscapes Exhibition
   ────────────────────────────────────────────────────────── */
function FinalFrontierSilkCard() {
  return (
    <motion.div {...FADE_UP} className="group">
      {/* 2-row image grid */}
      <div className="flex flex-col gap-2 rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-2xl">
        {/* Row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-[47fr_25fr_27fr] gap-2 md:h-[320px]">
          <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden col-span-2 md:col-span-1">
            <img src={silkGalleryWide} alt="Geometric Landscapes – Gallery Interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Gallery Interior</span>
          </div>
          <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
            <img src={silkStorefront} alt="Geometric Landscapes – Storefront" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Storefront</span>
          </div>
          <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
            <img src={silkBookDetail} alt="Geometric Landscapes – Catalogue" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Catalogue</span>
          </div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-2 md:grid-cols-[27fr_39fr_33fr] gap-2 md:h-[320px]">
          <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
            <img src={silkOpening} alt="Geometric Landscapes – Opening Night" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Opening Night</span>
          </div>
          <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden col-span-2 md:col-span-1">
            <img src={silkGalleryView} alt="Geometric Landscapes – Gallery View" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Gallery View</span>
          </div>
          <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
            <img src={silkNightExterior} alt="Geometric Landscapes – Night Exterior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-4 text-[8px] sm:text-[10px] md:text-xs text-white/50 uppercase" style={{ letterSpacing: "0.15em", fontFamily: "var(--font-sans)" }}>Night Exterior</span>
          </div>
        </div>
      </div>

      {/* Title block */}
      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>FINAL FRONTIER | SILK</h3>
        <p className="text-base sm:text-lg md:text-xl text-white/80 font-light" style={{ fontFamily: "var(--font-serif)" }}>
          Geometric Landscapes: A Solo Exhibition by Jerry-Lee Bosmans
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm text-white/35 font-light uppercase" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}>
          Curatorial Production · Brand Extension Activation · Gallery Pop-up Experience
        </p>
      </div>

      {/* Key metrics */}
      <div className="mt-4 sm:mt-6 flex flex-wrap gap-4 sm:gap-6 md:gap-10">
        {[
          { label: "Artist", value: "Jerry-Lee Bosmans" },
          { label: "Venue", value: "Silk Gallery, Shanghai" },
          { label: "Date", value: "April 2024" },
          { label: "Format", value: "Pop-up Solo Exhibition" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <span className="text-[10px] md:text-xs text-white/30 uppercase" style={{ letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}>{m.label}</span>
            <span className="text-xs sm:text-sm md:text-base text-white/70 font-light" style={{ fontFamily: "var(--font-sans)" }}>{m.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN SECTION
   ────────────────────────────────────────────────────────── */
export function ExperientialSpatial() {
  return (
    <section
      id="section-experiential"
      className="relative py-20 sm:py-32 md:py-48 overflow-hidden"
    >
      {/* Background gradient orbs — animated */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/10 to-cyan-600/10 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-pink-600/10 to-purple-600/10 rounded-full blur-3xl animate-orb-3" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-16 lg:px-32">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-12 sm:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          </div>
          <h2
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight font-light text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Experiential{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              & Spatial
            </span>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-6 sm:mt-8" />
        </div>

        {/* Projects */}
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
          <OneParkCambodiaCard />
          <ShanghaiBayCard />
          <OneParkShanghaiCard />
          <DesignShanghaiCard />
          <FinalFrontierSilkCard />
        </div>
      </div>
    </section>
  );
}
