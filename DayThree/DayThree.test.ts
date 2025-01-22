import assert from "node:assert/strict";
import {
  PATH_TO_DAY_THREE_TEST_INPUT,
  dayThreePartOne,
  RESULT_DAY_THREE_PART_ONE_TEST,
  dayThreePartTwo,
  RESULT_DAY_THREE_PART_TWO_TEST,
} from "../DayThree/DayThree.ts";

assert.deepEqual(
  await dayThreePartOne(PATH_TO_DAY_THREE_TEST_INPUT),
  RESULT_DAY_THREE_PART_ONE_TEST
);

assert.deepEqual(
  await dayThreePartTwo(PATH_TO_DAY_THREE_TEST_INPUT),
  RESULT_DAY_THREE_PART_TWO_TEST
);
