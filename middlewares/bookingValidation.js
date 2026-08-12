const Joi = require("joi");

const bookingSchema = Joi.object({
  showtimeId: Joi.number().integer().positive().required().messages({
    "number.base": "Showtime ID must be a number",
    "number.integer": "Showtime ID must be a whole number",
    "number.positive": "Showtime ID must be a positive number",
    "any.required": "Showtime ID is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be a whole number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
  totalAmount: Joi.number().min(0).required().messages({
    "number.base": "Total Amount must be a number",
    "number.min": "Total Amount cannot be negative",
    "any.required": "Total Amount is required",
  }),
});

function validateBooking(req, res, next) {
  const { error } = bookingSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
}

module.exports = {
  validateBooking,
};