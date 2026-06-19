import { t } from 'i18next';

// Define searchable items
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'page' | 'kpi' | 'chart' | 'transaction';
  page?: string; // for navigation
  scrollId?: string; // for scrolling to section
  matchText: string;
}

// Build search index dynamically using translation
export const getSearchIndex = (): SearchResult[] => {
  const results: SearchResult[] = [];

  // Pages
  const pages = ['dashboard', 'analytics', 'reports', 'customers', 'settings'];
  pages.forEach((page) => {
    results.push({
      id: `page-${page}`,
      title: t(page),
      description: t(`${page}Subtitle`) || `Go to ${t(page)}`,
      type: 'page',
      page: page,
      matchText: t(page).toLowerCase(),
    });
  });

  // KPI Cards (hardcoded data – could also fetch from API)
  const kpis = [
    { key: 'totalRevenue', label: t('totalRevenue'), value: '$54,239' },
    { key: 'totalCustomers', label: t('totalCustomers'), value: '4,293' },
    { key: 'totalOrders', label: t('totalOrders'), value: '1,284' },
    { key: 'monthlyGrowth', label: t('monthlyGrowth'), value: '+23.5%' },
    { key: 'conversionRate', label: t('conversionRate'), value: '3.24%' },
  ];
  kpis.forEach((kpi) => {
    results.push({
      id: `kpi-${kpi.key}`,
      title: kpi.label,
      description: `Value: ${kpi.value}`,
      type: 'kpi',
      page: 'dashboard',
      scrollId: 'kpi-section',
      matchText: `${kpi.label} ${kpi.value}`.toLowerCase(),
    });
  });

  // Charts
  const charts = [
    { key: 'revenueTrend', label: t('revenueTrend') },
    { key: 'salesComparison', label: t('salesComparison') },
    { key: 'customerGrowth', label: t('customerGrowth') },
    { key: 'categoryDistribution', label: t('categoryDistribution') },
  ];
  charts.forEach((chart) => {
    results.push({
      id: `chart-${chart.key}`,
      title: chart.label,
      description: 'View chart',
      type: 'chart',
      page: 'dashboard',
      scrollId: 'charts-section',
      matchText: chart.label.toLowerCase(),
    });
  });

  // Transactions (dynamic – we'll use static sample data because API data may not be loaded)
  const sampleTransactions = [
    { name: 'Ahmed Enterprises', region: 'Karachi' },
    { name: 'Fatima Traders', region: 'Lahore' },
    { name: 'Hassan & Sons', region: 'Islamabad' },
    { name: 'Zara Solutions', region: 'Rawalpindi' },
    { name: 'Usman Group', region: 'Faisalabad' },
  ];
  sampleTransactions.forEach((t, idx) => {
    results.push({
      id: `tx-${idx}`,
      title: t.name,
      description: `Region: ${t.region}`,
      type: 'transaction',
      page: 'dashboard',
      scrollId: 'transactions-section',
      matchText: `${t.name} ${t.region}`.toLowerCase(),
    });
  });

  return results;
};

export const search = (query: string, index: SearchResult[]): SearchResult[] => {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  return index.filter(item => item.matchText.includes(q));
};