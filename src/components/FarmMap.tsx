import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'lucide-react';

interface FarmLocation {
  id: string;
  coordinates: [number, number];
  name?: string;
  size?: number;
  crops?: string[];
}

const FarmMap: React.FC = () => {
  const { t } = useTranslation();
  const [farmLocations, setFarmLocations] = useState<FarmLocation[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [editingFarm, setEditingFarm] = useState<FarmLocation | null>(null);
  
  const customIcon = new Icon({
    iconUrl: '/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: (e) => setSelectedPosition([e.latlng.lat, e.latlng.lng])
    });
    return null;
  };

  const addLocationMarker = () => {
    if (!selectedPosition) return;
    const newFarm: FarmLocation = {
      id: crypto.randomUUID(),
      coordinates: selectedPosition,
    };
    setFarmLocations([...farmLocations, newFarm]);
    setSelectedPosition(null);
  };

  const updateFarmDetails = () => {
    if (!editingFarm?.name || !editingFarm.size || !editingFarm.crops) return;
    setFarmLocations(prev => prev.map(farm => farm.id === editingFarm.id ? editingFarm : farm));
    setEditingFarm(null);
  };

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-md p-3 space-y-2">
        {selectedPosition && (
          <button
            onClick={addLocationMarker}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-500 text-white w-full"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t('map.addLocationMarker')}</span>
          </button>
        )}
        {editingFarm && (
          <>
            <input
              type="text"
              placeholder="Farm Name"
              value={editingFarm.name || ''}
              onChange={(e) => setEditingFarm({ ...editingFarm, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Size (ha)"
              value={editingFarm.size || ''}
              onChange={(e) => setEditingFarm({ ...editingFarm, size: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Crops (comma separated)"
              value={editingFarm.crops?.join(', ') || ''}
              onChange={(e) => setEditingFarm({ ...editingFarm, crops: e.target.value.split(',').map(c => c.trim()) })}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={updateFarmDetails}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-500 text-white w-full"
            >
              <PlusCircle className="h-4 w-4" />
              <span>{t('map.saveDetails')}</span>
            </button>
          </>
        )}
      </div>
      
      <MapContainer
        center={[16.0, 121.0]}
        zoom={13}
        className="h-[600px] w-full rounded-lg shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {farmLocations.map(farm => (
          <Marker
            key={farm.id}
            position={farm.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () => setEditingFarm(farm)
            }}
          >
            <Popup>
              {farm.name ? (
                <div className="p-3">
                  <h3 className="font-semibold text-lg">{farm.name}</h3>
                  <p className="text-sm text-gray-600">{t('map.size')}: {farm.size} ha</p>
                  <p className="text-sm text-gray-600">{t('map.crops')}: {farm.crops?.join(', ')}</p>
                </div>
              ) : (
                <span>{t('map.clickToEdit')}</span>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
    
  );
};

export default FarmMap;
