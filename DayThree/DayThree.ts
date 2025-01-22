import { readInput } from "../utils.ts";

const PATH_TO_DAY_THREE_TEST_INPUT = "./DayThree/DayThree.input.test.txt";
const PATH_TO_DAY_THREE_INPUT = "./DayThree/DayThree.input.txt";

const RESULT_DAY_THREE_PART_ONE_TEST = 161;
const RESULT_DAY_THREE_PART_TWO_TEST = 48;

const NUMBER_SEPARATOR = ",";

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

const FIRST_PART_REGEX = new RegExp(/mul\(\d+,\d+\)/, "g");
const SECOND_PART_REGEX = new RegExp(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/, "g");

async function dayThreePartOne(path: string): Promise<number> {
  const data = await readInput(path);

  const matches = Array.from(data.match(FIRST_PART_REGEX)?.values() || []);

  let result = 0;

  for (const match of matches) {
    const [a, b] = match
      .replace("mul(", "")
      .replace(")", "")
      .split(NUMBER_SEPARATOR)
      .map((number) => Number(number));

    result += multiplyNumbers(a, b);
  }

  return result;
}

async function dayThreePartTwo(path: string): Promise<number> {
  const data = await readInput(path);

  const matches = Array.from(data.match(SECOND_PART_REGEX)?.values() || []);

  let result = 0;

  let sumResult = true;

  const DO = "do()";

  const DON_T = "don't()";

  for (const match of matches) {
    if (match === DO) {
      sumResult = true;
      continue;
    }

    if (match === DON_T) {
      sumResult = false;
      continue;
    }

    if (sumResult) {
      const [a, b] = match
        .replace("mul(", "")
        .replace(")", "")
        .split(NUMBER_SEPARATOR)
        .map((number) => Number(number));

      result += multiplyNumbers(a, b);
    }
  }

  return result;
}

export {
  PATH_TO_DAY_THREE_INPUT,
  PATH_TO_DAY_THREE_TEST_INPUT,
  RESULT_DAY_THREE_PART_ONE_TEST,
  RESULT_DAY_THREE_PART_TWO_TEST,
  dayThreePartOne,
  dayThreePartTwo,
};
