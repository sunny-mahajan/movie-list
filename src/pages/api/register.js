import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
