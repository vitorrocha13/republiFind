import Header from './componentes/header/header'
import Footer from './componentes/footer/footer'
import MainSobre from './componentes/mainSobre/mainSobre'

const Home = () => {
  return (
    <>
      <Header page="landing"></Header>
      <MainSobre></MainSobre>
      <Footer></Footer>
    </>
  );
}
export default Home
