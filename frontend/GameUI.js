class GameUI {
  logAndSetHistory(player, userGuess, response) {
    console.log(`${player.getName()},\n${userGuess}: ${response}\n`);
    player.setHistory({ [`${userGuess}`]: `${response}` });
  }

  validateCodeResponse(userGuess, num, loc, player) {
    let response;
    if (!num && !loc) {
      response = `All Incorrect`;
    } else {
      response = `${num} correct ${num > 1 ? "numbers" : "number"} and ${loc} correct ${loc > 1 ? "locations" : "location"}`;
    }

    this.logAndSetHistory(player, userGuess, response);
  }

  askUserGuess(level) {
    return `Enter ${level}-Digit Numbers: `;
  }

  getHistory(player) {
    console.log(`
    \tHistory:
    \t${player.getHistory()}
    `);
  }

  errorUserGuessInput(level) {
    console.log(`You must type ${level}-digit numbers`);
  }

  logPlayerNameAndAttempts(player, attempts) {
    console.log(`\n${player.getName()}, you have ${attempts} attempts left`);
  }

  logHint(placement, number) {
    console.log('\t"Hint"\n\t' + placement);
    switch (number) {
      case "0":
        console.log("\tI hold no identity. I am the empty vessel, ready to be filled with any data. What am I?");
        break;
      case "1":
        console.log("\tI am the smallest whole number, yet mighty in my simplicity. What am I?");
        break;
      case "2":
        console.log("\tI am the number of times you blink and I symbolize teamwork. What am I?");
        break;
      case "3":
        console.log("\tI am the number of primary colors for your CSS color property. What am I?");
        break;
      case "4":
        console.log('\tIn some Eastern cultures, I am feared for my resemblance to "death.". What am I?');
        break;
      case "5":
        console.log("\tI am the one and only prime number that has a sum of two consecutive prime numbers. What am I?");
        break;
      case "6":
        console.log("\tI am the only number that is both the sum and product of three consecutive positive numbers. What am I?");
        break;
      case "7":
        console.log("\tI am the number of continents in your world. What am I?");
        break;
      default:
        console.log("\tThere is no more hints");
    }
  }

  noMoreHint() {
    console.log(`\tNo more hints remaining`);
  }

  startLog() {
    console.log(`
      ******************************************
      *       Welcome To Mastermind Game       *
      *        Created By Yoon Hwan Cho        *
      *      Generating A 4-digit Number       *
      ******************************************
    `);
  }
}

export const gameUI = new GameUI();
