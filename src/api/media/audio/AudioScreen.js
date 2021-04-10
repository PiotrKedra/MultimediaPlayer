import React from 'react';
import {
  View, StyleSheet, StatusBar, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import AudioRecord from 'react-native-audio-record';
import { BACK, PAUSE_PLAYER, RECORD_ON } from '../../../assets/values/images';
import { refreshMedia } from '../../redux/media/media.actions';
import {
  CAMERA_BUTTON_SIZE,
  ICON_SIZE, LARGE_MARGIN, RECORD_ICON, SMALL_BORDER_WIDTH, STD_MARGIN,
} from '../../../assets/values/dimensions';
import {
  DARK_GRAY, GRAY,
} from '../../../assets/values/colors';
import Text from '../../custom-components/Text';
import useInterval from '../../utility/UseInterval';
import { timerParser } from '../../utility/timeParser';
import { saveAudio } from '../../storage/audioStorage';

const AudioScreen = ({ navigation, refreshMediaGrid }) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

  const handleTimer = () => {
    if (isRecording === true) setTimer(timer + 1);
  };

  useInterval(() => handleTimer(), 1000);

  function startRecording() {
    setIsRecording(true);
    const options = {
      sampleRate: 16000, // default 44100
      audioSource: 6, // android only (see below)
    };
    AudioRecord.init(options);
    AudioRecord.start();
  }

  const stopRecording = async () => {
    setIsRecording(false);
    const audioFile = await AudioRecord.stop();
    return saveAudio(audioFile);
  };

  const handlePress = async () => {
    if (isRecording) {
      const audioObject = await stopRecording();
      navigation.navigate('PlayerDetailScreen', { video: audioObject });
      setTimer(0);
    } else startRecording();
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
          refreshMediaGrid();
        }}
      >
        <Image
          source={BACK}
          style={styles.icon}
        />
      </TouchableOpacity>
      {
        isRecording
        && (
          <Image
            source={RECORD_ON}
            style={styles.recordIcon}
          />
        )
      }
      <Text style={styles.recordTime}>{timerParser(timer)}</Text>
      <TouchableOpacity style={styles.recordButton} onPress={() => handlePress()}>
        {
          isRecording
            ? (
              <Image
                source={PAUSE_PLAYER}
                style={styles.icon}
              />
            )
            : (
              <Image
                source={RECORD_ON}
              />
            )
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-around', alignItems: 'center' },
  backButton: {
    position: 'absolute', top: STD_MARGIN, left: STD_MARGIN, paddingTop: STD_MARGIN,
  },
  icon: { width: ICON_SIZE, height: ICON_SIZE },
  recordIcon: {
    width: RECORD_ICON, height: RECORD_ICON, position: 'absolute', top: LARGE_MARGIN, right: STD_MARGIN,
  },
  recordButton: {
    width: CAMERA_BUTTON_SIZE,
    height: CAMERA_BUTTON_SIZE,
    borderRadius: CAMERA_BUTTON_SIZE / 2,
    borderWidth: SMALL_BORDER_WIDTH,
    borderColor: DARK_GRAY,
    backgroundColor: GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: DARK_GRAY,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  recordTime: { fontSize: 40 },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(AudioScreen);
