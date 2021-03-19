import React from 'react';
import { Shaders, Node, GLSL } from 'gl-react';

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D image;
uniform float factor;

void main () {
  vec4 c = texture2D(image, uv);
  // Algorithm from Chapter 16 of OpenGL Shading Language
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, factor), c.a);
}
    `,
  },
});

const factor = 2;

const Saturation = ({ on, children }) => {
  if (on === false) return children;
  return (
    <Node
      shader={shaders.Saturate}
      uniforms={{ factor, image: children }}
    />
  );
};

export default Saturation;
