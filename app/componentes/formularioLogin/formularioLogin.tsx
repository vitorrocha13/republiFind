'use client'

import styles from './formularioLogin.module.css'; // Importação alterada para Módulo CSS
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
        // className alterado para styles['container-main']
        <main className={styles['container-main']}>
            {/* className alterado para styles['container-form'] */}
            <form action={realizarLogin} className={styles['container-form']}>
                <p>LOGIN</p>
                {/* ATENÇÃO: Verifique a classe 'container-lable' no seu CSS, 
                    pois provavelmente deveria ser 'container-label' (com 'e') */}
                {/* className alterado para styles['container-lable'] */}
                <div className={styles['container-lable']}>
                    <label htmlFor="">EMAIL</label>
                    <input type="email" name='email' id='email' />
                </div>
                {/* className alterado para styles['container-lable'] */}
                <div className={styles['container-lable']}>
                    <label htmlFor="">SENHA</label>
                    <input type="password" name='password' id='password' />
                </div>
                <button>ENTRAR</button>
            </form>
        </main>
    )
}

export default FormularioLogin