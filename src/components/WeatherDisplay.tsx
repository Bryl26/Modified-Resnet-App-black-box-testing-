import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, ArrowDown, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
  feelsLike?: number;
  windSpeed?: number;
  precipitation?: number;
  minTemp?: number;
  maxTemp?: number;
}

interface WeatherDisplayProps {
  currentWeather: WeatherData;
  forecast: WeatherData[];
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ currentWeather, forecast }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getWeatherIcon = (condition: string, size: 'sm' | 'lg' = 'lg') => {
    const iconSize = size === 'lg' ? 'h-12 w-12' : 'h-8 w-8';
    switch (condition) {
      case 'sunny':
        return <Sun className={`${iconSize} text-yellow-500`} />;
      case 'cloudy':
        return <Cloud className={`${iconSize} text-gray-500`} />;
      case 'rainy':
        return <CloudRain className={`${iconSize} text-blue-500`} />;
      case 'windy':
        return <Wind className={`${iconSize} text-blue-300`} />;
      default:
        return <Sun className={`${iconSize} text-yellow-500`} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">{t('weather.current')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-6">
            {getWeatherIcon(currentWeather.condition)}
            <div>
              <p className="text-4xl font-bold">{currentWeather.temperature}°C</p>
              <p className="text-gray-600 capitalize">{currentWeather.condition}</p>
              <p className="text-sm text-gray-500">
                {t('weather.feelsLike')} {currentWeather.feelsLike}°C
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <Droplets className="h-4 w-4" />
                <span className="text-sm">{t('weather.humidity')}</span>
              </div>
              <p className="text-xl font-semibold">{currentWeather.humidity}%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <Wind className="h-4 w-4" />
                <span className="text-sm">{t('weather.wind')}</span>
              </div>
              <p className="text-xl font-semibold">{currentWeather.windSpeed} km/h</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <ArrowDown className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{t('weather.min')}</span>
              </div>
              <p className="text-xl font-semibold">{currentWeather.minTemp}°C</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <ArrowUp className="h-4 w-4 text-red-500" />
                <span className="text-sm">{t('weather.max')}</span>
              </div>
              <p className="text-xl font-semibold">{currentWeather.maxTemp}°C</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">{t('weather.forecast')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                {new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.condition, 'sm')}
              </div>
              <div className="space-y-1">
                <p className="font-medium">{day.temperature}°C</p>
                <p className="text-xs text-gray-500">
                  <span className="text-blue-500">{day.minTemp}°</span> /{' '}
                  <span className="text-red-500">{day.maxTemp}°</span>
                </p>
                <p className="text-xs text-gray-500">{day.precipitation}% {t('weather.precip')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t('weather.farmingTips')}</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Sun className="h-5 w-5 text-yellow-500 mt-1" />
            <p className="text-gray-600">{t('weather.tips.sunny')}</p>
          </div>
          <div className="flex items-start space-x-3">
            <CloudRain className="h-5 w-5 text-blue-500 mt-1" />
            <p className="text-gray-600">{t('weather.tips.rain')}</p>
          </div>
          <div className="flex items-start space-x-3">
            <Thermometer className="h-5 w-5 text-red-500 mt-1" />
            <p className="text-gray-600">{t('weather.tips.temperature')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;