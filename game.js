import { rl } from "./index.js";

const playerGuesses = [];

const getUserGuess = async () => {
  return await new Promise(resolve => {
    rl.question("Guess the 4-digit Number: ", answer => {
      // if (answer.trim() === "history" || answer.trim() === "hint") {
      //   resolve(answer);
      // }
      // if (answer.trim().length !== 4 || isNaN(Number(answer))) {
      //   getUserGuess().then(resolve);
      // } else {
      //   resolve(answer);
      // }
      resolve(answer);
    });
  });
};

const validateCode = async (code, userGuess) => {
  let correctNumbers = 0;
  let correctLocations = 0;
  const guessCheck = {};

  for (let i of userGuess) {
    const index = userGuess.indexOf(i);
    if (code[index] === userGuess[index]) {
      correctLocations++;
    }
    if (code.includes(i) && guessCheck[`${i}`]) {
      const startIndex = guessCheck[`${i}`] + 1;
      const slicedCode = code.slice(startIndex);
      console.log("slicedCode: ", slicedCode);
      if (slicedCode.includes(i)) {
        correctNumbers++;
        guessCheck[`${i}`] = code.indexOf(i, startIndex);
      }
    } else if (code.includes(i)) {
      correctNumbers++;
      guessCheck[`${i}`] = code.indexOf(i);
    }
  }
  if (!correctNumbers && !correctLocations) {
    console.log(`\nAll Incorrect`);
    return { [`${userGuess}`]: "All Incorrect" };
  } else if (correctNumbers === 4 && correctLocations === 4) {
    console.log(`\nCongratulations the number to solve was ${code} and you guessed correctly: ${userGuess}`);
    return "end game";
  } else {
    console.log(
      `\n${correctNumbers} correct ${correctNumbers > 1 ? "numbers" : "number"} and ${correctLocations} correct ${
        correctLocations > 1 ? "locations" : "location"
      }`
    );
    return {
      [`${userGuess}`]: `Correct ${correctNumbers > 1 ? "Numbers" : "Number"}: ${correctNumbers} and Correct ${
        correctLocations > 1 ? "Locations" : "Location"
      }: ${correctLocations}`,
    };
  }
};

const validateInput = async (testCode, userGuess) => {
  if (userGuess.toLowerCase() === "history") {
    console.log(`
      History:
      ${playerGuesses}`);
    return "loop";
  }
  if (userGuess.toLowerCase() === "hint") {
    console.log(`
      HINT LOGIC HERE`);
    return "loop";
  }
  if (userGuess.trim().length !== 4 || isNaN(Number(userGuess))) {
    console.log(`
      You must type 4-digit numbers`);
    return "loop";
  }

  return await validateCode(testCode, userGuess);

  // if (testCode === userGuess) {
  //   console.log("You got it correct");
  //   return "correct";
  // }
};

export const mainGame = async player => {
  let numOfTries = 10;
  const testCode = "1111";
  let gotAnswer = false;
  let gameOver = false;

  while (numOfTries > 0) {
    console.log(`
      * Type 'history' to look at your previous guesses
      * Type 'hint' to get a hint on the 4-digit number
      \n${player}, you have ${numOfTries} attempts left:`);
    const userGuess = await getUserGuess();

    const result = await validateInput(testCode, userGuess);
    if (result === "loop") {
      continue;
    } else if (result === "end game") {
      gotAnswer = true;
      break;
    }
    playerGuesses.push(JSON.stringify(result));
    console.log("RESULT: ", result);

    numOfTries--;
  }
  if (numOfTries === 0) {
    return "Game Over";
  }

  if (gotAnswer) {
    return "Completed";
  }
};