/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomeScreen from './home/HomeScreen';
import { MENU } from '../assets/values/images';
import CameraScreen from './camera/CameraScreen';
import ImgDetailScreen from './media-details/ImgDetailScreen';
import store from './redux/store';
import ImgTakenScreen from './camera/ImgTakenScreen';

const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Mplayer',
            headerTitleStyle: {
              fontFamily: 'Comfortaa-Bold',
              fontSize: 30,
            },
            headerRight: () => (
              <Image
                style={{
                  width: 35, height: 35, marginRight: 10, marginTop: 10,
                }}
                source={MENU}
              />
            ),
          }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImgTakenScreen"
          component={ImgTakenScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImgDetailScreen"
          component={ImgDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
