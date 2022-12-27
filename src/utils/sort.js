import dayjs from 'dayjs';

const sortByDuration = (points) => points.sort((timeA, timeB) => dayjs(timeA.dateFrom, 'ms').diff(dayjs(timeB.dateFrom,'ms')));
const sortByDefault = (points) => points.sort((pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom)));
const sortByPrice = (points) => points.sort((pointA, pointB) => pointB.price - pointA.price);

export { sortByPrice, sortByDefault, sortByDuration };
