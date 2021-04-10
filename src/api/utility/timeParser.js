const moment = require('moment');

const parseTime = (fileTime) => `(${moment(new Date(fileTime)).format('DD.MM.YY hh:mm:ss')})`;

const timerParser = (timeInSeconds) => {
  const seconds = parseSeconds(timeInSeconds % 60);
  const minutes = parseMinutes(Math.floor(timeInSeconds / 60));
  return `${minutes}:${seconds}`;
};

const parseSeconds = (seconds) => {
  if (seconds < 10) return `0${seconds}`;
  return seconds;
};

const parseMinutes = (minutes) => {
  if (minutes < 10) return `0${minutes}`;
  return minutes;
};

export { timerParser };

export default parseTime;
