import { Pool } from 'pg';

// Prevent multiple Pool instances in development (hot reload).
const globalForDb = globalThis as unknown as {
  dbPool: Pool | undefined;
};

const getPool = () => {
  if (!globalForDb.dbPool) {
    globalForDb.dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return globalForDb.dbPool;
};

export const db = {
  query: async (text: string, params?: any[]) => getPool().query(text, params),
  connect: async () => getPool().connect(),
  end: async () => getPool().end()
};

export { Pool };
