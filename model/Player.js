class Player {
  static nextId = 1;

  constructor(name) {
    this._id = Player.nextId++;
    this._name = name;
    this._score = 0;
    this._history = [];
    this._solved = false;
    this._hintIndex = 0;
  }

  getName() {
    return this._name;
  }

  getScore() {
    return this._score;
  }

  getHistory() {
    return this._history;
  }

  getHintIndex() {
    return this._hintIndex++;
  }

  getSolved() {
    return this._solved;
  }

  setScore(score) {
    this._score = score;
  }

  setHistory(record) {
    this._history.push(JSON.stringify(record));
  }

  setPlayerSolved() {
    this._solved = !this._solved;
  }

  setPlayerHintIndex() {
    this._hintIndex++;
  }
}

class ManagePlayers {
  static playersList = [];

  static addToPlayersList(player) {
    ManagePlayers.playersList.push(player);
  }

  static getPlayersList() {
    return ManagePlayers.playersList;
  }
}

export { Player, ManagePlayers };
