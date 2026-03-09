/* eslint-disable @typescript-eslint/no-explicit-any */

let prismaInstance: any = null;

export async function getClient() {
  if (prismaInstance) return prismaInstance;

  const { createRequire } = await import("node:module");
  const { join } = await import("node:path");
  const nodeRequire = createRequire(join(process.cwd(), "package.json"));

  const clientPath = join(process.cwd(), "src", "generated", "prisma", "compiled", "client.cjs");
  const { PrismaClient } = nodeRequire(clientPath);

  const { PrismaBetterSqlite3 } = nodeRequire("@prisma/adapter-better-sqlite3");

  const dbUrl = process.env.DATABASE_URL || "file:./dev.db";
  const dbFile = dbUrl.replace("file:", "").replace("./", "");
  const dbPath = join(process.cwd(), dbFile);
  const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
  prismaInstance = new PrismaClient({ adapter });
  return prismaInstance;
}
