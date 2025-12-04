'use client';

import Link from 'next/link';
import './header.css'

interface HeaderProps {
    page: keyof typeof navbars;
};

const navbars = {
    dashboard: [
        {
            text: (
                <img src="/logout.png" width="20" style={{ marginRight: 8 }} />
            ), href: '/landing'
        },
    ],
    cadastro: [
        { text: 'HOME', href: '/landing' },
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
        <header className="container-header">
            <div className='container-img'>
                <img src="RepubliFind.png" alt="Logo RepubliFind" />
            </div>
            <nav className='container-nav'>
                <ul>
                    {navbarAtual.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header