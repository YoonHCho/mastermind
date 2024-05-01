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
  let response = "";

  for (let i of userGuess) {
    const index = userGuess.indexOf(i);
    if (code[index] === userGuess[index]) {
      correctLocations++;
    }
    if (code.includes(i) && guessCheck[i]) {
      const startIndex = guessCheck[i] + 1;
      const nextIndex = code.indexOf(i, startIndex);
      if (nextIndex !== -1) {
        correctNumbers++;
        guessCheck[i] = nextIndex;
      }
    } else if (code.includes(i)) {
      correctNumbers++;
      guessCheck[i] = code.indexOf(i);
    }
  }
  response += `\n${userGuess}: `;
  if (!correctNumbers && !correctLocations) {
    console.log(response + "All Incorrect");
    return { [`${userGuess}`]: "All Incorrect" };
  } else if (correctNumbers === 4 && correctLocations === 4) {
    console.log(response + `Congratulations the number to solve was ${code} and you guessed correctly: ${userGuess}`);
    return "end game";
  } else {
    console.log(
      response +
        `${correctNumbers} correct ${correctNumbers > 1 ? "numbers" : "number"} and ${correctLocations} correct ${
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

export const mainGame = async (gameCode, player) => {
  let numOfTries = 10;
  const testCode = gameCode;
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

    numOfTries--;
  }
  if (numOfTries === 0) {
    return "Game Over";
  }

  if (gotAnswer) {
    return "Completed";
  }
};
