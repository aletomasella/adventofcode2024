import assert from "node:assert/strict";
import {
  PATH_TO_DAY_SEVEN_TEST_INPUT,
  daySevenPartOne,
  RESULT_DAY_SEVEN_PART_ONE_TEST,
  daySevenPartTwo,
  RESULT_DAY_SEVEN_PART_TWO_TEST,
} from "../DaySeven/DaySeven.ts";

assert.deepEqual(
  await daySevenPartOne(PATH_TO_DAY_SEVEN_TEST_INPUT),
  RESULT_DAY_SEVEN_PART_ONE_TEST
);

assert.deepEqual(
  await daySevenPartTwo(PATH_TO_DAY_SEVEN_TEST_INPUT),
  RESULT_DAY_SEVEN_PART_TWO_TEST
);
