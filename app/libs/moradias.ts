import { query } from './db';

export type Moradia = {
    id: string;
    usuarioId: string;
    proprietarioEmail: string;
    nome: string;
    endereco: string;
    descricao: string;
    disponivel: boolean;
    criadoEm: string;
};

const colunasMoradia = `
    m.id,
    m.usuario_id AS "usuarioId",
    u.email AS "proprietarioEmail",
    m.nome,
    m.endereco,
    m.descricao,
    m.disponivel,
    m.criado_em::text AS "criadoEm"
`;

const fromMoradia = 'FROM moradias m JOIN usuarios u ON u.id = m.usuario_id';

export async function listarMoradiasDisponiveis(): Promise<Moradia[]> {
    const { rows } = await query<Moradia>(
        `SELECT ${colunasMoradia}
           ${fromMoradia}
          WHERE m.disponivel = true
          ORDER BY m.criado_em DESC`
    );

    return rows;
}

export async function listarMoradiasDoUsuario(usuarioId: string): Promise<Moradia[]> {
    const { rows } = await query<Moradia>(
        `SELECT ${colunasMoradia}
           ${fromMoradia}
          WHERE m.usuario_id = $1
          ORDER BY m.criado_em DESC`,
        [usuarioId]
    );

    return rows;
}

export async function buscarMoradiaDoUsuario(
    id: string,
    usuarioId: string
): Promise<Moradia | null> {
    const { rows } = await query<Moradia>(
        `SELECT ${colunasMoradia}
           ${fromMoradia}
          WHERE m.id = $1 AND m.usuario_id = $2`,
        [id, usuarioId]
    );

    return rows[0] ?? null;
}

export async function criarMoradia(dados: {
    usuarioId: string;
    nome: string;
    endereco: string;
    descricao: string;
}): Promise<void> {
    await query(
        `INSERT INTO moradias (usuario_id, nome, endereco, descricao)
         VALUES ($1, $2, $3, $4)`,
        [dados.usuarioId, dados.nome, dados.endereco, dados.descricao]
    );
}

export async function atualizarMoradia(dados: {
    id: string;
    usuarioId: string;
    nome: string;
    endereco: string;
    descricao: string;
    disponivel: boolean;
}): Promise<boolean> {
    const { rowCount } = await query(
        `UPDATE moradias
            SET nome = $3,
                endereco = $4,
                descricao = $5,
                disponivel = $6
          WHERE id = $1 AND usuario_id = $2`,
        [dados.id, dados.usuarioId, dados.nome, dados.endereco, dados.descricao, dados.disponivel]
    );

    return (rowCount ?? 0) > 0;
}

export async function deletarMoradia(id: string, usuarioId: string): Promise<boolean> {
    const { rowCount } = await query(
        'DELETE FROM moradias WHERE id = $1 AND usuario_id = $2',
        [id, usuarioId]
    );

    return (rowCount ?? 0) > 0;
}
