import styles from './formularioMoradia.module.css'
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
import { criarMoradia } from '@/app/libs/moradias';
import { getUsuarioIdLogado } from '@/app/libs/session';

const FormularioMoradia = () => {

    const adicionarMoradia = async (formData: FormData) => {
        "use server";

        const usuarioId = await getUsuarioIdLogado();

        if (!usuarioId) {
            redirect('/login');
        }

        const moradia = {
            nome: (formData.get('nome') as string ?? '').trim(),
            endereco: (formData.get('endereco') as string ?? '').trim(),
            descricao: (formData.get('descricao') as string ?? '').trim(),
        }

        await criarMoradia({
            usuarioId,
            nome: moradia.nome,
            endereco: moradia.endereco,
            descricao: moradia.descricao,
        });

        revalidatePath('/dashboard');
        revalidatePath('/');
        redirect('/dashboard');
    }


    return (
        <div className={styles['container-form']}> 
            <form action={adicionarMoradia}className={styles['form-moradia']}> 
                <div className={styles['container-texto']}>
                    <h1>CADASTRAR MORADIA</h1>

                    <div className={styles['container-label']}>
                        <label>NOME DA MORADIA</label>
                        <input type='text' name='nome' id='nome' required></input>
                    </div>

                    <div className={styles['container-label']}>
                        <label>ENDEREÇO</label>
                        <input type='text' name='endereco' id='endereco' required></input>
                    </div>

                    <div className={styles['container-label']}>
                        <label>DESCRIÇÃO</label>
                        <textarea name='descricao' id='descricao' className={styles['input-descricao']} required></textarea>
                    </div>
                    <button className={styles['btn-cadastrar']}>CADASTRAR</button>
                </div>
            </form>
        </div>
    );
}

export default FormularioMoradia
