import { motion } from 'framer-motion';
import { IceCream } from 'lucide-react';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a0d12]"
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <IceCream className="w-12 h-12 text-amber-300" strokeWidth={1.5} />
      </motion.div>
      <div className="mt-6 font-display text-white text-2xl tracking-tight">Maqbool</div>
      <div className="mt-2 text-white/40 text-sm tracking-[0.3em] uppercase">Ice Cream</div>
      <motion.div className="mt-8 h-0.5 w-32 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-amber-300"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
