'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import BotaoLogout from '../botaoLogout/botaoLogout';

interface HeaderProps {
    page: keyof typeof navbars;
    logado?: boolean;
};

const navbars = {
    dashboard: [
        { text: 'MORADIAS DISPONÍVEIS', href: '/#moradias-disponiveis' },
        { text: 'CADASTRAR MORADIA', href: '/dashboard/cadastrarMoradia' }
    ],
    cadastro: [
        { text: 'HOME', href: '/' },
        { text: 'LOGIN', href: '/login' }
    ],
    login: [
        { text: 'HOME', href: '/' },
        { text: 'CADASTRO', href: '/cadastro' }
    ],
    landing: [
        { text: 'HOME', href: '/' },
        { text: 'MORADIAS DISPONÍVEIS', href: '/#moradias-disponiveis' },
        { text: 'SOBRE', href: '/#container-sobre' },
        { text: 'LOGIN', href: '/login' },
        { text: 'CADASTRO', href: '/cadastro' }
    ]
};

const landingLogado = [
    { text: 'HOME', href: '/' },
    { text: 'MORADIAS DISPONÍVEIS', href: '/#moradias-disponiveis' },
    { text: 'SOBRE', href: '/#container-sobre' },
    { text: 'MEU PAINEL', href: '/dashboard' }
];

const Header = ({ page, logado = false }: HeaderProps) => {

    const navbarAtual = page === 'landing' && logado
        ? landingLogado
        : (navbars[page] || []);

    const mostrarLogout = page === 'dashboard' || (page === 'landing' && logado);

    return (
        <header className={styles['container-header']}>
            <div className={styles['container-img']}>
                <Image src="/RepubliFind.png" alt="Logo RepubliFind" width={263} height={67} />
            </div>
            <nav className={styles['container-nav']}>
                <ul>
                    {navbarAtual.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>{item.text}</Link>
                        </li>
                    ))}
                    {mostrarLogout && (
                        <li>
                            <BotaoLogout></BotaoLogout>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
