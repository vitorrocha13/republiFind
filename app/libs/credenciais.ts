'use server';

import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import { createSessionToken } from "./session";
import { query } from "./db";

export type LoginCredentials = {
  email: string
  password: string
}

type UsuarioRow = {
  id: string
  email: string
  senha_hash: string
}

export const criarUsuarioBack = async (data: LoginCredentials) => {

    const email = data.email.trim().toLowerCase();
    const passwordCrypt = await bcrypt.hash(data.password, 10);

    const { rows } = await query<{ id: string }>(
        `INSERT INTO usuarios (email, senha_hash)
         VALUES ($1, $2)
         ON CONFLICT (email) DO NOTHING
         RETURNING id`,
        [email, passwordCrypt]
    );

    if (rows.length === 0) {
        return { error: 'E-mail já cadastrado' };
    }

    return { success: 'Usuário Criado com Sucesso' };
}

export const validateCredentials = async (data: LoginCredentials) => {

    const email = data.email.trim().toLowerCase();
    const password = data.password;

    const { rows } = await query<UsuarioRow>(
        'SELECT id, email, senha_hash FROM usuarios WHERE email = $1',
        [email]
    );

    const user = rows[0];

    if (!user) {
        return { error: 'Usuário não encontrado' };
    }

    const isMatch = await bcrypt.compare(password, user.senha_hash);

    if (!isMatch) {
        return { error: 'Usuario ou senhas incorretos' };
    }

    await createSessionToken(user.id, user.email);
    redirect('/dashboard');
}
