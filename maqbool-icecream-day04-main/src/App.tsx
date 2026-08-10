import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { flavors, WHATSAPP_URL } from '@/data/flavors';
import type { NavPanelType } from '@/data/flavors';
import { useResponsive } from '@/hooks/useResponsive';
import Navbar, { MobileMenu } from '@/components/Navbar';
import MainUI from '@/components/MainUI';
import OverlayPanel from '@/components/OverlayPanel';
import Loader from '@/components/Loader';

type TransitionDirection = 'next' | 'prev';
const TRANSITION_DURATION = 850;

export default function App() {
  const { isMobile } = useResponsive();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activePanel, setActivePanel] = useState<NavPanelType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const transitionRef = useRef<number | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentFlavor = flavors[currentIndex];

  // First paint waits only for the first lightweight product, then nearby slides preload quietly.
  useEffect(() => {
    let active = true;
    const first = new Image();
    first.src = flavors[0].image;
    first.onload = () => active && setShowLoader(false);
    first.onerror = () => active && setShowLoader(false);
    if (first.complete) setShowLoader(false);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const neighbors = [
      flavors[(currentIndex + 1) % flavors.length].image,
      flavors[(currentIndex - 1 + flavors.length) % flavors.length].image,
    ];
    neighbors.forEach((src) => { const image = new Image(); image.src = src; });
  }, [currentIndex]);

  const startTransition = useCallback((direction: TransitionDirection, targetIndex?: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = targetIndex ?? (direction === 'next'
      ? (currentIndex + 1) % flavors.length
      : (currentIndex - 1 + flavors.length) % flavors.length);
    transitionRef.current = window.setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
      transitionRef.current = null;
    }, TRANSITION_DURATION);
  }, [currentIndex, isTransitioning]);

  const goToFlavor = useCallback((index: number) => {
    if (index === currentIndex || isTransitioning) return;
    startTransition(index > currentIndex ? 'next' : 'prev', index);
  }, [currentIndex, isTransitioning, startTransition]);

  const handleNext = useCallback(() => startTransition('next'), [startTransition]);
  const handlePrev = useCallback(() => startTransition('prev'), [startTransition]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (activePanel || mobileMenuOpen) return;
      if (event.key === 'ArrowRight') handleNext();
      if (event.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, handlePrev, activePanel, mobileMenuOpen]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const onStart = (event: TouchEvent | MouseEvent) => {
      const point = 'touches' in event ? event.touches[0] : event;
      dragStartRef.current = { x: point.clientX, y: point.clientY };
    };
    const onEnd = (event: TouchEvent | MouseEvent) => {
      if (!dragStartRef.current) return;
      const point = 'changedTouches' in event ? event.changedTouches[0] : event;
      const dx = point.clientX - dragStartRef.current.x;
      const dy = point.clientY - dragStartRef.current.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? handleNext() : handlePrev();
      dragStartRef.current = null;
    };
    element.addEventListener('touchstart', onStart, { passive: true });
    element.addEventListener('touchend', onEnd, { passive: true });
    element.addEventListener('mousedown', onStart);
    element.addEventListener('mouseup', onEnd);
    return () => {
      element.removeEventListener('touchstart', onStart);
      element.removeEventListener('touchend', onEnd);
      element.removeEventListener('mousedown', onStart);
      element.removeEventListener('mouseup', onEnd);
    };
  }, [handleNext, handlePrev]);

  useEffect(() => () => {
    if (transitionRef.current) window.clearTimeout(transitionRef.current);
  }, []);

  const handleOrderClick = useCallback(() => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden select-none" style={{ background: currentFlavor.backgroundGradient }}>
      <AnimatePresence>{showLoader && <Loader key="loader" />}</AnimatePresence>
      <motion.div key={`${currentFlavor.id}-background`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }} className="absolute inset-0 z-0 pointer-events-none" style={{ background: currentFlavor.backgroundGradient }} />
      <div className="absolute inset-0 z-10">
        <Navbar onNavClick={setActivePanel} onOrderClick={handleOrderClick} />
        <button onClick={() => setMobileMenuOpen(true)} className="md:hidden absolute top-5 right-20 z-50 text-white p-2" aria-label="Open menu"><Menu className="w-6 h-6" /></button>
        <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onNavClick={setActivePanel} onOrderClick={handleOrderClick} />
        <MainUI flavor={currentFlavor} index={currentIndex} isTransitioning={isTransitioning} onPrev={handlePrev} onNext={handleNext} onIndicatorClick={goToFlavor} isMobile={isMobile} />
        <OverlayPanel panel={activePanel} onClose={() => setActivePanel(null)} onFlavorClick={goToFlavor} />
      </div>
    </div>
  );
}
