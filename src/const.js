const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;
const MAX_LENGTH_FOR_RENDER = 3;
const AUTHORIZATION = 'Basic hS2sfS44wcl1sa2j';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip';
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: {
    value: 'day',
    state: 'enabled'
  },
  EVENT: {
    value: 'event',
    state: 'disabled'
  },
  TIME: {
    value: 'time',
    state: 'enabled'
  },
  PRICE: {
    value: 'price',
    state: 'enabled'
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
  INIT: 'INIT',
  LOADING_ERROR: 'LOADING_ERROR',
};


export {
  TYPES,
  TEXTS_FOR_EMPTY_SHEET,
  MINUTES_PER_DAY,
  MINUTES_PER_HOUR,
  MAX_LENGTH_FOR_RENDER,
  FilterType,
  SortType,
  UpdateType,
  UserAction,
  AUTHORIZATION,
  END_POINT,
  TimeLimit
};

