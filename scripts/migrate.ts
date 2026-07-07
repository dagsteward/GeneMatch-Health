import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import mysql from "mysql2/promise";

config({ path: join(process.cwd(), ".env.local") });

async function main() {
  const schema = readFileSync(join(process.cwd(), "db/schema.sql"), "utf-8")
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  console.log(`Connecting to ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME} ...`);

  for (const statement of statements) {
    const label = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] ?? "statement";
    process.stdout.write(`  applying: ${label} ... `);
    await connection.query(statement);
    console.log("ok");
  }

  await connection.end();
  console.log("Migration complete.");
}

main().catch((err) => {
  console.error("Migration failed:", err.message ?? err);
  process.exit(1);
});
