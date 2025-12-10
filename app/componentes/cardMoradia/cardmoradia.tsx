import style from './cardMoradia.module.css'
import ConexaoBD from '@/app/libs/conexaoBD'
import { redirect } from "next/navigation";
import Link from "next/link";
import Mapa from '@/app/componentes/mapa/mapa';


const bd: string = 'moradias.json';

export interface MoradiaProps {
    nome: string,
    endereco: string,
    descricao: string,
    id: string,
}

const CardMoradia = (props: MoradiaProps) => {
    const deletarMoradia = async () => {
        'use server';
        const moradias = await ConexaoBD.retornaBD(bd);

        const moradiaSelecionada = moradias.findIndex((moradia) => moradia.id === props.id);

        moradias.splice(moradiaSelecionada, 1);

        await ConexaoBD.armazenaBD(bd, moradias);

        redirect('/dashboard');
    }


    return (
        <div className={style["container-card"]}>
            <div className={style['container-texto']}>
                <h2>{props.nome}</h2>
                <p>{props.endereco}</p>
                <p className={style['p-descricao']}>{props.descricao}</p>
                <div className={style["container-botoes"]}>
                    <Link href={`/dashboard/editarMoradia/${props.id}`} id="btn-edit">Editar</Link>
                    <form action={deletarMoradia}>
                        <button id="btn-delete">Deletar</button>
                    </form>
                </div>
            </div>
            <div className={style['container-mapa']}>

            </div>


        </div>
    )
}

export default CardMoradia