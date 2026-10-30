import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { siteConfig } from '../data/portfolio';

// ── Original Holographic Single Earth Globe ──────────────────
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

// ── Original Electron Orbit Ring ─────────────────────────────
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

// ── Original Warp Speed Lines ────────────────────────────────
function WarpLines() {
  const linesRef = useRef<THREE.Points>(null);
  const count = 280;

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
  }, [count]);

  useFrame(() => {
    if (!linesRef.current) return;
    const pos = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const z = pos.getZ(i) + 0.48;
      pos.setZ(i, z > 10 ? -10 : z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#00e5ff" transparent opacity={0.75} />
    </points>
  );
}

// ── Original Camera Controller (Orbit + Warp Dive into Distance) ──
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
      // Warp dive into distance through the Earth!
      camera.position.z -= 0.22;
      cam.fov = Math.min(125, cam.fov + 1.8);
    }

    cam.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Blue Animated Side Graphic (Left Panel) ──────────────────
function TacticalSidebarLeft() {
  const [eqHeights, setEqHeights] = useState<number[]>([12, 24, 18, 30, 22, 14, 28, 20]);

  useEffect(() => {
    let animId: number;
    let t = 0;
    const update = () => {
      t += 0.1;
      setEqHeights(
        [0, 1, 2, 3, 4, 5, 6, 7].map(
          (i) => Math.sin(t * 4 + i * 0.8) * 16 + Math.cos(t * 2 + i * 0.4) * 8 + 26
        )
      );
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <aside
      className="hidden lg:flex flex-col justify-between w-64 xl:w-72 h-full p-4 border-r border-cyan-500/25 bg-gradient-to-r from-[#020714] via-[#030d22]/90 to-transparent z-20 pointer-events-none select-none font-mono text-xs text-cyan-DEFAULT/80"
      aria-label="Left telemetry panel"
    >
      {/* Top: Sector Telemetry */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white">
          <span className="w-2 h-2 rounded-full bg-cyan-DEFAULT animate-ping" />
          <span className="font-orbitron font-bold text-xs tracking-wider">
            RADAR SCAN // L-SEC 01
          </span>
        </div>

        {/* Tactical 360 Radar Reticle */}
        <div className="relative w-32 h-32 mx-auto rounded-full border border-cyan-400/40 bg-space-950/70 p-1 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(0,229,255,0.25)]">
          <div className="absolute inset-2 rounded-full border border-cyan-400/25" />
          <div className="absolute inset-5 rounded-full border border-cyan-400/20" />
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-400/30" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-400/30" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(0, 229, 255, 0.45) 0deg, transparent 65deg, transparent 360deg)',
              animation: 'radar-rotate 3s linear infinite',
            }}
          />
          <div className="absolute top-6 right-7 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#00e5ff] animate-ping" />
          <div className="absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT shadow-[0_0_8px_#00e5ff]" />
        </div>

        {/* Live Coordinate Tickers */}
        <div className="space-y-1 text-[10px] text-white/60 pt-2 border-t border-cyan-500/20">
          <div>LAT: 06°55&apos;N // LON: 79°52&apos;E</div>
          <div>BEARING: 042° TRUE // ALT: 418KM</div>
          <div className="text-emerald-400">SAT-LINK: MIL-STD-810H ACTIVE</div>
        </div>
      </div>

      {/* Middle: Vertical Audio Frequency Equalizer */}
      <div className="glass p-3 rounded-lg border border-cyan-400/30 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-cyan-DEFAULT font-bold">
          <span>VOICE SPECTRUM</span>
          <span className="animate-pulse">REC</span>
        </div>
        <div className="flex items-end justify-between h-14 px-1 gap-1">
          {eqHeights.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all duration-75"
              style={{
                height: `${h}px`,
                background: 'linear-gradient(180deg, #00e5ff 0%, #1e90ff 100%)',
                boxShadow: '0 0 6px rgba(0, 229, 255, 0.5)',
              }}
            />
          ))}
        </div>
        <div className="text-[9px] text-white/50 text-center tracking-widest">
          FREQ: 2.45 GHz // CH 08
        </div>
      </div>

      {/* Bottom: Scrolling Cyber Hex Stream */}
      <div className="text-[9px] text-cyan-DEFAULT/55 space-y-0.5 leading-tight">
        <div>&gt; 0x7FFF8020 DOWNLINK_OK</div>
        <div>&gt; TARGET: RUSIRU_PRAMOD</div>
        <div>&gt; BIOMETRIC_MATCH: 99.8%</div>
        <div className="text-cyan-DEFAULT">&gt; SYSTEM: ENGAGED</div>
      </div>
    </aside>
  );
}

