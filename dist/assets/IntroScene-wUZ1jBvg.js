import{j as e}from"./animation-vendor-Cm6ntoCG.js";import{a}from"./icons-Xx_brkIa.js";import{C as j,S as M,c as g,B as y,b as v,u as b}from"./three-vendor-CEIifd6E.js";function P({phase:o}){const r=a.useRef(null),i=a.useMemo(()=>new g({uniforms:{uTime:{value:0},uPhase:{value:o}},vertexShader:`
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
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
    `,transparent:!0}),[]),s=a.useMemo(()=>new g({uniforms:{uPhase:{value:o}},vertexShader:`
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 1.08, 1.0);
      }
    `,fragmentShader:`
      uniform float uPhase;
      varying vec3 vNormal;
      void main() {
        float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 1.8);
        gl_FragColor = vec4(0.0, 0.8, 1.0, rim * 0.5 * uPhase);
      }
    `,transparent:!0,side:y}),[]);return a.useEffect(()=>{i.uniforms.uPhase.value=o,s.uniforms.uPhase.value=o},[o,i,s]),v(({clock:t})=>{r.current&&(r.current.rotation.y=t.getElapsedTime()*.15),i.uniforms.uTime.value=t.getElapsedTime()}),e.jsxs("group",{children:[e.jsxs("mesh",{ref:r,children:[e.jsx("sphereGeometry",{args:[1.8,64,64]}),e.jsx("primitive",{object:i,attach:"material"})]}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1.8,32,32]}),e.jsx("primitive",{object:s,attach:"material"})]})]})}function x({radius:o,tilt:r,speed:i,phase:s}){const t=a.useRef(null),c=a.useMemo(()=>new Float32Array(180),[]),l=a.useRef(null);return v(({clock:d})=>{const h=d.getElapsedTime()*i,f=Math.cos(h)*o,p=Math.sin(h)*o;if(t.current&&t.current.position.set(f,0,p),l.current){const n=l.current.geometry.attributes.position;for(let u=n.count-1;u>0;u--)n.setXYZ(u,n.getX(u-1),n.getY(u-1),n.getZ(u-1));n.setXYZ(0,f,0,p),n.needsUpdate=!0}}),s<.05?null:e.jsxs("group",{rotation:[r,0,0],children:[e.jsxs("mesh",{rotation:[Math.PI/2,0,0],children:[e.jsx("torusGeometry",{args:[o,.007,8,80]}),e.jsx("meshBasicMaterial",{color:"#00e5ff",transparent:!0,opacity:.2*s})]}),e.jsxs("mesh",{ref:t,children:[e.jsx("sphereGeometry",{args:[.07,8,8]}),e.jsx("meshBasicMaterial",{color:"#00e5ff"})]}),e.jsxs("points",{ref:l,children:[e.jsx("bufferGeometry",{children:e.jsx("bufferAttribute",{attach:"attributes-position",args:[c,3]})}),e.jsx("pointsMaterial",{size:.03,color:"#00e5ff",transparent:!0,opacity:.5*s})]})]})}function T(){const o=a.useRef(null),r=250,i=a.useMemo(()=>{const s=new Float32Array(r*3);for(let t=0;t<r;t++){const c=Math.random()*Math.PI*2,l=Math.random()*5+1;s[t*3]=Math.cos(c)*l,s[t*3+1]=Math.sin(c)*l,s[t*3+2]=(Math.random()-.5)*20}return s},[]);return v(()=>{if(!o.current)return;const s=o.current.geometry.attributes.position;for(let t=0;t<r;t++){const c=s.getZ(t)+.45;s.setZ(t,c>10?-10:c)}s.needsUpdate=!0}),e.jsxs("points",{ref:o,children:[e.jsx("bufferGeometry",{children:e.jsx("bufferAttribute",{attach:"attributes-position",args:[i,3]})}),e.jsx("pointsMaterial",{size:.05,color:"#00e5ff",transparent:!0,opacity:.7})]})}function w({phase:o}){const{camera:r}=b();return v(({clock:i})=>{const s=i.getElapsedTime(),t=r;o===0?(r.position.set(Math.sin(s*.12)*.4,2.5+Math.sin(s*.08)*.3,6+Math.cos(s*.1)*.5),t.fov=60):o===1?(r.position.set(Math.sin(s*.25)*5,2+Math.sin(s*.12)*.6,Math.cos(s*.25)*5),t.fov=65):(r.position.z-=.15,t.fov=Math.min(120,t.fov+1.5)),t.updateProjectionMatrix(),r.lookAt(0,0,0)}),null}function N({onComplete:o,onSkip:r}){const[i,s]=a.useState(0),[t,c]=a.useState(0),[l,d]=a.useState(!1),[h,f]=a.useState(!1),[p,n]=a.useState(0),u=a.useCallback(()=>{f(!0),setTimeout(r,350)},[r]);return a.useEffect(()=>{const m=[];return m.push(setTimeout(()=>{s(1)},400)),m.push(setTimeout(()=>{c(1),n(1)},2e3)),m.push(setTimeout(()=>{d(!0),n(2)},4e3)),m.push(setTimeout(()=>{f(!0)},5500)),m.push(setTimeout(()=>{o()},6300)),()=>m.forEach(clearTimeout)},[o]),e.jsxs("div",{className:"intro-overlay","aria-label":"Cinematic intro animation",role:"img",children:[e.jsx("button",{onClick:u,className:"fixed top-6 right-6 z-50 px-4 py-2 glass border-glow text-white/70 hover:text-cyan-DEFAULT text-sm font-space tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-DEFAULT","aria-label":"Skip intro animation",children:"Skip Intro ⟶"}),h&&e.jsx("div",{className:"warp-flash","aria-hidden":"true"}),e.jsxs(j,{dpr:[1,1.5],gl:{antialias:!0,alpha:!1},camera:{position:[0,2.5,6],fov:60},style:{width:"100vw",height:"100vh",background:"#010409"},"aria-hidden":"true",children:[e.jsx(M,{radius:80,depth:50,count:3e3,factor:4,saturation:.2,fade:!0}),e.jsx(P,{phase:i}),e.jsx(x,{radius:2.5,tilt:.3,speed:1.2,phase:t}),e.jsx(x,{radius:3.1,tilt:-.5,speed:.8,phase:t}),e.jsx(x,{radius:2.2,tilt:1.1,speed:1.5,phase:t}),l&&e.jsx(T,{}),e.jsx(w,{phase:p}),e.jsx("ambientLight",{intensity:.25}),e.jsx("pointLight",{position:[5,5,5],intensity:3,color:"#00e5ff"}),e.jsx("pointLight",{position:[-5,-3,3],intensity:1.5,color:"#1e90ff"})]})]})}export{N as default};
