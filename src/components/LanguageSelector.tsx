import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'il', name: 'Ilocano' },
  { code: 'ib', name: 'Ibanag' },
  { code: 'gd', name: 'Gaddang' },
  { code: 'cb', name: 'Cebuano' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-50">
        <Globe className="h-5 w-5 text-gray-600" />
        <span className="text-sm text-gray-700">
          {languages.find(lang => lang.code === i18n.language)?.name || 'Select Language'}
        </span>
      </button>
      
      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
              i18n.language === lang.code ? 'text-green-600 font-medium bg-green-50' : 'text-gray-700'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;