import { motion } from 'framer-motion';
import { IceCream } from 'lucide-react';

export default function Fallback() {
  return (
    <div className="absolute inset-0 z-[80] flex flex-col items-center justify-center bg-gradient-to-b from-[#2a1218] to-[#1a0a0e] text-center px-6">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <IceCream className="w-16 h-16 text-amber-300 mb-4" strokeWidth={1.5} />
      </motion.div>
      <h2 className="font-display text-white text-2xl mb-2">Maqbool Ice Cream</h2>
      <p className="text-white/60 text-sm max-w-xs">
        Your device doesn't support 3D rendering, but the flavor is still here.
        Use the controls below to explore our flavors.
      </p>
    </div>
  );
}
