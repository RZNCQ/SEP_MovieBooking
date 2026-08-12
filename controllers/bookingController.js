const bookingModel = require("../models/bookingModel");

async function getAllBookings(req, res) {
  try {
    const bookings = await bookingModel.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving bookings" });
  }
}

async function getBookingById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const booking = await bookingModel.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving booking" });
  }
}

async function getBookingsByUserId(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const bookings = await bookingModel.getBookingsByUserId(userId);
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for this user" });
    }
    res.json(bookings);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving bookings for user" });
  }
}

async function createBooking(req, res) {
  try {
    const userId = req.user.id;   
    const newBooking = await bookingModel.createBooking(userId, req.body);
    res.status(201).json({
      message: "Booking Created Successfully!",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error Creating Booking:", error);
    if (error.message && error.message.includes("Not enough seats")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error creating booking" });
  }
}

async function deleteBooking(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await bookingModel.deleteBooking(id);
    if (result === 0) {
      return res.status(404).send("Booking not found");
    }
    res.json({ message: `Booking with id ${id} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Error deleting booking" });
  }
}

module.exports = {
  getAllBookings,
  getBookingById,
  getBookingsByUserId,
  createBooking,
  deleteBooking,
};