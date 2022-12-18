import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const formatTripDate = (tripDate) => tripDate ? dayjs(tripDate).format('MMMM M') : '';
const formatTripDayEditForm = (tripDate) => tripDate ? dayjs(tripDate).format('DD/MM/YY') : '';
const formatTripTime = (tripTime) => tripTime ? dayjs(tripTime).format('HH:MM') : '';
const getOffersByType = (offers, point) => offers.find((offer) => offer.type === point.type);
const getDescriptionByDestinationId = (destinations, point) => destinations.find((destination) => destination.id === point.id);
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const calculateDifference = (startTime, endTime) => {
  const MINUTES_PER_HOUR = 60;
  const MINUTES_PER_DAY = 1440;
  const convertStartTimeToMinutes = Math.floor(Date.parse(startTime) / 60000);
  const convertEndTimeToMinutes = Math.floor(Date.parse(endTime) / 60000);
  const difference = convertEndTimeToMinutes - convertStartTimeToMinutes;

  if (difference < MINUTES_PER_HOUR) {
    return dayjs.duration(difference, 'minutes').format('mm[M]');
  } else if (difference >= MINUTES_PER_HOUR && difference < MINUTES_PER_DAY) {
    return dayjs.duration(difference, 'minutes').format('HH[H] mm[M]');
  } else if (difference >= MINUTES_PER_DAY) {
    return dayjs.duration(difference, 'minutes').format('DD[d] HH[H] mm[M]');
  }
};

export {
  getRandomArrayElement,
  randomIntFromInterval,
  formatTripDate,
  formatTripDayEditForm,
  formatTripTime,
  getOffersByType,
  getDescriptionByDestinationId,
  isEscEvent,
  calculateDifference,
};
