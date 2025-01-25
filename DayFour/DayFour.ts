import { readInput } from "../utils.ts";

const PATH_TO_DAY_FOUR_TEST_INPUT = "./DayFour/DayFour.input.test.txt";
const PATH_TO_DAY_FOUR_INPUT = "./DayFour/DayFour.input.txt";

const RESULT_DAY_FOUR_PART_ONE_TEST = 18;
const RESULT_DAY_FOUR_PART_TWO_TEST = 9;

const WORD_TO_FIND_PART_ONE = ["X", "M", "A", "S"] as const;

const WORD_TO_FIND_PART_TWO = ["M", "A", "S"] as const;

const FIRST_LETTER_TO_FIND_PART_ONE = WORD_TO_FIND_PART_ONE[0];

const FIRST_LETTER_TO_FIND_PART_TWO = WORD_TO_FIND_PART_TWO[1];

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

const DIAGONAL_ONE_MOVEMENTS = [
  "DIAGONAL_UP_LEFT",
  "DIAGONAL_DOWN_RIGHT",
] as const;

const DIAGONAL_TWO_MOVEMENTS = [
  "DIAGONAL_UP_RIGHT",
  "DIAGONAL_DOWN_LEFT",
] as const;

function wordFound({
  wordLetters,
  matrix,
  startingPoint,
  traversal,
}: {
  matrix: string[][];
  wordLetters: typeof WORD_TO_FIND_PART_ONE;
  traversal: MATRIX_TRAVERSAL_TYPE;
  startingPoint: [number, number];
}): boolean {
  let [x, y] = startingPoint;
  let wordIndex = 0;

  while (wordIndex < wordLetters.length) {
    if (x < 0 || y < 0 || x >= matrix.length || y >= matrix[x].length)
      return false;
    if (matrix[x][y] !== wordLetters[wordIndex]) return false;

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

function findMASWordInXShape({
  matrix,
  startingPoint,
  wordLetters,
}: {
  matrix: string[][];
  startingPoint: [number, number];
  wordLetters: typeof WORD_TO_FIND_PART_TWO;
}): boolean {
  let [x, y] = startingPoint;

  // To allow us to remove the letters "M" and "S" from the array
  const copyOfWordLetters = [...wordLetters] as string[];

  // We make a copy of filteredWordLetters cause we need to find it twice in diagonal
  const copyOfWordLettersClone = [...copyOfWordLetters];

  for (const traversal of DIAGONAL_ONE_MOVEMENTS) {
    while (copyOfWordLetters.length) {
      if (x < 0 || y < 0 || x >= matrix.length || y >= matrix[x].length)
        return false;

      const letterIndex = copyOfWordLetters.indexOf(matrix[x][y]);

      // If we don't find the letter in the matrix we return false
      if (letterIndex === -1) return false;

      // If we find the letter "A" and it's not the starting point we return false
      if (
        copyOfWordLetters[letterIndex] === FIRST_LETTER_TO_FIND_PART_TWO &&
        (x !== startingPoint[0] || y !== startingPoint[1])
      ) {
        return false;
      }

      // If we find the letters "S" || "M" we remove it from the array and break the loop to find the other missing letter
      if (copyOfWordLetters[letterIndex] !== FIRST_LETTER_TO_FIND_PART_TWO) {
        copyOfWordLetters.splice(letterIndex, 1);
        break;
      }

      switch (traversal) {
        case "DIAGONAL_UP_LEFT":
          x--;
          y++;
          break;
        case "DIAGONAL_DOWN_RIGHT":
          x++;
          y--;
          break;
      }
    }

    // We need to restart the variables
    x = startingPoint[0];
    y = startingPoint[1];
  }

  // We need to find the word in the other diagonal
  for (const traversal of DIAGONAL_TWO_MOVEMENTS) {
    while (copyOfWordLettersClone.length) {
      if (x < 0 || y < 0 || x >= matrix.length || y >= matrix[x].length)
        return false;

      const letterIndex = copyOfWordLettersClone.indexOf(matrix[x][y]);
      if (letterIndex === -1) return false;

      if (
        copyOfWordLettersClone[letterIndex] === FIRST_LETTER_TO_FIND_PART_TWO &&
        (x !== startingPoint[0] || y !== startingPoint[1])
      ) {
        return false;
      }

      if (
        copyOfWordLettersClone[letterIndex] !== FIRST_LETTER_TO_FIND_PART_TWO
      ) {
        copyOfWordLettersClone.splice(letterIndex, 1);
        break;
      }

      switch (traversal) {
        case "DIAGONAL_UP_RIGHT":
          x--;
          y--;
          break;
        case "DIAGONAL_DOWN_LEFT":
          x++;
          y++;
          break;
      }
    }

    // We need to restart the variables
    x = startingPoint[0];
    y = startingPoint[1];
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
      if (currentLetter !== FIRST_LETTER_TO_FIND_PART_ONE) continue;

      for (const traversal of MATRIX_TRAVERSAL) {
        if (
          wordFound({
            matrix,
            wordLetters: WORD_TO_FIND_PART_ONE,
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

  const matrix = data.split("\n").map((line) => line.split(""));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const currentLetter = matrix[i][j];
      if (currentLetter !== FIRST_LETTER_TO_FIND_PART_TWO) continue;

      if (
        findMASWordInXShape({
          matrix,
          startingPoint: [i, j],
          wordLetters: WORD_TO_FIND_PART_TWO,
        })
      ) {
        result++;
      }
    }
  }

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
