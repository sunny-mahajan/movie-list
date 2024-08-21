import { getMovies } from "../../services/movieService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const movies = await getMovies();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching movies",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
