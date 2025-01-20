import { readInput } from "../utils.ts";

const PATH_TO_DAY_ONE_TEST_INPUT = "./DayOne/DayOne.input.test.txt";
const PATH_TO_DAY_ONE_INPUT = "./DayOne/DayOne.input.txt";

const RESULT_DAY_ONE_PART_ONE_TEST = 11;
const RESULT_DAY_ONE_PART_TWO_TEST = 31;

async function dayOnePartOne(path: string): Promise<number> {
  const data = await readInput(path);

  // We start one list for each column
  const firstColumn: number[] = [];
  const secondColumn: number[] = [];

  const LINE_SEPARATOR = "\n";
  const COLUMN_SEPARATOR = "   ";

  const lines = data.split(LINE_SEPARATOR);

  for (const line of lines) {
    const [first, second] = line.split(COLUMN_SEPARATOR);
    firstColumn.push(Number(first));
    secondColumn.push(Number(second));
  }

  //console.log(firstColumn);
  //console.log(secondColumn);

  // Then we sort the lists
  firstColumn.sort((a, b) => a - b);
  secondColumn.sort((a, b) => a - b);

  // Then we get the result
  const result = firstColumn.reduce((acc, current, index) => {
    const second = secondColumn[index];
    acc += Math.abs(current - second);
    return acc;
  }, 0);

  return result;
}

async function dayOnePartTwo(path: string): Promise<number> {
  const data = await readInput(path);

  // We start one list for each column
  const firstColumn: number[] = [];
  const secondColumn: number[] = [];

  const LINE_SEPARATOR = "\n";
  const COLUMN_SEPARATOR = "   ";

  const lines = data.split(LINE_SEPARATOR);

  const secondColumnCounter: { [key: number]: number } = {};

  for (const line of lines) {
    const [first, second] = line.split(COLUMN_SEPARATOR);
    firstColumn.push(Number(first));

    if (secondColumnCounter[Number(second)]) {
      secondColumnCounter[Number(second)]++;
    } else {
      secondColumnCounter[Number(second)] = 1;
    }
    secondColumn.push(Number(second));
  }

  // Then we get the result
  const result = firstColumn.reduce((acc, current, index) => {
    acc += current * secondColumnCounter[current] || 0;
    return acc;
  }, 0);

  return result;
}

export {
  PATH_TO_DAY_ONE_INPUT,
  PATH_TO_DAY_ONE_TEST_INPUT,
  dayOnePartOne,
  RESULT_DAY_ONE_PART_ONE_TEST,
  RESULT_DAY_ONE_PART_TWO_TEST,
  dayOnePartTwo,
};
