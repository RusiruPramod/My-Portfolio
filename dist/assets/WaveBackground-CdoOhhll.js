import{j as a}from"./animation-vendor-Cm6ntoCG.js";import{a as n}from"./icons-Xx_brkIa.js";import{C as p,a as f,V as h,u as d,b as v,D as g}from"./three-vendor-CEIifd6E.js";function x(){const[e,i]=n.useState(()=>{const r=navigator.hardwareConcurrency??4;return r<=2?"low":r<=4?"medium":"high"}),t=n.useRef(0),l=n.useRef(performance.now()),u=n.useRef(0),o=n.useRef(!1);return n.useEffect(()=>{if(o.current)return;const r=s=>{t.current++;const c=s-l.current;if(c>=2e3){const m=t.current/c*1e3;o.current=!0,cancelAnimationFrame(u.current),m<20?i("low"):m<40?i("medium"):i("high");return}u.current=requestAnimationFrame(r)};return u.current=requestAnimationFrame(r),()=>cancelAnimationFrame(u.current)},[]),e}function w({quality:e}){const i=n.useRef(null),t=n.useRef(null),l=e==="high"?120:e==="medium"?70:40,u=n.useMemo(()=>({uTime:{value:0},uMouse:{value:new h(0,0)},uColorA:{value:new f("#00e5ff")},uColorB:{value:new f("#1e90ff")},uColorC:{value:new f("#020617")}}),[]),o=`
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
  `,r=`
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
  `,{mouse:s}=d();return v(({clock:c})=>{t.current&&(t.current.uniforms.uTime.value=c.getElapsedTime(),t.current.uniforms.uMouse.value.lerp(s,.05))}),a.jsxs("mesh",{ref:i,rotation:[-Math.PI/2.8,0,0],position:[0,-1.2,0],children:[a.jsx("planeGeometry",{args:[14,14,l,l]}),a.jsx("shaderMaterial",{ref:t,uniforms:u,vertexShader:o,fragmentShader:r,transparent:!0,side:g,wireframe:e==="low"})]})}function C({quality:e}){const i=e==="high"?200:e==="medium"?100:50,t=n.useRef(null),{positions:l,colors:u}=n.useMemo(()=>{const o=new Float32Array(i*3),r=new Float32Array(i*3);for(let s=0;s<i;s++){o[s*3]=(Math.random()-.5)*20,o[s*3+1]=(Math.random()-.5)*12,o[s*3+2]=(Math.random()-.5)*8-2;const c=Math.random();r[s*3]=c*.1,r[s*3+1]=.6+c*.4,r[s*3+2]=.8+c*.2}return{positions:o,colors:r}},[i]);return v(({clock:o})=>{t.current&&(t.current.rotation.y=o.getElapsedTime()*.02,t.current.rotation.x=Math.sin(o.getElapsedTime()*.01)*.05)}),a.jsxs("points",{ref:t,children:[a.jsxs("bufferGeometry",{children:[a.jsx("bufferAttribute",{attach:"attributes-position",args:[l,3]}),a.jsx("bufferAttribute",{attach:"attributes-color",args:[u,3]})]}),a.jsx("pointsMaterial",{size:.04,vertexColors:!0,transparent:!0,opacity:.7,sizeAttenuation:!0})]})}function A(){const e=x();return a.jsxs(p,{dpr:[1,e==="high"?1.5:1],gl:{antialias:!1,alpha:!0,powerPreference:"high-performance"},camera:{position:[0,2,8],fov:60},style:{width:"100%",height:"100%"},"aria-hidden":"true",children:[a.jsx(w,{quality:e}),a.jsx(C,{quality:e})]})}export{A as default};
