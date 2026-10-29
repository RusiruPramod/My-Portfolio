import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useFPSMonitor } from '../hooks/useFPSMonitor';

// ── Wave mesh with custom shader displacement ────────────────
function WaveMesh({ quality }: { quality: 'high' | 'medium' | 'low' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const segments = quality === 'high' ? 120 : quality === 'medium' ? 70 : 40;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#00e5ff') },
      uColorB: { value: new THREE.Color('#1e90ff') },
      uColorC: { value: new THREE.Color('#020617') },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float wave1 = sin(pos.x * 2.0 + uTime * 0.6) * 0.12;
      float wave2 = sin(pos.y * 1.5 + uTime * 0.4) * 0.08;
      float wave3 = sin((pos.x + pos.y) * 1.0 + uTime * 0.3) * 0.06;

      // Mouse influence
      float mouseDist = distance(vec2(pos.x, pos.y) / 4.0, uMouse);
      float mouseEffect = smoothstep(0.8, 0.0, mouseDist) * 0.18;

      pos.z += wave1 + wave2 + wave3 + mouseEffect;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float t = smoothstep(-0.2, 0.35, vElevation);
      vec3 col = mix(uColorC, uColorB, t);
      col = mix(col, uColorA, t * t);
      gl_FragColor = vec4(col, 0.55 * t + 0.05);
    }
  `;

  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
      matRef.current.uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -1.2, 0]}>
      <planeGeometry args={[14, 14, segments, segments]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        wireframe={quality === 'low'}
      />
    </mesh>
  );
}

// ── Floating particles with connecting lines ─────────────────
function ParticleField({ quality }: { quality: 'high' | 'medium' | 'low' }) {
  const count = quality === 'high' ? 200 : quality === 'medium' ? 100 : 50;
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      // Cyan to blue tones
      const t = Math.random();
      colors[i * 3] = t * 0.1;
      colors[i * 3 + 1] = 0.6 + t * 0.4;
      colors[i * 3 + 2] = 0.8 + t * 0.2;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function WaveBackground() {
  const quality = useFPSMonitor();

  return (
    <Canvas
      dpr={[1, quality === 'high' ? 1.5 : 1]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 2, 8], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <WaveMesh quality={quality} />
      <ParticleField quality={quality} />
    </Canvas>
  );
}

