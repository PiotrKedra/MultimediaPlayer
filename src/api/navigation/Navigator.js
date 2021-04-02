import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../home/HomeScreen';
import { MENU } from '../../assets/values/images';
import CameraScreen from '../camera/CameraScreen';
import ImgTakenScreen from '../camera/ImgTakenScreen';
import ImgDetailScreen from '../media-details/ImgDetailScreen';
import { SMALL_ICON_SIZE, SMALL_MARGIN } from '../../assets/values/dimensions';
import VideoScreen from '../video/VideoScreen';
import VideoDetailScreen from '../media-details/VideoDetailScreen';

const Stack = createStackNavigator();

const Navigator = () => (
  <Stack.Navigator>
    {addHomeScreen()}
    {addCameraScreen()}
    {addVideoScreen()}
    {addImgTakenScreen()}
    {addImgDetailsScreen()}
    {addVideoDetailsScreen()}
  </Stack.Navigator>
);

function addHomeScreen() {
  return (
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
              width: SMALL_ICON_SIZE,
              height: SMALL_ICON_SIZE,
              marginRight: SMALL_MARGIN,
              marginTop: SMALL_MARGIN,
            }}
            source={MENU}
          />
        ),
      }}
    />
  );
}

function addCameraScreen() {
  return (
    <Stack.Screen
      name="CameraScreen"
      component={CameraScreen}
      options={{ headerShown: false }}
    />
  );
}

function addVideoScreen() {
  return (
    <Stack.Screen
      name="VideoScreen"
      component={VideoScreen}
      options={{ headerShown: false }}
    />
  );
}

function addImgTakenScreen() {
  return (
    <Stack.Screen
      name="ImgTakenScreen"
      component={ImgTakenScreen}
      options={{ headerShown: false }}
    />
  );
}

function addImgDetailsScreen() {
  return (
    <Stack.Screen
      name="ImgDetailScreen"
      component={ImgDetailScreen}
      options={{ headerShown: false }}
    />
  );
}

function addVideoDetailsScreen() {
  return (
    <Stack.Screen
      name="VideoDetailScreen"
      component={VideoDetailScreen}
      options={{ headerShown: false }}
    />
  );
}

export default Navigator;
