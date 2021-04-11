import React from 'react';
import { Text } from 'react-native';

export default (props) => (
  <Text {...props} style={[{ fontFamily: 'Comfortaa-Regular', fontSize: 17 }, props.style]}>
    {props.children}
  </Text>
);
