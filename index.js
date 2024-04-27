// import express from "express";
import axios from "axios";
import { createInterface } from "readline";
import { stdin, stdout } from "process";
// import { getRandomNumber } from "./controller/randomNumber.js";

let code;
const players = [];

class Player {
  // static property only belongs to the class itself and not the instances of the class
  static nextId = 1;

  constructor(name) {
    this.id = Player.nextId++;
    this.name = name;
  }
}

const getRandomNumber = async () => {
  const result = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new");
  const codeInOneLine = result.data.split("\n").join("");
  console.log("Numbers Generated");
  return codeInOneLine;
};

const read = createInterface({
  input: stdin,
  output: stdout,
});

const getInfo = async () => {
  return await new Promise((resolve, _reject) => {
    read.question("What is the name of the player? ", answer => {
      if (!answer) {
        console.log("Invalid Entry for Name");
        getInfo().then(resolve);
      } else {
        resolve(answer);
      }
    });
  });
};

// BELOW WORKING CODE, TRYING TO USE WHILE LOOP ABOVE
// const getInfo = async () => {
//   return await new Promise((resolve, reject) => {
//     read.question("What is the name of the player? ", answer => {
//       if (!answer) {
//         reject(new Error("Invalid Entry for Name"));
//       } else {
//         resolve(answer);
//       }
//     });
//   });
// };

const createPlayer = async () => {
  let name;
  // try {
  //   while (!name) {
  //     name = await getInfo();
  //     if (!name) {
  //       console.log("Invalid Entry for Name");
  //     } else {
  //       console.log("Hello", name);
  //     }
  //   }
  // } catch (error) {
  //   throw new Error("Something went wrong while creating a player");
  // }

  try {
    name = await getInfo();
    console.log("Hello", name);
  } catch (error) {
    console.error("Error while creating player", error);
  }

  const player = new Player(name);
  return player;
};

const getUserGuess = async code => {
  let numOfTries = 10;
  let correctNumbers;
  let correctLocation;
  console.log(`You have ${numOfTries} to get correct 4-digit combination`);
  // try {
  //   read.question("Please guess 4-digit combination: ", answer => {
  //     if (answer.trim().length !== 4) {

  //     }
  //   })
  // }
  while (numOfTries > 0) {
    const answer = await read.question("Please guess 4-digit combination: ");
    if (answer.trim().length !== 4 || isNaN(Number(answer))) {
      console.log("You need to input 4-digit numbers");
    }
  }
};

const main = async () => {
  try {
    code = await getRandomNumber();
    console.log(typeof code);
    const createdPlayer = await createPlayer();
    // await getUserGuess();

    console.log(createdPlayer);
    players.push(createdPlayer);
    console.log(players);
    //
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    read.close();
  }
};

console.log(`
******************************************
*       Welcome To Mastermind Game       *
*       Created By: Yoon Hwan Cho        *
*      Generating A 4-digit Number       *
******************************************
`);

main();

// app.listen(3001, () => console.log("Server running on port: 3001"));
