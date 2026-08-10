const showtimeModel = require("../models/showtimeModel");

async function getAllShowtimes(req, res) {
  try {
    const showtimes = await showtimeModel.getAllShowtimes();
    res.json(showtimes);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving showtimes" });
  }
}

async function getShowtimeById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const showtime = await showtimeModel.getShowtimeById(id);
    if (!showtime) {
      return res.status(404).json({ error: "Showtime not found" });
    }
    res.json(showtime);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving showtime" });
  }
}

async function getShowtimesByMovieId(req, res) {
  try {
    const movieId = parseInt(req.params.movieId);
    const showtimes = await showtimeModel.getShowtimesByMovieId(movieId);
    if (!showtimes || showtimes.length === 0) {
      return res.status(404).json({ error: "No showtimes found for this movie" });
    }
    res.json(showtimes);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving showtimes for movie" });
  }
}

async function createShowtime(req, res) {
  try {
    const newShowtime = await showtimeModel.createShowtime(req.body);
    res.status(201).json({
      message: "Showtime Created Successfully!",
      data: newShowtime,
    });
  } catch (error) {
    console.error("Error Creating Showtime:", error);
    res.status(500).json({ error: "Error creating showtime" });
  }
}

async function updateShowtime(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await showtimeModel.updateShowtime(id, req.body);
    if (result === 0) {
      return res.status(404).send("Showtime not found");
    }
    const updatedShowtime = await showtimeModel.getShowtimeById(id);
    res.json({
      message: `Showtime with id ${id} updated successfully.`,
      data: updatedShowtime,
    });
  } catch (error) {
    console.error("Error Updating Showtime:", error);
    res.status(500).json({ error: "Error updating showtime" });
  }
}

async function deleteShowtime(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await showtimeModel.deleteShowtime(id);
    if (result === 0) {
      return res.status(404).send("Showtime not found");
    }
    res.json({ message: `Showtime with id ${id} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting showtime:", error);
    res.status(500).json({ error: "Error deleting showtime" });
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