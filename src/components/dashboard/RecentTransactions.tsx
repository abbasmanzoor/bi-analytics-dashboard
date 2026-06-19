import { useState, useMemo } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useTransactionStore } from '../../store/transactionStore';
import { ChevronUp, ChevronDown, Search, TrendingUp, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type SortField = 'customerName' | 'revenue' | 'orders' | 'status' | 'region';
type SortOrder = 'asc' | 'desc';

export default function RecentTransactions() {
  const { t } = useTranslation();
  const { isLoading, error, isError } = useTransactions();
  const { transactions, searchTerm, setSearchTerm } = useTransactionStore();

  const [sortField, setSortField] = useState<SortField>('customerName');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [minRevenue, setMinRevenue] = useState<number>(0);
  const [maxRevenue, setMaxRevenue] = useState<number>(100000);
  const rowsPerPage = 5;

  const regions = useMemo(() => {
    if (!transactions) return [];
    return ['all', ...new Set(transactions.map(t => t.region))];
  }, [transactions]);

  // ✅ Fixed search filtering – trim, case-insensitive
  const filteredData = useMemo(() => {
    if (!transactions) return [];
    let data = [...transactions];

    // Search filter
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.trim().toLowerCase();
      data = data.filter(t =>
        t.customerName.toLowerCase().includes(term) ||
        t.region.toLowerCase().includes(term) ||
        t.status.toLowerCase().includes(term)
      );
    }
    // Status filter
    if (filterStatus !== 'all') {
      data = data.filter(t => t.status === filterStatus);
    }
    // Region filter
    if (filterRegion !== 'all') {
      data = data.filter(t => t.region === filterRegion);
    }
    // Revenue filters
    if (minRevenue > 0) {
      data = data.filter(t => t.revenue >= minRevenue);
    }
    if (maxRevenue < 100000) {
      data = data.filter(t => t.revenue <= maxRevenue);
    }

    // Sorting
    data.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'revenue' || sortField === 'orders') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [transactions, searchTerm, filterStatus, filterRegion, minRevenue, maxRevenue, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  const handleFilterChange = () => setCurrentPage(1);
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp size={14} className="opacity-30 group-hover:opacity-70 transition" />;
    return sortOrder === 'asc' ? <ChevronUp size={14} className="text-primary-500" /> : <ChevronDown size={14} className="text-primary-500" />;
  };

  const exportToCSV = () => {
    if (!filteredData.length) return;
    const headers = ['Customer Name', 'Revenue', 'Orders', 'Status', 'Region'];
    const rows = filteredData.map(t => [t.customerName, t.revenue, t.orders, t.status, t.region]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle search input change without page reload
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleFilterChange();
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">{t('loading')}</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <div className="text-center text-red-500">
          <p className="font-medium">⚠️ {t('error')}: {error?.message || 'Something went wrong'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-5 py-2 bg-primary-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  if (!paginatedData || paginatedData.length === 0) {
    return (
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">{t('noTransactions')}</p>
          <p className="text-sm">{t('adjustFilters')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark transition-colors overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <TrendingUp size={20} className="text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('recentTransactions')}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {filteredData.length} {t('totalEntries')}
          </span>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border-light dark:border-border-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
        >
          <Download size={16} /> {t('exportCSV')}
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-border-light dark:border-border-dark flex flex-wrap gap-3 items-center bg-gray-50/30 dark:bg-gray-900/20">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-primary-500 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); handleFilterChange(); }}
          className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="all">{t('allStatus')}</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          value={filterRegion}
          onChange={(e) => { setFilterRegion(e.target.value); handleFilterChange(); }}
          className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
        >
          {regions.map(region => (
            <option key={region} value={region}>
              {region === 'all' ? t('allRegions') : region}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder={t('minRevenue')}
          value={minRevenue || ''}
          onChange={(e) => { setMinRevenue(Number(e.target.value)); handleFilterChange(); }}
          className="w-24 px-2 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500"
        />
        <input
          type="number"
          placeholder={t('maxRevenue')}
          value={maxRevenue === 100000 ? '' : maxRevenue}
          onChange={(e) => { setMaxRevenue(Number(e.target.value) || 100000); handleFilterChange(); }}
          className="w-24 px-2 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-border-light dark:border-border-dark">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white" onClick={() => handleSort('customerName')}>
                <div className="flex items-center gap-1">{t('customerName')} <SortIcon field="customerName" /></div>
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => handleSort('revenue')}>
                <div className="flex items-center gap-1">{t('revenue')} <SortIcon field="revenue" /></div>
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => handleSort('orders')}>
                <div className="flex items-center gap-1">{t('orders')} <SortIcon field="orders" /></div>
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1">{t('status')} <SortIcon field="status" /></div>
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => handleSort('region')}>
                <div className="flex items-center gap-1">{t('region')} <SortIcon field="region" /></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{transaction.customerName}</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">${transaction.revenue.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{transaction.orders}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === 'Paid'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{transaction.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-border-light dark:border-border-dark flex flex-wrap justify-between items-center gap-3 bg-gray-50/30 dark:bg-gray-900/20">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm rounded border border-border-light dark:border-border-dark disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
          >
            {t('previous')}
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {t('page')} {currentPage} {t('of')} {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm rounded border border-border-light dark:border-border-dark disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
          >
            {t('next')}
          </button>
        </div>
      )}
    </div>
  );
}