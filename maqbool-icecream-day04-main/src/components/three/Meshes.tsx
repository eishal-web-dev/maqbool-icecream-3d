import { useMemo } from 'react';
import * as THREE from 'three';
import type { IngredientType } from '@/data/flavors';

// ─── Ingredient meshes ─────────────────────────────────────────────────────

const INGREDIENT_COLORS: Record<IngredientType, string> = {
  almond: '#c8924a',
  pistachio: '#7fa848',
  saffron: '#e8a020',
  milkDroplet: '#f8f4ec',
  cardamom: '#a8c878',
  mangoSlice: '#ffb84d',
  mangoCube: '#ff9a2e',
  mangoLeaf: '#5a9a3a',
  blueberry: '#4a3a8a',
  creamDroplet: '#f8f4ec',
  strawberry: '#e84a6a',
  biscuitCrumb: '#c8a868',
  chocolatePiece: '#3a1e0a',
  cocoaParticle: '#6a3a18',
  crunchyFragment: '#8a5a2a',
  rosePetal: '#e88aa8',
  basilSeed: '#2a1a1a',
  nut: '#a87838',
};

function AlmondMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.18, 0.28, 0.12]}>
      <sphereGeometry args={[1, 16, 12]} />
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.05} />
    </mesh>
  );
}

function PistachioMesh({ color }: { color: string }) {
  return (
    <group scale={0.16}>
      <mesh>
        <sphereGeometry args={[1, 12, 10]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.5]} scale={[0.7, 0.5, 0.3]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color="#9ab87a" roughness={0.5} />
      </mesh>
    </group>
  );
}

function SaffronMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.04, 0.22, 0.04]} rotation={[0.2, 0, 0.3]}>
      <capsuleGeometry args={[1, 1.5, 4, 8]} />
      <meshStandardMaterial color={color} roughness={0.4} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  );
}

function MilkDropletMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.12, 0.18, 0.12]}>
      <sphereGeometry args={[1, 16, 12]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
    </mesh>
  );
}

function CardamomMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.06, 0.2, 0.06]} rotation={[0.3, 0, 0.2]}>
      <capsuleGeometry args={[1, 1.8, 4, 8]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

function MangoSliceMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.22, 0.16, 0.04]} rotation={[0.2, 0.3, 0]}>
      <sphereGeometry args={[1, 16, 12]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}

function MangoCubeMesh({ color }: { color: string }) {
  return (
    <mesh scale={0.12}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.45} />
    </mesh>
  );
}

function MangoLeafMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.24, 0.1, 0.02]} rotation={[0.1, 0.4, 0.3]}>
      <sphereGeometry args={[1, 16, 8]} />
      <meshStandardMaterial color={color} roughness={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

function BlueberryMesh({ color }: { color: string }) {
  return (
    <group scale={0.14}>
      <mesh>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.7, 0]} scale={[0.3, 0.15, 0.3]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial color="#2a1a4a" roughness={0.5} />
      </mesh>
    </group>
  );
}

function CreamDropletMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.14, 0.2, 0.14]}>
      <sphereGeometry args={[1, 16, 12]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.05} />
    </mesh>
  );
}

function StrawberryMesh({ color }: { color: string }) {
  return (
    <group scale={0.16}>
      <mesh scale={[1, 1.3, 1]}>
        <coneGeometry args={[1, 1.4, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.8, 0]} scale={[0.5, 0.2, 0.5]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial color="#4a8a3a" roughness={0.6} />
      </mesh>
    </group>
  );
}

function BiscuitCrumbMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.1, 0.06, 0.12]} rotation={[0.3, 0.5, 0.2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

function ChocolatePieceMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.16, 0.08, 0.12]} rotation={[0.2, 0.3, 0.4]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

function CocoaParticleMesh({ color }: { color: string }) {
  return (
    <mesh scale={0.06}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}

function CrunchyFragmentMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.1, 0.07, 0.08]} rotation={[0.4, 0.2, 0.5]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}

