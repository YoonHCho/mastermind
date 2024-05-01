import { Game } from "../model/Game.js";
import { userInput } from "./UserInputs.js";
import { gameUI } from "../frontend/GameUI.js";
import { validateCode } from "./Validator.js";

const getUserGuess = async (level = 4) => {
  return await userInput(gameUI.askUserGuess(level));
};

export const PlayGame = async (code, players, level = 4) => {
  console.log("code: ", code);
  let numOfTries = 10;
  const playersStillPlaying = players.length;
  const playersSolved = [];
  let userGuess;

  while (numOfTries > 0 && playersStillPlaying !== playersSolved.length) {
    for (let i = 0; i < players.length; i++) {
      // console.log("Players", players[i]);
      if (players[i].getSolved()) {
        continue;
      }

      while (true) {
        gameUI.logPlayerNameAndAttempts(players[i], numOfTries);
        userGuess = await getUserGuess();
        if (userGuess.toLowerCase() === "history") {
          gameUI.getHistory(players[i]);
          continue;
        } else if (userGuess.toLowerCase() === "hint") {
          const hintIndex = players[i].getHintIndex();
          if (hintIndex >= level) {
            gameUI.noMoreHint();
            continue;
          }
          const oneBasedIndex = hintIndex + 1;
          const placement = Game.hintIntro(oneBasedIndex);
          gameUI.logHint(placement, code[hintIndex]);
          continue;
        } else if (userGuess.trim().length !== 4 || isNaN(Number(userGuess))) {
          gameUI.errorUserGuessInput(level);
          continue;
        }

        const result = validateCode(code, userGuess, players[i]);
        if (result === "Solved") {
          players[i].setPlayerSolved();
          players[i].setScore(numOfTries * 10);
        }
        break;
      }
    }
    numOfTries--;
    // const validateInput
  }
};
