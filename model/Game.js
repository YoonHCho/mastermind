import { getRandomNumber } from "../service/GetRandomNumber.js";
import { userInput } from "../service/UserInputs.js";
import { gameUI } from "../frontend/GameUI.js";

export class Game {
  constructor() {
    this._code = undefined;
  }

  getCode() {
    return this._code;
  }

  setCode(code) {
    this._code = code;
  }

  start() {
    gameUI.startLog();
  }

  end() {
    gameUI.endLog();
  }

  async getLevel() {
    return await userInput("Please select a level from 4 (easiest) to 8 (hardest): ");
  }

  async createNum() {
    try {
      return await getRandomNumber();
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  getHighestScoredPlayer(players) {
    const highestScorePlayers = [];
    let highestScore = 0;

    for (let player of players) {
      if (player.score === 0) continue;
      if (player.score >= highestScore) {
        highestScorePlayers.push(player.name);
        highestScore = player.score;
      }
    }

    setTimeout(() => gameUI.logHighestPlayers(highestScorePlayers, highestScore), 3000);
  }

  static hintIntro(index) {
    switch (index) {
      case 1:
        return "First-digit hint:";
      case 2:
        return "Second-digit hint:";
      case 3:
        return "Third-digit hint:";
      case 4:
        return "Fourth-digit hint:";
      case 5:
        return "Fifth-digit hint:";
      case 6:
        return "Sixth-digit hint:";
      case 7:
        return "Seventh-digit hint:";
      case 8:
        return "Eighth-digit hint:";
      default:
        return `Cannot find the ${index}-placed Number`;
    }
  }
}
