import { gameUI } from "../frontend/GameUI.js";

export const validateCode = (code, userGuess, player) => {
  let correctNumbers = 0;
  let correctLocations = 0;
  const guessResult = {};

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

  gameUI.validateCodeResponse(userGuess, correctNumbers, correctLocations, player);
  if (code === userGuess) {
    return "Solved";
  }
};

export const validateLevel = async level => {
  if (Number(level) >= 4 && Number(level) <= 8) {
    return true;
  }
  return false;
};
