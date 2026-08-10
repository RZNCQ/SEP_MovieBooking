const Joi = require("joi");

const showtimeSchema = Joi.object({
  movieID: Joi.number().integer().positive().required().messages({
    "number.base": "Movie ID must be a number",
    "number.integer": "Movie ID must be a whole number",
    "number.positive": "Movie ID must be a positive number",
    "any.required": "Movie ID is required",
  }),
  showDate: Joi.date().iso().required().messages({
    "date.base": "Show Date must be a valid date",
    "date.format": "Show Date must be in YYYY-MM-DD format",
    "any.required": "Show Date is required",
  }),
  startTime: Joi.string().required().messages({
    "string.base": "Start Time must be a string",
    "string.empty": "Start Time cannot be empty",
    "any.required": "Start Time is required",
  }),
  screen: Joi.string().min(1).max(50).required().messages({
    "string.base": "Screen must be a string",
    "string.empty": "Screen cannot be empty",
    "string.min": "Screen must be at least 1 character long",
    "string.max": "Screen cannot exceed 50 characters",
    "any.required": "Screen is required",
  }),
});

function validateShowtime(req, res, next) {
  const { error } = showtimeSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
}

module.exports = {
  validateShowtime,
};