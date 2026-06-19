import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { type DateRange } from '../../types/widget.types';

interface RevenueTrendChartProps {
  data: { month: string; revenue: number }[];
  dateRange: DateRange;
}

export default function RevenueTrendChart({ data, dateRange }: RevenueTrendChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
        No data available for the selected range
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Revenue Trend {dateRange && `(${dateRange})`}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
          <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
          <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#fff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#fff' : '#1e293b',
            }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
          />
          <Legend wrapperStyle={{ color: isDark ? '#f1f5f9' : '#1e293b' }} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4, stroke: '#3b82f6' }}
            activeDot={{ fill: '#3b82f6', r: 6, stroke: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}