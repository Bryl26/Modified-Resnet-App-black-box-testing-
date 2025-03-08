import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Camera, BookOpen, Cloud, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'home', icon: Home, label: t('Home') },
    { id: 'calendar', icon: Calendar, label: t('Schedules') },
    { id: 'camera', icon: Camera, label: t('Scan Rice Leaf') },
    { id: 'guide', icon: BookOpen, label: t('Quick Assistance') },
    { id: 'weather', icon: Cloud, label: t('Weather & Forecast') },
    { id: 'map', icon: MapPin, label: t('About Us') }
  ];

  return (
    <>
      {/* Add padding to prevent content overlap */}
      <div className="pb-20"></div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 px-4 py-3 z-[1000]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-around items-center">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex flex-col items-center p-2 relative transition-all ${
                  activeTab === id ? 'text-green-600 font-semibold' : 'text-gray-600'
                }`}
                aria-label={label}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Icon className="h-6 w-6" />
                  {activeTab === id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -inset-1 border-2 border-green-400 rounded-full -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
                <span className="text-xs mt-1">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
