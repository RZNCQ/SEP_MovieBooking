const sql = require("mssql");
const dbconfig = require("../dbconfig");

async function getAllBookings() {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT * FROM Bookings";
    const result = await connection.request().query(query);
    return result.recordset;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

async function getBookingById(id) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT * FROM Bookings WHERE BookingID = @id";
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

async function getBookingsByUserId(userId) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT * FROM Bookings WHERE UserID = @userId";
    const request = connection.request();
    request.input("userId", userId);
    const result = await request.query(query);
    
    return result.recordset;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

async function createBooking(userId, bookingData) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    //Find Max Capacity Of The Screen
    let capacityQuery = "SELECT MaxCapacity FROM Showtimes WHERE ShowtimeID = @showtimeId";
    let capacityRequest = connection.request();
    capacityRequest.input("showtimeId", bookingData.showtimeId);
    let capacityResult = await capacityRequest.query(capacityQuery);
    if (capacityResult.recordset.length === 0) {
      throw new Error("Showtime not found.");
    }
    const screenCapacity = capacityResult.recordset[0].MaxCapacity;
    //Find The Number Of Tickets Booked
    let sumQuery = "SELECT SUM(Quantity) AS TotalBooked FROM Bookings WHERE ShowtimeID = @showtimeId";
    let sumRequest = connection.request();
    sumRequest.input("showtimeId", bookingData.showtimeId);
    let sumResult = await sumRequest.query(sumQuery);
    let totalBooked = sumResult.recordset[0].TotalBooked;
    if (totalBooked === null) {
      totalBooked = 0;
    }
    if (totalBooked + parseInt(bookingData.quantity) > screenCapacity) {
      throw new Error(`Not enough seats available! Only ${screenCapacity - totalBooked} left.`);
    }
    let query = 
      "INSERT INTO Bookings (UserID, BookingDate, TotalAmount, ShowtimeID, Quantity) " +
      "VALUES (@userId, @bookingDate, @totalAmount, @showtimeId, @quantity); SELECT SCOPE_IDENTITY() AS id;";
    let request = connection.request();
    request.input("userId", userId);
    request.input("bookingDate", new Date());
    request.input("totalAmount", bookingData.totalAmount);
    request.input("showtimeId", bookingData.showtimeId);
    request.input("quantity", bookingData.quantity);
    let result = await request.query(query);
    const newBookingId = result.recordset[0].id;
    return await getBookingById(newBookingId);
  } catch (error) {
    console.error("Database error:", error);
    throw error; 
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

async function updateBooking(id, bookingData) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query =
      "UPDATE Bookings SET showtimeID = @showtimeId, quantity = @quantity, totalAmount = @totalAmount WHERE BookingID = @id;";
    const request = connection.request();
    request.input("showtimeId", bookingData.showtimeId);
    request.input("quantity", bookingData.quantity);
    request.input("totalAmount", bookingData.totalAmount);
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

async function deleteBooking(id) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "DELETE FROM Bookings WHERE BookingID = @id";
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
  getAllBookings,
  getBookingById,
  getBookingsByUserId,
  createBooking,
  deleteBooking,
  updateBooking
};