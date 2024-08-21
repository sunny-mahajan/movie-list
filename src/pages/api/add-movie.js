import { addMovie } from "../../services/movieService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, publishingYear, poster } = req.body;
    if (!title || !publishingYear || !poster) {
      return res.status(400).json({
        message: "Missing required fields: title, publishingYear, and/or poster",
      });
    }

    try {
      const response = await addMovie({ title, publishingYear, poster });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error adding movie",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
