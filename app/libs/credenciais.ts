'use server';

import { redirect } from "next/navigation";
import ConexaoBD from "./conexaoBD";
import bcrypt from 'bcrypt';
import { createSessionToken } from "./session";

const usuarioBanco = 'usuariosBanco.json';

export type LoginCredentials = {
  email: string
  password: string
}

export const criarUsuarioBack = async (data: LoginCredentials) => {

    const email = data.email;
    const password = data.password;

    const passwordCrypt = await bcrypt.hash(password,10);

    const novoUser = {
        id: crypto.randomUUID(),
        email,
        password: passwordCrypt
    }

    const users = await ConexaoBD.retornaBD(usuarioBanco);

    for(const user of users)
    {
        if(user.email === email){
            return {error: 'Usuário ou senha incorretos'};
        }
    }
    users.push(novoUser);
    ConexaoBD.armazenaBD(usuarioBanco,users);
    return {success: 'Usuário Criado com Sucesso'}

}

export const validateCredentials = async (data: LoginCredentials) => {

    const email = data.email;
    const password = data.password;

    const usuariosDB = await ConexaoBD.retornaBD(usuarioBanco);

    const user = usuariosDB.find(user => user.email === email);

    if(!user)
        return {error: 'Usuário não encontrado'};
    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch)
    {
        console.log('tamo aqui')
        await createSessionToken(user.id, user.email);
        redirect('/dashboard');
    }
    else{
        return {error: 'Usuario ou senhas incorretos'}
    }

}