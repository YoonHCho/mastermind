// import express from "express";
// import axios from "axios";
// import { createInterface } from "readline";
// import { stdin, stdout } from "process";
// import { mainGame } from "./game.js";
import { Game } from "./model/Game.js";
import { Player, ManagePlayers } from "./model/Player.js";
import { rl, userInput } from "./service/UserInputs.js";
import { createPlayers } from "./service/CreatePlayers.js";
import { PlayGame } from "./service/PlayGame.js";
// import { getRandomNumber } from "./controller/randomNumber.js";

// const players = [];

// class Player {
//   // static property only belongs to the class itself and not the instances of the class
//   static nextId = 1;

//   constructor(name) {
//     this.id = Player.nextId++;
//     this.name = name;
//   }
// }

// export const rl = createInterface({
//   input: stdin,
//   output: stdout,
// });

// const getRandomNumber = async () => {
//   const result = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new");
//   const codeInOneLine = result.data.split("\n").join("");
//   console.log("Numbers Generated");
//   return codeInOneLine;
// };

// const getInfo = async () => {
//   return await new Promise((resolve, _reject) => {
//     rl.question("What is the name of the player? ", answer => {
//       if (!answer) {
//         console.log("Invalid Entry for Name");
//         getInfo().then(resolve);
//       } else {
//         resolve(answer);
//       }
//     });
//   });
// };

// BELOW WORKING CODE, TRYING TO USE WHILE LOOP ABOVE
// const getInfo = async () => {
//   return await new Promise((resolve, reject) => {
//     rl.question("What is the name of the player? ", answer => {
//       if (!answer) {
//         reject(new Error("Invalid Entry for Name"));
//       } else {
//         resolve(answer);
//       }
//     });
//   });
// };

// const createPlayer = async () => {
//   let name;
//   // try {
//   //   while (!name) {
//   //     name = await getInfo();
//   //     if (!name) {
//   //       console.log("Invalid Entry for Name");
//   //     } else {
//   //       console.log("Hello", name);
//   //     }
//   //   }
//   // } catch (error) {
//   //   throw new Error("Something went wrong while creating a player");
//   // }

//   try {
//     name = await getInfo();
//     console.log("Hello", name);
//   } catch (error) {
//     console.error("Error while creating player", error);
//   }

//   const player = new Player(name);
//   return player;
// };

// const main = async () => {
//   try {
//     let code = await getRandomNumber();
//     const game = new Game(code);
//     game.start();
//     console.log(game.code);
//     const createdPlayer = await createPlayer();
//     const gameResult = await mainGame(createdPlayer.name);

//     if (gameResult === "Game Over") {
//       console.log("You did not solve the game");
//     } else {
//       console.log("You have solved the Game");
//     }

//     console.log(createdPlayer);
//     players.push(createdPlayer);
//     console.log(players);
//     //
//   } catch (error) {
//     console.error("Error: ", error);
//   } finally {
//     rl.close();
//   }
// };

// trying with new
const main = async () => {
  console.log("THIS IS APP.JS");
  try {
    const game = new Game();
    game.start();
    const level = await getLevel();
    let gameCode = await game.createNum();
    console.log("gameCode: ", gameCode);
    game.setCode(gameCode);
    console.log("GET", game.getCode());

    await createPlayers(`\nWhen finished adding players type 'finish'\nName of a player? `);

    const result = await PlayGame(game.getCode(), ManagePlayers.getPlayersList());
    game.getHighestScoredPlayer(result);
    game.end();
    // const gameResult = await PlayGame(player);

    // const createdPlayer = await createPlayer();
    // const gameResult = await mainGame(createdPlayer.name);

    // if (gameResult === "Game Over") {
    //   console.log("You did not solve the game");
    // } else {
    //   console.log("You have solved the Game");
    // }

    // console.log(createdPlayer);
    // players.push(createdPlayer);
    // console.log(players);
    //
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    rl.close();
  }
};

main();
