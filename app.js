const path = require("path");
const express = require("express");
const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const userController = require("./controllers/userController");
const { validateUser, validateUserId } = require("./middlewares/userValidation");
const authController = require("./controllers/authController");


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", userController.getAllUsers);
app.get("/users/:id", validateUserId, userController.getUserById);
app.post("/users", validateUser, userController.createUser); 
app.post("/users/register", validateUser,userController.registerUser);
app.put("/users/:id",validateUserId ,userController.updateUser);
app.delete("/users/:id", validateUserId, userController.deleteUser);

//Login
app.post("/login", authController.login);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});