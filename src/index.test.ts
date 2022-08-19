import 'jest';
import {
  isPresent,
  isDefined,
  isFilled,
  hasPresentKey,
  hasValueAtKey,
  hasPresentKeys,
} from '.';

type TestData = {
  data: string;
};

describe('Functions', () => {
  describe('isPresent', () => {
    it('should return true on present', () => {
      expect(isPresent<TestData>({ data: 'hello world' })).toBeTruthy();
    });

    it('should return false on undefined', () => {
      expect(isPresent<TestData>(undefined)).toBeFalsy();
    });

    it('should return false on null', () => {
      expect(isPresent<TestData>(null)).toBeFalsy();
    });

    it('should return false on void with undefined', () => {
      const voidVal: void = undefined;
      expect(isPresent<TestData>(voidVal)).toBeFalsy();
    });

    it('should filter out only present values from an array', () => {
      const results: Array<TestData | undefined | null> = [
        { data: 'hello' },
        null,
        { data: 'world' },
        undefined,
        { data: 'wow' },
      ];

      const presentResults: Array<TestData> = results.filter(isPresent);

      expect(presentResults).toEqual([
        { data: 'hello' },
        { data: 'world' },
        { data: 'wow' },
      ]);
    });
  });

  describe('isDefined', () => {
    it('should return true on defined', () => {
      expect(isDefined<TestData>({ data: 'hello world' })).toBeTruthy();
    });

    it('should return false on undefined', () => {
      expect(isDefined<TestData>(undefined)).toBeFalsy();
    });

    it('does not typecheck', () => {
      const results: Array<TestData | undefined> = [
        { data: 'hello' },
        { data: 'world' },
        undefined,
        { data: 'wow' },
      ];

      const presentResults: Array<TestData> = results.filter(isDefined);

      expect(presentResults).toEqual([
        { data: 'hello' },
        { data: 'world' },
        { data: 'wow' },
      ]);
    });

    it('should filter out only present values from an array', () => {
      const results: Array<TestData | undefined> = [
        { data: 'hello' },
        { data: 'world' },
        undefined,
        { data: 'wow' },
      ];

      const presentResults: Array<TestData> = results.filter(isDefined);

      expect(presentResults).toEqual([
        { data: 'hello' },
        { data: 'world' },
        { data: 'wow' },
      ]);
    });
  });

  describe('isFilled', () => {
    it('should return true on defined', () => {
      expect(isFilled<TestData>({ data: 'hello world' })).toBeTruthy();
    });

    it('should return false on null', () => {
      expect(isFilled<TestData>(null)).toBeFalsy();
    });

    it('should filter out only present values from an array', () => {
      const results: Array<TestData | null> = [
        { data: 'hello' },
        null,
        { data: 'world' },
        { data: 'wow' },
      ];

      const presentResults: Array<TestData> = results.filter(isFilled);

      expect(presentResults).toEqual([
        { data: 'hello' },
        { data: 'world' },
        { data: 'wow' },
      ]);
    });
  });

  describe('hasPresentKey', () => {
    it('returns true only for objects that have a defined non-null value at the given key', () => {
      expect(hasPresentKey('data')({ data: undefined })).toEqual(false);
      expect(hasPresentKey('data')({ data: null })).toEqual(false);
      expect(hasPresentKey('data')({ data: '' })).toEqual(true);
      expect(hasPresentKey('data')({ data: 'hello' })).toEqual(true);

      const items: Array<{ data?: string | null | undefined }> = [
        {},
        { data: undefined },
        { data: null },
        { data: '' },
        { data: 'hello' },
      ];
      const result = items.filter(hasPresentKey('data'));
      expect(result).toEqual([{ data: '' }, { data: 'hello' }]);
    });

    it('can be used on non-null properties', () => {
      const items: Array<{ data?: string | undefined }> = [
        {},
        { data: undefined },
        { data: '' },
        { data: 'hello' },
      ];
      const result = items.filter(hasPresentKey('data'));
      expect(result).toEqual([{ data: '' }, { data: 'hello' }]);
    });

    it('can be used on non-null, non-undefined properties', () => {
      const items: Array<{ data: string }> = [{ data: '' }, { data: 'hello' }];
      const result = items.filter(hasPresentKey('data'));
      expect(result).toEqual([{ data: '' }, { data: 'hello' }]);
    });
  });

  describe('hasPresentKeys', () => {
    it('returns true only for objects that have a defined non-null single value at the given key', () => {
      expect(hasPresentKeys(['data'])({ data: undefined })).toEqual(false);
      expect(hasPresentKeys(['data'])({ data: null })).toEqual(false);
      expect(hasPresentKeys(['data'])({ data: '' })).toEqual(true);
      expect(hasPresentKeys(['data'])({ data: 'hello' })).toEqual(true);

      const items: Array<{ data?: string | null | undefined }> = [
        {},
        { data: undefined },
        { data: null },
        { data: '' },
        { data: 'hello' },
      ];
      const result = items.filter(hasPresentKeys(['data']));
      expect(result).toEqual([{ data: '' }, { data: 'hello' }]);
    });


    it('returns true only for objects that have a defined non-null multiple value at the given key', () => {
      expect(hasPresentKeys(['data', 'fruit'])({ data: undefined, fruit: undefined })).toEqual(false);
      expect(hasPresentKeys(['data', 'fruit'])({ data: null, fruit: null })).toEqual(false);
      expect(hasPresentKeys(['data', 'fruit'])({ data: '', fruit: '' })).toEqual(true);
      expect(hasPresentKeys(['data', 'fruit'])({ data: 'hello', fruit: 'banana' })).toEqual(true);

      const items: Array<{ data?: string | null | undefined, fruit?: string | null | undefined }> = [
        {},
        { data: undefined, fruit: undefined },
        { data: null, fruit: null },
        { data: '', fruit: '' },
        { data: 'hello', fruit: 'banana' },
        { data: null, fruit: 'banana' },
        { data: 'hello', fruit: null },
      ];
      const result = items.filter(hasPresentKeys(['data', 'fruit']));
      expect(result).toEqual([{ data: '', fruit: '' }, { data: 'hello', fruit: 'banana' }]);
    });
  });

  describe('hasValueAtKey', () => {
    it('returns true only for objects that have a defined value at the given key', () => {
      expect(hasValueAtKey('data', 'a')({ data: undefined })).toEqual(false);
      expect(hasValueAtKey('data', 'a')({ data: null })).toEqual(false);
      expect(hasValueAtKey('data', 'a')({ data: 'a' })).toEqual(true);
      expect(hasValueAtKey('data', 'a')({ data: 'b' })).toEqual(false);

      const items: Array<{ data: 'a' | 'b' | null | undefined }> = [
        { data: undefined },
        { data: null },
        { data: 'a' },
        { data: 'b' },
      ];
      const result: Array<{ data: 'a' }> = items.filter(
        hasValueAtKey('data', 'a' as const)
      );
      expect(result).toEqual([{ data: 'a' }]);

      const fruits: Array<
        | {
          type: 'apple';
          isApple: true;
        }
        | {
          type: 'banana';
          isBanana: true;
        }
      > = [
          { type: 'apple', isApple: true },
          { type: 'banana', isBanana: true },
        ];
      const fruitsResult: Array<{
        type: 'apple';
        isApple: true;
      }> = fruits.filter(hasValueAtKey('type', 'apple' as const));
      expect(fruitsResult).toEqual([
        {
          type: 'apple',
          isApple: true,
        },
      ]);
    });
  });
});
