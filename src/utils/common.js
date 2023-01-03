const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const updatePoint = (points, update) => points.map((point) => point.key === update.key ? update : point);

export { getRandomArrayElement, randomIntFromInterval, updatePoint };
