import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

// ── Globe with arc connections ────────────────────────────────
function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);

  const mat = React.useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
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
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vec2 grid = fract(vUv * vec2(24.0, 12.0));
        float g = step(0.96, grid.x) + step(0.96, grid.y);
        vec3 col = mix(vec3(0.02, 0.06, 0.15), vec3(0.0, 0.6, 0.8), clamp(g, 0.0, 1.0));
        float rim = pow(1.0 - max(dot(vNormal, vec3(0,0,1)), 0.0), 2.5);
        col += vec3(0.0, 0.8, 1.0) * rim * 0.7;
        gl_FragColor = vec4(col, 0.9);
      }
    `,
    transparent: true,
  }), []);

  useFrame(({ clock }) => {
    if (globeRef.current) globeRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    if (mat) mat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1.5, 48, 48]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function ContactGlobe() {
  return (
    <Canvas
      dpr={[1, 1.2]}
      gl={{ antialias: false, alpha: true }}
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <Stars radius={30} depth={20} count={800} factor={3} fade />
      <Globe />
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={2.5} color="#00e5ff" />
    </Canvas>
  );
}

