import { createInterface } from "readline";
import { stdin, stdout } from "process";
import { validateLevel } from "./Validator.js";
import { gameUI } from "../frontend/GameUI.js";

const rl = createInterface({
  input: stdin,
  output: stdout,
});

const userInput = async ask => {
  return new Promise(resolve => {
    rl.question(ask, async answer => {
      if (!answer || !answer.trim()) {
        gameUI.simpleLog("Cannot have an empty input");
        userInput(ask).then(resolve);
      } else if (ask.startsWith("Please select a level")) {
        if (await validateLevel(answer)) {
          resolve(answer);
        } else {
          userInput(ask).then(resolve);
        }
      } else {
        resolve(answer);
      }
    });
  });
};

export { rl, userInput };
