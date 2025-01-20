import assert from "node:assert/strict";
import {
  PATH_TO_DAY_ONE_TEST_INPUT,
  dayOnePartOne,
  RESULT_DAY_ONE_PART_ONE_TEST,
  dayOnePartTwo,
  RESULT_DAY_ONE_PART_TWO_TEST,
} from "../DayOne/DayOne.ts";

assert.deepEqual(
  await dayOnePartOne(PATH_TO_DAY_ONE_TEST_INPUT),
  RESULT_DAY_ONE_PART_ONE_TEST
);

assert.deepEqual(
  await dayOnePartTwo(PATH_TO_DAY_ONE_TEST_INPUT),
  RESULT_DAY_ONE_PART_TWO_TEST
);
