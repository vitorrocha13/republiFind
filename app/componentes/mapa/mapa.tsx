'use client'; 

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
// Certifique-se que o CSS global do Leaflet foi importado (ex: no globals.css)

interface MapaProps {
    // Coordenadas iniciais: pode ser null ou [lat, lng]
    coordenadasIniciais?: [number, number] | null; 
    zoomInicial?: number;
}

const MapaLeaflet: React.FC<MapaProps> = ({ 
    coordenadasIniciais = [-22.42, -45.45], // Padrão: Coordenadas de exemplo (Itajubá)
    zoomInicial = 13 
}) => {
    
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    // 1. Inicialização do Mapa
    useEffect(() => {
        // Garante que o mapa só seja inicializado uma única vez
        if (mapRef.current) return; 

        // Cria o mapa no elemento 'map-container'
        const map = L.map('map-container').setView(coordenadasIniciais || [-22.42, -45.45], zoomInicial); 

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

        // Função de limpeza (remove o mapa quando o componente é desmontado)
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // Array vazio garante que só roda na montagem

    // 2. Sincronização e Movimento (para quando o endereço for geocodificado)
    useEffect(() => {
        if (mapRef.current && coordenadasIniciais) {
            const [lat, lng] = coordenadasIniciais;
            const newLatLng: L.LatLngTuple = [lat, lng];

            // Centraliza o mapa na nova localização
            mapRef.current.setView(newLatLng, mapRef.current.getZoom());

            // Move ou cria o marcador
            if (markerRef.current) {
                markerRef.current.setLatLng(newLatLng);
            } else {
                const marker = L.marker(newLatLng).addTo(mapRef.current);
                markerRef.current = marker;
            }
        }
    }, [coordenadasIniciais]); // Roda sempre que as coordenadas mudam

    return (
        // O ID é CRÍTICO para a inicialização do Leaflet e o estilo CRÍTICO para a altura
        <div 
            id="map-container" 
            style={{ height: '100%', width: '100%' }} // Altura total para preencher o container-mapa
        >
            {/* Se o mapa não aparecer, verifique se o CSS global e a altura do container-mapa estão corretos! */}
        </div>
    );
};

export default MapaLeaflet;