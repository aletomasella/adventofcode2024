import { readInput } from "../utils.ts";

const PATH_TO_DAY_FOUR_TEST_INPUT = "./DayFour/DayFour.input.test.txt";
const PATH_TO_DAY_FOUR_INPUT = "./DayFour/DayFour.input.txt";

const RESULT_DAY_FOUR_PART_ONE_TEST = 18;
const RESULT_DAY_FOUR_PART_TWO_TEST = 9;

const WORD_TO_FIND = ["X", "M", "A", "S"] as const;

const FIRST_LETTER = WORD_TO_FIND[0];

const MATRIX_TRAVERSAL = [
  "DIAGONAL_UP_LEFT",
  "DIAGONAL_UP_RIGHT",
  "DIAGONAL_DOWN_LEFT",
  "DIAGONAL_DOWN_RIGHT",
  "HORIZONTAL",
  "HORIZONTAL_BACKWARDS",
  "VERTICAL_UP",
  "VERTICAL_DOWN",
] as const;

type MATRIX_TRAVERSAL_TYPE = (typeof MATRIX_TRAVERSAL)[number];

function wordFound({
  wordLetters,
  matrix,
  startingPoint,
  traversal,
}: {
  matrix: string[][];
  wordLetters: typeof WORD_TO_FIND;
  traversal: MATRIX_TRAVERSAL_TYPE;
  startingPoint: [number, number];
}): boolean {
  let [x, y] = startingPoint;
  let wordIndex = 0;

  while (wordIndex < wordLetters.length) {
    if (x < 0 || y < 0 || x >= matrix.length || y >= matrix[x].length)
      return false;
    if (matrix[x][y] !== wordLetters[wordIndex]) return false;

    // console.log(x, y, matrix[x][y], wordLetters[wordIndex]);

    switch (traversal) {
      case "DIAGONAL_UP_LEFT":
        x--;
        y--;
        break;
      case "DIAGONAL_UP_RIGHT":
        x--;
        y++;
        break;
      case "DIAGONAL_DOWN_LEFT":
        x++;
        y--;
        break;
      case "DIAGONAL_DOWN_RIGHT":
        x++;
        y++;
        break;
      case "HORIZONTAL":
        y++;
        break;
      case "HORIZONTAL_BACKWARDS":
        y--;
        break;
      case "VERTICAL_UP":
        x--;
        break;
      case "VERTICAL_DOWN":
        x++;
        break;
    }

    wordIndex++;
  }

  return true;
}

async function dayFourPartOne(path: string): Promise<number> {
  const data = await readInput(path);
  // WE NEED TO FIND THE WORD "XMAS" (DIAGONAL, HORIZONTAL, VERTICAL, BACKWARDS)
  // WE NEED TO COUNT HOW MANY TIMES WE FIND THE WORD

  let result = 0;

  const matrix = data.split("\n").map((line) => line.split(""));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const currentLetter = matrix[i][j];
      if (currentLetter !== FIRST_LETTER) continue;

      for (const traversal of MATRIX_TRAVERSAL) {
        if (
          wordFound({
            matrix,
            wordLetters: WORD_TO_FIND,
            traversal,
            startingPoint: [i, j],
          })
        ) {
          result++;
        }
      }
    }
  }

  return result;
}

async function dayFourPartTwo(path: string): Promise<number> {
  const data = await readInput(path);

  let result = 0;

  return result;
}

export {
  PATH_TO_DAY_FOUR_INPUT,
  PATH_TO_DAY_FOUR_TEST_INPUT,
  RESULT_DAY_FOUR_PART_ONE_TEST,
  RESULT_DAY_FOUR_PART_TWO_TEST,
  dayFourPartOne,
  dayFourPartTwo,
};
