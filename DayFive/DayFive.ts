import { readInput } from "../utils.ts";

const PATH_TO_DAY_FIVE_TEST_INPUT = "./DayFive/DayFive.input.test.txt";
const PATH_TO_DAY_FIVE_INPUT = "./DayFive/DayFive.input.txt";

const RESULT_DAY_FIVE_PART_ONE_TEST = 143;
const RESULT_DAY_FIVE_PART_TWO_TEST = 123;

const RULES_SEPARATOR = "|";

const PAGES_SEPARATOR = ",";

function validatePage(page: number[], rules: Map<number, number[]>): boolean {
  let valid = true;

  const SECOND_PAGE = 1;

  const previousPages: number[] = [page[0]];

  for (let i = SECOND_PAGE; i < page.length; i++) {
    const currentPage = page[i];

    const currentPageRules = rules.get(currentPage);

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

  return valid;
}

function orderPageBasedOnRules(
  pages: number[],
  rules: Map<number, number[]>
): number[] {
  const orderedPages: number[] = [];

  const pagesToOrder = [...pages];

  const SECOND_PAGE = 1;

  const previousPages: number[] = [pagesToOrder[0]];

  orderedPages.push(pagesToOrder[0]);

  for (let i = SECOND_PAGE; i < pagesToOrder.length; i++) {
    const currentPage = pagesToOrder[i];

    const currentPageRules = rules.get(currentPage);

    if (!currentPageRules) {
      previousPages.push(currentPage);
      orderedPages.push(currentPage);
      continue;
    }

    for (const previousPage of previousPages) {
      if (currentPageRules.includes(previousPage)) {
        // We need to remove the previous page from the ordered pages and push it back after the current page
        orderedPages.splice(orderedPages.indexOf(previousPage), 1);
        orderedPages.push(currentPage);
        orderedPages.push(previousPage);
        break;
      }
    }
    previousPages.push(currentPage);
  }

  // We need to push the pages that we missed at the end
  if (orderedPages.length < pagesToOrder.length) {
    for (const page of pagesToOrder) {
      if (!orderedPages.includes(page)) {
        orderedPages.push(page);
      }
    }
  }

  return orderedPages;
}

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
    const valid = validatePage(page, rulesAux);

    if (valid) {
      const midIndex = Math.floor(page.length / 2);
      result += page[midIndex];
    }
  }

  return result;
}

async function dayFivePartTwo(path: string): Promise<number> {
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
    const valid = validatePage(page, rulesAux);

    if (!valid) {
      // We need to order the page based on the rules
      while (!validatePage(page, rulesAux)) {
        const orderPage = orderPageBasedOnRules(page, rulesAux);
        page.splice(0, page.length, ...orderPage);
      }
      // After ordering the page we need to find the mid value
      const midIndex = Math.floor(page.length / 2);
      result += page[midIndex];
    }
  }

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
