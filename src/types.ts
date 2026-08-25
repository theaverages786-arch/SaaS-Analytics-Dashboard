export type NavTab = 'overview' | 'revenue' | 'settings';

export type TimeRange = '7d' | '30d' | '12m';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface MetricData {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  history: number[];
  category: string;
  iconName: string;
}

export interface BarChartDataPoint {
  id: string;
  label: string;
  subLabel?: string;
  revenue: number;
  target: number;
  previous: number;
  users: number;
  percentageOfMax: number;
}

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  plan: 'Starter' | 'Pro' | 'Enterprise' | 'Scale' | 'Team Add-on';
  amount: number;
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  date: string;
  timeAgo: string;
  paymentMethod: 'Mastercard •••• 4829' | 'Visa •••• 1042' | 'Apple Pay' | 'ACH Transfer' | 'PayPal';
  invoiceNumber: string;
}

export interface RevenueStream {
  category: string;
  amount: number;
  growth: number;
  color: string;
  percentage: number;
}

export interface CohortMonth {
  month: string;
  m0: number;
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'payment' | 'alert' | 'system' | 'growth';
}

export interface AppSettings {
  organizationName: string;
  supportEmail: string;
  billingEmail: string;
  timezone: string;
  autoInvoicing: boolean;
  slackAlerts: boolean;
  emailDigest: 'daily' | 'weekly' | 'monthly' | 'never';
  webhookUrl: string;
  apiKey: string;
  accentColor: 'indigo' | 'emerald' | 'cyan' | 'violet';
}
