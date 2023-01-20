import dayjs from 'dayjs';
import { MINUTES_PER_DAY, MINUTES_PER_HOUR } from '../const';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const formatTripDate = (tripDate, format) => tripDate ? dayjs(tripDate).format(format) : '';
const formatTripTime = (tripTime, format) => tripTime ? dayjs(tripTime).format(format) : '';
const formatFormDate = (tripDate, format) => dayjs(tripDate).format(format);
const getOffersByType = (offers, point) => offers?.find((offer) => offer.type === point.type);
const getDescriptionByDestinationId = (destinations, point) => destinations?.find((destination) => destination.id === point.destination);
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const getDifferenceFromTripDates = (point) => Math.floor(dayjs(point.dateTo).diff(dayjs(point.dateFrom))) / 60000;
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

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
  formatFormDate,
  formatTripTime,
  getOffersByType,
  getDescriptionByDestinationId,
  isEscEvent,
  calculateTripDuration,
  getDifferenceFromTripDates,
  isDatesEqual,
};
