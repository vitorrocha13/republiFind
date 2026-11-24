import styles from './moradiasDisponiveis.module.css'
import CardMoradia from '../cardMoradia/cardmoradia'
import { listarMoradiasDisponiveis } from '@/app/libs/moradias'

const MoradiasDisponiveis = async () => {

    const moradias = await listarMoradiasDisponiveis();

    return (
        <section id='moradias-disponiveis' className={styles['secao']}>
            <h2 className={styles['titulo']}>MORADIAS DISPONÍVEIS</h2>
            {moradias.length === 0 ? (
                <p className={styles['aviso']}>Nenhuma moradia disponível no momento.</p>
            ) : (
                <div className={styles['container-cards']}>
                    {moradias.map((moradia) => (
                        <CardMoradia
                            key={moradia.id}
                            id={moradia.id}
                            nome={moradia.nome}
                            endereco={moradia.endereco}
                            descricao={moradia.descricao}
                            proprietarioEmail={moradia.proprietarioEmail}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default MoradiasDisponiveis
