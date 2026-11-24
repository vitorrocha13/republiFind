'use client';

import Image from 'next/image';
import { logout } from "@/app/componentes/botaoLogout/botaoserver";


const BotaoLogout = () => {
    return (
        <form action={logout} className="logoutForm">
            <button type="submit" className="logoutBtn">
                <Image src="/logout.png" alt="Sair" width={16} height={16} style={{ cursor: 'pointer' }} />
            </button>
        </form>
    );
}

export default BotaoLogout
