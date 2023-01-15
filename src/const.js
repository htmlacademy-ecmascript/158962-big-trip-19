const POINTS_COUNT = 5;
const PRICES = [100, 120, 40, 80, 900, 1000, 70, 43, 35];
const DESTINATIONS = ['Geneva', 'Italy', 'Amsterdam', 'Prague', 'Ulm', 'Thailand', 'Spain', 'Moscow', 'Turkey', 'Paris'];
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.', 'description3', 'description4', 'description5', 'description6'];
const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: {
    value: 'day',
    state: ''
  },
  EVENT: {
    value: 'event',
    state: 'disabled'
  },
  TIME: {
    value: 'time',
    state: ''
  },
  PRICE: {
    value: 'price',
    state: ''
  },
  OFFERS: {
    value: 'offers',
    state: 'disabled'
  },
};

const TEXTS_FOR_EMPTY_SHEET = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


export {
  POINTS_COUNT,
  TYPES,
  DESTINATIONS,
  DESCRIPTIONS,
  PRICES,
  TEXTS_FOR_EMPTY_SHEET,
  MINUTES_PER_DAY,
  MINUTES_PER_HOUR,
  FilterType,
  SortType,
  UpdateType,
  UserAction,
};

