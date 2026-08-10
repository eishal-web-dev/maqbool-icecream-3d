import { motion, AnimatePresence } from 'framer-motion';
import { IceCream, X } from 'lucide-react';
import type { NavPanelType } from '@/data/flavors';
import { WHATSAPP_URL } from '@/data/flavors';

interface NavbarProps {
  onNavClick: (panel: NavPanelType) => void;
  onOrderClick: () => void;
}

export default function Navbar({ onNavClick, onOrderClick }: NavbarProps) {
  const navItems: { label: string; panel: NavPanelType }[] = [
    { label: 'Flavours', panel: 'flavours' },
    { label: 'Our Story', panel: 'story' },
    { label: 'Locations', panel: 'locations' },
    { label: 'Contact', panel: 'contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between">
      <button
        onClick={() => onNavClick(null)}
        className="flex items-center gap-2 group"
      >
        <IceCream className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={1.5} />
        <span className="font-display text-xl md:text-2xl text-white tracking-tight drop-shadow-lg">
          Maqbool
        </span>
      </button>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.panel}
            onClick={() => onNavClick(item.panel)}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 tracking-wide drop-shadow"
          >
            {item.label}
          </button>
        ))}
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => { e.preventDefault(); onOrderClick(); }}
        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/25 transition-all duration-200 hover:scale-105"
      >
        Order Now
      </a>
    </nav>
  );
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavClick: (panel: NavPanelType) => void;
  onOrderClick: () => void;
}

export function MobileMenu({ open, onClose, onNavClick, onOrderClick }: MobileMenuProps) {
  const navItems: { label: string; panel: NavPanelType }[] = [
    { label: 'Flavours', panel: 'flavours' },
    { label: 'Our Story', panel: 'story' },
    { label: 'Locations', panel: 'locations' },
    { label: 'Contact', panel: 'contact' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="md:hidden absolute top-0 left-0 right-0 z-[60] bg-black/80 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2">
              <IceCream className="w-6 h-6 text-white" strokeWidth={1.5} />
              <span className="font-display text-lg text-white">Maqbool</span>
            </div>
            <button onClick={onClose} className="text-white p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 pb-8">
            {navItems.map((item) => (
              <button
                key={item.panel}
                onClick={() => { onNavClick(item.panel); onClose(); }}
                className="text-left text-lg font-medium text-white/90 hover:text-white py-3 border-b border-white/10"
              >
                {item.label}
              </button>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); onOrderClick(); onClose(); }}
              className="mt-4 text-center px-5 py-3 rounded-full bg-white/20 border border-white/30 text-white font-medium"
            >
              Order Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
