import convertNumber from "./convertNumber";

const testCases = [
  { input: 7, expected: "seven" },
  { input: 42, expected: "forty-two" },
  { input: 2001, expected: "two thousand and one" },
  { input: 1999, expected: "nineteen hundred and ninety-nine" },
  { input: 17999, expected: "seventeen thousand nine hundred and ninety-nine" },
  { input: 1200, expected: "twelve hundred" },
  { input: 1001200, expected: "one million one thousand two hundred" },
  {
    input: 232001200,
    expected: "two hundred and thirty-two million one thousand two hundred",
  },
  { input: null, expected: "zero" },
];

it("converts numbers correctly", () => {
  testCases.forEach((testCase) => {
    const converted = convertNumber(testCase.input);

    expect(converted).toBe(testCase.expected);
  });
});

it("throws error if number larger than or equal to 10^21)", () => {
  expect(() => {
    convertNumber(Math.pow(10, 21));
  }).toThrow();
});

it("doesn't throw error if number is less than 10^21", () => {
  expect(() => {
    convertNumber(99999999999999999999);
  }).not.toThrow();
});
