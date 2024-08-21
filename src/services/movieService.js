const {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  startAt,
  limit,
  doc,
  updateDoc,
  getDoc,
} = require("firebase/firestore");
const { db } = require("../../firebaseConfig.js");

// Function to add a new movie
const addMovie = async (movieData) => {
  try {
    const docRef = await addDoc(collection(db, "movies"), movieData);
    return { id: docRef.id, ...movieData };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Function to get all movies
const getMovies = async (page = 1, limitValue = 8) => {
  const moviesRef = collection(db, "movies");
  const moviesQuery = query(
    moviesRef,
    orderBy("title"),
    startAt((page - 1) * limitValue),
    limit(limitValue)
  );

  const querySnapshot = await getDocs(moviesQuery);
  const movies = [];
  querySnapshot.forEach((doc) => {
    movies.push({ id: doc.id, ...doc.data() });
  });

  return movies;
};

// Function to update a movie
const updateMovie = async (id, movieData) => {
  const movieDoc = doc(db, "movies", id);
  await updateDoc(movieDoc, movieData);
  const updatedDoc = await getDoc(movieDoc);
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

module.exports = { addMovie, getMovies, updateMovie };
