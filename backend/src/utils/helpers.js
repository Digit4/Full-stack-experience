const { fromUnixTime, differenceInHours } = require('date-fns');

exports.convertUnixToDate = (data) => {
  const { time, duration } = data;
  const newDate = fromUnixTime(time);
  const newDuration = differenceInHours(
    fromUnixTime(time + duration),
    fromUnixTime(time),
  );

  return {
    ...data,
    time: newDate,
    duration: newDuration,
  };
};
