import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "../../../utils/database/mongo-db";
import { passwordCheck } from "../../../utils/passwordCheck";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Do Validation

        const mongoClient = await connectToDb();

        // user check
        const user = await mongoClient
          .db("auth-proj")
          .collection("users")
          .findOne({
            email: credentials.email,
          });

        if (!user) {
          mongoClient.close();
          throw new Error("Not a valid user");
        }

        // check password
        const isValid = await passwordCheck(
          credentials.password,
          user.password
        );

        if (!isValid) {
          mongoClient.close();
          throw new Error("Please check your password");
        }

        mongoClient.close();

        return { email: user.email };
      },
    }),
  ],
});
