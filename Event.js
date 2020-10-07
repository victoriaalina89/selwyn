class Event {
  constructor(id, day, month, year, name, place, url) {
      this.id = id,
      this.deleted = false,
      this.day = day,
      this.month = month,
      this.year = year,
      this.name = name,
      this.place = place,
      this.url = url
  }

  markAsDeleted() {
      this.deleted = true;
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

  getDay() {
    return this.day;
  }

  getMonth() {
      return this.month;
  }

  getYear() {
    return this.year;
}

  getDateAndYear() {
      return this.day + " " + this.month + " " + this.year;
  }

  getDate() {
      return this.day + " " + this.month;
  }

  getUrl() {
      return this.url;
  }

}

module.exports = Event;