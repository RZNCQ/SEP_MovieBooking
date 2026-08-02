const path = require("path");
const express = require("express");
const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const userController = require("./controllers/userController");
const { validateUser, validateUserId } = require("./middlewares/userValidation");
const authController = require("./controllers/authController");
const {verifyJWT, authorizedRoles} = require("./middlewares/authorizeUser");

//Movies controller and middleware
const movieController = require("./controllers/movieController");
const {validateMovie,validateMovieId} = require("./middlewares/movieValidation");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"public")));

//Only Admin Can Access
//Users
app.get("/users", verifyJWT, authorizedRoles("Admin"),userController.getAllUsers);
app.post("/users", verifyJWT, authorizedRoles("Admin"),validateUser, userController.createUser);
//Movies
app.post("/movies",verifyJWT,authorizedRoles("Admin"),validateMovie,movieController.createMovie);
app.put("/movies/:id",verifyJWT,authorizedRoles("Admin"),validateMovieId,movieController.updateMovie);
app.delete("/movies/:id",verifyJWT,authorizedRoles("Admin"),validateMovieId,movieController.deleteMovie);

//Customer And Admin Can Access
//Users
app.get("/users/:id", verifyJWT, authorizedRoles("Admin","Customer"),validateUserId, userController.getUserById);
app.put("/users/:id",verifyJWT, authorizedRoles("Admin","Customer"),validateUserId ,userController.updateUser);
app.delete("/users/:id", verifyJWT, authorizedRoles("Admin","Customer"),validateUserId, userController.deleteUser);

//Public Access
app.get("/movies",movieController.getAllMovies);
app.get("/movies/:id",validateMovieId, movieController.getMovieById);
//Register
app.post("/users/register", validateUser,userController.registerUser);
//Login
app.post("/login", authController.login);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});