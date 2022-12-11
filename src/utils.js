import dayjs from 'dayjs';
import {DATE_FORMAT_DD_MM_YY, DATE_FORMAT_MMMM_D, TIME_FORMAT_HH_MM} from './const.js';
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const formatTripDate = (tripDate) => tripDate ? dayjs(tripDate).format(DATE_FORMAT_MMMM_D) : '';
const formatTripDayEditForm = (tripDate) => tripDate ? dayjs(tripDate).format(DATE_FORMAT_DD_MM_YY) : '';
const formatTripDateTime = (tripTime) => tripTime ? dayjs(tripTime).format(TIME_FORMAT_HH_MM) : '';
const getOffersByType = (offers, point) => offers.find((offer) => offer.type === point.type);
const getDescriptionByOfferType = (destinations, point) => destinations.find((destination) => destination.name === point.destination);
const isPointFavorite = (value) => value;

export {getRandomArrayElement, randomIntFromInterval, formatTripDate, formatTripDayEditForm, formatTripDateTime, getOffersByType, getDescriptionByOfferType, isPointFavorite};
