import assert from "node:assert/strict";
import {
  PATH_TO_DAY_FOUR_TEST_INPUT,
  dayFourPartOne,
  RESULT_DAY_FOUR_PART_ONE_TEST,
  dayFourPartTwo,
  RESULT_DAY_FOUR_PART_TWO_TEST,
} from "../DayFour/DayFour.ts";

assert.deepEqual(
  await dayFourPartOne(PATH_TO_DAY_FOUR_TEST_INPUT),
  RESULT_DAY_FOUR_PART_ONE_TEST
);

// assert.deepEqual(
//   await dayFourPartTwo(PATH_TO_DAY_FOUR_TEST_INPUT),
//   RESULT_DAY_FOUR_PART_TWO_TEST
// );
