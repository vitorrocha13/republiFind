import { Pool } from 'pg';
import type { QueryResult, QueryResultRow } from 'pg';

const globalForPg = globalThis as unknown as { republifindPool?: Pool };

function criaPool() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error(
            'DATABASE_URL não definida. Adicione no .env.local: DATABASE_URL=postgresql://republifind:republifind@localhost:5432/republifind'
        );
    }

    return new Pool({ connectionString, max: 10 });
}

// Em dev o Next recarrega os módulos a cada alteração; guardar no global evita
// vazar conexões abertas a cada hot reload.
export const pool = globalForPg.republifindPool ?? criaPool();

if (process.env.NODE_ENV !== 'production') {
    globalForPg.republifindPool = pool;
}

export function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    valores?: unknown[]
): Promise<QueryResult<T>> {
    return pool.query<T>(text, valores);
}
