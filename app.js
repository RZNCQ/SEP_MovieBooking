const path = require("path");
const express = require("express");
const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const userController = require("./controllers/userController");
const { validateUser, validateUserId } = require("./middlewares/userValidation");
const authController = require("./controllers/authController");
const {verifyJWT, authorizedRoles} = require("./middlewares/authorizeUser")

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Only Admin Can Access
//Users
app.get("/users", verifyJWT, authorizedRoles("Admin"),userController.getAllUsers);
app.post("/users", verifyJWT, authorizedRoles("Admin"),validateUser, userController.createUser);

//Customer And Admin Can Access
//Users
app.get("/users/:id", verifyJWT, authorizedRoles("Admin","Customer"),validateUserId, userController.getUserById);
app.put("/users/:id",verifyJWT, authorizedRoles("Admin","Customer"),validateUserId ,userController.updateUser);
app.delete("/users/:id", verifyJWT, authorizedRoles("Admin","Customer"),validateUserId, userController.deleteUser);

//Public Access
//Register
app.post("/users/register", validateUser,userController.registerUser);
//Login
app.post("/login", authController.login);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});