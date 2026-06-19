import { useTranslation } from 'react-i18next';
import RevenueTrendWidget from '../widgets/RevenueTrendWidget';
import SalesComparisonWidget from '../widgets/SalesComparisonWidget';
import CustomerGrowthWidget from '../widgets/CustomerGrowthWidget';
import CategoryDistributionWidget from '../widgets/CategoryDistributionWidget';

export default function AnalyticsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('analytics')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('analyticsSubtitle') || 'Detailed analytics and insights'}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendWidget />
        <SalesComparisonWidget />
        <CustomerGrowthWidget />
        <CategoryDistributionWidget />
      </div>
    </div>
  );
}