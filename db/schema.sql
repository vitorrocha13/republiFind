-- Schema do RepubliFind
-- Rode com: npm run db:schema

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS moradias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    descricao TEXT NOT NULL DEFAULT '',
    disponivel BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_moradias_usuario_id ON moradias (usuario_id);
CREATE INDEX IF NOT EXISTS idx_moradias_disponivel ON moradias (disponivel);

-- Mantém atualizado_em sempre correto em UPDATEs
CREATE OR REPLACE FUNCTION set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_moradias_atualizado_em ON moradias;

CREATE TRIGGER trg_moradias_atualizado_em
    BEFORE UPDATE ON moradias
    FOR EACH ROW
    EXECUTE FUNCTION set_atualizado_em();
