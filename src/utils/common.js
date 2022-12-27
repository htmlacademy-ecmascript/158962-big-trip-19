const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export { getRandomArrayElement, randomIntFromInterval, capitalizeFirstLetter };