function RosePetalMesh({ color }: { color: string }) {
  return (
    <mesh scale={[0.2, 0.02, 0.14]} rotation={[0.2, 0.3, 0.4]}>
      <sphereGeometry args={[1, 16, 8]} />
      <meshStandardMaterial color={color} roughness={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

function BasilSeedMesh({ color }: { color: string }) {
  return (
    <mesh scale={0.05}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial color={color} roughness={0.4} transparent opacity={0.85} />
    </mesh>
  );
}

function NutMesh({ color }: { color: string }) {
  return (
    <mesh scale={0.12}>
      <sphereGeometry args={[1, 12, 10]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

const MESH_MAP: Record<IngredientType, React.FC<{ color: string }>> = {
  almond: AlmondMesh,
  pistachio: PistachioMesh,
  saffron: SaffronMesh,
  milkDroplet: MilkDropletMesh,
  cardamom: CardamomMesh,
  mangoSlice: MangoSliceMesh,
  mangoCube: MangoCubeMesh,
  mangoLeaf: MangoLeafMesh,
  blueberry: BlueberryMesh,
  creamDroplet: CreamDropletMesh,
  strawberry: StrawberryMesh,
  biscuitCrumb: BiscuitCrumbMesh,
  chocolatePiece: ChocolatePieceMesh,
  cocoaParticle: CocoaParticleMesh,
  crunchyFragment: CrunchyFragmentMesh,
  rosePetal: RosePetalMesh,
  basilSeed: BasilSeedMesh,
  nut: NutMesh,
};

export function IngredientMesh({ type }: { type: IngredientType }) {
  const color = INGREDIENT_COLORS[type];
  const Component = MESH_MAP[type];
  return <Component color={color} />;
}

// ─── Ice cream product mesh ──────────────────────────────────────────────────

interface ProductMeshProps {
  color: string;
  accent: string;
  shape: 'cone' | 'cup' | 'bowl' | 'tub' | 'glass';
}

export function IceCreamProduct({ color, accent, shape }: ProductMeshProps) {
  const scoops = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number; rot: number }[] = [];
    const count = shape === 'glass' || shape === 'tub' ? 2 : 3;
    for (let i = 0; i < count; i++) {
      const y = 0.55 + i * 0.32;
      const x = i % 2 === 0 ? 0.05 : -0.05;
      arr.push({ pos: [x, y, i * 0.05], scale: 0.42 - i * 0.05, rot: i * 0.3 });
    }
    return arr;
  }, [shape]);

  return (
    <group>
      {/* Container */}
      {shape === 'cone' && (
        <mesh position={[0, -0.35, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.48, 1.1, 24]} />
          <meshStandardMaterial color="#d4a868" roughness={0.7} />
        </mesh>
      )}
      {shape === 'cup' && (
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.5, 0.4, 0.5, 24]} />
          <meshStandardMaterial color="#f0e8d8" roughness={0.5} />
        </mesh>
      )}
      {shape === 'bowl' && (
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.55, 24, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5]} />
          <meshStandardMaterial color="#e8b04c" roughness={0.3} metalness={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}
      {shape === 'tub' && (
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.55, 0.5, 0.55, 24]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.4} metalness={0.2} />
        </mesh>
      )}
      {shape === 'glass' && (
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.35, 0.25, 1.0, 16]} />
          <meshStandardMaterial color="#f0e8d8" roughness={0.1} metalness={0.1} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Scoops */}
      {scoops.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale} rotation={[0, s.rot, 0]}>
          <sphereGeometry args={[1, 24, 18]} />
          <meshStandardMaterial color={i === 0 ? color : i === 1 ? accent : color} roughness={0.35} />
        </mesh>
      ))}

      {/* Drizzle / accent on top */}
      <mesh position={[0, scoops[scoops.length - 1].pos[1] + 0.25, 0]} scale={0.12}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color={accent} roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Waffle texture bumps for cone */}
      {shape === 'cone' && (
        <group position={[0, -0.35, 0]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} rotation={[0, (i / 8) * Math.PI * 2, 0]} position={[0, 0.15 - i * 0.08, 0.42]}>
              <boxGeometry args={[0.5, 0.02, 0.02]} />
              <meshStandardMaterial color="#b8884a" roughness={0.8} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
