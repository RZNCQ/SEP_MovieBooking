const movieModel = require("../models/movieModel");

async function getAllMovies(req, res) {
  try {
    const movie = await movieModel.getAllMovies();
    res.json(movie);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving movies" });
  }
}

async function getMovieById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const movie = await movieModel.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving movie" });
  }
}

async function createMovie(req, res) {
  try {
    const newMovie = await movieModel.createMovie(req.body);
    res.status(201).json({
        message: "Movie Created Successfully!",
        data: newMovie,
    });
  } catch (error) {
    console.error("Error Creating Movie:", error);
    res.status(500).json({ error: "Error creating movie" });
  }
}

async function updateMovie(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await movieModel.updateMovie(id, req.body);
    if (result === 0) {
      return res.status(404).send("Movie not found");
    }
    const updatedMovie = await movieModel.getMovieById(id);
    res.json({message: `Movie with id ${id} updated successfully.`,data:updatedMovie});
  } catch (error) {
    console.error("Error Updating Movie:", error);
    res.status(500).json({ error: "Error updating movie" });
  }
}

async function deleteMovie(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await movieModel.deleteMovie(id);
    if (result === 0) {
      return res.status(404).send("Movie not found");
    }
    res.json({message: `Movie with id ${id} deleted successfully.`});
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Error deleting movie" });
  }
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}