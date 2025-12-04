import Header from './componentes/header/header'
import Footer from './componentes/footer/footer'
import MainSobre from './componentes/mainSobre/mainSobre'

export default function Home() {
  return (
    <>
      <Header page="landing"></Header>
      <MainSobre></MainSobre>
      <Footer></Footer>
    </>
  );
}
