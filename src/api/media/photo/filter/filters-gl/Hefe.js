import React from 'react';
import { Shaders, Node } from 'gl-react';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {
  FILTER_EDGE_BURN,
  FILTER_HEFE_MAP,
  FILTER_HEFE_METAL,
  FILTER_HEFE_SOFT_LIGHT,
} from '../../../../../assets/values/images';

const shaders = Shaders.create({
  Hefe: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec3 edge = texture2D(inputImageTexture2, uv).rgb;
        texel = texel * edge;
        texel = vec3(
                       texture2D(inputImageTexture3, vec2(texel.r, .83333)).r,
                       texture2D(inputImageTexture3, vec2(texel.g, .5)).g,
                       texture2D(inputImageTexture3, vec2(texel.b, .16666)).b);
        vec3 luma = vec3(.30, .59, .11);
       
          vec3 metal = texture2D(inputImageTexture6, uv).rgb;
          vec3 metaled = vec3(
                              texture2D(inputImageTexture5, vec2(metal.r, (1.0-texel.r))).r,
                              texture2D(inputImageTexture5, vec2(metal.g, (1.0-texel.g))).g,
                              texture2D(inputImageTexture5, vec2(metal.b, (1.0-texel.b))).b
                              );
        gl_FragColor = vec4(metaled, 1.0);
      }`,
  },
});

const Hefe = ({ on, children }) => {
  if (on === false) return children;
  return (
    <Node
      shader={shaders.Hefe}
      uniforms={{
        inputImageTexture: children,
        inputImageTexture2: resolveAssetSource(FILTER_EDGE_BURN),
        inputImageTexture3: resolveAssetSource(FILTER_HEFE_MAP),
        inputImageTexture5: resolveAssetSource(FILTER_HEFE_SOFT_LIGHT),
        inputImageTexture6: resolveAssetSource(FILTER_HEFE_METAL),
      }}
    />
  );
};

export default Hefe;
