import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from './components/layout/MainLayout';
import KPICards from './components/dashboard/KPICards';
import RecentTransactions from './components/dashboard/RecentTransactions';
import SettingsPage from './components/settings/SettingsPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import ReportsPage from './components/pages/ReportsPage';
import CustomersPage from './components/pages/CustomersPage';

// ✅ New widget components (with menus, modals, etc.)
import RevenueTrendWidget from './components/widgets/RevenueTrendWidget';
import SalesComparisonWidget from './components/widgets/SalesComparisonWidget';
import CategoryDistributionWidget from './components/widgets/CategoryDistributionWidget';
import CustomerGrowthWidget from './components/widgets/CustomerGrowthWidget';

import { exportToPDF } from './utils/exportPDF';
import { Download } from 'lucide-react';
import { type Page } from './types/page';

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('subtitle')}
                </h3>
              </div>
              <button
                onClick={() => exportToPDF('dashboard-content', 'bi-dashboard.pdf')}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
              >
                <Download size={18} /> {t('exportPDF')}
              </button>
            </div>
            <div id="dashboard-content" className="space-y-6">
              <div id="kpi-section">
                <KPICards />
              </div>
              <div id="charts-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ✅ Using widget components – they manage their own data & state */}
                <RevenueTrendWidget />
                <SalesComparisonWidget />
                <CustomerGrowthWidget />
                <CategoryDistributionWidget />
              </div>
              <div id="transactions-section">
                <RecentTransactions />
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'customers':
        return <CustomersPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;