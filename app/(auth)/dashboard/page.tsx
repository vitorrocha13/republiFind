import Header from '@/app/componentes/header/header'
import Footer from '@/app/componentes/footer/footer'
import CardMoradia from '@/app/componentes/cardMoradia/cardmoradia'
import { redirect } from 'next/navigation';
import { listarMoradiasDoUsuario } from '@/app/libs/moradias';
import { getUsuarioIdLogado } from '@/app/libs/session';
import styles from "./dashboard.module.css"

const PaginaDashboard = async () => {

    const usuarioId = await getUsuarioIdLogado();

    if (!usuarioId) {
        redirect('/login');
    }

    const moradias = await listarMoradiasDoUsuario(usuarioId);

    return (
        <>
            <Header page='dashboard'></Header>
            <main className={styles['main']}>
                {moradias.length === 0 ? (
                    <p className={styles['aviso']}>Você ainda não cadastrou nenhuma moradia.</p>
                ) : (
                    <div className={styles['container-cards']}>
                        {moradias.map((moradia) => (
                            <CardMoradia
                                key={moradia.id}
                                id={moradia.id}
                                nome={moradia.nome}
                                endereco={moradia.endereco}
                                descricao={moradia.descricao}
                                proprietarioEmail={moradia.proprietarioEmail}
                                disponivel={moradia.disponivel}
                                podeEditar
                            />
                        ))}
                    </div>
                )}
            </main>
            <Footer></Footer>
        </>
    )
}

export default PaginaDashboard;
