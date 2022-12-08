import { MongoClient } from "mongodb";

export const connectToDb = async () => {

    const dbClient = await MongoClient.connect(`mongodb+srv://keng:cnkwMiB3Icg6FImv@wk-free-cluster.4naeh3s.mongodb.net/?retryWrites=true&w=majority`);

    return dbClient;
}
