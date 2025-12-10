'use client'; 

import React, { useEffect, useRef, useId } from 'react';
import L from 'leaflet';

interface MapaProps {
    coordenadasIniciais?: [number, number] | null; 
    zoomInicial?: number;
}

const Mapa: React.FC<MapaProps> = ({ 
    coordenadasIniciais = [-22.42, -45.45],
    zoomInicial = 4
}) => {
    
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Gera um ID único para cada instância do mapa
    const uniqueId = useId();

    // Inicialização do Mapa (apenas uma vez)
    useEffect(() => {
        // Se o mapa já existe, não faz nada
        if (mapRef.current || !containerRef.current) return;

        // Verifica se o container já tem um mapa inicializado
        const container = containerRef.current;
        if ((container as any)._leaflet_id) {
            return;
        }

        try {
            // Cria o mapa
            const map = L.map(container).setView(
                coordenadasIniciais || [-22.42, -45.45], 
                zoomInicial
            );

            // Adiciona a camada de Tiles do OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            mapRef.current = map;

            // Adiciona o primeiro marcador
            if (coordenadasIniciais) {
                const marker = L.marker(coordenadasIniciais).addTo(map);
                markerRef.current = marker;
            }
        } catch (error) {
            console.error('Erro ao inicializar mapa:', error);
        }

        // Cleanup: remove o mapa quando o componente é desmontado
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
            }
        };
    }, []); // Array vazio = roda apenas na montagem

    // Atualização de coordenadas (quando mudam)
    useEffect(() => {
        if (mapRef.current && coordenadasIniciais) {
            const [lat, lng] = coordenadasIniciais;
            const newLatLng: L.LatLngTuple = [lat, lng];

            // Centraliza o mapa na nova localização
            mapRef.current.setView(newLatLng, mapRef.current.getZoom());

            // Move ou cria o marcador
            if (markerRef.current) {
                markerRef.current.setLatLng(newLatLng);
            } else if (mapRef.current) {
                const marker = L.marker(newLatLng).addTo(mapRef.current);
                markerRef.current = marker;
            }
        }
    }, [coordenadasIniciais]);

    return (
        <div 
            ref={containerRef}
            id={`map-${uniqueId}`}
            style={{ height: '100%', width: '100%' }}
        />
    );
};

export default Mapa;