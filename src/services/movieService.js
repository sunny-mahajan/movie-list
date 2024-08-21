const {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  doc,
  updateDoc,
  getDoc,
} = require("firebase/firestore");
const { db } = require("../../firebaseConfig.js");

// Function to add a new movie
const addMovie = async (movieData) => {
  try {
    const timestamp = new Date();
    const movieDataWithTimestamp = {
      ...movieData,
      createdAt: timestamp,
    };
    const docRef = await addDoc(
      collection(db, "movies"),
      movieDataWithTimestamp
    );
    return { id: docRef.id, ...movieDataWithTimestamp };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Function to get all movies
const getMovies = async (page = 1, limitValue = 8, cursorDoc = null) => {
  const moviesRef = collection(db, "movies");
  let moviesQuery = query(moviesRef, orderBy("createdAt"), limit(limitValue));

  if (cursorDoc) {
    moviesQuery = query(
      moviesRef,
      orderBy("createdAt"),
      startAfter(cursorDoc),
      limit(limitValue)
    );
  }

  const querySnapshot = await getDocs(moviesQuery);
  const movies = [];
  let lastDoc = null;
  let firstDoc = null;

  querySnapshot.forEach((doc) => {
    movies.push({ id: doc.id, ...doc.data() });
    lastDoc = doc;
    if (!firstDoc) {
      firstDoc = doc;
    }
  });

  const totalMoviesSnapshot = await getDocs(collection(db, "movies"));
  const totalMovies = totalMoviesSnapshot.size;

  return {
    movies,
    totalMovies,
    lastVisibleDoc: lastDoc,
    firstVisibleDoc: firstDoc,
  };
};

// Function to update a movie
const updateMovie = async (id, movieData) => {
  const movieDoc = doc(db, "movies", id);

  const timestamp = new Date();
  const movieDataWithTimestamp = {
    ...movieData,
    updatedAt: timestamp,
  };

  await updateDoc(movieDoc, movieDataWithTimestamp);
  const updatedDoc = await getDoc(movieDoc);
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

module.exports = { addMovie, getMovies, updateMovie };
