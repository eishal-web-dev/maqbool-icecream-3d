import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { Flavor, IngredientConfig } from '@/data/flavors';
import { IngredientMesh, IceCreamProduct } from './Meshes';

// ─── Types ──────────────────────────────────────────────────────────────────

export type TransitionDirection = 'next' | 'prev';

interface SceneProps {
  flavor: Flavor;
  nextFlavor: Flavor;
  isMobile: boolean;
  isSmallMobile: boolean;
  reducedMotion: boolean;
  transitionDirection: TransitionDirection | null;
  transitionProgress: number;
  mousePos: { x: number; y: number };
}

// ─── Ingredient component ────────────────────────────────────────────────────

interface IngredientProps {
  config: IngredientConfig;
  flavor: Flavor;
  transitionProgress: number;
  transitionDirection: TransitionDirection | null;
  index: number;
  reducedMotion: boolean;
}

function Ingredient({ config, transitionProgress, transitionDirection, index, reducedMotion }: IngredientProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialSeed = useMemo(() => Math.random() * Math.PI * 2, []);

  const scatterDir = useMemo(() => {
    const angle = (index / 7) * Math.PI * 2 + (transitionDirection === 'prev' ? Math.PI : 0);
    return new THREE.Vector3(Math.cos(angle), Math.sin(angle), -2 - Math.random() * 2);
  }, [index, transitionDirection]);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    const floatY = reducedMotion ? 0 : Math.sin(t * config.floatSpeed + initialSeed) * config.floatRange;
    const floatX = reducedMotion ? 0 : Math.cos(t * config.floatSpeed * 0.7 + initialSeed) * config.floatRange * 0.5;
    const rotZ = reducedMotion ? 0 : Math.sin(t * 0.3 + initialSeed) * 0.2;

    const tp = transitionProgress;
    const dir = transitionDirection === 'prev' ? -1 : 1;
    const scatterAmount = tp * (1 - tp) * 4;
    const scatterX = scatterDir.x * scatterAmount * dir;
    const scatterY = scatterDir.y * scatterAmount;
    const scatterZ = scatterDir.z * tp;

    g.position.set(
      config.position[0] + floatX + scatterX,
      config.position[1] + floatY + scatterY,
      config.position[2] + scatterZ
    );

    g.rotation.z = rotZ + tp * Math.PI * scatterDir.x * 0.5;
    g.rotation.y = config.rotation[1] + t * 0.2 + tp * Math.PI * 2 * dir;
    g.rotation.x = config.rotation[0] + tp * 0.5;

    const scale = config.scale * (1 - tp * 0.3);
    g.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={config.position} rotation={config.rotation} scale={config.scale}>
      <IngredientMesh type={config.type} />
    </group>
  );
}

// ─── Product component ───────────────────────────────────────────────────────

interface ProductProps {
  flavor: Flavor;
  transitionProgress: number;
  transitionDirection: TransitionDirection | null;
  mousePos: { x: number; y: number };
  reducedMotion: boolean;
}

function Product({ flavor, transitionProgress, transitionDirection, mousePos, reducedMotion }: ProductProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetTilt = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    const idleRotY = reducedMotion ? 0 : Math.sin(t * 0.15) * 0.15;
    const idleRotX = reducedMotion ? 0 : Math.cos(t * 0.12) * 0.08;

    targetTilt.current.x += (mousePos.y * 0.25 - targetTilt.current.x) * 0.05;
    targetTilt.current.y += (mousePos.x * 0.3 - targetTilt.current.y) * 0.05;

    const floatY = reducedMotion ? 0 : Math.sin(t * 0.5) * 0.08;

    const tp = transitionProgress;
    const dir = transitionDirection === 'prev' ? -1 : 1;
    const zMove = tp * 2.5;
    const xOut = tp * tp * 6 * dir;
    const yOut = tp * tp * 3;
    const tiltOut = tp * 0.6 * dir;

    g.position.set(xOut, floatY + yOut, zMove);
    g.rotation.x = idleRotX + targetTilt.current.x + tiltOut;
    g.rotation.y = idleRotY + targetTilt.current.y + tiltOut * 1.5;
    g.rotation.z = tiltOut * 0.5;

    const scale = 1 + tp * 0.3;
    g.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <IceCreamProduct color={flavor.productColor} accent={flavor.productAccent} shape={flavor.productShape} />
    </group>
  );
}

// ─── Incoming product (enters from deep) ─────────────────────────────────────

interface IncomingProductProps {
  flavor: Flavor;
  transitionProgress: number;
  transitionDirection: TransitionDirection | null;
  reducedMotion: boolean;
}

