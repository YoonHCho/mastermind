import { gameUI } from "../frontend/GameUI.js";

export const validateCode = (code, userGuess, player) => {
  console.log("validate code = CODE:", code);
  console.log("validate code = USERGUESS:", userGuess);
  let correctNumbers = 0;
  let correctLocations = 0;
  const guessResult = {};
  let response = "";

  for (let i = 0; i < userGuess.length; i++) {
    const value = userGuess[i];
    if (code[i] === userGuess[i]) {
      correctLocations++;
    }

    if (code.includes(value) && guessResult[value] !== undefined) {
      const startIndex = guessResult[value] + 1;
      const nextIndex = code.indexOf(value, startIndex);
      if (nextIndex !== -1) {
        correctNumbers++;
        guessResult[value] = nextIndex;
      }
    } else if (code.includes(value)) {
      correctNumbers++;
      guessResult[value] = code.indexOf(value);
    }
  }

  // for (let i of userGuess) {
  //   const index = userGuess.indexOf(i);

  //   // checking if the location of a number of user guess is same as the code's location of the same number
  //   if (code[index] === userGuess[index]) {
  //     correctLocations++;
  //   }

  //   // checking if the user guess's number is located in the code (taking account for duplicated numbers)
  //   if (code.includes(i) && guessResult[i]) {
  //     const startIndex = guessResult[i] + 1;
  //     const nextIndex = code.indexOf(i, startIndex);
  //     if (nextIndex !== -1) {
  //       correctNumbers++;
  //       guessResult[i] = nextIndex;
  //     }
  //   } else if (code.includes(i)) {
  //     correctNumbers++;
  //     guessResult[i] = code.indexOf(i);
  //   }
  // }
  gameUI.validateCodeResponse(userGuess, correctNumbers, correctLocations, player);
  console.log("guessResult", guessResult);
  return guessResult;
};

const validateUserInput = () => {};
