import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FilterType } from '../const';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const isPointDateInPresent = (pointDateFrom, pointDateTo) => dayjs(pointDateFrom).isSameOrBefore(dayjs()) && dayjs(pointDateTo).isSameOrAfter(dayjs());
const isPointDateInFuture = (pointDateFrom) => dayjs(pointDateFrom).isAfter(dayjs());
const isPointDateInPast = (pointDateTo) => dayjs(pointDateTo).isBefore(dayjs());

const filterGroup = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter(({ dateFrom }) => isPointDateInFuture(dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter(({ dateFrom, dateTo }) => isPointDateInPresent(dateFrom, dateTo)),
  [FilterType.PAST]: (points) => points.filter(({ dateTo }) => isPointDateInPast(dateTo)),
};

export { filterGroup };
