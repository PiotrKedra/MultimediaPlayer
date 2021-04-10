import React from 'react';
import { Shaders, Node } from 'gl-react';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { FILTER_LOMO_MAP, FILTER_VIGNETTE_MAP } from '../../../../../assets/values/images';

const shaders = Shaders.create({
  Lokofi: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 red = vec2(texel.r, 0.83333);
        vec2 green = vec2(texel.g, 0.5);
        vec2 blue = vec2(texel.b, 0.16666);
        texel.rgb = vec3(
              texture2D(inputImageTexture2, red).r,
              texture2D(inputImageTexture2, green).g,
              texture2D(inputImageTexture2, blue).b);
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture3, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture3, vec2(d, (1.0-texel.b))).b;
        gl_FragColor = vec4(texel,1.0);
      }`,
  },
});

const Lokofi = ({ on, children }) => {
  if (on === false) return children;
  return (
    <Node
      shader={shaders.Lokofi}
      uniforms={{
        inputImageTexture: children,
        inputImageTexture2: resolveAssetSource(FILTER_LOMO_MAP),
        inputImageTexture3: resolveAssetSource(FILTER_VIGNETTE_MAP),
      }}
    />
  );
};

export default Lokofi;
