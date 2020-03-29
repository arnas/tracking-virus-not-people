import moment from 'moment';

export const getDate = function (d) {
  var format = 'YYYY-MM-DD HH:mm';
  if (moment(d).startOf('day').valueOf() === moment(d).valueOf()) {
    format = 'YYYY-MM-DD';
  }
  return moment(d).format(format);
};
