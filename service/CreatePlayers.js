import { Player, ManagePlayers } from "../model/Player.js";
import { userInput } from "./UserInputs.js";

export const createPlayers = async ask => {
  console.log("CREATEPLAYER.JS");
  let playerName = await userInput(ask);
  while (playerName.toLowerCase() !== "finish") {
    const playerInfo = new Player(playerName);
    ManagePlayers.addToPlayersList(playerInfo);
    playerName = await userInput(ask);
  }
};
