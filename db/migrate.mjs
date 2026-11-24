// Aplica o schema.sql no Postgres.
// Uso: npm run db:schema
import { readFile } from 'node:fs/promises';
import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL não definida. Rode via "npm run db:schema".');
    process.exit(1);
}

const client = new Client({ connectionString });

try {
    await client.connect();

    const sql = await readFile(new URL('./schema.sql', import.meta.url), 'utf8');
    await client.query(sql);

    console.log('Schema aplicado com sucesso.');
} catch (erro) {
    console.error('Falha ao aplicar o schema:', erro.message);
    process.exitCode = 1;
} finally {
    await client.end();
}
