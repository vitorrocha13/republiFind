import Header from './componentes/header/header'
import Footer from './componentes/footer/footer'


export default function Home() {
  return (
    <>
      <Header page="landing"></Header>
      <Header page="dashboard"></Header>
      <Header page="login"></Header>
      <Header page="cadastro"></Header>
      <Footer></Footer>
    </>
  );
}
