class ClubEvent {
  constructor(id, date, name, place, url) {
      this.id = id,
      this.date = date,
      this.name = name,
      this.place = place,
      this.url = url
  }

  getId() {
      return this.id;
  }

  getName() {
      return this.name;
  }

  getPlace() {
      return this.place;
  }

  getDate() {
      return this.date;
  }

  getUrl() {
      return this.url;
  }

}

module.exports = ClubEvent;