import dayjs from 'dayjs';

const isPointDateInPresent = (pointDateFrom, pointDateTo) => pointDateFrom <= dayjs() && pointDateTo >= dayjs();
const isPointDateInFuture = (pointDateFrom) => pointDateFrom > dayjs();
const isPointDateInPast = (pointDateTo) => pointDateTo < dayjs();

const filterPointsByFuture = (points) => points.filter(({ dateFrom }) => isPointDateInFuture(dateFrom));
const filterPointsByPast = (points) => points.filter(({ dateTo }) => isPointDateInPast(dateTo));
const filterPointsByPresent = (points) => points.filter(({ dateFrom, dateTo }) => isPointDateInPresent(dateFrom, dateTo));
const setDisabledFilters = (filters) => filters.forEach((filter) => filter.setAttribute('disabled', 'disabled'));

export { filterPointsByFuture, filterPointsByPast, filterPointsByPresent, setDisabledFilters };
