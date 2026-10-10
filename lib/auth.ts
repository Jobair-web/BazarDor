import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const g = globalThis as unknown as { _mongoClient?: MongoClient };
const client = g._mongoClient ?? new MongoClient(process.env.MONGODB_URI!);
if (process.env.NODE_ENV !== "production") g._mongoClient = client;

const socialProviders: NonNullable<Parameters<typeof betterAuth>[0]>["socialProviders"] = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db(process.env.MONGODB_DB ?? "bazardor")),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true, minPasswordLength: 8 }, // email verification বন্ধ
  socialProviders,
  plugins: [nextCookies()], // এটা সবসময় শেষে
});