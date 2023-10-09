import { createUUID } from '../../../src/utils';

describe('Utils getRandomTimeout', () => {
  test('Should generates a valid UUID format', () => {
    const uuid = createUUID();
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    expect(uuid).toMatch(uuidRegex);
  });

  test('Should generates unique UUIDs', () => {
    const uuid1 = createUUID();
    const uuid2 = createUUID();
    expect(uuid1).not.toEqual(uuid2);
  });
});
