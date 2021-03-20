const moment = require('moment');

const parseTime = (fileTime) => `(${moment(new Date(fileTime)).format('DD.MM.YY hh:mm:ss')})`;

export default parseTime;
