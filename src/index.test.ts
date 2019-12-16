import 'jest';
import { isPresent, isDefined, isFilled } from '.';

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
        { data: 'wow'}
      ];

      const presentResults: Array<TestData> = results.filter(isPresent);

      expect(presentResults).toEqual([
        { data: 'hello' },
        { data: 'world' },
        { data: 'wow'}
      ])
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
        { data: 'wow'}
      ];

      const presentResults: Array<TestData> = results.filter(isDefined);

      expect(presentResults).toEqual([
        { data: 'hello' },
        { data: 'world' },
        { data: 'wow'}
      ])
    });

    it('should filter out only present values from an array', () => {
      const results: Array<TestData | undefined> = [
        { data: 'hello' },
        { data: 'world' },
        undefined,
        { data: 'wow'}
      ];

      const presentResults: Array<TestData> = results.filter(isDefined);

      expect(presentResults).toEqual([
        { data: 'hello' },
        { data: 'world' },
        { data: 'wow'}
      ])
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
        { data: 'wow'}
      ];

      const presentResults: Array<TestData> = results.filter(isFilled);

      expect(presentResults).toEqual([
        { data: 'hello' },
        { data: 'world' },
        { data: 'wow'}
      ])
    });
  });
});