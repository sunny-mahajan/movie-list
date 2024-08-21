import { getMovieById } from "../../../services/movieService";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      // Fetch the movie by ID
      const movie = await getMovieById(id);
      res.status(200).json(movie);
    } catch (error) {
      res.status(404).json({
        message: "Movie not found",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
