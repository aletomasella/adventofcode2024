import assert from "node:assert/strict";
import {
  PATH_TO_DAY_FIVE_TEST_INPUT,
  dayFivePartOne,
  RESULT_DAY_FIVE_PART_ONE_TEST,
  dayFivePartTwo,
  RESULT_DAY_FIVE_PART_TWO_TEST,
} from "../DayFive/DayFive.ts";

assert.deepEqual(
  await dayFivePartOne(PATH_TO_DAY_FIVE_TEST_INPUT),
  RESULT_DAY_FIVE_PART_ONE_TEST
);

// assert.deepEqual(
//   await dayFivePartTwo(PATH_TO_DAY_FIVE_TEST_INPUT),
//   RESULT_DAY_FIVE_PART_TWO_TEST
// );
