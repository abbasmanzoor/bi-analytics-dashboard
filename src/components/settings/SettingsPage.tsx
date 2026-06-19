import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center gap-3 mb-6">
          <Globe size={28} className="text-primary-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('settingsTitle')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {t('settingsDescription')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {t('language')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {languages.map((lang) => {
              const isActive = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`
                    flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
                    ${
                      isActive
                        ? 'border-primary-500 bg-primary-600 text-white shadow-md dark:border-primary-400 dark:bg-primary-700'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
            {t('currentLanguage') || 'Current language'}:{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {languages.find(l => l.code === i18n.language)?.name || 'English'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}