import './formularioCadastro.css'

const FormularioCadastro = () => {
    return(
        <main className='container-main'>
            <form className='container-form'>
                <p>CADASTRO</p>
                <div className='container-label'>
                    <label htmlFor="">EMAIL</label>
                    <input type="text"/>
                </div>
                <div className='container-label'>
                    <label htmlFor="">SENHA</label>
                    <input type="text" />
                </div>
                <div className='container-label'>
                    <label htmlFor="">CONFIRMAR SENHA</label>
                    <input type="text" />
                </div>
                <button>ENTRAR</button>
            </form>
        </main>
    )
}

export default FormularioCadastro