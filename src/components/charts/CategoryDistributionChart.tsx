import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

interface CategoryDistributionChartProps {
  data: { name: string; value: number; color?: string }[];
  chartType: 'pie' | 'donut' | 'bar';
}

export default function CategoryDistributionChart({ data, chartType }: CategoryDistributionChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const colors = data.map((item, index) => item.color || defaultColors[index % defaultColors.length]);

  const isDonut = chartType === 'donut';
  const innerRadius = isDonut ? 60 : 0;

  // Bar chart
  if (chartType === 'bar') {
    return (
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
            <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1e293b' : '#fff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                color: isDark ? '#fff' : '#1e293b',
              }}
              formatter={(value: any) => [`${Number(value)}%`, 'Share']}
            />
            <Legend wrapperStyle={{ color: isDark ? '#f1f5f9' : '#1e293b' }} />
            <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Pie / Donut
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Category Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, value }) => {
              const percentage = ((value / total) * 100).toFixed(0);
              return `${name} ${percentage}%`;
            }}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#fff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#fff' : '#1e293b',
            }}
            formatter={(value: any) => [`${Number(value)}%`, 'Share']}
          />
          <Legend wrapperStyle={{ color: isDark ? '#f1f5f9' : '#1e293b' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}