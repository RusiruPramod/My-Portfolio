import{j as e}from"./animation-vendor-Cm6ntoCG.js";import{a as i,R as o}from"./icons-Xx_brkIa.js";import{C as s,S as n,c as m,b as v}from"./three-vendor-CEIifd6E.js";function l(){const a=i.useRef(null),r=o.useMemo(()=>new m({uniforms:{uTime:{value:0}},vertexShader:`
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
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
    `,transparent:!0}),[]);return v(({clock:t})=>{a.current&&(a.current.rotation.y=t.getElapsedTime()*.2),r&&(r.uniforms.uTime.value=t.getElapsedTime())}),e.jsxs("mesh",{ref:a,children:[e.jsx("sphereGeometry",{args:[1.5,48,48]}),e.jsx("primitive",{object:r,attach:"material"})]})}function p(){return e.jsxs(s,{dpr:[1,1.2],gl:{antialias:!1,alpha:!0},camera:{position:[0,0,4],fov:50},style:{width:"100%",height:"100%"},"aria-hidden":"true",children:[e.jsx(n,{radius:30,depth:20,count:800,factor:3,fade:!0}),e.jsx(l,{}),e.jsx("ambientLight",{intensity:.2}),e.jsx("pointLight",{position:[3,3,3],intensity:2.5,color:"#00e5ff"})]})}export{p as default};
