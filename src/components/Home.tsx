import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { Brain, Database, Award, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const { BaseLayer } = LayersControl;
  const [farmlands, setFarmlands] = useState([
    {  id: 1, lat: 17.1200, lng: 121.7540, name: "Bartolome Farm", disease: "Bacterial Leaf Blight", action: "Applied fungicide" },
    { id: 2, lat: 17.1245, lng: 121.7530, name: "Guzman Farm", disease: "Rice Blast", action: "Implemented crop rotation" },
    { id: 3, lat: 17.0731, lng: 121.7855, name: "Asis Farm", disease: "Brown Spot", action: "Used resistant varieties" },
    { id: 4, lat: 17.0851, lng: 121.7805, name: "Fernandez Farm", disease: "Sheath Blight", action: "Improved drainage" },
    { id: 5, lat: 17.0867, lng: 121.7370, name: "Babaran Farm", disease: "Tungro", action: "Controlled insect vectors" },
    { id: 6, lat: 17.0845, lng: 121.7352, name: "Balubal Farm", disease: "Bacterial Leaf Blight", action: "Applied fungicide" },
    { id: 7, lat: 17.0852, lng: 121.7390, name: "De Guzman Farm", disease: "Rice Blast", action: "Implemented crop rotation" },
    { id: 8, lat: 17.0875, lng: 121.7401, name: "Bungsos Farm", disease: "Brown Spot", action: "Used resistant varieties" },
    { id: 9, lat: 17.0572, lng: 121.8432, name: "Felipe Farm", disease: "Sheath Blight", action: "Improved drainage" },
    { id: 10, lat: 17.0672, lng: 121.7434, name: "Bareng Farm", disease: "Tungro", action: "Controlled insect vectors" },
    { id: 11, lat: 17.0582, lng: 121.7633, name: "Santos Farm", disease: "Bacterial Leaf Streak", action: "Applied copper-based fungicide" },
    { id: 12, lat: 17.0642, lng: 121.7532, name: "Reyes Farm", disease: "False Smut", action: "Improved field sanitation" },
    { id: 13, lat: 17.0552, lng: 121.7431, name: "Mendoza Farm", disease: "Leaf Scald", action: "Used resistant seeds" },
    { id: 14, lat: 17.0652, lng: 121.7832, name: "Villanueva Farm", disease: "Narrow Brown Leaf Spot", action: "Optimized nitrogen application" },
    { id: 15, lat: 17.0782, lng: 121.7832, name: "Lopez Farm", disease: "Rice Hoja Blanca", action: "Used virus-resistant varieties" },
    { id: 16, lat: 16.9683, lng: 121.7493, name: "Delos Reyes Farm", disease: "Sheath Rot", action: "Applied potassium fertilizers" },
    { id: 17, lat: 16.9683, lng: 121.7122, name: "Castillo Farm", disease: "Ustilaginoidea Virens", action: "Controlled fungicide application" },
    { id: 18, lat: 16.9783, lng: 121.7330, name: "Garcia Farm", disease: "Grain Discoloration", action: "Used seed treatment" },
    { id: 19, lat: 16.9983, lng: 121.7332, name: "Hernandez Farm", disease: "Bakanae", action: "Soaked seeds in fungicide solution" },
    { id: 20, lat: 16.9783, lng: 121.7302, name: "Aguilar Farm", disease: "Downy Mildew", action: "Managed water levels effectively" },
    { id: 21, lat: 16.9993, lng: 121.7350, name: "Dela Cruz Farm", disease: "Leaf Blight", action: "Applied appropriate fungicide" },
    { id: 22, lat: 16.9999, lng: 121.6992, name: "Torres Farm", disease: "Blast", action: "Used resistant cultivars" },
    { id: 23, lat: 16.9783, lng: 121.7132, name: "Rivera Farm", disease: "Tungro", action: "Controlled vector populations" },
    { id: 23, lat: 16.9783, lng: 121.7102, name: "Cruz Farm", disease: "False Smut", action: "Avoided excessive nitrogen use" },
    { id: 25, lat: 16.9783, lng: 121.7342, name: "Santiago Farm", disease: "Bacterial Leaf Blight", action: "Used certified disease-free seeds" }
 ]);

  const handleDragEnd = (event, id) => {
    const { lat, lng } = event.target.getLatLng();
    setFarmlands((prevFarmlands) =>
      prevFarmlands.map((farm) => (farm.id === id ? { ...farm, lat, lng } : farm))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Rice Disease Detection</h1>
      <MapContainer center={[17.15, 121.6]} zoom={10} className="h-96 w-full rounded-lg border">
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap Standard">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          <BaseLayer name="Imagery">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Imagery Hybrid">
            <TileLayer url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Topographic">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Streets">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Navigation">
            <TileLayer url="https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Street (Night)">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Terrain with Labels">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Dark Grey Canvas">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Outdoor">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Outdoor_Map/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Oceans">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="National Geographic">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Charted Territory Map">
            <TileLayer url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png" />
          </BaseLayer>
          <BaseLayer name="Navigation (Dark)">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Nova Map">
            <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png" />
          </BaseLayer>
          <BaseLayer name="Firefly Imagery Hybrid">
            <TileLayer url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
          <BaseLayer name="Enhanced Contrast Dark Map">
            <TileLayer url="https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
        </LayersControl>

        {farmlands.map((farm) => (
          <Marker 
            key={farm.id} 
            position={[farm.lat, farm.lng]} 
            draggable={true} 
            eventHandlers={{ dragend: (e) => handleDragEnd(e, farm.id) }}
          >
            <Popup>
              <strong>{farm.name}</strong>
              <p>Disease: {farm.disease}</p>
              <p>Action: {farm.action}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <p className="text-sm text-gray-500 mt-6 text-center italic">
        © 2025 James Bryan Aquino Tababa @ ISU CYN | Master of Information Technology
      </p>
    </div>
  );
}
