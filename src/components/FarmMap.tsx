import React from 'react';
import { ShieldCheck, CloudSun, MapPin, Activity, CheckCircle, RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <ShieldCheck className="text-green-500 w-12 h-12" />, 
      title: t('Smart Disease Detection'),
      description: t('Utilizing advanced ResNet50 CNN models, our system detects rice diseases with high accuracy, providing early warnings and suggested treatments.')
    },
    {
      icon: <CloudSun className="text-blue-500 w-12 h-12" />, 
      title: t('Weather Forecasting'),
      description: t('Integrated with real-time weather data, the system provides accurate forecasts, helping farmers make informed decisions on irrigation and disease prevention.')
    },
    {
      icon: <Activity className="text-purple-500 w-12 h-12" />, 
      title: t('Model Accuracy & Reliability'),
      description: t('Our AI model is trained with extensive datasets, ensuring precision in disease detection and continuous learning for enhanced reliability.')
    },
    {
      icon: <RefreshCcw className="text-orange-500 w-12 h-12" />, 
      title: t('Maintainability & Scalability'),
      description: t('Designed with scalability in mind, our system ensures easy maintenance, seamless updates, and adaptability to future enhancements.')
    },
    {
      icon: <MapPin className="text-red-500 w-12 h-12" />, 
      title: t('Farm Mapping & Nearby Disease Alerts'),
      description: t('Interactive farm mapping allows users to view disease occurrences in nearby farms, learn from other farmers’ actions, and take proactive measures.')
    },
    {
      icon: <CheckCircle className="text-yellow-500 w-12 h-12" />, 
      title: t('User-Centric & Actionable Insights'),
      description: t('Our system offers actionable insights, guiding farmers with preventive measures and best practices for sustainable farming.')
    }
  ];
  
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">{t('About Our Smart Farming System')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            {feature.icon}
            <h2 className="text-xl font-semibold mt-4">{feature.title}</h2>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-6 text-center italic">
        © 2025 James Bryan Aquino Tababa @ ISU CYN | Master of Information Technology
      </p>
    </div>
  );
};

export default AboutUs;
