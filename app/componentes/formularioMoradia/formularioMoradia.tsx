import styles from './formularioMoradia.module.css' 
import ConexaoBD from '@/app/libs/conexaoBD'
import { MoradiaProps } from '../cardMoradia/cardmoradia';
import { redirect } from "next/navigation";
import Mapa from '@/app/componentes/mapa/mapa'

const arquivo = 'moradias.json';

const FormularioMoradia = () => {

    const adicionarMoradia = async (formData: FormData) => {
        "use server";

        const moradia : MoradiaProps = {
            nome: formData.get('nome') as string,
            endereco : formData.get('endereco') as string,
            descricao : formData.get('descricao') as string,
            id: crypto.randomUUID()
        }

        const moradiasBanco = await ConexaoBD.retornaBD(arquivo);
        moradiasBanco.push(moradia);
        await ConexaoBD.armazenaBD(arquivo,moradiasBanco);
        redirect('/dashboard');
    }


    return (
        <div className={styles['container-form']}> 
            <form action={adicionarMoradia}className={styles['form-moradia']}> 
                <div className={styles['container-texto']}>
                    <h1>CADASTRAR MORADIA</h1>

                    <div className={styles['container-label']}>
                        <label>NOME DA MORADIA</label>
                        <input type='text' name='nome' id='nome'></input>
                    </div>

                    <div className={styles['container-label']}>
                        <label>ENDEREÇO</label>
                        <input type='text' name='endereco' id='endereco'></input>
                    </div>

                    <div className={styles['container-label']}>
                        <label>DESCRIÇÃO</label>
                        <input type='text' name='descricao' id='descricao' className={styles['input-descricao']}></input>
                    </div>
                    <button className={styles['btn-cadastrar']}>CADASTRAR</button>
                </div>
                
                <div className={styles['container-mapa']}>
                    <Mapa></Mapa>
                </div>
            </form>
        </div>
    );
}

export default FormularioMoradia