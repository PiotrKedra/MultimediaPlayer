import React from 'react';
import { Shaders, Node } from 'gl-react';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {
  FILTER_BRANNAN_BLOWOUT, FILTER_BRANNAN_CONTRAST, FILTER_BRANNAN_LUMA,
  FILTER_BRANNAN_PROCESS, FILTER_BRANNAN_SCREEN,
} from '../../../../../assets/values/images';

const shaders = Shaders.create({
  Brannan: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;
      mat3 saturateMatrix = mat3(
                                1.105150,
                                -0.044850,
                                -0.046000,
                                -0.088050,
                                1.061950,
                                -0.089200,
                                -0.017100,
                                -0.017100,
                                1.132900);
      vec3 luma = vec3(.3, .59, .11);
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 lookup;
        lookup.y = 0.5;
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture2, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture2, lookup).b;
        texel = saturateMatrix * texel;
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        vec3 sampled;
        lookup.y = 0.5;
        lookup.x = texel.r;
        sampled.r = texture2D(inputImageTexture3, lookup).r;
        lookup.x = texel.g;
        sampled.g = texture2D(inputImageTexture3, lookup).g;
        lookup.x = texel.b;
        sampled.b = texture2D(inputImageTexture3, lookup).b;
        float value = smoothstep(0.0, 1.0, d);
        texel = mix(sampled, texel, value);
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture4, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture4, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture4, lookup).b;
        lookup.x = dot(texel, luma);
        texel = mix(texture2D(inputImageTexture5, lookup).rgb, texel, .5);
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture6, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture6, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture6, lookup).b;
        gl_FragColor = vec4(texel, 1.0);
      }`,
  },
});

const Brannan = ({ on, children }) => {
  if (on === false) return children;
  return (
    <Node
      shader={shaders.Brannan}
      uniforms={{
        inputImageTexture: children,
        inputImageTexture2: resolveAssetSource(FILTER_BRANNAN_PROCESS),
        inputImageTexture3: resolveAssetSource(FILTER_BRANNAN_BLOWOUT),
        inputImageTexture4: resolveAssetSource(FILTER_BRANNAN_CONTRAST),
        inputImageTexture5: resolveAssetSource(FILTER_BRANNAN_LUMA),
        inputImageTexture6: resolveAssetSource(FILTER_BRANNAN_SCREEN),
      }}
    />
  );
};

export default Brannan;
