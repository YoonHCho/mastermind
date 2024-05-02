import { Game } from "../model/Game.js";
import { userInput } from "./UserInputs.js";
import { gameUI } from "../frontend/GameUI.js";
import { validateCode } from "./Validator.js";

const getUserGuess = async level => {
  return await userInput(gameUI.askUserGuess(level));
};

export const PlayGame = async (code, players, level) => {
  console.log("code: ", code);
  let numOfTries = 10;
  const playersStillPlaying = players.length;
  const playersSolved = [];
  let userGuess;

  while (numOfTries > 0 && playersStillPlaying !== playersSolved.length) {
    for (let i = 0; i < players.length; i++) {
      const playerName = players[i].getName();
      // console.log("Players", players[i]);
      if (players[i].getSolved()) {
        continue;
      }

      while (true) {
        gameUI.logPlayerNameAndAttempts(playerName, numOfTries);
        // userGuess = await getUserGuess(level);
        userGuess = await userInput(gameUI.askUserGuess(level));
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
        } else if (userGuess.trim().length !== Number(level) || isNaN(Number(userGuess))) {
          gameUI.errorUserGuessInput(level);
          continue;
        }

        const result = validateCode(code, userGuess, players[i]);
        if (result === "Solved") {
          const score = numOfTries * 10;
          players[i].setPlayerSolved();
          players[i].setScore(score);
          playersSolved.push({
            name: `${playerName}`,
            score: `${score}`,
          });
          gameUI.solvedMessage(playerName, code, score);
        }
        break;
      }
      if (numOfTries === 1 && !players[i].getSolved()) {
        gameUI.outOfAttemptMessage(playerName);
      }
    }
    numOfTries--;
  }
  gameUI.calculatingScore();
  return playersSolved;
};
