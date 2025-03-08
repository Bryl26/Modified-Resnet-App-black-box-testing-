import React, { useEffect, useState, useCallback } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Thermometer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=16.93&longitude=121.77&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia/Manila';

const WeatherDisplay = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tips, setTips] = useState({ sunny: false, rain: false, temperature: false });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setWeather({
          temperature: data.current_weather.temperature,
          precipitation: data.daily.precipitation_sum[0],
          minTemp: data.daily.temperature_2m_min[0],
          maxTemp: data.daily.temperature_2m_max[0],
          weatherCode: data.current_weather.weathercode,
        });

        setForecast(data.daily.temperature_2m_max.map((maxTemp, index) => ({
          date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          minTemp: data.daily.temperature_2m_min[index],
          maxTemp: maxTemp,
          precipitation: data.daily.precipitation_sum[index],
        })));
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = useCallback((code) => {
    if (!code) return <Cloud className="text-gray-500" />;
    if ([0, 1].includes(code)) return <Sun className="text-yellow-500" />; // Clear/Sunny
    if ([2, 3].includes(code)) return <Cloud className="text-gray-500" />; // Partly Cloudy/Cloudy
    if ([45, 48].includes(code)) return <Wind className="text-blue-500" />; // Fog/Windy
    if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className="text-blue-500" />; // Rainy
    if ([95, 96, 99].includes(code)) return <CloudLightning className="text-red-500" />; // Stormy
    return <Cloud className="text-gray-500" />; // Default
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin h-12 w-12 border-b-2 border-green-500"></div></div>;
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 rounded-lg p-4"><p className="text-red-700">{error}</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
        {getWeatherIcon(weather.weatherCode)}
        <div>
          <h2 className="text-xl font-semibold">{`${t('Current Weather')} ${new Date().toLocaleDateString()}`}</h2>
          <p className="text-4xl font-bold">{weather.temperature}°C</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold">{t('7-Day Forecast')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              {getWeatherIcon(day.weatherCode)}
              <p className="text-sm text-gray-600 mb-2">{day.date}</p>
              <p className="font-medium">{day.maxTemp}°C</p>
              <p className="text-xs text-gray-500">Min: {day.minTemp}°C</p>
              <p className="text-xs text-gray-500">Precipitation: {day.precipitation}mm</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold">{t('weather.farmingTips')}</h3>
        <ul className="space-y-3 mt-4">
          <li className="flex items-center cursor-pointer" onClick={() => setTips({ ...tips, sunny: !tips.sunny })}>
            <Sun className="text-yellow-500 mr-2" /> {t('Weather Tips for Dry Seasons 🌞')}
          </li>
          {tips.sunny && <p className="ml-6 text-gray-600">
<li><strong>Plant Drought-Resistant Crops:</strong> Opt for varieties like PSB Rc14 (Rio Grande) & PSB Rc68 (Sacobia).🌾</li>
              <li><strong>Use Water-Saving Irrigation:</strong> Apply AWD or Low-Cost Drip Systems to conserve water.💧</li>
              <li><strong>Diversify Crops:🌽</strong> Grow short-gestation, low-water crops like corn, beans, & root vegetables.</li> 
</p>}
          
          <li className="flex items-center cursor-pointer" onClick={() => setTips({ ...tips, rain: !tips.rain })}>
            <CloudRain className="text-blue-500 mr-2" /> {t('Weather Tips for Rainy Seasons 🌧️')}
          </li>
          {tips.rain && <p className="ml-6 text-gray-600">
<li><strong>Flood-Tolerant Crops:</strong> Choose resilient rice varieties like PSB Rc18 (Ala) & NSIC Rc194 (Submarino 1).🌾</li>
              <li><strong>Improve Drainage:</strong> Use ditches or furrows to prevent waterlogging and root diseases.🌊</li>
              <li><strong>Utilize Cover Crops:</strong> Grow legumes like cowpeas & mung beans to prevent soil erosion.🌿</li>
              <li><strong>Employ Protective Structures:</strong> Use shade nets & windbreakers to shield crops from rain & wind.🚜</li></p>}
          
          <li className="flex items-center cursor-pointer" onClick={() => setTips({ ...tips, temperature: !tips.temperature })}>
            <Thermometer className="text-red-500 mr-2" /> {t('Weather Tips for Changing Temperatures 🌡️')}
          </li>
          {tips.temperature && <p className="ml-6 text-gray-600">
<li><strong>Monitor Weather Forecasts:</strong> Stay updated to anticipate temperature fluctuations.🌦️</li>
              <li><strong>Implement Mulching Practices:</strong> Use mulch to regulate soil temperature & retain moisture.🍂</li>
              <li><strong>Choose Climate-Resilient Crops:</strong> Opt for varieties adaptable to temperature variations.🌾</li></p>}
        </ul>
      </div>
      <p className="text-sm text-gray-500 mt-6 text-center italic">
  © 2025 James Bryan Aquino Tababa @ ISU CYN | Master of Information Technology
</p>
    </div>
  );
};

export default WeatherDisplay;