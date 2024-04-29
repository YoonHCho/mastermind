import { getRandomNumber } from "../service/GetRandomNumber.js";

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
    console.log(`
      ******************************************
      *       Welcome To Mastermind Game       *
      *        Created By Yoon Hwan Cho        *
      *      Generating A 4-digit Number       *
      ******************************************
    `);
  }

  async createNum() {
    try {
      return await getRandomNumber();
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
