import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// ── Holographic Earth Globe ──────────────────────────────────
function HoloGlobe({ phase }: { phase: number }) {
  const globeRef = useRef<THREE.Mesh>(null);

  const globeMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPhase: { value: phase },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uPhase;
      varying vec3 vNormal;
      varying vec2 vUv;

      float continent(vec2 uv) {
        vec2 p = uv * 6.28318;
        float c = 0.0;
        c += sin(p.x * 3.0) * cos(p.y * 2.0) * 0.5;
        c += sin(p.x * 5.0 + 1.0) * cos(p.y * 4.0 + 0.5) * 0.3;
        c += cos(p.x * 7.0) * sin(p.y * 6.0 + 1.5) * 0.2;
        return smoothstep(0.3, 0.6, c + 0.4);
      }

      void main() {
        float land = continent(vUv);
        vec3 ocean = vec3(0.02, 0.08, 0.18);
        vec3 landCol = vec3(0.0, 0.55, 0.7);

        vec2 g = fract(vUv * vec2(24.0, 12.0));
        float grid = clamp(step(0.95, g.x) + step(0.95, g.y), 0.0, 1.0);

        vec3 col = mix(ocean, landCol, land);
        col = mix(col, vec3(0.0, 0.9, 1.0), grid * 0.35);

        float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.5);
        col += vec3(0.0, 0.7, 1.0) * rim * 0.7;

        float scan = sin(vUv.y * 60.0 + uTime * 2.0) * 0.025 + 0.975;
        gl_FragColor = vec4(col * scan, uPhase * (0.9 + rim * 0.1));
      }
    `,
    transparent: true,
  }), []);

  const atmosphereMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uPhase: { value: phase } },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 1.08, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uPhase;
      varying vec3 vNormal;
      void main() {
        float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 1.8);
        gl_FragColor = vec4(0.0, 0.8, 1.0, rim * 0.5 * uPhase);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
  }), []);

  useEffect(() => {
    globeMat.uniforms.uPhase.value = phase;
    atmosphereMat.uniforms.uPhase.value = phase;
  }, [phase, globeMat, atmosphereMat]);

  useFrame(({ clock }) => {
    if (globeRef.current) globeRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    globeMat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <primitive object={globeMat} attach="material" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <primitive object={atmosphereMat} attach="material" />
      </mesh>
    </group>
  );
}

// ── Electron Orbit Ring ──────────────────────────────────────
function ElectronRing({
  radius, tilt, speed, phase,
}: { radius: number; tilt: number; speed: number; phase: number }) {
  const electronRef = useRef<THREE.Mesh>(null);
  const trailPositions = useMemo(() => new Float32Array(60 * 3), []);
  const trailRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    if (electronRef.current) {
      electronRef.current.position.set(x, 0, z);
    }
    if (trailRef.current) {
      const pos = trailRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = pos.count - 1; i > 0; i--) {
        pos.setXYZ(i, pos.getX(i - 1), pos.getY(i - 1), pos.getZ(i - 1));
      }
      pos.setXYZ(0, x, 0, z);
      pos.needsUpdate = true;
    }
  });

  if (phase < 0.05) return null;

  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.007, 8, 80]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.2 * phase} />
      </mesh>
      <mesh ref={electronRef}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#00e5ff" transparent opacity={0.5 * phase} />
      </points>
    </group>
  );
}

// ── Warp speed lines ─────────────────────────────────────────
function WarpLines() {
  const linesRef = useRef<THREE.Points>(null);
  const count = 250;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 5 + 1;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(theta) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!linesRef.current) return;
    const pos = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const z = pos.getZ(i) + 0.45;
      pos.setZ(i, z > 10 ? -10 : z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00e5ff" transparent opacity={0.7} />
    </points>
  );
}

// ── Camera controller ─────────────────────────────────────────
function CameraController({ phase }: { phase: 0 | 1 | 2 }) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cam = camera as THREE.PerspectiveCamera;

    if (phase === 0) {
      camera.position.set(
        Math.sin(t * 0.12) * 0.4,
        2.5 + Math.sin(t * 0.08) * 0.3,
        6 + Math.cos(t * 0.1) * 0.5
      );
      cam.fov = 60;
    } else if (phase === 1) {
      camera.position.set(
        Math.sin(t * 0.25) * 5,
        2 + Math.sin(t * 0.12) * 0.6,
        Math.cos(t * 0.25) * 5
      );
      cam.fov = 65;
    } else {
      // Warp dive
      camera.position.z -= 0.15;
      cam.fov = Math.min(120, cam.fov + 1.5);
    }

    cam.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Main IntroScene ───────────────────────────────────────────
interface IntroSceneProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function IntroScene({ onComplete, onSkip }: IntroSceneProps) {
  const [globePhase, setGlobePhase] = useState(0);
  const [electronPhase, setElectronPhase] = useState(0);
  const [warpActive, setWarpActive] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [camPhase, setCamPhase] = useState<0 | 1 | 2>(0);

  const doSkip = useCallback(() => {
    setShowFlash(true);
    setTimeout(onSkip, 350);
  }, [onSkip]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => { setGlobePhase(1); }, 400));
    timers.push(setTimeout(() => { setElectronPhase(1); setCamPhase(1); }, 2000));
    timers.push(setTimeout(() => { setWarpActive(true); setCamPhase(2); }, 4000));
    timers.push(setTimeout(() => { setShowFlash(true); }, 5500));
    timers.push(setTimeout(() => { onComplete(); }, 6300));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="intro-overlay"
      aria-label="Cinematic intro animation"
      role="img"
    >
      {/* Skip button */}
      <button
        onClick={doSkip}
        className="fixed top-6 right-6 z-50 px-4 py-2 glass border-glow text-white/70 hover:text-cyan-DEFAULT text-sm font-space tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-DEFAULT"
        aria-label="Skip intro animation"
      >
        Skip Intro ⟶
      </button>

      {/* Warp flash */}
      {showFlash && <div className="warp-flash" aria-hidden="true" />}

      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 2.5, 6], fov: 60 }}
        style={{ width: '100vw', height: '100vh', background: '#010409' }}
        aria-hidden="true"
      >
        <Stars radius={80} depth={50} count={3000} factor={4} saturation={0.2} fade />
        <HoloGlobe phase={globePhase} />
        <ElectronRing radius={2.5} tilt={0.3} speed={1.2} phase={electronPhase} />
        <ElectronRing radius={3.1} tilt={-0.5} speed={0.8} phase={electronPhase} />
        <ElectronRing radius={2.2} tilt={1.1} speed={1.5} phase={electronPhase} />
        {warpActive && <WarpLines />}
        <CameraController phase={camPhase} />
        <ambientLight intensity={0.25} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#00e5ff" />
        <pointLight position={[-5, -3, 3]} intensity={1.5} color="#1e90ff" />
      </Canvas>
    </div>
  );
}
