import * as dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Carrega o arquivo de variáveis de acordo com o ambiente
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
