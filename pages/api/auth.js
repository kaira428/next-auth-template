import { connectToDb } from "../../utils/database/mongo-db";
import hashPassword from "../../utils/hashPassword";

export default async function handler(req, res) {
  const { email, password } = req.body;

  // Validation

  const mongoClient = await connectToDb();

  try {
    const db = mongoClient.db("auth-proj");
    
    // hash password
    const hashedPassword = await hashPassword(password);

    await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User successfully registerd." });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }

  mongoClient.close();
}
