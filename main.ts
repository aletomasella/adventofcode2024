import {
  dayOnePartOne,
  PATH_TO_DAY_ONE_INPUT,
  dayOnePartTwo,
  PATH_TO_DAY_ONE_TEST_INPUT,
} from "./DayOne/DayOne.ts";
import {
  dayTwoPartOne,
  PATH_TO_DAY_TWO_INPUT,
  dayTwoPartTwo,
  PATH_TO_DAY_TWO_TEST_INPUT,
} from "./DayTwo/DayTwo.ts";
import {
  dayThreePartOne,
  PATH_TO_DAY_THREE_INPUT,
  dayThreePartTwo,
  PATH_TO_DAY_THREE_TEST_INPUT,
} from "./DayThree/DayThree.ts";
import {
  dayFourPartOne,
  PATH_TO_DAY_FOUR_INPUT,
  dayFourPartTwo,
  PATH_TO_DAY_FOUR_TEST_INPUT,
} from "./DayFour/DayFour.ts";
import {
  dayFivePartOne,
  PATH_TO_DAY_FIVE_INPUT,
  dayFivePartTwo,
  PATH_TO_DAY_FIVE_TEST_INPUT,
} from "./DayFive/DayFive.ts";
import {
  daySixPartOne,
  PATH_TO_DAY_SIX_INPUT,
  daySixPartTwo,
  PATH_TO_DAY_SIX_TEST_INPUT,
} from "./DaySix/DaySix.ts";
import {
  daySevenPartOne,
  PATH_TO_DAY_SEVEN_INPUT,
  PATH_TO_DAY_SEVEN_TEST_INPUT,
  RESULT_DAY_SEVEN_PART_ONE_TEST,
  daySevenPartTwo,
  RESULT_DAY_SEVEN_PART_TWO_TEST,
} from "./DaySeven/DaySeven.ts";
import {
  dayEightPartOne,
  dayEightPartTwo,
  PATH_TO_DAY_EIGHT_INPUT,
  PATH_TO_DAY_EIGHT_TEST_INPUT,
  RESULT_DAY_EIGHT_PART_ONE_TEST,
  RESULT_DAY_EIGHT_PART_TWO_TEST,
} from "./DayEight/DayEight.ts";

function printResult(day: number, part: number, result: string) {
  console.log(`Day ${day} - Part ${part}: ${result}`);
}

async function main() {
  // DAY ONE
  printResult(
    1,
    1,
    (await dayOnePartOne(PATH_TO_DAY_ONE_TEST_INPUT)).toString()
  );
  printResult(
    1,
    2,
    (await dayOnePartTwo(PATH_TO_DAY_ONE_TEST_INPUT)).toString()
  );
  // DAY TWO
  printResult(
    2,
    1,
    (await dayTwoPartOne(PATH_TO_DAY_TWO_TEST_INPUT)).toString()
  );
  printResult(
    2,
    2,
    (await dayTwoPartTwo(PATH_TO_DAY_TWO_TEST_INPUT)).toString()
  );
  // DAY THREE
  printResult(
    3,
    1,
    (await dayThreePartOne(PATH_TO_DAY_THREE_TEST_INPUT)).toString()
  );
  printResult(
    3,
    2,
    (await dayThreePartTwo(PATH_TO_DAY_THREE_TEST_INPUT)).toString()
  );
  // DAY FOUR
  printResult(
    4,
    1,
    (await dayFourPartOne(PATH_TO_DAY_FOUR_TEST_INPUT)).toString()
  );
  printResult(
    4,
    2,
    (await dayFourPartTwo(PATH_TO_DAY_FOUR_TEST_INPUT)).toString()
  );
  // DAY FIVE
  printResult(
    5,
    1,
    (await dayFivePartOne(PATH_TO_DAY_FIVE_TEST_INPUT)).toString()
  );
  printResult(
    5,
    2,
    (await dayFivePartTwo(PATH_TO_DAY_FIVE_TEST_INPUT)).toString()
  );
  // DAY SIX
  printResult(
    6,
    1,
    (await daySixPartOne(PATH_TO_DAY_SIX_TEST_INPUT)).toString()
  );
  printResult(
    6,
    2,
    (await daySixPartTwo(PATH_TO_DAY_SIX_TEST_INPUT)).toString()
  );
  // DAY SEVEN
  printResult(
    7,
    1,
    (await daySevenPartOne(PATH_TO_DAY_SEVEN_TEST_INPUT)).toString()
  );
  printResult(
    7,
    2,
    (await daySevenPartTwo(PATH_TO_DAY_SEVEN_TEST_INPUT)).toString()
  );
  // DAY EIGHT
  printResult(
    8,
    1,
    (await dayEightPartOne(PATH_TO_DAY_EIGHT_TEST_INPUT)).toString()
  );
  printResult(
    8,
    2,
    (await dayEightPartTwo(PATH_TO_DAY_EIGHT_TEST_INPUT)).toString()
  );
}

await main();
