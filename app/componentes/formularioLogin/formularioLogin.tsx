'use client'

import './formularioLogin.css';
import { z } from 'zod';
import { LoginCredentials } from "@/app/libs/credenciais";
import { validateCredentials } from '@/app/libs/credenciais';
import toast from 'react-hot-toast';

const LoginSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({ message: 'Insira uma senha' }).trim().min(2, { message: 'Senha requer no mínimo 2 caracteres' })
})

const FormularioLogin = () => {

    const realizarLogin = async (formData: FormData) => {

        const dadosLogin: LoginCredentials = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        const resultadoZod = LoginSchema.safeParse(dadosLogin);

        if (!resultadoZod.success) {

            let errorMsg = '';

            resultadoZod.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '. ';
            });

            toast.error(errorMsg);

            return;
        }


        const loginValidacao = await validateCredentials(dadosLogin);

        if (loginValidacao) {
            toast.error(loginValidacao.error);
            return;
        }

    }

    return (
        <main className='container-main'>
            <form action={realizarLogin} className='container-form'>
                <p>LOGIN</p>
                <div className='container-lable'>
                    <label htmlFor="">EMAIL</label>
                    <input type="email" name='email' id='email' />
                </div>
                <div className='container-lable'>
                    <label htmlFor="">SENHA</label>
                    <input type="password" name='password' id='password' />
                </div>
                <button>ENTRAR</button>
            </form>
        </main>
    )
}

export default FormularioLogin