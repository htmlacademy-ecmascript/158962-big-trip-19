import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const formatTripDate = (tripDate) => tripDate ? dayjs(tripDate).format('MMMM D') : '';
const formatTripDayEditForm = (tripDate) => tripDate ? dayjs(tripDate).format('DD/MM/YY') : '';
const formatTripTime = (tripTime) => tripTime ? dayjs(tripTime).format('HH:MM') : '';
const getOffersByType = (offers, point) => offers.find((offer) => offer.type === point.type);
const getDescriptionByDestinationId = (destinations, point) => destinations.find((destination) => destination.id === point.id);

const getRandomArrayLength = (elements) => {
  const randomIndex = randomIntFromInterval(1, elements.length); // генерирую случайное число на которое будет отрезаться массив

  return elements.slice(0, randomIndex);
};

export {getRandomArrayElement,
  randomIntFromInterval,
  formatTripDate,
  formatTripDayEditForm,
  formatTripTime,
  getOffersByType,
  getDescriptionByDestinationId,
  getRandomArrayLength,
};
