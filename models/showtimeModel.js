const sql = require("mssql");
const dbconfig = require("../dbconfig");

async function getAllShowtimes() {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT * FROM Showtimes";
    const result = await connection.request().query(query);
    return result.recordset;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch((err) => console.error("Error closing connection:", err));
    }
  }
}

async function getShowtimeById(id) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT * FROM Showtimes WHERE ShowtimeID = @id";
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
      await connection.close().catch((err) => console.error("Error closing connection:", err));
    }
  }
}

async function getShowtimesByMovieId(movieId) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT * FROM Showtimes WHERE MovieID = @movieId ORDER BY ShowDate ASC, StartTime ASC";
    const request = connection.request();
    request.input("movieId", movieId);
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch((err) => console.error("Error closing connection:", err));
    }
  }
}

async function createShowtime(showtimeData) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query =
      "INSERT INTO Showtimes (movieID, showDate, startTime, screen) " +
      "VALUES (@movieID, @showDate, @startTime, @screen); SELECT SCOPE_IDENTITY() AS id;";
    const request = connection.request();
    request.input("movieID", showtimeData.movieID);
    request.input("showDate", showtimeData.showDate);
    request.input("startTime", showtimeData.startTime);
    request.input("screen", showtimeData.screen);
    const result = await request.query(query);

    const newShowtimeId = result.recordset[0].id;
    return await getShowtimeById(newShowtimeId);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch((err) => console.error("Error closing connection:", err));
    }
  }
}

async function updateShowtime(id, showtimeData) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query =
      "UPDATE Showtimes SET MovieID = @movieID, showDate = @showDate, startTime = @startTime, screen = @screen WHERE ShowtimeID = @id;";
    const request = connection.request();
    request.input("movieID", showtimeData.movieID);
    request.input("showDate", showtimeData.showDate);
    request.input("startTime", showtimeData.startTime);
    request.input("screen", showtimeData.screen);
    request.input("id", id);
    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch((err) => console.error("Error closing connection:", err));
    }
  }
}

async function deleteShowtime(id) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "DELETE FROM Showtimes WHERE ShowtimeID = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch((err) => console.error("Error closing connection:", err));
    }
  }
}

module.exports = {
  getAllShowtimes,
  getShowtimeById,
  getShowtimesByMovieId,
  createShowtime,
  updateShowtime,
  deleteShowtime,
};