import type { ReactNode } from 'react';

export type IngredientType =
  | 'almond'
  | 'pistachio'
  | 'saffron'
  | 'milkDroplet'
  | 'cardamom'
  | 'mangoSlice'
  | 'mangoCube'
  | 'mangoLeaf'
  | 'blueberry'
  | 'creamDroplet'
  | 'strawberry'
  | 'biscuitCrumb'
  | 'chocolatePiece'
  | 'cocoaParticle'
  | 'crunchyFragment'
  | 'rosePetal'
  | 'basilSeed'
  | 'nut';

export interface IngredientConfig {
  type: IngredientType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  floatSpeed: number;
  floatRange: number;
  layer: 'front' | 'rear';
}

export interface Flavor {
  id: string;
  number: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  background: string;
  backgroundGradient: string;
  accent: string;
  textColor: string;
  textShadow: string;
  ingredients: IngredientConfig[];
  productColor: string;
  productAccent: string;
  productShape: 'cone' | 'cup' | 'bowl' | 'tub' | 'glass';
  image: string;
}

export const WHATSAPP_URL =
  'https://wa.me/923336660966?text=Assalam%20o%20Alaikum%2C%20I%20would%20like%20to%20place%20an%20order%20from%20Maqbool%20Ice%20Cream.';

export const flavors: Flavor[] = [
  {
    id: 'maqbool-special',
    number: '01',
    name: 'Maqbool Special',
    shortName: 'MAQBOOL',
    tagline: 'Signature Creation',
    description:
      'A crown of cream, saffron and roasted nuts. The recipe that made Maqbool a Peshawar institution — rich, slow-churned and unforgettable.',
    background: '#766d24',
    backgroundGradient: 'radial-gradient(circle at 50% 38%, #a69b42 0%, #766d24 58%, #4f4814 100%)',
    accent: '#e8b04c',
    textColor: '#f5d99a',
    textShadow: 'rgba(232,176,76,0.25)',
    productColor: '#f7e6c8',
    productAccent: '#e8b04c',
    productShape: 'bowl',
    image: '/cutouts-optimized/maqbool-special.webp',
    ingredients: [
      { type: 'almond', position: [-2.8, 1.2, -1], rotation: [0.3, 0.5, 0.2], scale: 1, floatSpeed: 0.6, floatRange: 0.3, layer: 'front' },
      { type: 'pistachio', position: [2.6, 0.8, -0.5], rotation: [0.1, 0.8, 0.4], scale: 0.8, floatSpeed: 0.5, floatRange: 0.25, layer: 'front' },
      { type: 'saffron', position: [-2.2, -1.5, 0.5], rotation: [0, 0, 0.5], scale: 0.7, floatSpeed: 0.8, floatRange: 0.4, layer: 'front' },
      { type: 'milkDroplet', position: [2.8, -1.2, 0.8], rotation: [0, 0, 0], scale: 0.5, floatSpeed: 0.7, floatRange: 0.35, layer: 'front' },
      { type: 'almond', position: [3.5, 1.8, -2.5], rotation: [0.5, 0.2, 0.8], scale: 0.6, floatSpeed: 0.4, floatRange: 0.2, layer: 'rear' },
      { type: 'pistachio', position: [-3.8, -0.5, -3], rotation: [0.2, 0.6, 0.1], scale: 0.5, floatSpeed: 0.5, floatRange: 0.3, layer: 'rear' },
      { type: 'saffron', position: [1.5, 2.5, -3.5], rotation: [0, 0, 0.3], scale: 0.4, floatSpeed: 0.6, floatRange: 0.25, layer: 'rear' },
    ],
  },
  {
    id: 'kulfa-badami',
    number: '02',
    name: 'Kulfa Badami',
    shortName: 'KULFA',
    tagline: 'Slow-Cooked Tradition',
    description:
      'Slow-cooked milk thickened to velvet, layered with roasted almonds and green cardamom. A kulfi that tastes like home and festival nights.',
    background: '#ad642f',
    backgroundGradient: 'radial-gradient(circle at 50% 38%, #d8995f 0%, #ad642f 58%, #713918 100%)',
    accent: '#b8d4a8',
    textColor: '#d4e8c4',
    textShadow: 'rgba(184,212,168,0.25)',
    productColor: '#e8d5b0',
    productAccent: '#9ab87a',
    productShape: 'cone',
    image: '/cutouts-optimized/kulfi.webp',
    ingredients: [
      { type: 'pistachio', position: [-2.6, 1.3, -0.8], rotation: [0.2, 0.6, 0.3], scale: 0.9, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'almond', position: [2.7, 0.6, -0.3], rotation: [0.4, 0.2, 0.6], scale: 0.85, floatSpeed: 0.6, floatRange: 0.25, layer: 'front' },
      { type: 'cardamom', position: [-2.0, -1.6, 0.6], rotation: [0.1, 0.3, 0.4], scale: 0.6, floatSpeed: 0.7, floatRange: 0.35, layer: 'front' },
      { type: 'pistachio', position: [2.9, -1.0, 0.9], rotation: [0.3, 0.7, 0.2], scale: 0.7, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'almond', position: [3.6, 2.0, -2.8], rotation: [0.5, 0.3, 0.7], scale: 0.5, floatSpeed: 0.4, floatRange: 0.2, layer: 'rear' },
      { type: 'cardamom', position: [-3.6, 0.8, -3.2], rotation: [0.2, 0.5, 0.3], scale: 0.45, floatSpeed: 0.6, floatRange: 0.25, layer: 'rear' },
      { type: 'pistachio', position: [0.5, 2.8, -3.8], rotation: [0.1, 0.4, 0.5], scale: 0.4, floatSpeed: 0.5, floatRange: 0.3, layer: 'rear' },
    ],
  },
  {
    id: 'mango',
    number: '03',
    name: 'Pistachio',
    shortName: 'PISTACHIO',
    tagline: 'Roasted & Creamy',
    description:
      'Creamy pistachio ice cream finished with roasted nuts — smooth, fragrant and unmistakably Maqbool.',
    background: '#397343',
    backgroundGradient: 'radial-gradient(circle at 50% 38%, #69a85f 0%, #397343 58%, #1c4729 100%)',
    accent: '#ffe066',
    textColor: '#fff0a8',
    textShadow: 'rgba(255,224,102,0.3)',
    productColor: '#ffb84d',
    productAccent: '#ffe066',
    productShape: 'cup',
    image: '/cutouts-optimized/pistachio.webp',
    ingredients: [
      { type: 'mangoSlice', position: [-2.7, 1.4, -0.6], rotation: [0.2, 0.3, 0.5], scale: 1, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'mangoCube', position: [2.5, 0.9, -0.4], rotation: [0.4, 0.6, 0.2], scale: 0.8, floatSpeed: 0.6, floatRange: 0.25, layer: 'front' },
      { type: 'mangoLeaf', position: [-2.3, -1.4, 0.7], rotation: [0.1, 0.4, 0.3], scale: 0.7, floatSpeed: 0.4, floatRange: 0.35, layer: 'front' },
      { type: 'mangoCube', position: [2.8, -1.3, 0.8], rotation: [0.3, 0.5, 0.6], scale: 0.6, floatSpeed: 0.7, floatRange: 0.3, layer: 'front' },
      { type: 'mangoSlice', position: [3.5, 2.0, -2.6], rotation: [0.2, 0.5, 0.4], scale: 0.5, floatSpeed: 0.5, floatRange: 0.2, layer: 'rear' },
      { type: 'mangoLeaf', position: [-3.8, -0.3, -3], rotation: [0.3, 0.2, 0.5], scale: 0.5, floatSpeed: 0.4, floatRange: 0.25, layer: 'rear' },
      { type: 'mangoCube', position: [1.0, 2.7, -3.5], rotation: [0.4, 0.6, 0.3], scale: 0.4, floatSpeed: 0.6, floatRange: 0.3, layer: 'rear' },
    ],
  },
  {
    id: 'blueberry',
    number: '04',
    name: 'Chocolate Sundae',
    shortName: 'CHOCOLATE',
    tagline: 'Dark & Decadent',
    description:
      'Cold creamy scoops covered in glossy chocolate sauce — rich, dramatic and made for serious chocolate lovers.',
    background: '#51311d',
    backgroundGradient: 'radial-gradient(circle at 50% 38%, #8b5733 0%, #51311d 58%, #2e190e 100%)',
    accent: '#a8b8e8',
    textColor: '#c8d4f8',
    textShadow: 'rgba(168,184,232,0.3)',
    productColor: '#e8e0f5',
    productAccent: '#6a5ac4',
    productShape: 'tub',
    image: '/cutouts-optimized/chocolate.webp',
    ingredients: [
      { type: 'blueberry', position: [-2.5, 1.3, -0.7], rotation: [0.2, 0.5, 0.3], scale: 1, floatSpeed: 0.6, floatRange: 0.3, layer: 'front' },
      { type: 'blueberry', position: [2.6, 0.7, -0.5], rotation: [0.4, 0.2, 0.6], scale: 0.85, floatSpeed: 0.5, floatRange: 0.25, layer: 'front' },
      { type: 'creamDroplet', position: [-2.1, -1.5, 0.6], rotation: [0, 0, 0], scale: 0.6, floatSpeed: 0.7, floatRange: 0.35, layer: 'front' },
      { type: 'blueberry', position: [2.9, -1.1, 0.8], rotation: [0.3, 0.6, 0.4], scale: 0.7, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'blueberry', position: [3.6, 2.0, -2.7], rotation: [0.5, 0.3, 0.2], scale: 0.5, floatSpeed: 0.4, floatRange: 0.2, layer: 'rear' },
      { type: 'creamDroplet', position: [-3.7, 0.5, -3.1], rotation: [0, 0, 0], scale: 0.4, floatSpeed: 0.6, floatRange: 0.25, layer: 'rear' },
      { type: 'blueberry', position: [0.8, 2.8, -3.6], rotation: [0.2, 0.4, 0.5], scale: 0.45, floatSpeed: 0.5, floatRange: 0.3, layer: 'rear' },
    ],
  },
  {
    id: 'strawberry-cheesecake',
    number: '05',
    name: 'Tutti Frutti',
    shortName: 'TUTTI FRUTTI',
    tagline: 'A Scoop Full Of Colour',
    description:
      'A joyful mix of colourful scoops and candied fruit — bright, playful and made for sharing.',
    background: '#8a1c3a',
    backgroundGradient: 'radial-gradient(circle at 50% 40%, #c4284f 0%, #8a1c3a 55%, #4a0e1f 100%)',
    accent: '#ffc4d4',
    textColor: '#ffd8e4',
    textShadow: 'rgba(255,196,212,0.3)',
    productColor: '#f5c0c8',
    productAccent: '#e84a6a',
    productShape: 'glass',
    image: '/cutouts-optimized/tutti-frutti.webp',
    ingredients: [
      { type: 'strawberry', position: [-2.6, 1.3, -0.6], rotation: [0.2, 0.4, 0.3], scale: 1, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'creamDroplet', position: [2.5, 0.8, -0.4], rotation: [0, 0, 0], scale: 0.7, floatSpeed: 0.6, floatRange: 0.25, layer: 'front' },
      { type: 'biscuitCrumb', position: [-2.2, -1.5, 0.7], rotation: [0.3, 0.5, 0.2], scale: 0.6, floatSpeed: 0.7, floatRange: 0.35, layer: 'front' },
      { type: 'strawberry', position: [2.8, -1.2, 0.8], rotation: [0.4, 0.2, 0.5], scale: 0.75, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'strawberry', position: [3.5, 2.0, -2.7], rotation: [0.2, 0.5, 0.3], scale: 0.5, floatSpeed: 0.4, floatRange: 0.2, layer: 'rear' },
      { type: 'biscuitCrumb', position: [-3.6, 0.6, -3.0], rotation: [0.3, 0.4, 0.2], scale: 0.45, floatSpeed: 0.6, floatRange: 0.25, layer: 'rear' },
      { type: 'creamDroplet', position: [1.2, 2.7, -3.5], rotation: [0, 0, 0], scale: 0.4, floatSpeed: 0.5, floatRange: 0.3, layer: 'rear' },
    ],
  },
  {
    id: 'chocolate-crunch',
    number: '06',
    name: 'Chocolate Milkshake',
    shortName: 'MILKSHAKE',
    tagline: 'Thick, Cold & Decadent',
    description:
      'A tall, thick chocolate shake finished with cream and a deep chocolate drizzle.',
    background: '#1e1208',
    backgroundGradient: 'radial-gradient(circle at 50% 40%, #3a2410 0%, #1e1208 55%, #0a0604 100%)',
    accent: '#d4955a',
    textColor: '#e8b88a',
    textShadow: 'rgba(212,149,90,0.3)',
    productColor: '#4a2810',
    productAccent: '#d4955a',
    productShape: 'tub',
    image: '/cutouts-optimized/milkshake.webp',
    ingredients: [
      { type: 'chocolatePiece', position: [-2.7, 1.3, -0.6], rotation: [0.3, 0.5, 0.2], scale: 1, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'crunchyFragment', position: [2.5, 0.8, -0.4], rotation: [0.4, 0.2, 0.6], scale: 0.8, floatSpeed: 0.6, floatRange: 0.25, layer: 'front' },
      { type: 'cocoaParticle', position: [-2.1, -1.5, 0.7], rotation: [0.2, 0.4, 0.3], scale: 0.5, floatSpeed: 0.8, floatRange: 0.4, layer: 'front' },
      { type: 'chocolatePiece', position: [2.8, -1.2, 0.8], rotation: [0.3, 0.6, 0.4], scale: 0.7, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'chocolatePiece', position: [3.5, 2.0, -2.7], rotation: [0.5, 0.3, 0.2], scale: 0.5, floatSpeed: 0.4, floatRange: 0.2, layer: 'rear' },
      { type: 'crunchyFragment', position: [-3.7, 0.5, -3.1], rotation: [0.3, 0.5, 0.2], scale: 0.45, floatSpeed: 0.6, floatRange: 0.25, layer: 'rear' },
      { type: 'cocoaParticle', position: [1.0, 2.8, -3.6], rotation: [0.2, 0.4, 0.3], scale: 0.4, floatSpeed: 0.5, floatRange: 0.3, layer: 'rear' },
    ],
  },
  {
    id: 'falooda',
    number: '07',
    name: 'Falooda',
    shortName: 'FALOODA',
    tagline: 'Royal Rose Dessert',
    description:
      'Rose syrup, vermicelli, basil seeds and cream over slow-churned kulfi. The grand finale of every Peshawar evening — cool, fragrant and royal.',
    background: '#6d1a3a',
    backgroundGradient: 'radial-gradient(circle at 50% 40%, #a8285a 0%, #6d1a3a 55%, #340d1c 100%)',
    accent: '#7ad4a8',
    textColor: '#f4b8d0',
    textShadow: 'rgba(122,212,168,0.25)',
    productColor: '#f0c8d8',
    productAccent: '#7ad4a8',
    productShape: 'glass',
    image: '/cutouts-optimized/falooda.webp',
    ingredients: [
      { type: 'rosePetal', position: [-2.6, 1.3, -0.6], rotation: [0.2, 0.3, 0.4], scale: 1, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'basilSeed', position: [2.5, 0.8, -0.4], rotation: [0.3, 0.5, 0.2], scale: 0.6, floatSpeed: 0.7, floatRange: 0.35, layer: 'front' },
      { type: 'nut', position: [-2.1, -1.5, 0.7], rotation: [0.4, 0.2, 0.6], scale: 0.7, floatSpeed: 0.6, floatRange: 0.25, layer: 'front' },
      { type: 'rosePetal', position: [2.8, -1.2, 0.8], rotation: [0.2, 0.5, 0.3], scale: 0.75, floatSpeed: 0.5, floatRange: 0.3, layer: 'front' },
      { type: 'rosePetal', position: [3.5, 2.0, -2.7], rotation: [0.3, 0.4, 0.2], scale: 0.5, floatSpeed: 0.4, floatRange: 0.2, layer: 'rear' },
      { type: 'basilSeed', position: [-3.7, 0.5, -3.1], rotation: [0.2, 0.5, 0.3], scale: 0.4, floatSpeed: 0.6, floatRange: 0.25, layer: 'rear' },
      { type: 'nut', position: [1.0, 2.8, -3.6], rotation: [0.4, 0.3, 0.5], scale: 0.45, floatSpeed: 0.5, floatRange: 0.3, layer: 'rear' },
    ],
  },
];

export const TOTAL_FLAVORS = flavors.length;

export type NavPanelType = 'flavours' | 'story' | 'locations' | 'contact' | null;

export interface NavPanelContent {
  title: string;
  body: ReactNode;
}
