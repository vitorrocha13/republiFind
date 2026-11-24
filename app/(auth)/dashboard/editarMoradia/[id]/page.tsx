import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from '@/app/componentes/formularioMoradia/formularioMoradia.module.css'
import Header from '@/app/componentes/header/header'
import Footer from "@/app/componentes/footer/footer";
import { atualizarMoradia, buscarMoradiaDoUsuario } from "@/app/libs/moradias";
import { getUsuarioIdLogado } from "@/app/libs/session";

interface EditarMoradiaProps{
    params: Promise<{id: string}>;
}

const EditarMoradia = async ({params}: EditarMoradiaProps) => {

    const {id} = await params;

    const usuarioId = await getUsuarioIdLogado();

    if (!usuarioId) {
        redirect('/login');
    }

    const moradiaToEdit = await buscarMoradiaDoUsuario(id, usuarioId);

    if (!moradiaToEdit) {
        notFound();
    }

    const atualizarMoradiaAction = async (formData : FormData) => {
        'use server';

        const usuarioIdLogado = await getUsuarioIdLogado();

        if (!usuarioIdLogado) {
            redirect('/login');
        }

        const atualizada = await atualizarMoradia({
            id,
            usuarioId: usuarioIdLogado,
            nome: (formData.get('nome') as string ?? '').trim(),
            endereco: (formData.get('endereco') as string ?? '').trim(),
            descricao: (formData.get('descricao') as string ?? '').trim(),
            disponivel: formData.get('disponivel') !== null,
        });

        if (!atualizada) {
            redirect('/dashboard');
        }

        revalidatePath('/dashboard');
        revalidatePath('/');
        redirect('/dashboard');
    }

    return (
        <>
        <Header page="dashboard"></Header>
        <div className={styles['container-form']}> 
            <form action={atualizarMoradiaAction}className={styles['form-moradia']}> 
                <div className={styles['container-texto']}>
                    <h1>EDITAR MORADIA</h1>

                    <div className={styles['container-label']}>
                        <label>NOME DA MORADIA</label>
                        <input type='text' name='nome' id='nome' defaultValue={moradiaToEdit.nome} required></input>
                    </div>

                    <div className={styles['container-label']}>
                        <label>ENDEREÇO</label>
                        <input type='text' name='endereco' id='endereco' defaultValue={moradiaToEdit.endereco} required></input>
                    </div>

                    <div className={styles['container-label']}>
                        <label>DESCRIÇÃO</label>
                        <textarea name='descricao' id='descricao' defaultValue={moradiaToEdit.descricao} className={styles['input-descricao']} required></textarea>
                    </div>

                    <div className={styles['container-checkbox']}>
                        <input type='checkbox' name='disponivel' id='disponivel' defaultChecked={moradiaToEdit.disponivel}></input>
                        <label htmlFor='disponivel'>Exibir em &quot;moradias disponíveis&quot;</label>
                    </div>

                    <button className={styles['btn-cadastrar']}>Atualizar</button>
                </div>
            </form>
        </div>
        <Footer></Footer>
        </>
    );

}

export default EditarMoradia
