import { config } from "dotenv";
import { join } from "node:path";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

config({ path: join(process.cwd(), ".env.local") });

function getArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found?.slice(prefix.length);
}

async function main() {
  const email = getArg("email");
  const password = getArg("password");
  const name = getArg("name") ?? "Admin";

  if (!email || !password) {
    console.error(
      "Usage: npm run db:seed-admin -- --email=you@example.com --password='Something$Strong' --name='David Agyemang'"
    );
    process.exit(1);
  }
  if (password.length < 10) {
    console.error("Password must be at least 10 characters.");
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const passwordHash = await bcrypt.hash(password, 12);

  await connection.execute(
    `INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), name = VALUES(name)`,
    [email, passwordHash, name]
  );

  await connection.end();
  console.log(`Admin account ready for ${email}.`);
}

main().catch((err) => {
  console.error("Seeding admin failed:", err.message);
  process.exit(1);
});
