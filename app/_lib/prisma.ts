import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const criarPrismaClient = () => {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: ReturnType<typeof criarPrismaClient>;
}

export const db =
  process.env.NODE_ENV === "production"
    ? criarPrismaClient()
    : (global.prismaGlobal ??= criarPrismaClient());
