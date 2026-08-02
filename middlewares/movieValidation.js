const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().min(1).max(99).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title cannot exceed 99 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().min(10).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 10 characters long",
    "any.required": "Description is required",
  }),
  duration: Joi.number().integer().positive().required().messages({
    "number.base": "Duration must be a number",
    "number.integer": "Duration must be a whole number",
    "number.positive": "Duration cannot be negative",
    "any.required": "Duration is required",
  }),
  genre: Joi.string().min(5).max(40).required().messages({
    "string.base": "Genre must be a string",
    "string.empty": "Genre cannot be empty",
    "string.min": "Title must be at least 5 character long",
    "string.max": "Genre cannot exceed 40 characters",
    "any.required": "Genre is required",
  }),
  rating: Joi.string().min(2).max(10).required().messages({
    "string.base": "Rating must be a string",
    "string.empty": "Rating cannot be empty",
    "string.min": "Title must be at least 2 character long",
    "string.max": "Rating cannot exceed 10 characters",
    "any.required": "Rating is required",
  }),
  imageURL: Joi.string().uri().required().messages({
    "string.base": "Image URL must be a string",
    "string.empty": "Image URL cannot be empty",
    "string.uri": "Image URL must be a valid link",
    "any.required": "Image URL is required",
  }),
});

function validateMovie(req, res, next) {
  const { error } = movieSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
}

function validateMovieId(req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid movie ID. ID must be a positive number" });
  }
  next();
}

module.exports = {
  validateMovie,
  validateMovieId,
};
