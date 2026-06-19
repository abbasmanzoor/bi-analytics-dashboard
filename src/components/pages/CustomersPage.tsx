import { useTranslation } from 'react-i18next';
import RecentTransactions from '../dashboard/RecentTransactions';

export default function CustomersPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('customers')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t('customersSubtitle') || 'Customer management and transactions'}</p>
      </div>
      <RecentTransactions />
    </div>
  );
}