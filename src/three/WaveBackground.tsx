import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useFPSMonitor } from '../hooks/useFPSMonitor';

// ── Refined Forward-Streaming Terrain Mesh ────────────────────
function WaveMesh({
  quality,
  travelRef,
}: {
  quality: 'high' | 'medium' | 'low';
  travelRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Balanced line density: slightly increased lines for clean detail without clutter
  const segmentsX = quality === 'high' ? 88 : quality === 'medium' ? 70 : 48;
  const segmentsY = quality === 'high' ? 120 : quality === 'medium' ? 95 : 68;
  const planeWidth = 26.0;
  const planeLength = 36.0;
  const cellY = planeLength / segmentsY;

  const uniforms = useMemo(
    () => ({
      uTravel: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uCellY: { value: cellY },
      uColorA: { value: new THREE.Color('#00e5ff') }, // Glowing neon cyan
      uColorB: { value: new THREE.Color('#1e90ff') }, // Electric blue
      uColorC: { value: new THREE.Color('#020617') }, // Deep space void
    }),
    [cellY]
  );

  const vertexShader = `
    precision mediump float;

    uniform float uTravel;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uCellY;

    varying vec2 vUv;
    varying float vElevation;
    varying float vDist;
    varying float vPosX;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // 1. Seamless continuous forward stream of grid lines towards camera
      float forwardOffset = mod(uTravel, uCellY);
      pos.y -= forwardOffset;

      // 2. Global forward coordinate (smooth & continuous, moves towards viewer)
      float worldY = position.y - uTravel;

      // Soft terrain elevation suppression under text area for a calmer surface
      float isTextZone = smoothstep(1.8, -1.8, pos.x) * smoothstep(-14.0, -8.0, pos.y) * smoothstep(10.0, 4.0, pos.y);

      // Smooth, slow, rolling forward waves that glide continuously
      float wave1 = sin(pos.x * 0.38 + worldY * 0.22) * 0.36;
      float wave2 = sin(pos.x * 0.90 - worldY * 0.40) * 0.18;
      float wave3 = cos(pos.x * 1.50 + worldY * 0.65) * 0.08;

      // Subtle breathing ripple
      float ripple = sin(pos.x * 2.0 + uTime * 0.9) * 0.025;

      float elevation = (wave1 + wave2 + wave3) * (1.0 - isTextZone * 0.35) + ripple;

      // Interactive mouse ripple
      float mouseDist = distance(vec2(pos.x * 0.24, pos.y * 0.12), uMouse);
      float mouseEffect = smoothstep(0.80, 0.0, mouseDist) * 0.20;
      elevation += mouseEffect;

      pos.z += elevation;
      vElevation = elevation;
      vDist = pos.y;
      vPosX = pos.x;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    precision mediump float;

    uniform vec3 uColorA; // #00e5ff (cyan)
    uniform vec3 uColorB; // #1e90ff (blue)
    uniform vec3 uColorC; // #020617 (space void)

    varying vec2 vUv;
    varying float vElevation;
    varying float vDist;
    varying float vPosX;

    void main() {
      // Normal wave colors: glowing cyan peaks, electric blue slopes
      float t = smoothstep(-0.20, 0.40, vElevation);
      vec3 brightColor = mix(uColorB, uColorA, t);

      // Balanced subdued deep navy/twilight tone for text area (NOT pitch black)
      vec3 textZoneColor = mix(uColorC, uColorB, 0.20 + 0.20 * t);

      // ── Text Area Color Masking ─────────────────────────────
      // On the left/center-left side where Rusiru's name and bio sit:
      float textMaskX = smoothstep(1.8, -1.0, vPosX);
      float textMaskY = smoothstep(-14.0, -8.0, vDist) * smoothstep(10.0, 4.0, vDist);
      float isTextArea = clamp(textMaskX * textMaskY, 0.0, 1.0);

      // Tasteful, balanced color blend (subdued in text area, vibrant on right side):
      vec3 finalColor = mix(brightColor, textZoneColor, isTextArea * 0.60);

      // Distance fog for continuous horizon creation ahead
      float farFade = smoothstep(17.5, 6.0, vDist);
      float nearFade = smoothstep(-17.5, -10.0, vDist);
      float distanceFog = farFade * nearFade;

      // Balanced line opacity: visible cyber grid without glare under text
      float baseAlpha = 0.62 * t + 0.18;
      float alpha = mix(baseAlpha, 0.24, isTextArea * 0.40) * distanceFog;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTravel.value = travelRef.current;
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
      matRef.current.uniforms.uMouse.value.lerp(mouse, 0.08);
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.3, 0, 0]}
      position={[0, -1.4, -4]}
    >
      <planeGeometry args={[planeWidth, planeLength, segmentsX, segmentsY]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        wireframe={true}
      />
    </mesh>
  );
}

// ── Gentle Forward-Streaming Ambient Particles ────────────────
function ParticleField({
  quality,
  speedRef,
}: {
  quality: 'high' | 'medium' | 'low';
  speedRef: React.MutableRefObject<number>;
}) {
  const count = quality === 'high' ? 85 : quality === 'medium' ? 55 : 35;
  const pointsRef = useRef<THREE.Points>(null);
  const posAttrRef = useRef<THREE.BufferAttribute>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12 + 0.5;
      pos[i * 3 + 2] = -24 + Math.random() * 30;

      const t = Math.random();
      col[i * 3] = t * 0.1;
      col[i * 3 + 1] = 0.7 + t * 0.3;
      col[i * 3 + 2] = 0.95 + t * 0.05;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (!posAttrRef.current) return;
    const array = posAttrRef.current.array as Float32Array;
    const speed = speedRef.current;
    // Gentle forward particle flow
    const step = speed * delta * 1.5;

    for (let i = 0; i < count; i++) {
      let z = array[i * 3 + 2] + step;
      if (z > 7.5) {
        z = -24.0 + Math.random() * 4.0;
        array[i * 3] = (Math.random() - 0.5) * 24;
        array[i * 3 + 1] = (Math.random() - 0.5) * 12 + 0.5;
      }
      array[i * 3 + 2] = z;
    }
    posAttrRef.current.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={posAttrRef}
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

// ── First-Person Walking Rig: Smooth, Slow & Majestic Stride ──
function CameraRig({
  travelRef,
  speedRef,
  boostRef,
  keysPressed,
}: {
  travelRef: React.MutableRefObject<number>;
  speedRef: React.MutableRefObject<number>;
  boostRef: React.MutableRefObject<number>;
  keysPressed: React.MutableRefObject<{ up: boolean; down: boolean }>;
}) {
  const { camera, mouse } = useThree();

  useFrame((_, delta) => {
    // Smooth, slow, serene continuous walking pace: 1.05 units/sec
    let targetSpeed = 1.05;

    // Up arrow / W gently increases forward pace (smooth gameplay sprint)
    if (keysPressed.current.up) {
      targetSpeed = 2.3;
    } else if (keysPressed.current.down) {
      targetSpeed = 0.5; // Very slow crawl
    }

    // Decay scroll wheel boost smoothly
    boostRef.current *= 0.94;
    targetSpeed += boostRef.current;

    // Soft, gradual interpolation (no sudden jerking or jarring speed changes)
    speedRef.current += (targetSpeed - speedRef.current) * Math.min(delta * 2.0, 1.0);
    travelRef.current += speedRef.current * delta;

    // Very gentle, rhythmic walking sway (head-bob)
    const travel = travelRef.current;
    const bobY = Math.sin(travel * 1.0) * 0.020;
    const swayX = Math.cos(travel * 0.5) * 0.010;

    camera.position.y = 1.75 + bobY;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.6 + swayX, 0.03);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, -mouse.x * 0.02, 0.03);
  });

  return null;
}

// ── Main WaveBackground Export ────────────────────────────────
export default function WaveBackground() {
  const quality = useFPSMonitor();

  const travelRef = useRef(0);
  const speedRef = useRef(1.05);
  const boostRef = useRef(0);
  const keysPressed = useRef({ up: false, down: false });
  const [isAccelerating, setIsAccelerating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent taking over if visitor is actively typing in a form input
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        keysPressed.current.up = true;
        setIsAccelerating(true);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        keysPressed.current.down = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        keysPressed.current.up = false;
        setIsAccelerating(false);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        keysPressed.current.down = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        // Gentle forward scroll impulse
        boostRef.current = Math.min(boostRef.current + 0.35, 1.6);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      <Canvas
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        camera={{ position: [0, 1.75, 7], fov: 62 }}
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
      >
        <CameraRig
          travelRef={travelRef}
          speedRef={speedRef}
          boostRef={boostRef}
          keysPressed={keysPressed}
        />
        <WaveMesh quality={quality} travelRef={travelRef} />
        <ParticleField quality={quality} speedRef={speedRef} />
      </Canvas>

      {/* Cyberpunk Interactive Navigation Pill (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-20 pointer-events-none hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass border border-cyan-500/25 text-[11px] font-orbitron tracking-wider text-cyan-DEFAULT/80 shadow-cyan-sm transition-all duration-300">
        <span
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            isAccelerating ? 'bg-cyan-DEFAULT shadow-cyan-md scale-125' : 'bg-cyan-DEFAULT/50'
          }`}
        />
        <span className="text-white/40">NAVIGATE:</span>
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all duration-200 ${
            isAccelerating
              ? 'bg-cyan-DEFAULT text-space-900 border-cyan-DEFAULT shadow-cyan-sm'
              : 'bg-white/10 text-white/90 border-white/20'
          }`}
        >
          ▲ / W
        </span>
        <span className="text-white/60">
          {isAccelerating ? 'WALK FASTER' : 'WALK FORWARD'}
        </span>
      </div>
    </>
  );
}
