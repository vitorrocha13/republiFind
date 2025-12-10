import Header from '@/app/componentes/header/header'
import Footer from '@/app/componentes/footer/footer'
import ConexaoBD from '@/app/libs/conexaoBD';
import CardMoradia from '@/app/componentes/cardMoradia/cardmoradia'
import Link from "next/link";
import styles from "./dashboard.module.css"

const bd: string = 'moradias.json';

const PaginaDashboard = async () => {

    const dados = await ConexaoBD.retornaBD(bd);
    const moradias = dados.map((moradia) => {
        return <CardMoradia {...moradia} key={moradia.id} />
    });

    return (
        <>
            <Header page='dashboard'></Header>
            <main className={styles['main']}>
                <Link href={'/dashboard/cadastrarMoradia'} className={styles['btn-cadastrar']}>CADASTRAR MORADIA</Link>
                <div className={styles['container-cards']}>
                    {moradias}
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}

export default PaginaDashboard