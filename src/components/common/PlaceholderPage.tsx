import { useTranslation } from 'react-i18next';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-8 text-center">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        {description || t('comingSoon') || 'This page is under development. Stay tuned for updates!'}
      </p>
      <div className="mt-6 text-sm text-gray-400 dark:text-gray-500">
        🚧 {t('comingSoon') || 'Coming soon...'}
      </div>
    </div>
  );
}