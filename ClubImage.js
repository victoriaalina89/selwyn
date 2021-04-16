class ClubImage  {

  constructor(id, date, name, path){
    this.id = id,
    this.date = date,
    this.name = name,
    this.path = path
  }


  getName() {
    return this.name;
  }

  getDate() {
    return this.date;
  }

  getId() {
    return this.id;
  }

  getPath() {
    return this.path;
  }

  getNameForImage() {
    return this.name.replace(/[&\/\\#,+()$~%.'":*?!<>{}\s]/g,'');
  }

}

module.exports = ClubImage;