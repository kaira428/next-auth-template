import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.4naeh3s.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

export const connectToDb = async () => {

    const dbClient = await MongoClient.connect(connectionString);

    // const dbClient = await MongoClient.connect(`mongodb+srv://keng:cnkwMiB3Icg6FImv@wk-free-cluster.4naeh3s.mongodb.net/?retryWrites=true&w=majority`);

    return dbClient;
}