// ── Blue Animated Side Graphic (Right Panel) ─────────────────
function TacticalSidebarRight() {
  return (
    <aside
      className="hidden lg:flex flex-col justify-between w-64 xl:w-72 h-full p-4 border-l border-cyan-500/25 bg-gradient-to-l from-[#020714] via-[#030d22]/90 to-transparent z-20 pointer-events-none select-none font-mono text-xs text-cyan-DEFAULT/80"
      aria-label="Right telemetry panel"
    >
      {/* Top: Target Lock Reticle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-DEFAULT animate-ping" />
            <span className="font-orbitron font-bold text-xs tracking-wider">
              TARGET LOCK
            </span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-cyan-DEFAULT/20 text-[9px] font-bold">
            8K
          </span>
        </div>

        {/* Concentric Reticle Animation */}
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border border-cyan-400/30" />
          <div className="absolute inset-6 rounded-full border border-cyan-400/50 animate-pulse-slow" />
          {/* Corner tick marks */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-DEFAULT" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-DEFAULT" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-DEFAULT" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-DEFAULT" />
          <span className="font-orbitron text-[10px] text-white font-bold tracking-widest">
            RP-2026
          </span>
        </div>

        {/* Identification Summary */}
        <div className="space-y-1 text-[10px] text-white/70 pt-2 border-t border-cyan-500/20">
          <div className="flex justify-between">
            <span className="text-white/40">NAME:</span>
            <span className="text-cyan-DEFAULT font-bold">{siteConfig.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">ROLE:</span>
            <span>Software &amp; IoT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">CLEARANCE:</span>
            <span className="text-emerald-400">LEVEL 5 TOP SECRET</span>
          </div>
        </div>
      </div>

      {/* Middle: Oscillating Sine Waveform */}
      <div className="glass p-3 rounded-lg border border-cyan-400/30 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-cyan-DEFAULT font-bold">
          <span>SINE OSCILLOSCOPE</span>
          <span className="text-[9px] text-white/40">100 FPS</span>
        </div>
        <div className="h-12 w-full flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 40" className="w-full h-full">
            <path
              d="M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="2"
              className="drop-shadow-[0_0_6px_#00e5ff]"
            >
              <animate
                attributeName="d"
                dur="1.8s"
                repeatCount="indefinite"
                values="
                  M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20;
                  M 0,20 Q 25,35 50,20 T 100,20 T 150,20 T 200,20;
                  M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20
                "
              />
            </path>
          </svg>
        </div>
        <div className="text-[9px] text-white/50 text-center tracking-widest">
          TELEMETRY STABLE // LOCKED
        </div>
      </div>

      {/* Bottom: Classification Badges */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="px-2 py-0.5 rounded bg-cyan-DEFAULT/20 text-cyan-DEFAULT font-bold">
            STAGE TUDE
          </span>
          <span className="text-white/40">SECTOR 01</span>
        </div>
        <div className="text-[9px] text-white/40 text-right">
          WARP GATE READY // ARMED
        </div>
      </div>
    </aside>
  );
}

// ── Main IntroScene Component ────────────────────────────────
interface IntroSceneProps {
  onComplete: () => void;
  onSkip: () => void;
}

// Skip video's earth part: start directly at 2.8s on the tactical world map
const VIDEO_MAP_START_TIME = 2.8;

export default function IntroScene({ onComplete, onSkip }: IntroSceneProps) {
  // Stages:
  // 1. 'earth': original clean single Earth with electron rings
  // 2. 'briefing': tactical video with sky-blue exposure transition and animated side panels
  // 3. 'warp': lightspeed warp flash into portfolio
  const [stage, setStage] = useState<'earth' | 'briefing' | 'warp'>('earth');
  const [globePhase, setGlobePhase] = useState(0);
  const [electronPhase, setElectronPhase] = useState(0);
  const [camPhase, setCamPhase] = useState<0 | 1 | 2>(0);
  const [warpActive, setWarpActive] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const doSkip = useCallback(() => {
    setShowFlash(true);
    setTimeout(onSkip, 350);
  }, [onSkip]);

  // Original single Earth intro timeline + warp dive + sky-blue expose
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: Globe emerges
    timers.push(setTimeout(() => setGlobePhase(1), 400));

    // Step 2: Electron rings orbit & camera sweeps
    timers.push(setTimeout(() => {
      setElectronPhase(1);
      setCamPhase(1);
    }, 1800));

    // Step 3: Warp lines engage & camera dives into the distance through Earth!
    timers.push(setTimeout(() => {
      setWarpActive(true);
      setCamPhase(2);
    }, 3800));

    // Step 4: Original FULL-SCREEN SKY BLUE EXPOSE (warp-flash) explodes!
    timers.push(setTimeout(() => {
      setShowFlash(true);
    }, 5200));

    // Step 5: Under the radiant sky-blue exposure, transition into the Tactical Mission Briefing video!
    timers.push(setTimeout(() => {
      setStage('briefing');
      setShowFlash(false);
    }, 5500));

    return () => timers.forEach(clearTimeout);
  }, []);

  // When switching to the briefing stage, ensure video starts past the earth part
  useEffect(() => {
    if (stage === 'briefing' && videoRef.current) {
      videoRef.current.currentTime = VIDEO_MAP_START_TIME;
      videoRef.current.play().catch(() => {});
    }
  }, [stage]);

  // Handle metadata load to seek past the earth part
  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.currentTime < VIDEO_MAP_START_TIME) {
      videoRef.current.currentTime = VIDEO_MAP_START_TIME;
    }
  };

  // Video completion handler -> Final warp flash into Portfolio
  const handleVideoEnded = useCallback(() => {
    setStage('warp');
    setTimeout(() => setShowFlash(true), 600);
    setTimeout(() => onComplete(), 1000);
  }, [onComplete]);

  // Fallback timer if video does not fire ended
  useEffect(() => {
    if (stage === 'briefing') {
      const timer = setTimeout(() => {
        handleVideoEnded();
      }, 7800);
      return () => clearTimeout(timer);
    }
  }, [stage, handleVideoEnded]);

  return (
    <div
      className="intro-overlay fixed inset-0 z-50 bg-[#010409] text-white overflow-hidden select-none"
      role="img"
      aria-label="Cinematic Intro Animation"
    >
      <style>{`
        @keyframes radar-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Top Header Navigation Bar ── */}
      <header className="fixed top-4 inset-x-6 z-50 flex items-center justify-between gap-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="font-orbitron font-black text-sm sm:text-base tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,229,255,0.7)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-DEFAULT animate-ping" />
            <span>RUSIRU PRAMOD</span>
          </div>
          <span className="hidden md:inline-block px-2.5 py-0.5 rounded bg-cyan-DEFAULT/15 border border-cyan-400/30 text-cyan-DEFAULT font-mono text-[10px] tracking-wider">
            {stage === 'earth' && 'PHASE 1: 3D HOLOGRAPHIC EARTH // ORBIT'}
            {stage === 'briefing' && 'PHASE 2: TACTICAL BRIEFING // SATELLITE DOWNLINK'}
            {stage === 'warp' && 'PHASE 3: HYPERDRIVE VECTOR LOCK // 100%'}
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg glass border-glow">
          <button
            type="button"
            onClick={() => setStage('earth')}
            className={`px-3 py-1 rounded text-xs font-orbitron tracking-wider transition-all cursor-pointer ${
              stage === 'earth'
                ? 'bg-cyan-DEFAULT text-space-950 font-bold shadow-cyan-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            🌍 3D Earth
          </button>
          <button
            type="button"
            onClick={() => {
              setStage('briefing');
              if (videoRef.current) {
                videoRef.current.currentTime = VIDEO_MAP_START_TIME;
                videoRef.current.play().catch(() => {});
              }
            }}
            className={`px-3 py-1 rounded text-xs font-orbitron tracking-wider transition-all cursor-pointer ${
              stage === 'briefing'
                ? 'bg-cyan-DEFAULT text-space-950 font-bold shadow-cyan-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            🛰️ Tactical Briefing
          </button>
        </div>

        {/* Audio Toggle & Skip Intro */}
        <div className="flex items-center gap-2">
          {stage === 'briefing' && (
            <button
              type="button"
              onClick={() => {
                setIsMuted(!isMuted);
                if (videoRef.current) videoRef.current.muted = !isMuted;
              }}
              className="p-2 rounded-lg glass border-glow text-white/80 hover:text-cyan-DEFAULT text-xs transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          )}

          <button
            type="button"
            onClick={doSkip}
            className="px-4 py-2 glass border-glow text-white/80 hover:text-cyan-DEFAULT text-xs font-orbitron tracking-widest transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-cyan-sm"
            aria-label="Skip intro animation"
          >
            SKIP INTRO ⟶
          </button>
        </div>
      </header>

      {/* ── Full-Screen Sky-Blue Expose Flash (Warp Flash) ── */}
      {showFlash && <div className="warp-flash" aria-hidden="true" />}

      {/* ═════════════════════════════════════════════════════════
          STAGE 1: ORIGINAL SINGLE EARTH + ELECTRON RINGS + WARP DIVE
         ═════════════════════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          stage === 'earth' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 2.5, 6], fov: 60 }}
          style={{ width: '100vw', height: '100vh', background: '#010409' }}
          aria-hidden="true"
        >
          {/* Starfield */}
          <Stars radius={80} depth={50} count={3000} factor={4} saturation={0.2} fade />

          {/* Original Clean Single Holographic Earth */}
          <HoloGlobe phase={globePhase} />

          {/* Original 3 Electron Orbit Rings */}
          <ElectronRing radius={2.5} tilt={0.3} speed={1.2} phase={electronPhase} />
          <ElectronRing radius={3.1} tilt={-0.5} speed={0.8} phase={electronPhase} />
          <ElectronRing radius={2.2} tilt={1.1} speed={1.5} phase={electronPhase} />

          {/* Original Warp Lines rushing by as camera dives into the distance */}
          {warpActive && <WarpLines />}

          {/* Original Camera Controller */}
          <CameraController phase={camPhase} />

          {/* Original Lights */}
          <ambientLight intensity={0.25} />
          <pointLight position={[5, 5, 5]} intensity={3} color="#00e5ff" />
          <pointLight position={[-5, -3, 3]} intensity={1.5} color="#1e90ff" />
        </Canvas>

        {/* Tactical Earth Status Sub-ticker */}
        <div className="absolute bottom-8 left-8 z-30 font-mono text-xs text-cyan-DEFAULT/85 space-y-1 select-none pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-DEFAULT animate-ping" />
            <span className="font-orbitron font-bold text-white tracking-widest text-sm">
              PLANET TERRA // SECTOR-01
            </span>
          </div>
          <div className="text-white/60">
            HOLOGRAPHIC SCAN: ACTIVE &bull; ORBITAL FREQUENCY: 1.2 GHz
          </div>
          <div className="text-cyan-DEFAULT/70 text-[11px] animate-pulse">
            SATELLITE BRIEFING DOWNLINK ENGAGING...
          </div>
        </div>

        {/* Quick Downlink Button */}
        <div className="absolute bottom-8 right-8 z-30">
          <button
            type="button"
            onClick={() => {
              setStage('briefing');
              if (videoRef.current) {
                videoRef.current.currentTime = VIDEO_MAP_START_TIME;
                videoRef.current.play().catch(() => {});
              }
            }}
            className="px-4 py-2.5 rounded-lg glass border-glow text-cyan-DEFAULT hover:text-white font-orbitron text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <span>ENTER TACTICAL BRIEFING</span>
            <span>⟶</span>
          </button>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════
          STAGE 2: TACTICAL BRIEFING VIDEO + BLUE ANIMATED FREE SIDES
         ═════════════════════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 bg-[#020714] flex items-center justify-between overflow-hidden ${
          stage === 'briefing' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dynamic Blue Ambient Glow Behind Video */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.15)_0%,transparent_75%)] pointer-events-none" />

        {/* ── Left Free Side: Animated Blue Tactical Panel ── */}
        <TacticalSidebarLeft />

        {/* ── Center: Authentic Video Player (Starts past Earth at 2.8s) ── */}
        <div className="relative flex-1 h-full max-w-[1920px] max-h-[1080px] flex items-center justify-center p-2 sm:p-4 z-10">
          <video
            ref={videoRef}
            src="/tactical-briefing.mp4"
            autoPlay
            playsInline
            muted={isMuted}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain filter contrast-105 brightness-100 shadow-[0_0_30px_rgba(0,229,255,0.25)] rounded-lg"
          >
            <img
              src="/tactical-briefing.gif"
              alt="Tactical Mission Briefing"
              className="w-full h-full object-contain"
            />
          </video>

          {/* Sci-Fi Framing Reticles */}
          <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
        </div>

        {/* ── Right Free Side: Animated Blue Tactical Panel ── */}
        <TacticalSidebarRight />

        {/* Bottom Tactical Floating Action Bar */}
        <div className="absolute bottom-4 inset-x-8 z-30 flex items-center justify-between pointer-events-none">
          <div className="font-mono text-[10px] text-cyan-DEFAULT/70 tracking-widest hidden sm:block">
            SURVEILLANCE ACTIVE // TARGET CANDIDATE PROFILE IDENTIFIED: RUSIRU PRAMOD
          </div>
          <button
            type="button"
            onClick={handleVideoEnded}
            className="pointer-events-auto px-4 py-1.5 rounded-lg glass border-glow text-cyan-DEFAULT hover:text-white font-orbitron text-xs tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-cyan-sm"
          >
            LAUNCH PORTFOLIO 🚀
          </button>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════
          STAGE 3: FINAL WARP DIVE & LANDING ON PORTFOLIO
         ═════════════════════════════════════════════════════════ */}
      {stage === 'warp' && (
        <div className="absolute inset-0 pointer-events-none z-40">
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [0, 0, 5], fov: 95 }}
            style={{ width: '100%', height: '100%' }}
          >
            <WarpLines />
          </Canvas>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-orbitron font-black text-2xl sm:text-4xl text-cyan-DEFAULT tracking-widest animate-pulse drop-shadow-[0_0_15px_#00e5ff]">
              WARP DRIVE ENGAGED
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
