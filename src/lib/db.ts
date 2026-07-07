import mysql from "mysql2/promise";

// A lazily-created, process-wide connection pool. Next.js dev mode can
// hot-reload this module, so we stash the pool on `globalThis` to avoid
// leaking a new pool (and its connections) on every reload.
declare global {
  // eslint-disable-next-line no-var
  var __gmDbPool: mysql.Pool | undefined;
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    // Fail fast rather than hanging a request for minutes if the DB is
    // unreachable — callers are expected to catch and fall back gracefully.
    connectTimeout: 5000,
  });
}

export function getPool(): mysql.Pool {
  if (!global.__gmDbPool) {
    global.__gmDbPool = createPool();
  }
  return global.__gmDbPool;
}

type QueryParam = string | number | boolean | Date | Buffer | null;

export async function query<T = unknown>(sql: string, params: QueryParam[] = []): Promise<T[]> {
  const [rows] = await getPool().query(sql, params);
  return rows as T[];
}

export async function execute(
  sql: string,
  params: QueryParam[] = []
): Promise<mysql.ResultSetHeader> {
  const [result] = await getPool().execute(sql, params);
  return result as mysql.ResultSetHeader;
}
