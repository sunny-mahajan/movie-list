const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} = require("firebase/auth");
const { auth } = require("./firebaseConfig");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { addMovie, getMovies, updateMovie } = require('./src/services/movieService');

app.prepare().then(() => {
	const server = express();

	server.use(bodyParser.json());

	// Registration route
	server.post("/api/register", async (req, res) => {
		const { email, password } = req.body;

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			res.status(200).json({
				message: "User registered successfully",
				user,
			});
		} catch (error) {
			res.status(400).json({
				message: "Error registering user",
				error: error.message,
			});
		}
	});

	// Login route
	server.post("/api/login", async (req, res) => {
		const { email, password } = req.body;
		console.log(email, password);
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			res.status(200).json({
				message: "User logged in successfully",
				user,
			});
		} catch (error) {
			res.status(400).json({
				message: "Error logging in",
				error: error.message,
			});
		}
	});

    // API route to add a movie
	server.post("/api/add-movie", async (req, res) => {
		try {
			// Extract movie data from the request body
			const { title, publishingYear, poster } = req.body;
	
			// Validate if all required fields are present
			if (!title || !publishingYear || !poster) {
				return res.status(400).json({
					message: "Missing required fields: title, publishingYear, and/or poster",
				});
			}
	
			// Create movieData object with the extracted data
			const movieData = {
				title,
				publishingYear,
				poster,
			};
	
			// Call the addMovie function with the movieData
			const response = await addMovie(movieData);
	
			// Return the response from the addMovie function
			res.json(response);
		} catch (error) {
			// Handle errors and return a 500 status code with error details
			res.status(500).json({
				message: "Error adding movie",
				error: error.message,
			});
		}
	});

	// API route to update a movie
	server.put("/api/update-movie/:id", async (req, res) => {
		try {
			// Extract movie ID from the request parameters
			const { id } = req.params;

			// Extract updated movie data from the request body
			const { title, publishingYear, poster } = req.body;

			// Validate if all required fields are present
			if (!title || !publishingYear || !poster) {
				return res.status(400).json({
					message: "Missing required fields: title, publishingYear, and/or poster",
				});
			}

			// Create movieData object with the extracted data
			const movieData = {
				title,
				publishingYear,
				poster,
			};

			// Call the updateMovie function with the movie ID and the updated data
			const updatedMovie = await updateMovie(id, movieData);

			// Return the updated movie data
			res.json(updatedMovie);
		} catch (error) {
			// Handle errors and return a 500 status code with error details
			res.status(500).json({
				message: "Error updating movie",
				error: error.message,
			});
		}
	});


    // API route to get all movies
	server.get("/api/movies", async (req, res) => {
		try {
			const response = await getMovies();
            console.log(`response: `, response);
			// const data = await response.json();

			res.json(response);
		} catch (error) {
			res.status(500).json({
				message: "Error fetching indices",
				error: error.message,
			});
		}
	});

	// Default handler for all other routes
	server.all("*", (req, res) => {
		return handle(req, res);
	});

	const port = process.env.PORT || 3000;

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
