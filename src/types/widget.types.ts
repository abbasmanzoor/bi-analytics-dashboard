export interface RevenueData {
  month: string;
  revenue: number;
}

export interface SalesData {
  category: string;
  sales: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color?: string;
}

export interface CustomerGrowthData {
  month: string;
  customers: number;
}

export type DateRange = '7d' | '30d' | '6m' | '12m';

export interface WidgetState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  dateRange: DateRange;
}

export type ChartType = 'pie' | 'donut' | 'bar';

export interface WidgetMenuOption {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}