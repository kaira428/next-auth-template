import { connectToDb } from "../../utils/database/mongo-db";
import hashPassword from "../../utils/hashPassword";
import { authSchema } from "../../utils/validation";

export default async function handler(req, res) {
  const { email, password } = req.body;

  // Validation
  try {
    await authSchema.validate(
      {
        email,
        password,
      },
      { abortEarly: false }
    );
  } catch (error) {
    res.status(500).json({ message: "Something's wrong", error });
    return;
  }

  const mongoClient = await connectToDb();
  const db = mongoClient.db();

  // const db = mongoClient.db("auth-proj");

  // check with user has already registered
  const userAlreadyRegistered = await db.collection('users').findOne({email});

  // console.log(userAlreadyRegistered);

  if (userAlreadyRegistered){
    res.status(400).json({ message: "User already registered"})
    return;
  }

  try {    
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
