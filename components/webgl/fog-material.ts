import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uDensity;
  varying vec2 vUv;

  // Classic simplex-ish value noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.05;
      amplitude *= 0.55;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) + 0.5;

    vec2 mouseInfluence = (uMouse - aspectUv) * 0.35;
    float mouseDist = length(uMouse - aspectUv);
    float mouseSwirl = smoothstep(0.6, 0.0, mouseDist) * 0.4;

    vec2 flow = aspectUv * 2.6;
    flow += vec2(uTime * 0.015, uTime * 0.01);
    flow += mouseInfluence * mouseSwirl;

    float base = fbm(flow);
    float detail = fbm(flow * 2.4 + base * 0.6);
    float mist = fbm(flow * 0.6 - uTime * 0.008);

    float density = base * 0.5 + detail * 0.35 + mist * 0.3;
    density *= uDensity;

    float vignette = smoothstep(1.05, 0.15, length(uv - 0.5));

    float shade = clamp(density * 0.5 + 0.32, 0.0, 1.0);
    vec3 deepBlack = vec3(0.012, 0.012, 0.014);
    vec3 charcoal = vec3(0.09, 0.09, 0.1);
    vec3 mistColor = vec3(0.22, 0.22, 0.24);

    vec3 color = mix(deepBlack, charcoal, shade);
    color = mix(color, mistColor, smoothstep(0.55, 1.0, shade) * 0.6);
    color *= vignette;

    float glow = smoothstep(0.55, 0.0, mouseDist) * 0.05;
    color += glow;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const FogMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uResolution: new THREE.Vector2(1, 1),
    uDensity: 1,
  },
  vertexShader,
  fragmentShader
);

export default FogMaterial;
