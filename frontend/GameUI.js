class GameUI {
  logAndSetHistory(player, userGuess, response) {
    console.log(`\n\t${player.getName()},\n\t${userGuess}: ${response}`);
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
    console.log(`\n\tYou must type ${level}-digit numbers`);
  }

  mustBePositive() {
    console.log("\n\tMust input positive numbers");
  }

  logPlayerNameAndAttempts(player, attempts) {
    console.log(`\n${player}, you have ${attempts} attempts left`);
  }

  logHint(placement, number) {
    console.log('\n\t"Hint"\n\t' + placement);
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
        console.log("\tIn some Eastern cultures, I am feared because I resemble 'death'. What am I?");
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
    console.log(`\n\tNo more hints remaining`);
  }

  numGenerated(level) {
    console.log(
      `\n\t${level}-digit numbers generated.\n\tLet's add player(s)!\n\n\t** Please note, numbers will range from 0 to 7.\n\t** if you include number 8 or 9 in your attempts, it will decrease your attempts.`
    );
  }

  startLog() {
    console.log(`
        **********************************************
                  Welcome To Mastermind Game
                   Created By Yoon Hwan Cho
        **********************************************
    `);
  }

  endLog(m, s) {
    const response = this.arrangeMinAndSec(m, s);
    console.log(`
        **********************************************
            Total Playing Time: ${response}

            Thank you for playing Mastermind Game
                   Created By Yoon Hwan Cho
        **********************************************
    `);
  }

  solvedMessage(name, code, score) {
    console.log(`\n\tCongratulations, ${name}. You solved the Mastermind Game.
    \tThe code to guess: ${code}
    \tYour Score: ${score}`);
  }

  outOfAttemptMessage(name) {
    console.log(`\n\tSorry ${name}, you've exhausted all your attempts. The game is over for you. Better luck next time!`);
  }

  calculatingScore() {
    console.log("\nGame Finished.\nCalculating highest score, please wait...");
  }

  logHighestPlayers(players, score) {
    if (!score) {
      console.log(`\n\tNo one was able to solve my game`);
      return;
    }
    console.log(`\n\t${players.join(", ")} finished the Mastermind Game with the highest score: ${score}`);
  }

  arrangeMinAndSec(min, sec) {
    return `${min ? `${min} ${min > 1 ? "minutes " : "minute "}` : ""}${sec} ${sec > 1 ? "seconds" : "second"}`;
  }

  logTime(min, sec) {
    let response = this.arrangeMinAndSec(min, sec);
    console.log(`\n\tCurrent Play Time: ${response}`);
  }

  simpleLog(code) {
    console.log(`\n\t${code}\n`);
  }
}

export const gameUI = new GameUI();
