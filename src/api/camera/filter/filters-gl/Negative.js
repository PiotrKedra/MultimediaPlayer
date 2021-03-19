import React from 'react';
import { Shaders, Node, GLSL } from 'gl-react';

const shaders = Shaders.create({
  blackWhite: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D image;

void main () {
  vec4 c = texture2D(image, uv);
  gl_FragColor = vec4(vec3(dot(1.0 - c.rgb, vec3(1.0/3.0))), c.a);
}
    `,
  },
});

const Negative = ({ on, children }) => {
  if (on === false) return children;
  return (
    <Node
      shader={shaders.blackWhite}
      uniforms={{ image: children }}
    />
  );
};

export default Negative;
