import { performance } from "perf_hooks";
import { getRandomNumber } from "../service/GetRandomNumber.js";
import { userInput } from "../service/UserInputs.js";
import { gameUI } from "../frontend/GameUI.js";

export class Game {
  constructor() {
    this._code = null;
    this._startTime = null;
    this._endTime = null;
  }

  getCode() {
    return this._code;
  }

  setCode(code) {
    this._code = code;
  }

  start() {
    this.setTimeStart();
    gameUI.startLog();
  }

  end() {
    this.setEndTime();
    const [minutes, seconds] = this.calculateTime(this._startTime, this._endTime);
    gameUI.endLog(minutes, seconds);
  }

  setTimeStart() {
    this._startTime = performance.now();
  }

  getTimeStart() {
    return this._startTime;
  }

  setEndTime() {
    this._endTime = performance.now();
  }

  getEndTime() {
    return this._endTime;
  }

  getTime() {
    this._endTime = performance.now();
    return this.calculateTime(this._startTime, this._endTime);
  }

  calculateTime(start, end) {
    const time = Math.floor((end - start) / 1000);
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);
    return [minutes, seconds];
  }

  async getLevel() {
    return await userInput("Please select a level from 4 (easiest) to 8 (hardest): ");
  }

  async createNum(level) {
    try {
      return await getRandomNumber(level);
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

  hintIntro(index) {
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
