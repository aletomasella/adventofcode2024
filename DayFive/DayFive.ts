import { readInput } from "../utils.ts";

const PATH_TO_DAY_FIVE_TEST_INPUT = "./DayFive/DayFive.input.test.txt";
const PATH_TO_DAY_FIVE_INPUT = "./DayFive/DayFive.input.txt";

const RESULT_DAY_FIVE_PART_ONE_TEST = 143;
const RESULT_DAY_FIVE_PART_TWO_TEST = 9;

const RULES_SEPARATOR = "|";

const PAGES_SEPARATOR = ",";

async function dayFivePartOne(path: string): Promise<number> {
  const data = await readInput(path);

  // First we parsed the data, we are going to have order rules first and then pages
  const lines = data.split("\n");

  const rules: [number, number][] = [];

  const pages: number[][] = [];

  const rulesAux: Map<number, number[]> = new Map();

  // Result must be the mid value of the valid pages according to the rules
  let result = 0;

  for (const line of lines) {
    if (!line.trim()) continue;

    if (line.includes(RULES_SEPARATOR)) {
      const [beforePage, afterPage] = line.split(RULES_SEPARATOR);
      rules.push([Number(beforePage), Number(afterPage)]);
    }

    if (line.includes(PAGES_SEPARATOR)) {
      const page = line.split(PAGES_SEPARATOR).map(Number);
      pages.push(page);
    }
  }

  for (const [beforePage, afterPage] of rules) {
    if (!rulesAux.has(beforePage)) {
      rulesAux.set(beforePage, []);
    }

    rulesAux.get(beforePage)?.push(afterPage);
  }

  for (const page of pages) {
    let valid = true;

    const SECOND_PAGE = 1;

    const previousPages: number[] = [page[0]];

    for (let i = SECOND_PAGE; i < page.length; i++) {
      const currentPage = page[i];

      const currentPageRules = rulesAux.get(currentPage);

      if (!currentPageRules) {
        previousPages.push(currentPage);
        continue;
      }

      for (const previousPage of previousPages) {
        if (currentPageRules.includes(previousPage)) {
          valid = false;
          break;
        }
      }
      previousPages.push(currentPage);
    }

    if (valid) {
      const midIndex = Math.floor(page.length / 2);
      result += page[midIndex];
    }
  }

  return result;
}

async function dayFivePartTwo(path: string): Promise<number> {
  const data = await readInput(path);

  let result = 0;

  return result;
}

export {
  PATH_TO_DAY_FIVE_INPUT,
  PATH_TO_DAY_FIVE_TEST_INPUT,
  RESULT_DAY_FIVE_PART_ONE_TEST,
  RESULT_DAY_FIVE_PART_TWO_TEST,
  dayFivePartOne,
  dayFivePartTwo,
};
