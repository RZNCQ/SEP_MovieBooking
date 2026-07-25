const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("Customer", "Admin").required(),
});

function validateUser(req, res, next) {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
}

function validateUserId(req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid user ID. ID must be a positive number" });
  }
  next();
}

module.exports = {
  validateUser,
  validateUserId,
};
