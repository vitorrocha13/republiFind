import styles from './footer.module.css'

const Footer = () => {
    return(
        <footer className={styles['footer']}>
            <p>DESENVOLVIDO POR <a href="https://github.com/vitorrocha13" target="_blank">VITOR ROCHA ©</a></p>
        </footer>
    )
}

export default Footer