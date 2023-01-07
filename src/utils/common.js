const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const updatePoint = (points, update) => points.map((point) => point.key === update.key ? update : point);
const capitalizeFirstLetter = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

export { getRandomArrayElement, randomIntFromInterval, updatePoint, capitalizeFirstLetter };
