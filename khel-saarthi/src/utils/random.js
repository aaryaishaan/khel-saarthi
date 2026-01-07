export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomFloat = (min, max, d = 2) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(d));
