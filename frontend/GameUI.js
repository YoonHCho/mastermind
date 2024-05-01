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

  logPlayerName(player) {
    console.log(`\n${player.getName()},`);
  }
}

export const gameUI = new GameUI();
