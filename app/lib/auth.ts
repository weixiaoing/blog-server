import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import env from "./env";

import { MongoClient } from "mongodb";
const client = new MongoClient(env.MONGO_URI);
const db = client.db()
export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_ID,
            clientSecret: env.AUTH_GITHUB_SECRET
        }
    }

})