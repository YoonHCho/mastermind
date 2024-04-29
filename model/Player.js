class Player {
  static nextId = 1;

  constructor(name) {
    this._id = Player.nextId++;
    this._name = name;
    this._score = 0;
    this._history = [];
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

  setHistory(record) {
    this._history.push(record);
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
