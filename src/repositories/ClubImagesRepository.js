
const connectionDB = require('../services/databaseService');

const clubImagesRepository = {

  async getAllImages() {

    const connection = await connectionDB.getDBConnection();

    let query = "SELECT * FROM images WHERE deleted = false ORDER BY date ASC";

    const [rows, field] = await connection.query(query);

    connection.end()

    return rows;

  },

  async addClubImage(file, date, name) {

    const images = "/images/" + file;

    const connection = await connectionDB.getDBConnection();

    let query = "INSERT INTO images (deleted, date, name, path) VALUES(false, ?, ?, ? )";

    await connection.query(query, [date, name, images])

    connection.end()

  },

  async updateClubImage(id) {

    const connection = await connectionDB.getDBConnection();

    let query = "UPDATE images SET deleted = true WHERE id = ?";

    await connection.query(query, [id]);

    connection.end()

  }
}

module.exports = clubImagesRepository;