import "jest";
import StorageService from "./storage";

const storageService = new StorageService();

describe("Set and get the same value and type", () => {
  const tests: { it: string; value: any; expected: any; isNonStorable?: boolean; }[] = [
    { it: "null", value: null, expected: null },
    { it: "positive number", value: 1, expected: 1 },
    { it: "positive number with decimals", value: 2.5, expected: 2.5 },
    { it: "negative number", value: -3, expected: -3 },
    { it: "negative number with decimals", value: -3.5, expected: -3.5 },
    { it: "zero", value: 0, expected: 0 },
    { it: "string", value: "this is a string", expected: "this is a string" },
    { it: "empty string", value: "", expected: "" },
    { it: "boolean -> false", value: true, expected: true },
    { it: "boolean -> true", value: false, expected: false },
    { it: "literal object", value: { a: 1, b: 2, c: 3 }, expected: { a: 1, b: 2, c: 3 }},
    { it: "empty literal object", value: {}, expected: {}},
    { it: "object", value: new Date(), expected: new Date().toJSON() },
    { it: "array", value: [null, 1, "a"], expected: [null, 1, "a"] },
    { it: "empty array", value: [], expected: [] },

    // non-storable values
    { it: "non-storable -> undefined", value: undefined, expected: null },
    { it: "non-storable -> NaN", value: NaN, expected: null },
    { it: "non-storable -> Infinity", value: Infinity, expected: null },
    { it: "non-storable -> -Infinity", value: -Infinity, expected: null },
    { it: "non-storable -> Symbol", value: Symbol(), expected: null },
  ];

  tests.forEach((test, idx) => {
    it(test.it, () => {
      const itWasSaved = storageService.set(`test${idx}`, test.value);
      expect(test.value !== null && test.expected === null).toEqual(!itWasSaved);
      expect(storageService.get(`test${idx}`)).toEqual(test.expected);
    });
  });
});