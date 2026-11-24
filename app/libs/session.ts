'use server';

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

function getSecretKey() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error(
            'JWT_SECRET não definido. Crie o arquivo .env.local na raiz com: JWT_SECRET=sua_chave_gerada_aqui'
        );
    }

    return new TextEncoder().encode(secret);
}

async function openSessionToken(token: string) {
    const encodedKey = getSecretKey();

    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (e) {
        console.log('Erro ao verificar session token:', (e as Error)?.message ?? e);
    }
}

export async function createSessionToken(userId: string, userEmail: string) {
    const encodedKey = getSecretKey();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    const session = await new SignJWT({ userId, userEmail })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(encodedKey);

    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        expires: expiresAt,
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function isSessionValid() {
    const sessionCookie = (await cookies()).get('session');

    if (sessionCookie) {
        const { value } = sessionCookie;
        const session = await openSessionToken(value);
        return session;
    }

    return false;
}

export async function getUsuarioIdLogado(): Promise<string | null> {
    const sessao = await isSessionValid();

    if (!sessao || typeof sessao.userId !== 'string') {
        return null;
    }

    return sessao.userId;
}

export async function deleteSessionCookie() {
    const cookieStore = await cookies();

    cookieStore.delete('session');
}
