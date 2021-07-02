
const clubImagesRepository = require("../repositories/ClubImagesRepository");
const ClubImage = require('../classes/ClubImage');


const clubImagesService = {

  async getClubImages() {

    let rows = await clubImagesRepository.getAllImages();

    const clubImages = rows.map(row => {
      const clubImage = new ClubImage(row.id, row.date, row.name, row.path);

      return clubImage;
      
    })

    return clubImages;

  },

  async addClubImage(file, date, name) {

    await clubImagesRepository.addClubImage(file, date, name);

  },

  async updateClubImage(id) {
    
    await clubImagesRepository.updateClubImage(id);

  }
  
}

module.exports = clubImagesService;