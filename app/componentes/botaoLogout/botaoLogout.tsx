'use client';

import { logout } from "@/app/componentes/botaoLogout/botaoserver";


const BotaoLogout = () => {
    return (
        <form action={logout} className="logoutForm">
            <button type="submit" className="logoutBtn">
                <img src="/logout.png" style={{ cursor: 'pointer', width:'25px'}} />
            </button>
        </form>
    );
}

export default BotaoLogout