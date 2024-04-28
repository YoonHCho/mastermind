class Player {
  static nextId = 1;

  constructor(name) {
    this.id = Player.nextId++;
    this.name = name;
    this.history = [];
  }

  get name() {
    return this.name;
  }

  get history() {
    return this.history;
  }

  set history(record) {
    this.history.push(record);
  }
}
