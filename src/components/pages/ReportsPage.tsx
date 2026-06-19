import { useTranslation } from 'react-i18next';
import { useTransactions } from '../../hooks/useTransactions';
import { useState } from 'react';
import { Download } from 'lucide-react';

export default function ReportsPage() {
  const { t } = useTranslation();
  const { transactions, isLoading, error, isError } = useTransactions();
  const [filter, setFilter] = useState('all');

  if (isLoading) return <div className="p-8 text-center text-gray-600 dark:text-gray-400">Loading reports...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Error: {error?.message}</div>;

  const filteredData = transactions?.filter(t => filter === 'all' ? true : t.status === filter);
  const totalRevenue = transactions?.reduce((sum, t) => sum + t.revenue, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('reports')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('reportsSubtitle') || 'Complete transaction reports'}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
          <Download size={18} /> {t('exportCSV')}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{transactions?.length || 0}</p>
        </div>
        <div className="bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
          <p className="text-sm text-gray-500 dark:text-gray-400">Paid</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{transactions?.filter(t => t.status === 'Paid').length || 0}</p>
        </div>
        <div className="bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{transactions?.filter(t => t.status === 'Pending').length || 0}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'Paid', 'Pending'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === status
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {status === 'all' ? 'All' : status}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Customer Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Revenue</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Orders</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map(t => (
                <tr key={t.id} className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{t.customerName}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">${t.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{t.orders}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{t.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}