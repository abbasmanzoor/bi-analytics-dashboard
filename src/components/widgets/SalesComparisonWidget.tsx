import { useState } from 'react';
import { useChartData } from '../../hooks/useChartData';
import WidgetCard from './WidgetCard';
import SalesComparisonChart from '../charts/SalesComparisonChart';
import Modal from '../shared/Modal';
import { exportCSV } from '../../utils/exportCSV';
import { Eye, RefreshCw, Download, Maximize, BarChart2 } from 'lucide-react';

export default function SalesComparisonWidget() {
  const { data, loading, error, refetch } = useChartData('sales');
  const [showDetails, setShowDetails] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // ✅ Fallback already in hook, but keep safety
  const displayData = data && data.length > 0 ? data : [];

  const handleRefresh = async () => { await refetch(); };
  const handleExportCSV = () => {
    if (displayData.length > 0) {
      exportCSV(
        displayData,
        [
          { label: 'Category', key: 'category' },
          { label: 'Sales', key: 'sales' },
        ],
        'sales_comparison.csv'
      );
    }
  };

  const menuOptions = [
    { label: 'View Details', icon: <Eye size={16} />, onClick: () => setShowDetails(true) },
    { label: 'Refresh Data', icon: <RefreshCw size={16} />, onClick: handleRefresh },
    { label: 'Export CSV', icon: <Download size={16} />, onClick: handleExportCSV },
    { label: 'Full Screen', icon: <Maximize size={16} />, onClick: () => setFullscreen(true) },
    { label: 'Compare Periods', icon: <BarChart2 size={16} />, onClick: () => alert('Compare current vs previous month') },
  ];

  return (
    <>
      <WidgetCard title="Sales Comparison" menuOptions={menuOptions}>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : (
          <SalesComparisonChart data={displayData} />
        )}
      </WidgetCard>

      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)} title="Sales Breakdown">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 text-sm font-semibold">Category</th>
                <th className="py-2 text-sm font-semibold">Sales</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row: any) => (
                <tr key={row.category} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 text-sm">{row.category}</td>
                  <td className="py-2 text-sm">${row.sales.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal isOpen={fullscreen} onClose={() => setFullscreen(false)} title="Sales Comparison (Fullscreen)">
        <div className="h-[70vh]">
          <SalesComparisonChart data={displayData} />
        </div>
      </Modal>
    </>
  );
}