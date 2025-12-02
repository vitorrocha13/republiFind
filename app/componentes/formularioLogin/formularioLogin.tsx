import 'formularioLogin.css'

const FormularioLogin = () => {
    return(
        <main>
            <form>
                <label htmlFor="">Email</label>
                <input type="text"/>
                <label htmlFor="">Senha</label>
                <input type="text" />
            </form>
        </main>
    )
}

export default FormularioLogin