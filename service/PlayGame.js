import { userInput } from "./UserInputs.js";
import { gameUI } from "../frontend/GameUI.js";
import { validateCode } from "./Validator.js";

export const PlayGame = async (code, players, level, game) => {
  let numOfTries = 10;
  const playersStillPlaying = players.length;
  const playersSolved = [];
  let userGuess;

  while (numOfTries > 0 && playersStillPlaying !== playersSolved.length) {
    for (let i = 0; i < players.length; i++) {
      const playerName = players[i].getName();
      if (players[i].getSolved()) {
        continue;
      }

      while (true) {
        gameUI.logPlayerNameAndAttempts(playerName, numOfTries);
        userGuess = await userInput(gameUI.askUserGuess(level));
        if (userGuess.toLowerCase() === "history") {
          gameUI.getHistory(players[i]);
          continue;
        } else if (userGuess.toLowerCase() === "time") {
          let [minutes, seconds] = game.getTime();
          gameUI.logTime(minutes, seconds);
          continue;
        } else if (userGuess === "getCode") {
          gameUI.simpleLog(code);
          continue;
        } else if (userGuess.toLowerCase() === "hint") {
          const hintIndex = players[i].getHintIndex();
          if (hintIndex >= level) {
            gameUI.noMoreHint();
            continue;
          }
          const oneBasedIndex = hintIndex + 1;
          const placement = game.hintIntro(oneBasedIndex);
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
