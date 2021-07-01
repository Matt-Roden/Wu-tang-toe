class Player {
  constructor(id, icon) {
    this.id = id;
    this.icon = icon;
    this.move = []
    this.wins = 0;
  }

  saveWinsToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this.wins));
  }

  retrieveWinsFromStorage() {
    this.wins = JSON.parse(localStorage.getItem(this.id));
  }
}
