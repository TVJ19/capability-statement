import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Vector2 } from 'three';

const AuroraShader = {
    vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float u_time;
    uniform vec2 u_resolution;
    
    // Simplex noise (simplified)
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      float t = u_time * 0.1; // Slow movement
      
      // Deep Space Base
      vec3 color = vec3(0.0, 0.0, 0.04);
      
      // Aurora Layers
      float n1 = snoise(st * 3.0 + vec2(t*0.5, t*0.2));
      float n2 = snoise(st * 6.0 - vec2(t*0.2, t*0.8));
      
      // Cyber Blue/Purple/Teal Mixture
      vec3 c1 = vec3(0.02, 0.71, 0.83); // Cyan
      vec3 c2 = vec3(0.54, 0.36, 0.96); // Purple
      vec3 c3 = vec3(0.23, 0.51, 0.96); // Blue
      
      float mask1 = smoothstep(0.3, 0.8, n1);
      float mask2 = smoothstep(0.3, 0.8, n2);
      
      color = mix(color, c1, mask1 * 0.15);
      color = mix(color, c2, mask2 * 0.15);
      color += c3 * (mask1 * mask2) * 0.2;
      
      // Vignette
      float dist = distance(st, vec2(0.5));
      color *= 1.0 - dist * 0.5;

      // Film Grain (GPU acceleration)
      float grain = fract(sin(dot(st.xy * u_time, vec2(12.9898,78.233))) * 43758.5453);
      color += grain * 0.04;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const AuroraPlane = () => {
    const mesh = useRef();

    const uniforms = useMemo(() => ({
        u_time: { value: 0 },
        u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) }
    }), []);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.material.uniforms.u_time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh} scale={[100, 100, 1]}> {/* Full screen quad essentially */}
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={AuroraShader.vertexShader}
                fragmentShader={AuroraShader.fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

const AuroraBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2 }}>
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <AuroraPlane />
            </Canvas>
        </div>
    );
};

export default AuroraBackground;
