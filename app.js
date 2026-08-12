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

//Showtime controller and middleware
const showtimeController = require("./controllers/showtimeController");
const {validateShowtime} = require("./middlewares/showtimeValidation");

//Booking Controller And Middleware
const bookingController = require("./controllers/bookingController");
const {validateBooking} = require("./middlewares/bookingValidation");

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
app.put("/movies/:id",verifyJWT,authorizedRoles("Admin"),validateMovieId, validateMovie, movieController.updateMovie);
app.delete("/movies/:id",verifyJWT,authorizedRoles("Admin"),validateMovieId,movieController.deleteMovie);
//showtimes
app.post("/showtimes",verifyJWT,authorizedRoles("Admin"),validateShowtime,showtimeController.createShowtime);
app.put("/showtimes/:id", verifyJWT, authorizedRoles("Admin"), validateShowtime, showtimeController.updateShowtime);
app.delete("/showtimes/:id", verifyJWT, authorizedRoles("Admin"), showtimeController.deleteShowtime);
//Booking
app.get("/bookings",verifyJWT, authorizedRoles("Admin"),bookingController.getAllBookings);
app.get("/bookings/:id",verifyJWT, authorizedRoles("Admin"),bookingController.getBookingById);
app.delete("/bookings/:id",verifyJWT, authorizedRoles("Admin"),bookingController.deleteBooking);

//Customer And Admin Can Access
//Users
app.get("/users/:id", verifyJWT, authorizedRoles("Admin","Customer"),validateUserId, userController.getUserById);
app.put("/users/:id",verifyJWT, authorizedRoles("Admin","Customer"),validateUserId,validateUser ,userController.updateUser);
app.delete("/users/:id", verifyJWT, authorizedRoles("Admin","Customer"),validateUserId, userController.deleteUser);
//Bookings
app.get("/bookings/user/:userId",verifyJWT, authorizedRoles("Admin","Customer"),bookingController.getBookingsByUserId);
app.post("/bookings",verifyJWT, validateBooking, authorizedRoles("Admin","Customer"),bookingController.createBooking);

//Public Access
//Movies
app.get("/movies",movieController.getAllMovies);
app.get("/movies/:id",validateMovieId, movieController.getMovieById);
//Showrtime
app.get("/showtimes", showtimeController.getAllShowtimes);
app.get("/showtimes/:id", showtimeController.getShowtimeById);
app.get("/showtimes/movie/:movieId", showtimeController.getShowtimesByMovieId);
//Register
app.post("/users/register", validateUser,userController.registerUser);
//Login
app.post("/login", authController.login);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});