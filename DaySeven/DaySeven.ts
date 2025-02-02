import { readInput } from "../utils.ts";

const PATH_TO_DAY_SEVEN_TEST_INPUT = "./DaySeven/DaySeven.input.test.txt";
const PATH_TO_DAY_SEVEN_INPUT = "./DaySeven/DaySeven.input.txt";

const RESULT_DAY_SEVEN_PART_ONE_TEST = 3749;
const RESULT_DAY_SEVEN_PART_TWO_TEST = 11387;

const POSIBLE_OPERATIONS_PART_ONE = ["*", "+"];
const POSIBLE_OPERATIONS_PART_TWO = ["*", "+", "|"];

const RESULT_SEPARETOR = ":";

const NUMBER_SEPARATOR = " ";

function processNumbers(
  resultTarget: number,
  numbers: number[],
  operations: string[]
): number {
  if (!numbers.length) return 0;

  if (numbers.length === 1)
    return numbers[0] === resultTarget ? resultTarget : 0;

  const [firstNumber, secondNumber] = numbers;

  const resultMapper = new Map<string, number>();

  for (const op of operations) {
    let currentResult = firstNumber;

    switch (op) {
      case "+":
        currentResult += secondNumber as number;
        resultMapper.set(op, currentResult);
        break;

      case "*":
        currentResult *= secondNumber as number;
        resultMapper.set(op, currentResult);
        break;
      case "|":
        currentResult = Number(`${firstNumber}${secondNumber}`);
        resultMapper.set(op, currentResult);
        break;
    }
  }

  for (let i = 2; i < numbers.length; i++) {
    const currentNumber = numbers[i];

    const resultMapperKeys = Array.from(resultMapper.keys()).filter(
      (k) => k.length === i - 1
    );

    for (const key of resultMapperKeys) {
      const currentCalculatedResult = resultMapper.get(key) as number;

      for (const op of operations) {
        let currentResult = 0;

        switch (op) {
          case "+": {
            currentResult = currentNumber + currentCalculatedResult;
            resultMapper.set(`${key}${op}`, currentResult);
            break;
          }
          case "*": {
            currentResult = currentNumber * currentCalculatedResult;
            resultMapper.set(`${key}${op}`, currentResult);
            break;
          }
          case "|": {
            // We concat the previous result to the current number
            currentResult = Number(
              `${currentCalculatedResult}${currentNumber}`
            );
            resultMapper.set(`${key}${op}`, currentResult);

            break;
          }
        }
      }
    }
  }

  const lastKeys = Array.from(resultMapper.keys()).filter(
    (k) => k.length === numbers.length - 1
  );

  for (const key of lastKeys) {
    const currentCalculatedResult = resultMapper.get(key) as number;

    if (currentCalculatedResult === resultTarget) return resultTarget;
  }

  return 0;
}

async function daySevenPartOne(path: string): Promise<number> {
  const data = await readInput(path);

  const lines = data.split("\n");

  let result = 0;

  for (const line of lines) {
    const [lineResult, numbers] = line.split(RESULT_SEPARETOR);

    const resultNumber = Number(lineResult.trim());

    if (isNaN(resultNumber)) continue;

    const numbersArray = numbers
      .split(NUMBER_SEPARATOR)
      .filter((n) => n.trim())
      .map((n) => Number(n.trim()));

    const lineProcessResult = processNumbers(
      resultNumber,
      numbersArray,
      POSIBLE_OPERATIONS_PART_ONE
    );

    result += lineProcessResult;
  }

  return result;
}

async function daySevenPartTwo(path: string): Promise<number> {
  const data = await readInput(path);

  const lines = data.split("\n");

  let result = 0;

  for (const line of lines) {
    const [lineResult, numbers] = line.split(RESULT_SEPARETOR);

    const resultNumber = Number(lineResult.trim());

    if (isNaN(resultNumber)) continue;

    const numbersArray = numbers
      .split(NUMBER_SEPARATOR)
      .filter((n) => n.trim())
      .map((n) => Number(n.trim()));

    const lineProcessResult = processNumbers(
      resultNumber,
      numbersArray,
      POSIBLE_OPERATIONS_PART_TWO
    );

    result += lineProcessResult;
  }

  return result;
}

export {
  PATH_TO_DAY_SEVEN_INPUT,
  PATH_TO_DAY_SEVEN_TEST_INPUT,
  RESULT_DAY_SEVEN_PART_ONE_TEST,
  RESULT_DAY_SEVEN_PART_TWO_TEST,
  daySevenPartOne,
  daySevenPartTwo,
};
