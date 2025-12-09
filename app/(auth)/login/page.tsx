import Header from './../../componentes/header/header'
import Footer from './../../componentes/footer/footer'
import FormularioLogin from './../../componentes/formularioLogin/formularioLogin'

const PaginaLogin = () => {
    return(
        <>
            <Header page='login'></Header>
            <FormularioLogin></FormularioLogin>
            <Footer></Footer>
        </>
    )
}

export default PaginaLogin