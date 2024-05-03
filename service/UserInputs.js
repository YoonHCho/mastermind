import { createInterface } from "readline";
import { stdin, stdout } from "process";
import { validateLevel } from "./Validator.js";

const rl = createInterface({
  input: stdin,
  output: stdout,
});

const userInput = async ask => {
  return new Promise(resolve => {
    rl.question(ask, async answer => {
      if (!answer) {
        console.log("Cannot have an empty input");
        userInput(ask).then(resolve);
      } else if (ask.startsWith("P") && answer.length === 1 && !isNaN(Number(answer))) {
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

// class HI {
//   rl = createInterface({
//     input: stdin,
//     output: stdout,
//   });
//   constructor() {}

//   userInput() {
//     rl.question()
//   }
// }
