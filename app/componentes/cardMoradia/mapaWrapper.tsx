'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importa o Mapa dinamicamente para evitar erros de SSR
const Mapa = dynamic(() => import('@/app/componentes/mapa/mapa'), {
    ssr: false,
    loading: () => <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        color: '#666'
    }}>Carregando mapa...</div>
});

interface MapaWrapperProps {
    coordenadas: [number, number] | null;
    endereco: string;
}

const MapaWrapper = ({ coordenadas, endereco }: MapaWrapperProps) => {
    if (!coordenadas) {
        return (
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: '#999',
                textAlign: 'center',
                padding: '20px'
            }}>
                Não foi possível encontrar a localização para: {endereco}
            </div>
        );
    }

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Mapa 
                coordenadasIniciais={coordenadas}
                zoomInicial={15}
            />
        </Suspense>
    );
};

export default MapaWrapper;