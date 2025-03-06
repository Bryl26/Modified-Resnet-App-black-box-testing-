import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, FeatureGroup } from 'react-leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { Ruler, Maximize2, MinusCircle, PlusCircle } from 'lucide-react';

interface FarmLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  size: number;
  crops: string[];
}

interface FarmMapProps {
  farmLocations: FarmLocation[];
  center: [number, number];
}

const FarmMap: React.FC<FarmMapProps> = ({ farmLocations, center }) => {
  const { t } = useTranslation();
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [drawMode, setDrawMode] = useState(false);
  const [points, setPoints] = useState<[number, number][]>([]);

  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const calculateArea = (coords: [number, number][]) => {
    if (coords.length < 3) return 0;
    const polygon = turf.polygon([coords]);
    return turf.area(polygon) / 10000; // Convert to hectares
  };

  const handleMapClick = (e: any) => {
    if (!drawMode) return;
    const newPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
    setPoints([...points, newPoint]);
  };

  useEffect(() => {
    if (points.length >= 3) {
      const area = calculateArea(points);
      setSelectedArea(area);
    }
  }, [points]);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-md p-2 space-y-2">
        <button
          onClick={() => setDrawMode(!drawMode)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
            drawMode ? 'bg-green-500 text-white' : 'bg-gray-100'
          }`}
        >
          <Ruler className="h-4 w-4" />
          <span>{drawMode ? t('map.stopMeasuring') : t('map.measure')}</span>
        </button>
        {drawMode && (
          <>
            <button
              onClick={() => setPoints([])}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-100 text-red-600"
            >
              <MinusCircle className="h-4 w-4" />
              <span>{t('map.clear')}</span>
            </button>
            {selectedArea && (
              <div className="px-3 py-2 bg-blue-50 rounded-md">
                <p className="text-sm font-medium">
                  {t('map.area')}: {selectedArea.toFixed(2)} ha
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <MapContainer
        center={center}
        zoom={13}
        className="h-[600px] w-full rounded-lg shadow-md"
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {farmLocations.map(farm => (
          <Marker
            key={farm.id}
            position={farm.coordinates}
            icon={customIcon}
          >
            <Popup>
              <div className="p-3">
                <h3 className="font-semibold text-lg">{farm.name}</h3>
                <p className="text-sm text-gray-600">{t('map.size')}: {farm.size} ha</p>
                <p className="text-sm text-gray-600">
                  {t('map.crops')}: {farm.crops.join(', ')}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {points.length > 0 && (
          <FeatureGroup>
            {points.map((point, index) => (
              <Circle
                key={index}
                center={point}
                radius={5}
                color="red"
                fillColor="red"
                fillOpacity={1}
              />
            ))}
            {points.length > 2 && (
              <Popup>
                <div className="p-2">
                  <p className="font-medium">
                    {t('map.measuredArea')}: {selectedArea?.toFixed(2)} ha
                  </p>
                </div>
              </Popup>
            )}
          </FeatureGroup>
        )}
      </MapContainer>
    </div>
  );
};

export default FarmMap;