function IncomingProduct({ flavor, transitionProgress, transitionDirection, reducedMotion }: IncomingProductProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const tp = transitionProgress;
    const dir = transitionDirection === 'prev' ? -1 : 1;

    const enterAmount = Math.max(0, (tp - 0.3) / 0.7);

    const zStart = -8;
    const zEnd = 0;
    const z = zStart + (zEnd - zStart) * enterAmount;

    const xStart = -4 * dir;
    const x = xStart * (1 - enterAmount);

    const y = reducedMotion ? 0 : Math.sin(t * 0.5) * 0.08 * enterAmount;

    g.position.set(x, y, z);

    const rotAmount = (1 - enterAmount) * Math.PI * 1.5 * dir;
    g.rotation.y = rotAmount;
    g.rotation.x = (1 - enterAmount) * 0.3;

    const scale = 0.3 + 0.7 * enterAmount;
    g.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <IceCreamProduct color={flavor.productColor} accent={flavor.productAccent} shape={flavor.productShape} />
    </group>
  );
}

// ─── Lighting ─────────────────────────────────────────────────────────────────

function SceneLighting({ flavor }: { flavor: Flavor }) {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    lightRef.current.intensity = 1.2 + Math.sin(t * 0.3) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.5} color={flavor.accent} />
      <directionalLight
        ref={lightRef}
        position={[3, 5, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[-3, 2, 3]} intensity={0.4} color={flavor.accent} />
      <pointLight position={[0, -2, 2]} intensity={0.3} color={flavor.productColor} />
    </>
  );
}

// ─── Background color plane ──────────────────────────────────────────────────

function BackgroundPlane({ flavor }: { flavor: Flavor }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const m = meshRef.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.position.z = -6;
    m.position.x = Math.sin(t * 0.05) * 0.3;
    m.position.y = Math.cos(t * 0.05) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -6]}>
      <planeGeometry args={[30, 20]} />
      <meshBasicMaterial color={flavor.background} />
    </mesh>
  );
}

// ─── Main scene contents ─────────────────────────────────────────────────────

function SceneContents({ flavor, nextFlavor, isMobile, isSmallMobile, reducedMotion, transitionDirection, transitionProgress, mousePos }: SceneProps) {
  const rearIngredients = flavor.ingredients.filter((i) => i.layer === 'rear');
  const frontIngredients = flavor.ingredients.filter((i) => i.layer === 'front');
  const ingredientCount = isSmallMobile ? 4 : isMobile ? 5 : 7;
  const visibleFront = frontIngredients.slice(0, Math.ceil(ingredientCount / 2));
  const visibleRear = rearIngredients.slice(0, Math.floor(ingredientCount / 2));

  return (
    <>
      <BackgroundPlane flavor={flavor} />
      <SceneLighting flavor={flavor} />

      {/* Rear ingredients (behind text plane) */}
      <group position={[0, 0, -2]}>
        {visibleRear.map((ing, i) => (
          <Ingredient
            key={i}
            config={ing}
            flavor={flavor}
            transitionProgress={transitionProgress}
            transitionDirection={transitionDirection}
            index={i}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>

      {/* Main product */}
      <Product
        flavor={flavor}
        transitionProgress={transitionProgress}
        transitionDirection={transitionDirection}
        mousePos={mousePos}
        reducedMotion={reducedMotion}
      />

      {/* Incoming product during transition */}
      {transitionProgress > 0.25 && transitionProgress < 1 && (
        <IncomingProduct
          flavor={nextFlavor}
          transitionProgress={transitionProgress}
          transitionDirection={transitionDirection}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Front ingredients (in front of product) */}
      <group position={[0, 0, 1.5]}>
        {visibleFront.map((ing, i) => (
          <Ingredient
            key={i}
            config={ing}
            flavor={flavor}
            transitionProgress={transitionProgress}
            transitionDirection={transitionDirection}
            index={i + 3}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>

      {/* Shadow */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.4}
        scale={6}
        blur={2.5}
        far={4}
        color={flavor.background}
      />

      <Environment preset="studio" />
    </>
  );
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────

interface SceneCanvasProps extends SceneProps {
  visible: boolean;
}

export default function SceneCanvas({ flavor, nextFlavor, isMobile, isSmallMobile, reducedMotion, transitionDirection, transitionProgress, mousePos, visible }: SceneCanvasProps) {
  const dpr = isSmallMobile ? 1 : isMobile ? 1.5 : 2;

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={visible ? 'always' : 'never'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <SceneContents
        flavor={flavor}
        nextFlavor={nextFlavor}
        isMobile={isMobile}
        isSmallMobile={isSmallMobile}
        reducedMotion={reducedMotion}
        transitionDirection={transitionDirection}
        transitionProgress={transitionProgress}
        mousePos={mousePos}
      />
    </Canvas>
  );
}
