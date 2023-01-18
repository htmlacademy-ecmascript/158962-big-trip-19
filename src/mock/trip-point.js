import {getRandomArrayElement, randomIntFromInterval} from '../utils/common.js';
import {PRICES, TYPES, DESTINATIONS, DESCRIPTIONS} from '../const';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';


const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Choose radio',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Order music',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add lunch',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Add meal',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Travel by train',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Choose seat',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add lunch',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Choose seat',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Switch to comfort class',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Add luggage',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add meal',
        price: getRandomArrayElement(PRICES),
      },

      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Order meal on a ship',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Order vine',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add lunch',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Get sunglasses',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Add guide',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Order bus',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add lunch',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Choose radio',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Order music',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add lunch',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Add meal',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Travel by train',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Choose seat',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add lunch',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Choose steak',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Switch to private room',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Add drink',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add meal',
        price: getRandomArrayElement(PRICES),
      },

      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Order meal on a ship',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 2,
        title: 'Order vine',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 4,
        title: 'Add lunch',
        price: getRandomArrayElement(PRICES),
      },
      {
        id: 5,
        title: 'Add service',
        price: getRandomArrayElement(PRICES),
      },
    ],
  },
];

const tripPoints = [
  {
    id: 1,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().subtract(5, 'd').toString(),
    dateTo: dayjs().subtract(1, 'd').add(30, 'minute').toString(),
    offers: [3, 5],
  },

  {
    id: 2,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().subtract(7, 'd').toString(),
    dateTo: dayjs().subtract(2, 'd').add(1, 'hour').add(30, 'minute').toString(),
    offers: [1, 2, 3],
  },

  {
    id: 3,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().subtract(5, 'd').toString(),
    dateTo: dayjs().add(1, 'd').add(3, 'hour').add(45, 'minute').toString(),
    offers: [1, 2, 3],
  },

  {
    id: 4,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().add(3, 'h').toString(),
    dateTo:  dayjs().add(5, 'h').add(45, 'minute').toString(),
    offers: [2, 3, 4],
  },

  {
    id: 5,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().add(2, 'd').toString(),
    dateTo: dayjs().add(5, 'd').add(25, 'minute').toString(),
    offers: [1, 2],
  },

  {
    id: 6,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().toString(),
    dateTo: dayjs().add(2, 'hour').toString(),
    offers: [2, 3, 4],
  },

  {
    id: 7,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().toString(),
    dateTo: dayjs().add(40, 'minute').toString(),
    offers: [1, 2, 3],
  },

  {
    id: 8,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().add(4, 'd').toString(),
    dateTo: dayjs().add(7, 'hour').toString(),
    offers: [1, 2, 3],
  },

  {
    id: 9,
    type: getRandomArrayElement(TYPES),
    destination: randomIntFromInterval(1, 5),
    isFavorite: Math.random() > 0.5,
    price: getRandomArrayElement(PRICES),
    dateFrom: dayjs().add(1, 'h').toString(),
    dateTo: dayjs().add(3, 'h').toString(),
    offers: [1, 2, 4],
  },
];

const destinations = [
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
    ]
  },
  {
    id: 2,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([11, 22, 53, 74, 41, 12])}`,
        description: 'Something description',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([11, 22, 53, 74, 41, 12])}`,
        description: 'Something description',
      }
    ]
  },

  {
    id: 3,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([13, 32, 55, 7])}`,
        description: 'Something description5',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([13, 32, 55, 7])}`,
        description: 'Something description5',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([13, 32, 55, 7])}`,
        description: 'Something description5',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([13, 32, 55, 7])}`,
        description: 'Something description5',
      }
    ]
  },

  {
    id: 4,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([18, 28, 59, 70])}`,
        description: 'Something description',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
    ]
  },

  {
    id: 5,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([15, 27, 54, 71])}`,
        description: 'Something description',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([15, 27, 54, 71])}`,
        description: 'Something description2',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([15, 27, 54, 71])}`,
        description: 'Something description4',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([15, 27, 54, 71])}`,
        description: 'Something description5',
      }
    ]
  },

  {
    id: 6,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([33, 66, 75, 72])}`,
        description: 'Something description',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([33, 66, 75, 72])}`,
        description: 'Something description',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([33, 66, 75, 72])}`,
        description: 'Something description',
      }
    ]
  },

  {
    id: 7,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([41, 92, 95, 97])}`,
        description: 'Something description',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
    ]
  },

  {
    id: 8,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([16, 62, 65, 67])}`,
        description: 'Something description',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([16, 62, 65, 67])}`,
        description: 'Something description',
      }
    ]
  },

  {
    id: 9,
    description: getRandomArrayElement(DESCRIPTIONS),
    name:  getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([81, 82, 85, 87])}`,
        description: 'Something description',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7, 10, 13])}`,
        description: 'Something description.',
      },
    ]
  },
];

// функция обертка, возвращает случайную точку маршрута
const getRandomTripPoint = () => ({
  key: nanoid(),
  ...getRandomArrayElement(tripPoints)
});

export { getRandomTripPoint, offersByType, tripPoints, destinations };
