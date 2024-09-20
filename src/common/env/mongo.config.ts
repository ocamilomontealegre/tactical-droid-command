import { z } from "zod";

const EnvSchema = z.object({
  MONGO_HOST: z.string().default("localhost"),
  MONGO_PORT: z.coerce.number().positive().default(27017),
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_DATABASE_NAME: z.string(),
  MONGO_AUTHSOURCE: z.string(),
});

interface MongoEnvironment {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly dbName: string;
  readonly authSource: string;
}

const parsedEnv = EnvSchema.parse(process.env);

export const mongoConfig: MongoEnvironment = {
  host: parsedEnv.MONGO_HOST,
  port: parsedEnv.MONGO_PORT,
  user: parsedEnv.MONGO_USER,
  password: parsedEnv.MONGO_PASSWORD,
  dbName: parsedEnv.MONGO_DATABASE_NAME,
  authSource: parsedEnv.MONGO_AUTHSOURCE,
};
