import assert from "node:assert/strict";
import {
  PATH_TO_DAY_TWO_TEST_INPUT,
  dayTwoPartOne,
  RESULT_DAY_TWO_PART_ONE_TEST,
  dayTwoPartTwo,
  RESULT_DAY_TWO_PART_TWO_TEST,
} from "../DayTwo/DayTwo.ts";

assert.deepEqual(
  await dayTwoPartOne(PATH_TO_DAY_TWO_TEST_INPUT),
  RESULT_DAY_TWO_PART_ONE_TEST
);

assert.deepEqual(
  await dayTwoPartTwo(PATH_TO_DAY_TWO_TEST_INPUT),
  RESULT_DAY_TWO_PART_TWO_TEST
);
