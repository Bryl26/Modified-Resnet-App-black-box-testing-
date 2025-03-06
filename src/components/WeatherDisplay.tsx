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
          {tips.sunny && <p className="ml-6 text-gray-600">Weather Tips for Dry Seasons 🌞
Plant Drought-Resistant Varieties: Opt for crop varieties that are tolerant to drought conditions. For example, rice varieties like PSB Rc14 (Rio Grande) and PSB Rc68 (Sacobia) are suitable for rainfed lowlands and can endure dry spells.
Adopt Water-Saving Irrigation Techniques: Implement methods such as Alternate Wetting and Drying (AWD) and Low-Cost Drip Irrigation Systems (LDIS) to conserve water. These techniques ensure crops receive adequate moisture while reducing overall water usage. 
Diversify Crop Selection: During anticipated dry periods, consider planting crops with shorter gestation periods and lower water requirements, such as corn, beans, and certain root vegetables. This strategy can help maintain yields despite limited water availability. 
</p>}
          
          <li className="flex items-center cursor-pointer" onClick={() => setTips({ ...tips, rain: !tips.rain })}>
            <CloudRain className="text-blue-500 mr-2" /> {t('Weather Tips for Rainy Seasons 🌧️')}
          </li>
          {tips.rain && <p className="ml-6 text-gray-600">
Select Flood-Tolerant Crop Varieties: Choose crops that can withstand heavy rainfall and potential flooding. For instance, rice varieties such as PSB Rc18 (Ala) and NSIC Rc194 (Submarino 1) are known for their resilience to submergence, surviving up to 5-14 days underwater. 
Improve Field Drainage: Implement proper drainage systems, like ditches or furrows, to prevent waterlogging, which can lead to root rot and other diseases. Effective drainage ensures excess water is efficiently directed away from crop fields.
Utilize Cover Crops: Planting cover crops, such as legumes like cowpeas and mung beans, can help mitigate soil erosion caused by heavy rains. Their root systems enhance soil structure and promote better water infiltration. 
Employ Protective Structures: Use shade nets and windbreakers to shield crops from heavy rainfall and strong winds. Shade nets provide a barrier against direct rain impact, while windbreakers, comprising trees or shrubs, reduce wind speed and protect crops from potential damage.</p>}
          
          <li className="flex items-center cursor-pointer" onClick={() => setTips({ ...tips, temperature: !tips.temperature })}>
            <Thermometer className="text-red-500 mr-2" /> {t('Weather Tips for Changing Temperatures 🌡️')}
          </li>
          {tips.temperature && <p className="ml-6 text-gray-600">
Monitor Weather Forecasts: Stay updated with local weather reports to anticipate temperature fluctuations. Timely information allows for proactive measures, such as adjusting planting schedules or implementing protective strategies.
Implement Mulching Practices: Apply mulch to regulate soil temperature, retain moisture, and suppress weed growth. Mulching acts as an insulating layer, protecting plant roots from extreme temperature variations.
Choose Climate-Resilient Crop Varieties: Select crop varieties that are adaptable to a range of temperatures and climatic conditions. Consulting with local agricultural extension services can provide guidance on suitable varieties for specific regions.</p>}
        </ul>
      </div>
      <p className="text-sm text-gray-500 mt-6 text-center italic">
  © 2025 James Bryan Aquino Tababa @ ISU CYN | Master of Information Technology
</p>
    </div>
  );
};

export default WeatherDisplay;
