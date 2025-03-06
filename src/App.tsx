import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import DetectionResults from './components/DetectionResults';
import Navigation from './components/Navigation';
import LanguageSelector from './components/LanguageSelector';
import WeatherDisplay from './components/WeatherDisplay';
import FarmMap from './components/FarmMap';
import Calendar from './components/Calendar';
import Home from './components/Home';
import UserManual from './components/UserManual';
import { DetectionResult } from './types';
import { detectRiceLeafDisease } from './services/mockDetectionService';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (imageFile: File | null, url: string) => {
    setSelectedImage(imageFile);
    setImageUrl(url);
    setDetectionResult(null);
    setError(null);
    
    if (imageFile) {
      processImage(imageFile);
    }
  };

  const processImage = async (imageFile: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      const result = await detectRiceLeafDisease(imageFile);
      setDetectionResult(result);
    } catch (err) {
      setError('An error occurred while processing the image. Please try again.');
      console.error('Error processing image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'camera':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload or Capture Rice Leaf Image</h2>
              <ImageUploader onImageSelected={handleImageSelected} />
            </div>
            <DetectionResults result={detectionResult} isProcessing={isProcessing} />
          </div>
        );
      case 'calendar':
        return <Calendar />;
      case 'guide':
        return <UserManual />;
      case 'weather':
        return (
          <WeatherDisplay
            currentWeather={{
              temperature: 28,
              humidity: 75,
              pressure: 1012,
              condition: 'sunny'
            }}
            forecast={[
              { temperature: 28, humidity: 75, pressure: 1012, condition: 'sunny' },
              { temperature: 27, humidity: 80, pressure: 1011, condition: 'cloudy' },
              { temperature: 26, humidity: 85, pressure: 1010, condition: 'rainy' },
              { temperature: 27, humidity: 78, pressure: 1012, condition: 'cloudy' },
              { temperature: 29, humidity: 70, pressure: 1013, condition: 'sunny' },
              { temperature: 28, humidity: 72, pressure: 1012, condition: 'sunny' },
              { temperature: 27, humidity: 75, pressure: 1011, condition: 'cloudy' }
            ]}
          />
        );
      case 'map':
        return (
          <FarmMap
            center={[16.9754, 121.8107]}
            farmLocations={[
              {
                id: '1',
                name: 'Sample Farm 1',
                coordinates: [16.9754, 121.8107],
                size: 5,
                crops: ['Rice']
              }
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8 pb-24">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Leaf className="h-10 w-10 text-green-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Rice Disease Detection</h1>
          </div>
          <LanguageSelector />
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {renderContent()}
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <footer className="fixed bottom-16 left-4 text-xs text-gray-500">
        © 2024 James Bryan Aquino Tababa
      </footer>
    </div>
  );
}

export default App;