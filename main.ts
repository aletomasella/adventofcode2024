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
  printResult(4, 2, (await dayFourPartTwo(PATH_TO_DAY_FOUR_INPUT)).toString());
}

await main();
