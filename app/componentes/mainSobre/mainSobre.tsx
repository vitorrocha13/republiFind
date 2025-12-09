import styles from './mainSobre.module.css'

const MainSobre = () => {
    return (
        <main className={styles['main']}>
            <div className={styles['container-main']}>
                <img src="./nanoBanana.png" alt="" />
            </div>
            <div id='container-sobre' className={styles['secao-sobre']}>
                <h2>SOBRE NOS</h2>
                <p>A chegada à universidade marca o início de uma jornada transformadora, repleta de aprendizados, autonomia e novas responsabilidades. Entre os muitos desafios que acompanham essa transição, encontrar uma moradia adequada destaca-se como uma das tarefas mais críticas e, frequentemente, mais estressantes para qualquer calouro. É neste contexto que surge o RepubliFind — uma plataforma digital desenvolvida especificamente para simplificar e humanizar a busca por moradias estudantis, transformando um processo tradicionalmente caótico e incerto em uma experiência organizada, segura e transparente.<br /><br />

                    Criado por estudantes que vivenciaram na pele as dificuldades de se estabelecer em uma nova cidade, o RepubliFind nasce da compreensão profunda das dores reais desse momento: a falta de referências confiáveis, o medo de golpes, a dificuldade em avaliar distâncias e a escassez de informações detalhadas sobre os espaços de convivência. Aqui, cada moradia listada passa por um rigoroso processo de verificação, que inclui desde a confirmação de fotos reais e atualizadas até a coleta de avaliações detalhadas de ex-moradores, criando um ecossistema de confiança onde estudantes podem tomar decisões com base em dados concretos e experiências reais.<br /><br />

                    Para os estudantes, oferecemos muito mais do que um simples buscador. Desenvolvemos ferramentas de filtro inteligente que consideram não apenas preço e localização, mas também o perfil de convivência da moradia, as comodidades disponíveis, a distância do campus e até mesmo o estilo de vida predominante — seja uma república focada em estudos, uma casa com espírito esportivo ou uma acomodação que valorize eventos comunitários. Para proprietários e responsáveis por repúblicas, disponibilizamos um sistema completo de gestão de anúncios, com recursos para destacar os diferenciais do espaço, descrever as regras da casa e conectar-se de forma eficiente a estudantes cujos perfils se alinhem com a atmosfera do local.<br /><br />

                    A segurança, em todas as suas dimensões, constitui um pilar fundamental da nossa plataforma. Implementamos um sistema de verificação em múltiplas camadas — incluindo confirmação de matrícula universitária e identificação documental —, oferecemos modelos de contrato adaptados à realidade estudantil e mantemos uma equipe de suporte dedicada a mediar questões e orientar tanto locadores quanto locatários. Acreditamos que uma experiência positiva de moradia começa com transparência e termina com a construção de relações duradouras e respeitosas.<br /><br />

                    Além de facilitar a conexão entre pessoas e espaços, o RepubliFind se propõe a ser uma comunidade de apoio integral à vida universitária. Integramos à plataforma guias locais sobre a cidade, dicas de economia para o cotidiano estudantil, fóruns para troca de experiências e um sistema de acolhimento que permite que veteranos voluntários orientem calouros em seus primeiros meses. Com tecnologia intuitiva, processos claros e um compromisso genuíno com o bem-estar de quem está começando essa jornada, o RepubliFind não é apenas uma ferramenta de busca — é um parceiro para uma das fases mais importantes da sua vida.</p>
            </div>
        </main>
    )
}

export default MainSobre