import style from './cardMoradia.module.css'
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
import Link from "next/link";
import MapaWrapper from './mapaWrapper';
import enderecoParaCordenadas from '@/app/libs/geocoding';
import { deletarMoradia as deletarMoradiaDb } from '@/app/libs/moradias';
import { getUsuarioIdLogado } from '@/app/libs/session';

interface MoradiaProps {
    id: string,
    nome: string,
    endereco: string,
    descricao: string,
    proprietarioEmail?: string,
    disponivel?: boolean,
    podeEditar?: boolean,
}

const CardMoradia = async (props: MoradiaProps) => {
    let coordenadas = null;
    try {
        coordenadas = await enderecoParaCordenadas(props.endereco);
    } catch (error) {
        console.error('Erro ao buscar coordenadas:', error);
    }

    const deletarMoradia = async () => {
        'use server';

        const usuarioId = await getUsuarioIdLogado();

        if (!usuarioId) {
            redirect('/login');
        }

        await deletarMoradiaDb(props.id, usuarioId);

        revalidatePath('/dashboard');
        revalidatePath('/');
        redirect('/dashboard');
    }

    return (
        <div className={style["container-card"]}>
            <div className={style['container-texto']}>
                <h2>{props.nome}</h2>
                <p>{props.endereco}</p>
                <p className={style['proprietario']}>Proprietário: {props.proprietarioEmail ?? '—'}</p>
                {props.podeEditar && props.disponivel === false && (
                    <span className={style['tag-indisponivel']}>INDISPONÍVEL</span>
                )}
                <p className={style['p-descricao']}>{props.descricao}</p>
                {props.podeEditar && (
                    <div className={style["container-botoes"]}>
                        <Link href={`/dashboard/editarMoradia/${props.id}`} id="btn-edit" className={style['btn-edit']}>Editar</Link>
                        <form action={deletarMoradia}>
                            <button id="btn-delete" className={style['btn-delete']}>Deletar</button>
                        </form>
                    </div>
                )}
            </div>
            <div className={style['container-mapa']}>
                <MapaWrapper 
                    coordenadas={coordenadas ? [coordenadas.lat, coordenadas.lng] : null}
                    endereco={props.endereco}
                />
            </div>
        </div>
    )
}

export default CardMoradia
