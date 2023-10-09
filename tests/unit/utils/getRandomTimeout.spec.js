import { getRandomTimeout } from '../../../src/utils';

describe('Utils getRandomTimeout', () => {
  test('Should returns number', () => {
    const randomTimeout = getRandomTimeout();
    expect(Number(randomTimeout) === randomTimeout).toBe(true);
  });
  test('Should returns value between 0 and 2000', () => {
    expect(getRandomTimeout()).toBeGreaterThanOrEqual(0);
    expect(getRandomTimeout()).toBeLessThanOrEqual(2000);
  });
});
