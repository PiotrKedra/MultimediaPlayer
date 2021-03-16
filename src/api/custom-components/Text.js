import React from 'react';
import { Text } from 'react-native';

// eslint-disable-next-line react/jsx-props-no-spreading,react/destructuring-assignment
export default (props) => <Text {...props} style={[{ fontFamily: 'Comfortaa-Regular', fontSize: 17 }, props.style]}>{props.children}</Text>;
