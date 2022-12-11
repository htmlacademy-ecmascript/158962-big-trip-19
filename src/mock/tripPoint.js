import {getRandomArrayElement} from '../utils.js';
import {PRICES} from '../const';

const tripPoints = [
  {
    'id': 1,
    'type': 'flight',
    'destination': 'Spain',
    'isFavorite': false,
    'price': getRandomArrayElement(PRICES),
    'dateFrom': '2019-05-10T22:55:56.845Z',
    'dateTo': '2019-07-09T11:12:13.375Z',
    'offers': [],
  },

  {
    'id': 1,
    'type': 'sightseeing',
    'destination': 'Prague',
    'isFavorite': true,
    'price': getRandomArrayElement(PRICES),
    'dateFrom': '2019-08-10T22:23:56.845Z',
    'dateTo': '2019-09-10T11:29:13.375Z',
    'offers': [],
  },

  {
    'id': 1,
    'type': 'train',
    'destination': 'Turkey',
    'isFavorite': true,
    'price': getRandomArrayElement(PRICES),
    'dateFrom': '2019-01-10T22:35:56.845Z',
    'dateTo': '2019-07-22T11:11:20.375Z',
    'offers': [],
  },

  {
    'id': 1,
    'type': 'ship',
    'destination': 'Moscow',
    'isFavorite': false,
    'price': getRandomArrayElement(PRICES),
    'dateFrom': '2019-03-14T12:25:56.845Z',
    'dateTo': '2019-07-13T11:20:30.375Z',
    'offers': [],
  },

  {
    'id': 1,
    'type': 'taxi',
    'destination': 'Italy',
    'isFavorite': true,
    'price': getRandomArrayElement(PRICES),
    'dateFrom': '2019-05-09T21:50:40.829Z',
    'dateTo': '2019-07-06T14:21:15.375Z',
    'offers': [],
  },
];

const destinations = [
  {
    'id': 1,
    'description': 'Moscow. Moscow never sleeps.',
    'name': 'Moscow',
    'pictures': [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7])}`,
        'description': 'Something about Moscow.',
      }
    ]
  },
  {
    'id': 1,
    'description': 'Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    'name': 'Italy',
    'pictures': [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7])}`,
        'description': 'Something about Italy',
      }
    ]
  },

  {
    'id': 1,
    'description': 'Turkey. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    'name': 'Turkey',
    'pictures': [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7])}`,
        'description': 'Something about Turkey',
      }
    ]
  },

  {
    'id': 1,
    'description': 'Spain. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    'name': 'Spain',
    'pictures': [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7])}`,
        'description': 'Something about Spain',
      }
    ]
  },

  {
    'id': 1,
    'description': 'Prague. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    'name': 'Prague',
    'pictures': [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomArrayElement([1, 2, 5, 7])}`,
        'description': 'Something about Prague',
      }
    ]
  },
];

const offers = [
  {
    'id': 1,
    'title': 'Get sunglasses',
    'price': getRandomArrayElement(PRICES),
  },
  {
    'id': 2,
    'title': 'Add guide',
    'price': getRandomArrayElement(PRICES),
  },
  {
    'id': 3,
    'title': 'Order bus',
    'price': getRandomArrayElement(PRICES),
  },
  {
    'id': 4,
    'title': 'Add lunch',
    'price': getRandomArrayElement(PRICES),
  },
  {
    'id': 5,
    'title': 'Add service',
    'price': getRandomArrayElement(PRICES),
  },
];

const offersByType = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Order Uber',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 2,
        'title': 'Choose radio',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 3,
        'title': 'Order music',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 4,
        'title': 'Order vine',
        'price': getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'Add meal',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 2,
        'title': 'Travel by train',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 3,
        'title': 'Choose seat',
        'price': getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'Choose seat',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 2,
        'title': 'Switch to comfort class',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 3,
        'title': 'Add luggage',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 4,
        'title': 'Add meal',
        'price': getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'Order meal on a ship',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 2,
        'title': 'Order vine',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 3,
        'title': 'Switch to comfort class',
        'price': getRandomArrayElement(PRICES),
      },
    ],
  },

  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': 1,
        'title': 'Get sunglasses',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 2,
        'title': 'Add guide',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 3,
        'title': 'Order bus',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 4,
        'title': 'Add lunch',
        'price': getRandomArrayElement(PRICES),
      },
      {
        'id': 5,
        'title': 'Add service',
        'price': getRandomArrayElement(PRICES),
      },
    ],
  },
];


// функция обертка, возвращает случайную точку маршрута
const getRandomTripPoint = () => getRandomArrayElement(tripPoints);

export {getRandomTripPoint, offersByType, destinations};
