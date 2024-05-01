import { userInput } from "./UserInputs.js";
import { gameUI } from "../frontend/GameUI.js";
import { validateCode } from "./Validator.js";

const getUserGuess = async (level = 4) => {
  return await userInput(gameUI.askUserGuess(level));
};

export const PlayGame = async (code, players, level = 4) => {
  console.log("code: ", code);
  console.log("players: ", players);
  let numOfTries = 10;
  const playersStillPlaying = players.length;
  let userGuess;

  while (numOfTries > 0 && playersStillPlaying > 0) {
    for (let i = 0; i < players.length; i++) {
      // console.log("Players", players[i]);

      while (true) {
        gameUI.logPlayerName(players[i]);
        userGuess = await getUserGuess();
        if (userGuess.toLowerCase() === "history") {
          gameUI.getHistory(players[i]);
          continue;
        } else if (userGuess.toLowerCase() === "hint") {
          console.log("GET HINT");
          continue;
        } else if (userGuess.trim().length !== 4 || isNaN(Number(userGuess))) {
          gameUI.errorUserGuessInput(level);
          continue;
        }

        const result = await validateCode(code, userGuess, players[i]);
        break;
      }
    }

    // const validateInput
  }
};
