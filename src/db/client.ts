import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let sqlClient: NeonQueryFunction<false, false> | null = null;

export function getDbClient(): NeonQueryFunction<false, false> | null {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || databaseUrl.trim() === "" || databaseUrl.includes("user:password@ep-xyz")) {
    return null;
  }

  if (!sqlClient) {
    try {
      sqlClient = neon(databaseUrl);
    } catch (err) {
      console.warn("Failed to initialize Neon database client, using in-memory data:", err);
      return null;
    }
  }

  return sqlClient;
}

export function isDatabaseConnected(): boolean {
  return getDbClient() !== null;
}
