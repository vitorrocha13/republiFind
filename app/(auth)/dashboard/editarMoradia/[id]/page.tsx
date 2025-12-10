
import ConexaoBD from "@/app/libs/conexaoBD";
import { MoradiaProps } from "@/app/componentes/cardMoradia/cardmoradia";
import { redirect } from "next/navigation";
import styles from '@/app/componentes/formularioMoradia/formularioMoradia.module.css'
import Header from '@/app/componentes/header/header'
import Footer from "@/app/componentes/footer/footer";

const arquivo = 'moradias.json';

interface EditarMoradiaProps{
    params: Promise<{id: string}>;
}

const EditarMoradia = async ({params}: EditarMoradiaProps) => {

    const {id} = await params;
    
    const moradiasBanco = await ConexaoBD.retornaBD(arquivo);

    const moradiaToEdit: MoradiaProps = moradiasBanco.find((p: MoradiaProps) => p.id === id);
    const moradiaToEditIndex: number = moradiasBanco.findIndex((p) => p.id === id);

    const atualizarMoradia = async (formData : FormData) => {
        'use server';

        const dadosAtualizados: MoradiaProps = {
            id,
            nome: formData.get('nome') as string,
            endereco: formData.get('endereco') as string,
            descricao: formData.get('descricao') as string
        }

        moradiasBanco.splice(moradiaToEditIndex,1,dadosAtualizados);

        await ConexaoBD.armazenaBD(arquivo,moradiasBanco);

        redirect('/dashboard');

    }




    return (
        <>
        <Header page="dashboard"></Header>
        <div className={styles['container-form']}> 
            <form action={atualizarMoradia}className={styles['form-moradia']}> 
                <div className={styles['container-texto']}>
                    <h1>CADASTRAR MORADIA</h1>

                    <div className={styles['container-label']}>
                        <label>NOME DA MORADIA</label>
                        <input type='text' name='nome' id='nome' defaultValue={moradiaToEdit.nome}></input>
                    </div>

                    <div className={styles['container-label']}>
                        <label>ENDEREÇO</label>
                        <input type='text' name='endereco' id='endereco' defaultValue={moradiaToEdit.endereco}></input>
                    </div>

                    <div className={styles['container-label']}>
                        <label>DESCRIÇÃO</label>
                        <input type='text' name='descricao' id='descricao' defaultValue={moradiaToEdit.descricao} className={styles['input-descricao']}></input>
                        
                    </div>
                    <button className={styles['btn-cadastrar']}>Atualizar</button>
                </div>
                
                <div className={styles['container-mapa']}>

                </div>
            </form>
        </div>
        <Footer></Footer>
        </>
    );

}

export default EditarMoradia