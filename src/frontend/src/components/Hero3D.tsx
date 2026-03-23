import { MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

// Particle field
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      col[i * 3] = 0.7 + t * 0.3;
      col[i * 3 + 1] = 0.55 + t * 0.35;
      col[i * 3 + 2] = 0.1 + t * 0.4;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      meshRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  const posGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={meshRef} geometry={posGeo}>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// Hour marker data for watch
const HOUR_MARKERS = Array.from({ length: 12 }, (_, i) => ({
  id: `marker-${i}`,
  angle: (i / 12) * Math.PI * 2,
}));

// Stylized Watch
function WatchObject() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[-1.5, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.7, 0.7, 0.12, 64]} />
        <meshStandardMaterial
          color="#c49a3c"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      <mesh>
        <torusGeometry args={[0.75, 0.09, 16, 64]} />
        <meshStandardMaterial color="#d4af4a" metalness={1} roughness={0.05} />
      </mesh>

      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.02, 64]} />
        <meshStandardMaterial color="#0a0806" metalness={0.3} roughness={0.5} />
      </mesh>

      {HOUR_MARKERS.map(({ id, angle }) => {
        const x = Math.cos(angle) * 0.42;
        const z = Math.sin(angle) * 0.42;
        return (
          <mesh key={id} position={[x, 0.085, z]}>
            <boxGeometry args={[0.04, 0.03, 0.01]} />
            <meshStandardMaterial
              color="#d4af4a"
              metalness={1}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      <mesh position={[0, 0.09, 0.1]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <boxGeometry args={[0.03, 0.28, 0.02]} />
        <meshStandardMaterial color="#f0d060" metalness={1} roughness={0.05} />
      </mesh>
      <mesh
        position={[0, 0.09, 0.05]}
        rotation={[Math.PI / 2, 0, -Math.PI / 6]}
      >
        <boxGeometry args={[0.02, 0.18, 0.02]} />
        <meshStandardMaterial color="#f0d060" metalness={1} roughness={0.05} />
      </mesh>

      <mesh position={[0.83, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 16]} />
        <meshStandardMaterial
          color="#c49a3c"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, -0.04, 0.82]}>
        <boxGeometry args={[0.38, 0.08, 0.9]} />
        <meshStandardMaterial color="#1a0e08" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.04, -0.82]}>
        <boxGeometry args={[0.34, 0.08, 0.9]} />
        <meshStandardMaterial color="#1a0e08" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}

// Stylized Shoe
function ShoeObject() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = -t * 0.25 + Math.PI * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.8 + 1) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.45) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[1.1, 0.35, 0.45]} />
        <MeshDistortMaterial
          color="#1a1210"
          metalness={0.6}
          roughness={0.3}
          distort={0.08}
          speed={1.5}
        />
      </mesh>

      <mesh position={[0.65, -0.05, 0]} rotation={[0, 0, 0.25]}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="#1a1210" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.21, 0]}>
        <boxGeometry args={[1.15, 0.07, 0.42]} />
        <meshStandardMaterial color="#2a1f10" roughness={0.8} metalness={0.2} />
      </mesh>

      <mesh position={[-0.45, -0.55, 0]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.025, 0.72, 12]} />
        <meshStandardMaterial
          color="#c49a3c"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0.3, 0.1, 0.23]}>
        <boxGeometry args={[0.5, 0.025, 0.01]} />
        <meshStandardMaterial color="#d4af4a" metalness={1} roughness={0.05} />
      </mesh>

      <mesh position={[0, 0.12, 0.24]}>
        <torusGeometry args={[0.07, 0.015, 8, 20]} />
        <meshStandardMaterial color="#d4af4a" metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
}

// Ribbon configs
const RIBBON_COUNT = [0, 1, 2, 3, 4];
const GOLD_COLORS = ["#c49a3c", "#d4af4a", "#e8c85a", "#b88a30", "#f0d878"];

function FlowingRibbon({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const offset = index * ((Math.PI * 2) / 5);
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * Math.PI * 2;
      const x = Math.sin(t + offset) * (2.5 + index * 0.6);
      const y = Math.cos(t * 1.5 + offset) * 1.2;
      const z = Math.sin(t * 0.8 + offset) * 1.8;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.TubeGeometry(curve, 80, 0.018, 8, true);
  }, [index]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        clock.getElapsedTime() * 0.08 * (index % 2 === 0 ? 1 : -1);
      meshRef.current.rotation.z =
        clock.getElapsedTime() * 0.04 * (index % 3 === 0 ? 1 : -1);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={GOLD_COLORS[index % GOLD_COLORS.length]}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.35 + index * 0.08}
      />
    </mesh>
  );
}

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.08) * 0.6;
    camera.position.y = Math.sin(t * 0.05) * 0.4;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} color="#fff8f0" />
      <directionalLight
        position={[5, 5, 3]}
        intensity={2.5}
        color="#ffd080"
        castShadow
      />
      <spotLight
        position={[-3, 6, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={3}
        color="#ffe4a0"
      />
      <spotLight
        position={[0, -3, 4]}
        angle={0.6}
        penumbra={1}
        intensity={1}
        color="#a0c0ff"
      />

      <ParticleField />
      {RIBBON_COUNT.map((i) => (
        <FlowingRibbon key={`ribbon-${i}`} index={i} />
      ))}
      <WatchObject />
      <ShoeObject />
      <CameraDrift />
    </>
  );
}

export function Hero3D() {
  const handleWatches = () => {
    const el = document.querySelector("#watches");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleShoes = () => {
    const el = document.querySelector("#shoes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-background"
      id="hero"
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "oklch(0.18 0.08 250)" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5, 15, 45, 0.75) 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.18 0.08 250))",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-xs tracking-[0.5em] text-gold uppercase mb-6">
            Premium Boutique
          </p>
        </motion.div>

        <motion.h1
          className="font-display text-7xl md:text-9xl font-bold text-foreground leading-none tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">BEYOND</span>
          <span className="block gold-text-gradient">LUXURY</span>
        </motion.h1>

        <motion.p
          className="font-body text-base md:text-lg text-muted-foreground tracking-[0.2em] uppercase mb-12 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
        >
          Premium Watches &amp; Luxury Footwear
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={handleWatches}
            className="font-body text-sm tracking-[0.2em] uppercase px-10 py-4 bg-primary text-primary-foreground hover:bg-accent transition-all duration-300 hover:shadow-gold"
          >
            Shop Watches
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={handleShoes}
            className="font-body text-sm tracking-[0.2em] uppercase px-10 py-4 border border-primary text-gold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Shop Shoes
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-gold-pulse" />
      </motion.div>
    </section>
  );
}
