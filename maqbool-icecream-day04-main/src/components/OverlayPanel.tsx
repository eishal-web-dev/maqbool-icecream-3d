import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, MessageCircle, Clock, IceCream } from 'lucide-react';
import type { NavPanelType } from '@/data/flavors';
import { flavors, WHATSAPP_URL } from '@/data/flavors';

interface OverlayPanelProps {
  panel: NavPanelType;
  onClose: () => void;
  onFlavorClick: (i: number) => void;
}

export default function OverlayPanel({ panel, onClose, onFlavorClick }: OverlayPanelProps) {
  return (
    <AnimatePresence>
      {panel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-[70] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-lg w-full max-h-[80vh] overflow-y-auto bg-[#1a1018]/95 border border-white/10 rounded-3xl p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {panel === 'flavours' && (
              <div>
                <h3 className="font-display text-white text-2xl mb-6">Our Flavours</h3>
                <div className="space-y-2">
                  {flavors.map((f, i) => (
                    <button
                      key={f.id}
                      onClick={() => { onFlavorClick(i); onClose(); }}
                      className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors text-left group"
                    >
                      <span className="font-display text-white/30 text-sm w-8">{f.number}</span>
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: f.accent }}
                      />
                      <div className="flex-1">
                        <div className="text-white font-medium">{f.name}</div>
                        <div className="text-white/40 text-xs">{f.tagline}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {panel === 'story' && (
              <div>
                <h3 className="font-display text-white text-2xl mb-4">Our Story</h3>
                <div className="flex items-center gap-3 mb-6">
                  <IceCream className="w-8 h-8 text-amber-300" strokeWidth={1.5} />
                  <span className="font-display text-white text-xl">Maqbool Ice Cream</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  Maqbool Ice Cream is a Peshawar institution — a name synonymous with pure milk,
                  real fruit and slow-churned tradition. From the iconic Kulfa Badami to the
                  legendary Maqbool Special, every scoop is made with the same commitment to
                  quality that built the brand.
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Known for their fresh ingredients, rich flavors and beloved falooda, Maqbool
                  has grown from a local favorite into a symbol of Peshawar's sweet culture —
                  one scoop at a time.
                </p>
              </div>
            )}

            {panel === 'locations' && (
              <div>
                <h3 className="font-display text-white text-2xl mb-6">Our Locations</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-white font-medium">University Road</div>
                      <div className="text-white/50 text-sm">Peshawar, Khyber Pakhtunkhwa</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-white font-medium">G.S Tower, Ring Road</div>
                      <div className="text-white/50 text-sm">Toll Plaza, Peshawar</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-white font-medium">Mardan Branch</div>
                      <div className="text-white/50 text-sm">Mardan, Khyber Pakhtunkhwa</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-white/50 text-sm">
                  <Clock className="w-4 h-4" />
                  Delivery available across Peshawar
                </div>
              </div>
            )}

            {panel === 'contact' && (
              <div>
                <h3 className="font-display text-white text-2xl mb-6">Contact & Orders</h3>
                <div className="space-y-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/15 border border-green-500/30 hover:bg-green-500/25 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">WhatsApp Order</div>
                      <div className="text-white/50 text-sm">0333 6660966</div>
                    </div>
                  </a>
                  <a
                    href="tel:03336660966"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-amber-300" />
                    <div>
                      <div className="text-white font-medium">Call to Order</div>
                      <div className="text-white/50 text-sm">0333 6660966</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <MapPin className="w-5 h-5 text-amber-300" />
                    <div>
                      <div className="text-white font-medium">Peshawar, Pakistan</div>
                      <div className="text-white/50 text-sm">Delivery & dine-in available</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
