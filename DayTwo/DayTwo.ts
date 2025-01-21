import { readInput } from "../utils.ts";

const PATH_TO_DAY_TWO_TEST_INPUT = "./DayTwo/DayTwo.input.test.txt";
const PATH_TO_DAY_TWO_INPUT = "./DayTwo/DayTwo.input.txt";

const RESULT_DAY_TWO_PART_ONE_TEST = 2;
const RESULT_DAY_TWO_PART_TWO_TEST = 4;

const LINE_SEPARATOR = "\n";
const COLUMN_SEPARATOR = " ";

function validateLevels(levels: number[], maxLevelDiff: number): boolean {
  let previousLevelValue = Infinity;
  let reportPolicy = ReportPolicy.UNDEFINED;

  for (let i = 0; i < levels.length; i++) {
    const currentLevel = levels[i];

    if (previousLevelValue === Infinity) {
      previousLevelValue = currentLevel;
      const nextLevel = levels[i + 1];

      if (currentLevel === nextLevel) {
        return false;
      }

      if (
        nextLevel > currentLevel &&
        nextLevel - currentLevel <= maxLevelDiff
      ) {
        reportPolicy = ReportPolicy.INCREMENTAL;
      } else if (
        nextLevel < currentLevel &&
        currentLevel - nextLevel <= maxLevelDiff
      ) {
        reportPolicy = ReportPolicy.DECREMENTAL;
      } else {
        return false;
      }
      i += 1;
      previousLevelValue = nextLevel;
      continue;
    }

    if (
      reportPolicy === ReportPolicy.INCREMENTAL &&
      (currentLevel <= previousLevelValue ||
        currentLevel > previousLevelValue + maxLevelDiff)
    ) {
      return false;
    }

    if (
      reportPolicy === ReportPolicy.DECREMENTAL &&
      (currentLevel >= previousLevelValue ||
        currentLevel < previousLevelValue - maxLevelDiff)
    ) {
      return false;
    }

    previousLevelValue = currentLevel;
  }
  return true;
}

async function dayTwoPartOne(path: string): Promise<number> {
  const data = await readInput(path);

  const lines = data.split(LINE_SEPARATOR);

  let safeReports = 0;

  const MAX_LEVEL_DIFF = 3;

  for (const line of lines) {
    const levels = line.split(COLUMN_SEPARATOR);

    const isSafe = validateLevels(levels.map(Number), MAX_LEVEL_DIFF);

    if (isSafe) {
      safeReports++;
    }
  }

  return safeReports;
}

async function dayTwoPartTwo(path: string): Promise<number> {
  const data = await readInput(path);

  const lines = data.split(LINE_SEPARATOR);

  let safeReports = 0;

  const MAX_LEVEL_DIFF = 3;

  for (const line of lines) {
    const levels = line.split(COLUMN_SEPARATOR);

    // We first check if the current level is safe
    const isSafe = validateLevels(levels.map(Number), MAX_LEVEL_DIFF);
    if (isSafe) {
      safeReports++;
      continue;
    }

    // We need to try to remove the unsafe level checking from the first level to the end of the list
    for (let i = 0; i < levels.length; i++) {
      const newLevels = [...levels];
      newLevels.splice(i, 1);

      const isSafe = validateLevels(newLevels.map(Number), MAX_LEVEL_DIFF);

      if (isSafe) {
        safeReports++;
        break;
      }
    }
  }

  return safeReports;
}

const ReportPolicy = {
  UNDEFINED: 0,
  INCREMENTAL: 1,
  DECREMENTAL: 2,
};

export {
  PATH_TO_DAY_TWO_INPUT,
  PATH_TO_DAY_TWO_TEST_INPUT,
  dayTwoPartOne,
  dayTwoPartTwo,
  RESULT_DAY_TWO_PART_ONE_TEST,
  RESULT_DAY_TWO_PART_TWO_TEST,
};
