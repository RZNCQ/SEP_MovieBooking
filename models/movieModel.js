const sql = require("mssql");
const dbconfig = require("../dbconfig");

async function getAllMovies(){
    let connection;
    try{
        connection = await sql.connect(dbconfig);
        const query = "SELECT * FROM Movies";
        const result = await connection.request().query(query);
        return result.recordset;
    }catch(error){
        console.log("Database error:",error);
        throw error;
    }finally{
        if(connection){
            await connection.close().catch(err => console.error("Error closing connection: ",err));
        }
    }
}

async function getMovieById(id) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT * FROM Movies WHERE MovieID = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

async function createMovie(movieData) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query =
      "INSERT INTO Movies (title, description, duration, genre, rating, imageURL) " +
      "VALUES (@title, @description, @duration, @genre, @rating, @imageURL); SELECT SCOPE_IDENTITY() AS id;";
    const request = connection.request();
    request.input("title", movieData.title);
    request.input("description", movieData.description);
    request.input("duration", movieData.duration);
    request.input("genre", movieData.genre);
    request.input("rating", movieData.rating);
    request.input("imageURL", movieData.imageURL);
    const result = await request.query(query);

    const newMovieId = result.recordset[0].id;
    return await getMovieById(newMovieId);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

async function updateMovie(id, movieData) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query =
      "UPDATE Movies SET title = @title, description = @description, duration = @duration, genre = @genre, rating = @rating, imageURL = @imageURL WHERE MovieID = @id;";
    const request = connection.request();
    request.input("title", movieData.title);
    request.input("description", movieData.description);
    request.input("duration", movieData.duration);
    request.input("genre", movieData.genre);
    request.input("rating", movieData.rating);
    request.input("imageURL", movieData.imageURL);
    request.input("id", id);
    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

async function deleteMovie(id) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "DELETE FROM Movies WHERE MovieID = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
