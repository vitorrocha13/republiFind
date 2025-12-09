'use client'

import './formularioCadastro.css'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { LoginCredentials } from "@/app/libs/credenciais"
import { criarUsuarioBack } from "@/app/libs/credenciais"
import { redirect } from "next/navigation";

const cadastroSchema = z.object({
    email: z.string().email('email inválido').min(1, 'Email é obrigatório'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confPassword: z.string().min(1, 'Confirme sua senha')
}).refine((data) => data.password === data.confPassword, {
    message: 'As senhas não coincidem',
    path: ['confPassword']
})


const FormularioCadastro = () => {
    const criarUsuario = async (formData: FormData) => {
        const dadosUsuario = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confPassword: formData.get('conf-password') as string
        }

        const resultadoZod = cadastroSchema.safeParse(dadosUsuario)

        if (!resultadoZod.success) {
            let errorMsg = ""
            resultadoZod.error.issues.forEach((issue) => {
                errorMsg += issue.message + '. '
            })
            toast.error(errorMsg)
            return
        }

        const respostaUsuario = await criarUsuarioBack(dadosUsuario as LoginCredentials)

        if (respostaUsuario.error) {
            toast.error(respostaUsuario.error)
            return
        }

        if (respostaUsuario.success) {
            toast.success(respostaUsuario.success)
            redirect('/login');
        }
    }

    return (
        <main className='container-main'>
            <form action={criarUsuario} className='container-form'>
                <p>CADASTRO</p>

                <div className='container-label'>
                    <label>EMAIL</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div className='container-label'>
                    <label>SENHA</label>
                    <input type="password" name="password" id="password" />
                </div>

                <div className='container-label'>
                    <label>CONFIRMAR SENHA</label>
                    <input type="password" name="conf-password" id="conf-password" />
                </div>

                <button type="submit">CADASTRAR</button>
            </form>
        </main>
    )
}

export default FormularioCadastro
