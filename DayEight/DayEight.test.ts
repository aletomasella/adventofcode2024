import assert from "node:assert/strict";
import {
  PATH_TO_DAY_EIGHT_TEST_INPUT,
  dayEightPartOne,
  RESULT_DAY_EIGHT_PART_ONE_TEST,
  dayEightPartTwo,
  RESULT_DAY_EIGHT_PART_TWO_TEST,
} from "../DayEight/DayEight.ts";

assert.deepEqual(
  await dayEightPartOne(PATH_TO_DAY_EIGHT_TEST_INPUT),
  RESULT_DAY_EIGHT_PART_ONE_TEST
);

// assert.deepEqual(
//   await dayEightPartTwo(PATH_TO_DAY_EIGHT_TEST_INPUT),
//   RESULT_DAY_EIGHT_PART_TWO_TEST
// );
