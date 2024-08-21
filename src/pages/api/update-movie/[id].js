import { updateMovie } from "../../../services/movieService";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { title, publishingYear, poster } = req.body;

    if (!title || !publishingYear || !poster) {
      return res.status(400).json({
        message: "Missing required fields: title, publishingYear, and/or poster",
      });
    }

    try {
      const updatedMovie = await updateMovie(id, { title, publishingYear, poster });
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({
        message: "Error updating movie",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
