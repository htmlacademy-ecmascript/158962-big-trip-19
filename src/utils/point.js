import dayjs from 'dayjs';
import { MINUTES_PER_DAY, MINUTES_PER_HOUR } from '../const';

const formatTripDate = (tripDate) => tripDate ? dayjs(tripDate).format('MMM M') : '';
const formatTripDayEditForm = (tripDate) => tripDate ? dayjs(tripDate).format('DD/MM/YY') : '';
const formatTripTime = (tripTime) => tripTime ? dayjs(tripTime).format('HH:MM') : '';
const getOffersByType = (offers, point) => offers.find((offer) => offer.type === point.type);
const getDescriptionByDestinationId = (destinations, point) => destinations.find((destination) => destination.id === point.id);
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const getDifferenceFromTripDates = (point) => Math.floor(dayjs(point.dateTo).diff(dayjs(point.dateFrom))) / 60000;

const calculateTripDuration = (point) => {
  const difference = getDifferenceFromTripDates(point);

  if (difference < MINUTES_PER_HOUR) {
    return dayjs.duration(difference, 'minutes').format('mm[M]');
  } else if (difference >= MINUTES_PER_HOUR && difference < MINUTES_PER_DAY) {
    return dayjs.duration(difference, 'minutes').format('HH[H] mm[M]');
  } else if (difference >= MINUTES_PER_DAY) {
    return dayjs.duration(difference, 'minutes').format('DD[D] HH[H] mm[M]');
  }
};

export {
  formatTripDate,
  formatTripDayEditForm,
  formatTripTime,
  getOffersByType,
  getDescriptionByDestinationId,
  isEscEvent,
  calculateTripDuration,
  getDifferenceFromTripDates,
};