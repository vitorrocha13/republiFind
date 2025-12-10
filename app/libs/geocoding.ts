export const enderecoParaCoordenadas = async (endereco: string) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'MoradiasUniversitarias/1.0', // Nominatim requer User-Agent
      },
      // Configurações para Next.js
      next: { revalidate: 3600 }, // Cache por 1 hora
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    
    if (data && data.length > 0) {
      return { 
        lat: parseFloat(data[0].lat), 
        lng: parseFloat(data[0].lon) 
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao geocodificar endereço:', error);
    return null;
  }
};