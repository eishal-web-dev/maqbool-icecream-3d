import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag, MousePointer2 } from 'lucide-react';
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
      {/* ─── Giant background typography ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[5]">
        <AnimatePresence mode="wait">
          <motion.div
            key={flavor.id + '-text'}
            initial={{ opacity: 0, x: 120, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -120, scale: 0.92 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-center select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(4rem, 22vw, 20rem)',
              lineHeight: 0.85,
              textShadow: `0 0 80px ${flavor.textShadow}`,
              color: 'transparent',
              WebkitTextStroke: `2px ${flavor.textColor}22`,
            }}
          >
            {flavor.shortName}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Flavor number (top-left) ─── */}
      <div className="absolute top-24 md:top-28 left-6 md:left-12 z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={flavor.id + '-num'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-baseline gap-1 font-display"
          >
            <span className="text-white text-3xl md:text-4xl">{flavor.number}</span>
            <span className="text-white/40 text-base md:text-lg">/ {String(TOTAL_FLAVORS).padStart(2, '0')}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Description (left side on desktop, bottom on mobile) ─── */}
      <div className={`absolute z-20 pointer-events-none ${isMobile ? 'bottom-32 left-6 right-6' : 'bottom-20 left-12 max-w-sm'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={flavor.id + '-desc'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-xs font-medium uppercase tracking-[0.2em] mb-2" style={{ color: flavor.accent }}>
              {flavor.tagline}
            </div>
            <h2 className="font-display text-white text-2xl md:text-3xl mb-3 drop-shadow-lg">
              {flavor.name}
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xs">
              {flavor.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Order Now button ─── */}
      <div className={`absolute z-20 ${isMobile ? 'bottom-32 right-6' : 'bottom-20 right-12'}`}>
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full text-black font-semibold text-sm shadow-2xl transition-colors duration-300"
          style={{ backgroundColor: flavor.accent }}
        >
          <ShoppingBag className="w-4 h-4" />
          Order Now
        </motion.a>
      </div>

      {/* ─── Prev / Next controls ─── */}
      <div className={`absolute z-20 flex items-center gap-3 ${isMobile ? 'bottom-10 left-1/2 -translate-x-1/2' : 'bottom-20 left-1/2 -translate-x-1/2'}`}>
        <button
          onClick={onPrev}
          disabled={isTransitioning}
          aria-label="Previous flavor"
          className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 backdrop-blur-md bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Flavor indicators */}
        <div className="flex items-center gap-1.5 px-2">
          {Array.from({ length: TOTAL_FLAVORS }).map((_, i) => (
            <button
              key={i}
              onClick={() => onIndicatorClick(i)}
              disabled={isTransitioning}
              aria-label={`Go to flavor ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === index ? '24px' : '8px',
                height: '8px',
                backgroundColor: i === index ? flavor.accent : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={isTransitioning}
          aria-label="Next flavor"
          className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 backdrop-blur-md bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* ─── Drag to explore hint ─── */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 right-12 z-20 flex items-center gap-2 text-white/40 text-xs pointer-events-none"
        >
          <MousePointer2 className="w-3.5 h-3.5" />
          Drag to explore
        </motion.div>
      )}

      {/* ─── Social icons (bottom-left desktop) ─── */}
      <div className="hidden md:flex absolute bottom-6 left-12 z-20 flex-col gap-3">
        {['Instagram', 'Facebook', 'TikTok'].map((social) => (
          <a
            key={social}
            href="https://www.instagram.com/maqboolicecreamofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 text-xs hover:text-white/80 transition-colors duration-200"
            style={{ writingMode: 'vertical-rl' }}
          >
            {social}
          </a>
        ))}
      </div>
    </>
  );
}
