import React from 'react';
import LottieView from 'lottie-react-native';
import AUDIO_PLAYER_ANIMATION from '../../assets/values/lottie';

const AudioPlayerAnimation = ({ isPlaying, speed }) => {
  const animation = React.useRef(null);

  React.useEffect(() => {
    if (isPlaying) animation.current.play();
    else animation.current.pause();
  }, [isPlaying]);

  return (
    <LottieView
      ref={animation}
      source={AUDIO_PLAYER_ANIMATION}
      speed={speed}
    />
  );
};

export default AudioPlayerAnimation;
