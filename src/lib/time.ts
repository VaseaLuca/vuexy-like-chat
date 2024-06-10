import dayjs from 'dayjs';

const formatTime = (timeStamp: Date) => {
  return dayjs(timeStamp).format('hh:mm A');
};

export { formatTime };