import assert from "node:assert/strict";
import {
  PATH_TO_DAY_SIX_TEST_INPUT,
  daySixPartOne,
  RESULT_DAY_SIX_PART_ONE_TEST,
  daySixPartTwo,
  RESULT_DAY_SIX_PART_TWO_TEST,
} from "../DaySix/DaySix.ts";

assert.deepEqual(
  await daySixPartOne(PATH_TO_DAY_SIX_TEST_INPUT),
  RESULT_DAY_SIX_PART_ONE_TEST
);

// assert.deepEqual(
//   await daySixPartTwo(PATH_TO_DAY_SIX_TEST_INPUT),
//   RESULT_DAY_SIX_PART_TWO_TEST
// );
