export function getRandomTimeout() {
  return Math.floor(Math.random() * 2001);
}

/* eslint-disable no-mixed-operators,no-bitwise */
export function createUUID() {
  let date = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    date += performance.now();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const random = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
  });
}
