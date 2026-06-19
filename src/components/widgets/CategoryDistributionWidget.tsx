import { useState } from 'react';
import { useChartData } from '../../hooks/useChartData';
import WidgetCard from './WidgetCard';
import CategoryDistributionChart from '../charts/CategoryDistributionChart';
import Modal from '../shared/Modal';
import { exportCSV } from '../../utils/exportCSV';
import { Eye, RefreshCw, Download, Maximize, PieChart, BarChart3, Donut } from 'lucide-react';

type ChartType = 'pie' | 'donut' | 'bar';

// ✅ LOCAL FALLBACK
const FALLBACK_DATA = [
  { name: 'Solvency', value: 45 },
  { name: 'Revenue', value: 30 },
  { name: 'Handles', value: 15 },
  { name: 'Other', value: 10 },
];

export default function CategoryDistributionWidget() {
  const { data, loading, error, refetch } = useChartData('category');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [chartType, setChartType] = useState<ChartType>('donut');

  const displayData = (data && data.length > 0) ? data : FALLBACK_DATA;

  const handleRefresh = async () => { await refetch(); };
  const handleExportCSV = () => {
    if (displayData.length > 0) {
      exportCSV(
        displayData,
        [
          { label: 'Category', key: 'name' },
          { label: 'Value', key: 'value' },
        ],
        'category_distribution.csv'
      );
    }
  };

  const menuOptions = [
    { label: 'View Breakdown', icon: <Eye size={16} />, onClick: () => setShowBreakdown(true) },
    { label: 'Refresh Data', icon: <RefreshCw size={16} />, onClick: handleRefresh },
    { label: 'Export CSV', icon: <Download size={16} />, onClick: handleExportCSV },
    { label: 'Full Screen', icon: <Maximize size={16} />, onClick: () => setFullscreen(true) },
    { label: 'Pie Chart', icon: <PieChart size={16} />, onClick: () => setChartType('pie') },
    { label: 'Donut Chart', icon: <Donut size={16} />, onClick: () => setChartType('donut') },
    { label: 'Bar Chart', icon: <BarChart3 size={16} />, onClick: () => setChartType('bar') },
  ];

  return (
    <>
      <WidgetCard title="Category Distribution" menuOptions={menuOptions}>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : (
          <CategoryDistributionChart data={displayData} chartType={chartType} />
        )}
      </WidgetCard>

      <Modal isOpen={showBreakdown} onClose={() => setShowBreakdown(false)} title="Category Breakdown">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 text-sm font-semibold">Category</th>
                <th className="py-2 text-sm font-semibold">Value (%)</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row: any) => (
                <tr key={row.name} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 text-sm">{row.name}</td>
                  <td className="py-2 text-sm">{row.value}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal isOpen={fullscreen} onClose={() => setFullscreen(false)} title="Category Distribution (Fullscreen)">
        <div className="h-[70vh]">
          <CategoryDistributionChart data={displayData} chartType={chartType} />
        </div>
      </Modal>
    </>
  );
}