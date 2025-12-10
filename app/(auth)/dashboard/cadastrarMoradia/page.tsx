import Header from '@/app/componentes/header/header'
import FormularioMoradia from '@/app/componentes/formularioMoradia/formularioMoradia'
import Footer from '@/app/componentes/footer/footer'

const CriarCard = () => {
    return(
        <>
            <Header page={'dashboard'}></Header>
            <FormularioMoradia></FormularioMoradia>
            <Footer></Footer>
        </>
    )
}

export default CriarCard