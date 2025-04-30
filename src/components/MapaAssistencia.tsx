'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FiTool, FiMapPin, FiAlertTriangle } from 'react-icons/fi';
import { FaHospital } from 'react-icons/fa';

// Corrigir o problema dos ícones do Leaflet
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Componente para atualizar a visualização do mapa
function SetViewOnClick({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

// Tipos de locais
type LocalType = 'oficina' | 'hospital' | 'emergencia' | 'combustivel';

// Interface para os locais
interface Local {
  id: number;
  nome: string;
  tipo: LocalType;
  coordenadas: [number, number];
  endereco: string;
  telefone: string;
  horario?: string;
  distancia?: number;
}

// Dados de exemplo para locais
const locaisExemplo: Local[] = [
  {
    id: 1,
    nome: 'Oficina Central Motos',
    tipo: 'oficina',
    coordenadas: [38.7223, -9.1393],
    endereco: 'Av. da Liberdade, 245, Lisboa',
    telefone: '+351 210 123 456',
    horario: 'Seg-Sex: 9h-18h, Sáb: 9h-13h'
  },
  {
    id: 2,
    nome: 'Hospital São José',
    tipo: 'hospital',
    coordenadas: [38.7173, -9.1355],
    endereco: 'R. José António Serrano, Lisboa',
    telefone: '+351 213 814 000',
    horario: '24h'
  },
  {
    id: 3,
    nome: 'Posto de Emergência',
    tipo: 'emergencia',
    coordenadas: [38.7263, -9.1483],
    endereco: 'Praça Marquês de Pombal, Lisboa',
    telefone: '112',
    horario: '24h'
  },
  {
    id: 4,
    nome: 'Posto de Combustível Galp',
    tipo: 'combustivel',
    coordenadas: [38.7303, -9.1513],
    endereco: 'Av. Fontes Pereira de Melo, Lisboa',
    telefone: '+351 210 987 654',
    horario: '24h'
  },
  {
    id: 5,
    nome: 'Oficina Moto Expert',
    tipo: 'oficina',
    coordenadas: [38.7153, -9.1283],
    endereco: 'R. da Palma, 234, Lisboa',
    telefone: '+351 210 123 789',
    horario: 'Seg-Sex: 9h-18h'
  },
  {
    id: 6,
    nome: 'Hospital da Luz',
    tipo: 'hospital',
    coordenadas: [38.7603, -9.1783],
    endereco: 'Av. Lusíada, 100, Lisboa',
    telefone: '+351 217 104 400',
    horario: '24h'
  },
  {
    id: 7,
    nome: 'Posto de Combustível BP',
    tipo: 'combustivel',
    coordenadas: [38.7123, -9.1423],
    endereco: 'Av. Almirante Reis, Lisboa',
    telefone: '+351 210 456 789',
    horario: '24h'
  }
];

// Componente principal do mapa
export default function MapaAssistencia() {
  const [userLocation, setUserLocation] = useState<[number, number]>([38.7223, -9.1393]); // Lisboa como padrão
  const [locais, setLocais] = useState<Local[]>(locaisExemplo);
  const [filtroTipo, setFiltroTipo] = useState<LocalType | null>('oficina');
  const [loading, setLoading] = useState(true);

  // Obter localização do usuário
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          
          // Calcular distância para cada local
          const locaisComDistancia = locaisExemplo.map(local => {
            const distancia = calcularDistancia(
              position.coords.latitude,
              position.coords.longitude,
              local.coordenadas[0],
              local.coordenadas[1]
            );
            return { ...local, distancia };
          });
          
          // Ordenar por distância
          locaisComDistancia.sort((a, b) => (a.distancia || 0) - (b.distancia || 0));
          
          setLocais(locaisComDistancia);
          setLoading(false);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  // Função para calcular distância entre coordenadas (fórmula de Haversine)
  function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distância em km
    return Math.round(d * 10) / 10; // Arredondar para 1 casa decimal
  }

  // Filtrar locais por tipo
  const locaisFiltrados = filtroTipo ? locais.filter(local => local.tipo === filtroTipo) : locais;

  // Obter ícone baseado no tipo de local
  const getIconForType = (tipo: LocalType) => {
    switch (tipo) {
      case 'oficina':
        return <FiTool className="mr-2 text-moty-red" />;
      case 'hospital':
        return <FaHospital className="mr-2 text-blue-600" />;
      case 'emergencia':
        return <FiAlertTriangle className="mr-2 text-yellow-600" />;
      case 'combustivel':
        return <FiMapPin className="mr-2 text-green-600" />;
      default:
        return <FiMapPin className="mr-2" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-moty-light-gray border-b">
        <div className="flex flex-wrap gap-4">
          <button 
            className={`px-4 py-2 rounded-md flex items-center ${filtroTipo === 'oficina' ? 'bg-moty-red text-white' : 'bg-white text-moty-black'}`}
            onClick={() => setFiltroTipo('oficina')}
          >
            <FiTool className="mr-2" /> Oficinas
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center ${filtroTipo === 'hospital' ? 'bg-moty-red text-white' : 'bg-white text-moty-black'}`}
            onClick={() => setFiltroTipo('hospital')}
          >
            <FaHospital className="mr-2" /> Hospitais
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center ${filtroTipo === 'emergencia' ? 'bg-moty-red text-white' : 'bg-white text-moty-black'}`}
            onClick={() => setFiltroTipo('emergencia')}
          >
            <FiAlertTriangle className="mr-2" /> Emergências
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center ${filtroTipo === 'combustivel' ? 'bg-moty-red text-white' : 'bg-white text-moty-black'}`}
            onClick={() => setFiltroTipo('combustivel')}
          >
            <FiMapPin className="mr-2" /> Postos de Combustível
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Mapa */}
        <div className="w-full md:w-2/3 h-[500px]">
          {typeof window !== 'undefined' && (
            <MapContainer 
              center={userLocation} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Marcador da localização do usuário */}
              <Marker position={userLocation} icon={icon}>
                <Popup>
                  <div className="text-center">
                    <strong>Sua Localização</strong>
                  </div>
                </Popup>
              </Marker>
              
              {/* Marcadores dos locais */}
              {locaisFiltrados.map(local => (
                <Marker 
                  key={local.id} 
                  position={local.coordenadas} 
                  icon={icon}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg">{local.nome}</h3>
                      <p className="text-moty-gray">{local.endereco}</p>
                      <p className="text-moty-gray">Tel: {local.telefone}</p>
                      {local.horario && <p className="text-moty-gray">Horário: {local.horario}</p>}
                      {local.distancia && <p className="font-medium mt-2">Distância: {local.distancia} km</p>}
                      <button className="mt-2 bg-moty-red text-white px-3 py-1 rounded-md text-sm">
                        Obter Direções
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              <SetViewOnClick coords={userLocation} />
            </MapContainer>
          )}
        </div>
        
        {/* Lista de locais */}
        <div className="w-full md:w-1/3 bg-white border-l border-gray-200 overflow-y-auto" style={{ maxHeight: '500px' }}>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">
              {filtroTipo === 'oficina' && 'Oficinas Próximas'}
              {filtroTipo === 'hospital' && 'Hospitais Próximos'}
              {filtroTipo === 'emergencia' && 'Postos de Emergência'}
              {filtroTipo === 'combustivel' && 'Postos de Combustível'}
              {!filtroTipo && 'Locais Próximos'}
            </h3>
            
            {loading ? (
              <div className="text-center py-8">
                <p>A carregar locais próximos...</p>
              </div>
            ) : locaisFiltrados.length === 0 ? (
              <div className="text-center py-8">
                <p>Nenhum local encontrado.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {locaisFiltrados.map(local => (
                  <div key={local.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-start">
                      <div className="mt-1">{getIconForType(local.tipo)}</div>
                      <div>
                        <h4 className="font-bold">{local.nome}</h4>
                        <p className="text-sm text-moty-gray">{local.endereco}</p>
                        <p className="text-sm text-moty-gray">Tel: {local.telefone}</p>
                        {local.distancia && (
                          <p className="text-sm font-medium mt-1">{local.distancia} km de distância</p>
                        )}
                        <div className="mt-2 flex space-x-3">
                          <button className="text-moty-red text-sm hover:underline">
                            Detalhes
                          </button>
                          <button className="text-moty-red text-sm hover:underline">
                            Ligar
                          </button>
                          <button className="text-moty-red text-sm hover:underline">
                            Direções
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
