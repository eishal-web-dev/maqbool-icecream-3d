import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag, MoveHorizontal } from 'lucide-react';
import type { Flavor } from '@/data/flavors';
import { TOTAL_FLAVORS, WHATSAPP_URL } from '@/data/flavors';

interface MainUIProps {
  flavor: Flavor;
  index: number;
  isTransitioning: boolean;
  onPrev: () => void;
  onNext: () => void;
  onIndicatorClick: (i: number) => void;
  isMobile: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function MainUI({
  flavor,
  index,
  isTransitioning,
  onPrev,
  onNext,
  onIndicatorClick,
  isMobile,
}: MainUIProps) {
  return (
    <>
      {/* The reference uses one giant filled word, not a faint wireframe. */}
      <div className="absolute inset-0 z-[4] flex items-center justify-center overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`${flavor.id}-word`}
            initial={{ opacity: 0, x: 180, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -180, rotate: -2 }}
            transition={{ duration: 0.85, ease }}
            className="hero-word font-display"
          >
            {flavor.shortName}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Real photography from Maqbool's public website, treated like the reference's hero card. */}
      <div className="absolute inset-0 z-[8] flex items-center justify-center pointer-events-none hero-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${flavor.id}-photo`}
            initial={{ opacity: 0, x: 260, y: -80, rotate: 13, scale: 0.72 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: isMobile ? -2 : -4, scale: 1 }}
            exit={{ opacity: 0, x: -300, y: 110, rotate: -16, scale: 1.12 }}
            transition={{ duration: 1.05, ease }}
            className="product-photo-shell"
            style={{ filter: `drop-shadow(0 38px 36px ${flavor.background}99)` }}
          >
            <motion.img
              src={flavor.image}
              alt={`${flavor.name} by Maqbool Ice Cream`}
              className="product-photo"
              draggable={false}
              animate={isMobile ? undefined : { x: [0, 7, 0], y: [0, -9, 0], scale: [1.02, 1.055, 1.02] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative depth — keeps the page playful without covering the food. */}
      <motion.div className="ingredient-orb orb-one" animate={{ y: [0, -18, 0], rotate: [0, 18, 0] }} transition={{ duration: 5, repeat: Infinity }} style={{ background: flavor.accent }} />
      <motion.div className="ingredient-orb orb-two" animate={{ y: [0, 14, 0], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} style={{ borderColor: flavor.accent }} />
      <motion.div className="ingredient-orb orb-three" animate={{ x: [0, 10, 0], y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity }} style={{ background: flavor.textColor }} />

      <div className="absolute left-5 top-24 z-20 md:left-12 md:top-28">
        <AnimatePresence mode="wait">
          <motion.div key={flavor.number} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex items-baseline font-display">
            <span className="text-3xl text-white md:text-5xl">{flavor.number}</span>
            <span className="ml-1 text-sm text-white/55 md:text-lg">/{String(TOTAL_FLAVORS).padStart(2, '0')}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-copy absolute z-20">
        <AnimatePresence mode="wait">
          <motion.div key={`${flavor.id}-copy`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.55, delay: 0.25 }}>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.3em] md:text-xs" style={{ color: flavor.accent }}>{flavor.tagline}</p>
            <h2 className="font-display text-3xl leading-none text-white md:text-5xl">{flavor.name}</h2>
            <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-white/78 md:text-base">{flavor.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="order-cta absolute z-30 flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-black shadow-2xl transition-transform hover:scale-105" style={{ backgroundColor: flavor.accent }}>
        <ShoppingBag className="h-4 w-4" /> Order now
      </a>

      <div className="slider-controls absolute z-30 flex items-center gap-3">
        <button onClick={onPrev} disabled={isTransitioning} aria-label="Previous flavour" className="nav-circle"><ArrowLeft /></button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_FLAVORS }).map((_, i) => (
            <button key={i} onClick={() => onIndicatorClick(i)} disabled={isTransitioning} aria-label={`Show flavour ${i + 1}`} className="h-2 rounded-full transition-all" style={{ width: i === index ? 28 : 8, backgroundColor: i === index ? flavor.accent : 'rgba(255,255,255,.38)' }} />
          ))}
        </div>
        <button onClick={onNext} disabled={isTransitioning} aria-label="Next flavour" className="nav-circle"><ArrowRight /></button>
      </div>

      {!isMobile && <div className="absolute bottom-7 right-12 z-20 flex items-center gap-2 text-xs text-white/55"><MoveHorizontal className="h-4 w-4" /> Drag or use arrows</div>}
    </>
  );
}
