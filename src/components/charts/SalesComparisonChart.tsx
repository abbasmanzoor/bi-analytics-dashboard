import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

interface SalesComparisonChartProps {
  data: { category: string; sales: number }[];
}

export default function SalesComparisonChart({ data }: SalesComparisonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Sales Comparison by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
          <XAxis dataKey="category" stroke={isDark ? '#94a3b8' : '#64748b'} />
          <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#fff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#fff' : '#1e293b',
            }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Sales']}
          />
          <Legend wrapperStyle={{ color: isDark ? '#f1f5f9' : '#1e293b' }} />
          <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}