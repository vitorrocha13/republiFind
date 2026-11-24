import Header from './../../componentes/header/header'
import Footer from './../../componentes/footer/footer'
import FormularioCadastro from '@/app/componentes/formularioCadastro/formularioCadastro'
const PaginaCadastro = () => {
    return(
        <>
            <Header page='cadastro'></Header>
            <FormularioCadastro></FormularioCadastro>
            <Footer></Footer>
        </>
    )
}

export default PaginaCadastro