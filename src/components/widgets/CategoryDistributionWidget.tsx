import { useState } from 'react';
import { useChartData } from '../../hooks/useChartData';
import WidgetCard from './WidgetCard';
import CategoryDistributionChart from '../charts/CategoryDistributionChart';
import Modal from '../shared/Modal';
import { exportCSV } from '../../utils/exportCSV';
import { Eye, RefreshCw, Download, Maximize, PieChart, BarChart3, Donut } from 'lucide-react';

type ChartType = 'pie' | 'donut' | 'bar';

export default function CategoryDistributionWidget() {
  const { data, loading, error, refetch } = useChartData('category');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [chartType, setChartType] = useState<ChartType>('donut');

  const handleRefresh = async () => { await refetch(); };
  const handleExportCSV = () => {
    if (data) {
      exportCSV(
        data,
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

  if (error) {
    return (
      <WidgetCard title="Category Distribution" menuOptions={menuOptions}>
        <div className="text-red-500 p-4 text-center">Error loading data.</div>
      </WidgetCard>
    );
  }

  return (
    <>
      <WidgetCard title="Category Distribution" menuOptions={menuOptions}>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : (
          <CategoryDistributionChart data={data} chartType={chartType} />
        )}
      </WidgetCard>

      <Modal isOpen={showBreakdown} onClose={() => setShowBreakdown(false)} title="Category Breakdown">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2">Category</th>
                <th className="py-2">Value (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: { name: string; value: number }) => (
                <tr key={row.name} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">{row.name}</td>
                  <td className="py-2">{row.value}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal isOpen={fullscreen} onClose={() => setFullscreen(false)} title="Fullscreen">
        <div className="h-[70vh]">
          <CategoryDistributionChart data={data} chartType={chartType} />
        </div>
      </Modal>
    </>
  );
}