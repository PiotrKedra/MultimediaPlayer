import React from 'react';
import { Node, Shaders } from 'gl-react';

const shaders = Shaders.create({
  clean: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform vec4 crop;
vec2 invert (vec2 p) {${'' /* y is reversed in gl context */}
  return vec2(p.x, 1.0-p.y);
}
void main () {
  vec2 p = invert(invert(uv) * crop.zw + crop.xy);
  gl_FragColor =
    step(0.0, p.x) *
    step(0.0, p.y) *
    step(p.x, 1.0) *
    step(p.y, 1.0) *
    texture2D(t, p);
}`,
  },
});

const crop = [0, 0, 1, 1];
const GLImageNode = ({ children }) => (
  <Node
    shader={shaders.clean}
    uniforms={{ t: children, crop }}
  />
);

const GLImage = ({ path }) => (
  <GLImageNode>
    {{
      uri: path,
    }}
  </GLImageNode>
);

export default GLImage;
