import Header from './componentes/header/header'
import Footer from './componentes/footer/footer'
import MainSobre from './componentes/mainSobre/mainSobre'
import MoradiasDisponiveis from './componentes/moradiasDisponiveis/moradiasDisponiveis'
import { getUsuarioIdLogado } from './libs/session'
import styles from './page.module.css'

const Home = async () => {
  const usuarioId = await getUsuarioIdLogado();

  return (
    <>
      <Header page="landing" logado={Boolean(usuarioId)}></Header>
      <main className={styles['main']}>
        <MainSobre></MainSobre>
        <MoradiasDisponiveis></MoradiasDisponiveis>
      </main>
      <Footer></Footer>
    </>
  );
}
export default Home
