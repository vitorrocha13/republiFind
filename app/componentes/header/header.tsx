'use client';

import Link from 'next/link';
import styles from './header.module.css';
import BotaoLogout from '../botaoLogout/botaoLogout';

interface HeaderProps {
    page: keyof typeof navbars;
};

const navbars = {
    dashboard: [

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
        { text: 'SOBRE', href: '/#container-sobre' },
        { text: 'LOGIN', href: '/login' },
        { text: 'CADASTRO', href: '/cadastro' }
    ]
};

const Header = ({ page }: HeaderProps) => {

    const navbarAtual = navbars[page] || [];

    return (
        // className alterado para styles['container-header']
        <header className={styles['container-header']}>
            {/* className alterado para styles['container-img'] */}
            <div className={styles['container-img']}>
                <img src="/RepubliFind.png" alt="Logo RepubliFind" />
            </div>
            {/* className alterado para styles['container-nav'] */}
            <nav className={styles['container-nav']}>
                <ul>
                    {navbarAtual.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>{item.text}</Link>
                        </li>
                    ))}
                    {page === 'dashboard' && (
                        <li>
                            <BotaoLogout></BotaoLogout>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header