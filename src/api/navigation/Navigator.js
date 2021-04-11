import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../home/HomeScreen';
import CameraScreen from '../media/photo/PhotoScreen';
import ImgTakenScreen from '../media/photo/ImgTakenScreen';
import ImgDetailScreen from '../media-details/ImgDetailScreen';
import VideoScreen from '../media/video/VideoScreen';
import PlayerDetailScreen from '../media-details/PlayerDetailScreen';
import AudioScreen from '../media/audio/AudioScreen';

const Stack = createStackNavigator();

const Navigator = () => (
  <Stack.Navigator>
    {addHomeScreen()}
    {addCameraScreen()}
    {addVideoScreen()}
    {addAudioScreen()}
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
      options={{ headerShown: false }}
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

function addAudioScreen() {
  return (
    <Stack.Screen
      name="AudioScreen"
      component={AudioScreen}
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
      name="PlayerDetailScreen"
      component={PlayerDetailScreen}
      options={{ headerShown: false }}
    />
  );
}

export default Navigator;
