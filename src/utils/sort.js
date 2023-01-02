import dayjs from 'dayjs';
import { getDifferenceFromTripDates } from './point';

const sortByDay = (points) => points.sort((pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom)));
const sortByPrice = (points) => points.sort((pointA, pointB) => pointB.price - pointA.price);
const sortByDuration = (points) => points.sort((pointA, pointB) => getDifferenceFromTripDates(pointB) - getDifferenceFromTripDates(pointA));

export { sortByPrice, sortByDay, sortByDuration };
