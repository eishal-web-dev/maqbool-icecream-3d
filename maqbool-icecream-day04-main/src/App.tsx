import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { flavors, WHATSAPP_URL } from '@/data/flavors';
import type { NavPanelType } from '@/data/flavors';
import type { TransitionDirection } from '@/components/three/Scene';
import { useResponsive, useReducedMotion, useIsVisible } from '@/hooks/useResponsive';
import SceneCanvas from '@/components/three/Scene';
import Navbar, { MobileMenu } from '@/components/Navbar';
import MainUI from '@/components/MainUI';
import OverlayPanel from '@/components/OverlayPanel';
import Loader from '@/components/Loader';
import Fallback from '@/components/Fallback';

const TRANSITION_DURATION = 1200; // ms

export default function App() {
  const { isMobile, isSmallMobile } = useResponsive();
  const reducedMotion = useReducedMotion();
  const { visible } = useIsVisible();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection | null>(null);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [activePanel, setActivePanel] = useState<NavPanelType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const transitionRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentFlavor = flavors[currentIndex];
  const nextFlavorIndex = transitionDirection === 'prev'
    ? (currentIndex - 1 + flavors.length) % flavors.length
    : (currentIndex + 1) % flavors.length;
  const nextFlavor = flavors[nextFlavorIndex];

  // ─── WebGL detection ──────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglAvailable(!!gl);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  // ─── Loader timeout ────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ─── Transition logic ─────────────────────────────────────────────────────
  const startTransition = useCallback((direction: TransitionDirection, targetIndex?: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionDirection(direction);
    startTimeRef.current = performance.now();

    const nextIdx = targetIndex !== undefined
      ? targetIndex
      : direction === 'next'
        ? (currentIndex + 1) % flavors.length
        : (currentIndex - 1 + flavors.length) % flavors.length;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
      setTransitionProgress(progress);

      if (progress < 1) {
        transitionRef.current = requestAnimationFrame(animate);
      } else {
        // Swap to new flavor at the end
        setCurrentIndex(nextIdx);
        setIsTransitioning(false);
        setTransitionDirection(null);
        setTransitionProgress(0);
        transitionRef.current = null;
      }
    };

    transitionRef.current = requestAnimationFrame(animate);
  }, [currentIndex, isTransitioning]);

  const goToFlavor = useCallback((index: number) => {
    if (index === currentIndex || isTransitioning) return;
    const direction: TransitionDirection = index > currentIndex ? 'next' : 'prev';
    startTransition(direction, index);
  }, [currentIndex, isTransitioning, startTransition]);

  const handleNext = useCallback(() => startTransition('next'), [startTransition]);
  const handlePrev = useCallback(() => startTransition('prev'), [startTransition]);

  // ─── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activePanel || mobileMenuOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, handlePrev, activePanel, mobileMenuOpen]);

  // ─── Mouse parallax ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile || reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile, reducedMotion]);

  // ─── Touch / drag / swipe ──────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent | MouseEvent) => {
      const point = 'touches' in e ? e.touches[0] : e;
      dragStartRef.current = { x: point.clientX, y: point.clientY };
    };

    const onEnd = (e: TouchEvent | MouseEvent) => {
      if (!dragStartRef.current) return;
      const point = 'changedTouches' in e ? e.changedTouches[0] : e;
      const dx = point.clientX - dragStartRef.current.x;
      const dy = point.clientY - dragStartRef.current.y;

      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) handleNext();
        else handlePrev();
      }
      dragStartRef.current = null;
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    el.addEventListener('mousedown', onStart);
    el.addEventListener('mouseup', onEnd);

    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('mousedown', onStart);
      el.removeEventListener('mouseup', onEnd);
    };
  }, [handleNext, handlePrev]);

  // ─── Cleanup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (transitionRef.current) cancelAnimationFrame(transitionRef.current);
    };
  }, []);

  const handleOrderClick = useCallback(() => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: currentFlavor.backgroundGradient }}
    >
      <AnimatePresence>
        {showLoader && <Loader key="loader" />}
      </AnimatePresence>

      {/* ─── 3D Scene ─── */}
      {webglAvailable ? (
        <Suspense fallback={null}>
          <SceneCanvas
            flavor={currentFlavor}
            nextFlavor={nextFlavor}
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
            reducedMotion={reducedMotion}
            transitionDirection={transitionDirection}
            transitionProgress={transitionProgress}
            mousePos={mousePos}
            visible={visible}
          />
        </Suspense>
      ) : (
        <Fallback />
      )}

      {/* ─── Background color morph layer (smooth gradient transition) ─── */}
      <motion.div
        key={currentFlavor.id + '-bg'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: currentFlavor.backgroundGradient }}
      />

      {/* ─── UI Layer ─── */}
      <div className="absolute inset-0 z-10">
        <Navbar
          onNavClick={(p: NavPanelType) => setActivePanel(p)}
          onOrderClick={handleOrderClick}
        />

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden absolute top-5 right-20 z-50 text-white p-2"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onNavClick={(p: NavPanelType) => setActivePanel(p)}
          onOrderClick={handleOrderClick}
        />

        <MainUI
          flavor={currentFlavor}
          index={currentIndex}
          isTransitioning={isTransitioning}
          onPrev={handlePrev}
          onNext={handleNext}
          onIndicatorClick={goToFlavor}
          isMobile={isMobile}
        />

        <OverlayPanel
          panel={activePanel}
          onClose={() => setActivePanel(null)}
          onFlavorClick={goToFlavor}
        />
      </div>
    </div>
  );
}
