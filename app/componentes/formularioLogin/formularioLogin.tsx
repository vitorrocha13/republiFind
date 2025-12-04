import './formularioLogin.css'

const FormularioLogin = () => {
    return(
        <main className='container-main'>
            <form className='container-form'>
                <p>LOGIN</p>
                <div className='container-lable'>
                    <label htmlFor="">EMAIL</label>
                    <input type="text"/>
                </div>
                <div className='container-lable'>
                    <label htmlFor="">SENHA</label>
                    <input type="text" />
                </div>
                <button>ENTRAR</button>
            </form>
        </main>
    )
}

export default FormularioLogin