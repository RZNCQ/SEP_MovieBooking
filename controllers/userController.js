const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function getAllUsers(req, res) {
  try {
    const user = await userModel.getAllUsers();
    res.json(user);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
}

async function getUserById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
}

async function registerUser(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name: name,
      email: email,
      passwordHash: hashedPassword,
      role: role,
    };
    const newUser = await userModel.createUser(userData);
    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createUser(req, res) {
  try {
    const newUser = await userModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Controller error: ", error);
    res.status(500).json({ error: "Error creating user" });
  }
}

async function updateUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { name, password } = req.body; 
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    const userData = {
      name: name,
      passwordHash: hashedPassword,
    };
    const result = await userModel.updateUser(id, userData);
    if (result === 0) {
      return res.status(404).send("user not found");
    }
    const updatedUser = await userModel.getUserById(id);
    res.json({
      message: `user with id ${id} updated successfully.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error updating user" });
  }
}

async function deleteUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await userModel.deleteUser(id);
    if (result === 0) {
      return res.status(404).send("user not found");
    }
    res.json({
      message: `user with id ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
};
