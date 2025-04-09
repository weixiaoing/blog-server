import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  MONGO_URI: z.string(),
  SERVER_PORT: z.string(),
  SOCKET_PORT: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
});

const env = envSchema.parse(process.env);
export default env;
