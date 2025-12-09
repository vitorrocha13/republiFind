'use server';

import { redirect } from "next/navigation";
import ConexaoBD from "./conexaoBD";

import bcrypt from 'bcrypt'; //Para criptografar a senha. npm i bcrypt
import { createSessionToken } from "./session";

const userDBFile = 'usuariosBanco.json';

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

    const users = await ConexaoBD.retornaBD(userDBFile);

    for(const user of users)
    {
        if(user.email === email){
            return {error: 'Usuário ou senha incorretos'};
        }
    }
    users.push(novoUser);
    ConexaoBD.armazenaBD(userDBFile,users);
    return {success: 'Usuário Criado com Sucesso'}

}

export const validateCredentials = async (data: LoginCredentials) => {

    const email = data.email;
    const password = data.password;

    const usuariosDB = await ConexaoBD.retornaBD(userDBFile);

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