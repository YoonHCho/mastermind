import { createInterface } from "readline";
import { stdin, stdout } from "process";

const rl = createInterface({
  input: stdin,
  output: stdout,
});

const userInput = async whatInput => {
  let ask;

  if (whatInput === "name") {
    ask = "Name of the player? ";
  } else if (whatInput === "guess") {
    ask = "Guess the 4-digit Number: ";
  }

  return new Promise(resolve => {
    rl.question(ask, answer => {
      if (!answer) {
        console.log("Cannot have an empty input");
      } else {
        resolve(answer);
      }
    });
  });
};

export { rl, userInput };
