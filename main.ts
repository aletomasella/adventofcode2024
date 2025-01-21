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

function printResult(day: number, part: number, result: string) {
  console.log(`Day ${day} - Part ${part}: ${result}`);
}

async function main() {
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
}

await main();
