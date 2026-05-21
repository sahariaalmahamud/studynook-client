import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";



const uri = process.env.MONGO_URI;

console.log(uri);

if (!uri) {
    throw new Error("MONGO_URI is missing in environment variables");
}

const client = new MongoClient(uri);

// const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('roomsdb');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        }
    },
    plugins: [
        jwt()
    ]
});