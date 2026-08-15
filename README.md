# PopcornCine

The PopcornCine App is a web application that allows users to browse movies, view And Select showtimes, and book tickets According To The Quantity they want. It features a role-based system, allowing standard customers to book their movie ticket and also allowing cinema admin to manage users, movies, and screenings using postman application. The application provides interactive interface for a complete booking experience.

## Design Process

This application is designed for moviegoers who want a quick, Reliable, and convenient Way to get seats for their favorite movie. Other Than That , the application is structured using the MVC architecture to ensure scalable data management, allowing cinema Admin to easily update movie showtime and track overall ticket booking Using Postman

## User Story

* As a customer, I want to browse available movies and showtimes so that I can decide what movie to watch.
* As a customer, I want to book tickets so that I can guarantee my seat for a specific screening.
* As a customer, I want to book the amount of ticket I want.
* As an admin, I want to add, update, and delete movies and showtimes so that the cinema schedule remains updated.
* As an admin, I want to view all bookings so that I can monitor ticket booked and seating capacity left.

## Features

This application provides a interface for managing movie bookings through a RESTful API with JWT authentication.

### Existing Features

* User Authentication – allows users to register, log in, and receive a secure token to access protected routes.
* Role Access – separates between 'Customer' and 'Admin' roles to protect sensitive backend information.
* Browse Movies & Showtimes – displays all current movies and their screening times.
* Ticket Booking – allows logged-in customers to book tickets, with backend validation to prevent customer booking more than the maximum screen capacity.
* Invoice – allows users to view their invoice before making booking reservation.
* Admin usage – allows admins to perform CRUD operations on users, movies, showtimes, and bookings table through postman.
* Validation & Error Handling – prevents unauthorized access and return error messages to the frontend if a booking fails.
* Responsive Layout – provides a user-friendly interface styled with Tailwind CSS for various screen sizes.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement

* Seat Selection that allows users to pick specific seat numbers.
* Payment system for processing credit card transactions.
* Email Confirmations sent to the user upon a successful booking.
* Admin portal to so admin can manage user, booking and movie and showtime table.
* Customer profile management where customer can manage their profile such as delete profile and update their profile information.

## Technologies Used

* HTML5
* Tailwind CSS
* JavaScript 
* Node.js
* Express
* SQL Server Management Studio

## Testing

* Authentication & Authorization
1. Open the Web App
2. Attempt to book a ticket without logging in.
3. Verify that the system redirects to the account.html.
4. Register If User Has No Account.
5. Log in with a valid account and attempt to book ticket again.

* Browse and Book Ticket
1. Log into the application.
2. Select movie and select an available showtime.
3. Select quantity of tickets and click review booking button.
4. Booking is successful.

* Capacity Validation
1. Select a ticket qty more than the maximum capacity 50 seats.
2. System prevents booking and displays an alert message indicating not enough seats and show the remaining seat.


* API Testing
1. GET /movies and /showtimes /users get all movies/ users/ showtime.
2. GET /bookings/user/:userid GET all booking made by specific user id.
3. GET /booking/:id get specific booking id.
4. GET /users/:id get specific user id.
5. POST /bookings creates a new booking.
6. POST /users creates a new user.
7. POST /movies creates a new movie.
8. POST /showtimes create a new showtime.
9. PUT /bookings/:id UPDATE a booking by id.
10. PUT /showtimes/:id Update specific booking id.
11. PUT /users/:id UPDATE specific user id.
12. PUT /movies/:id UPDATE specific movie id.
13. DELETE /user/:id DELETE specific user id.
14. DELETE /showtimes/:id DELETE specific booking id.
15. DELETE /booking/:id DELETE specific booking id.
16. DELETE /movies/:id DELETE specific movie id.



## Credits

### Media

* Movie Image And information is from https://www.themoviedb.org/

### Links

GitHub Repository: [Insert GitHub Repo Link Here]

