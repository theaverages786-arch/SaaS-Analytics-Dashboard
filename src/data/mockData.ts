import { BarChartDataPoint, MetricData, Transaction, RevenueStream, CohortMonth, NotificationItem, AppSettings } from '../types';

export const initialMetrics: Record<string, MetricData[]> = {
  '7d': [
    {
      id: 'mrr',
      title: 'Monthly Recurring Revenue (MRR)',
      value: 128450,
      formattedValue: '$128,450',
      change: 14.8,
      trend: 'up',
      timeframe: 'vs last 7 days',
      history: [112000, 114500, 118200, 120100, 123400, 126100, 128450],
      category: 'revenue',
      iconName: 'TrendingUp'
    },
    {
      id: 'subscribers',
      title: 'Active Paid Subscribers',
      value: 2840,
      formattedValue: '2,840',
      change: 8.2,
      trend: 'up',
      timeframe: 'vs last 7 days',
      history: [2650, 2690, 2710, 2755, 2790, 2815, 2840],
      category: 'customers',
      iconName: 'Users'
    },
    {
      id: 'arpu',
      title: 'Avg. Revenue Per User (ARPU)',
      value: 45.22,
      formattedValue: '$45.22',
      change: 3.4,
      trend: 'up',
      timeframe: 'vs last 7 days',
      history: [43.5, 43.8, 44.1, 44.4, 44.8, 45.0, 45.22],
      category: 'revenue',
      iconName: 'DollarSign'
    },
    {
      id: 'churn',
      title: 'User Churn Rate',
      value: 1.42,
      formattedValue: '1.42%',
      change: -0.35,
      trend: 'up', // lower churn is good
      timeframe: 'vs last 7 days',
      history: [1.8, 1.75, 1.68, 1.6, 1.52, 1.48, 1.42],
      category: 'retention',
      iconName: 'Activity'
    }
  ],
  '30d': [
    {
      id: 'mrr',
      title: 'Monthly Recurring Revenue (MRR)',
      value: 142800,
      formattedValue: '$142,800',
      change: 18.6,
      trend: 'up',
      timeframe: 'vs last month',
      history: [115000, 120000, 126000, 131000, 138000, 142800],
      category: 'revenue',
      iconName: 'TrendingUp'
    },
    {
      id: 'subscribers',
      title: 'Active Paid Subscribers',
      value: 3120,
      formattedValue: '3,120',
      change: 12.4,
      trend: 'up',
      timeframe: 'vs last month',
      history: [2700, 2790, 2880, 2980, 3050, 3120],
      category: 'customers',
      iconName: 'Users'
    },
    {
      id: 'arpu',
      title: 'Avg. Revenue Per User (ARPU)',
      value: 45.76,
      formattedValue: '$45.76',
      change: 5.1,
      trend: 'up',
      timeframe: 'vs last month',
      history: [42.1, 42.9, 43.8, 44.5, 45.1, 45.76],
      category: 'revenue',
      iconName: 'DollarSign'
    },
    {
      id: 'churn',
      title: 'User Churn Rate',
      value: 1.38,
      formattedValue: '1.38%',
      change: -0.42,
      trend: 'up',
      timeframe: 'vs last month',
      history: [1.9, 1.8, 1.7, 1.6, 1.48, 1.38],
      category: 'retention',
      iconName: 'Activity'
    }
  ],
  '12m': [
    {
      id: 'mrr',
      title: 'Annual Run Rate (ARR)',
      value: 1713600,
      formattedValue: '$1.71M',
      change: 64.2,
      trend: 'up',
      timeframe: 'vs last year',
      history: [980000, 1100000, 1250000, 1420000, 1580000, 1713600],
      category: 'revenue',
      iconName: 'TrendingUp'
    },
    {
      id: 'subscribers',
      title: 'Active Paid Subscribers',
      value: 3450,
      formattedValue: '3,450',
      change: 48.0,
      trend: 'up',
      timeframe: 'vs last year',
      history: [2100, 2350, 2600, 2900, 3200, 3450],
      category: 'customers',
      iconName: 'Users'
    },
    {
      id: 'arpu',
      title: 'Customer Lifetime Value (LTV)',
      value: 3280,
      formattedValue: '$3,280',
      change: 22.5,
      trend: 'up',
      timeframe: 'vs last year',
      history: [2400, 2600, 2750, 2950, 3100, 3280],
      category: 'revenue',
      iconName: 'DollarSign'
    },
    {
      id: 'churn',
      title: 'Net Revenue Retention (NRR)',
      value: 124,
      formattedValue: '124%',
      change: 8.5,
      trend: 'up',
      timeframe: 'vs last year',
      history: [108, 112, 115, 118, 121, 124],
      category: 'retention',
      iconName: 'Activity'
    }
  ]
};

export const barChartDataSets: Record<string, BarChartDataPoint[]> = {
  '7d': [
    { id: 'mon', label: 'Mon', subLabel: 'Oct 14', revenue: 14200, target: 12000, previous: 11500, users: 480, percentageOfMax: 65 },
    { id: 'tue', label: 'Tue', subLabel: 'Oct 15', revenue: 16800, target: 14000, previous: 13200, users: 540, percentageOfMax: 76 },
    { id: 'wed', label: 'Wed', subLabel: 'Oct 16', revenue: 19400, target: 15000, previous: 14800, users: 610, percentageOfMax: 88 },
    { id: 'thu', label: 'Thu', subLabel: 'Oct 17', revenue: 22100, target: 16000, previous: 16200, users: 720, percentageOfMax: 100 },
    { id: 'fri', label: 'Fri', subLabel: 'Oct 18', revenue: 18900, target: 15500, previous: 15100, users: 640, percentageOfMax: 85 },
    { id: 'sat', label: 'Sat', subLabel: 'Oct 19', revenue: 11200, target: 10000, previous: 9800, users: 390, percentageOfMax: 50 },
    { id: 'sun', label: 'Sun', subLabel: 'Oct 20', revenue: 13500, target: 11000, previous: 10400, users: 430, percentageOfMax: 61 }
  ],
  '30d': [
    { id: 'w1', label: 'Week 1', subLabel: 'Oct 1 - 7', revenue: 84000, target: 75000, previous: 69000, users: 2400, percentageOfMax: 72 },
    { id: 'w2', label: 'Week 2', subLabel: 'Oct 8 - 14', revenue: 96500, target: 82000, previous: 78000, users: 2750, percentageOfMax: 82 },
    { id: 'w3', label: 'Week 3', subLabel: 'Oct 15 - 21', revenue: 118000, target: 90000, previous: 86000, users: 3100, percentageOfMax: 100 },
    { id: 'w4', label: 'Week 4', subLabel: 'Oct 22 - 28', revenue: 104200, target: 92000, previous: 89000, users: 2950, percentageOfMax: 88 }
  ],
  '12m': [
    { id: 'jan', label: 'Jan', revenue: 82000, target: 70000, previous: 55000, users: 1900, percentageOfMax: 48 },
    { id: 'feb', label: 'Feb', revenue: 91000, target: 75000, previous: 61000, users: 2100, percentageOfMax: 53 },
    { id: 'mar', label: 'Mar', revenue: 104000, target: 85000, previous: 68000, users: 2350, percentageOfMax: 61 },
    { id: 'apr', label: 'Apr', revenue: 112000, target: 92000, previous: 74000, users: 2500, percentageOfMax: 65 },
    { id: 'may', label: 'May', revenue: 125000, target: 100000, previous: 82000, users: 2780, percentageOfMax: 73 },
    { id: 'jun', label: 'Jun', revenue: 134000, target: 110000, previous: 90000, users: 2950, percentageOfMax: 78 },
    { id: 'jul', label: 'Jul', revenue: 141000, target: 118000, previous: 96000, users: 3080, percentageOfMax: 82 },
    { id: 'aug', label: 'Aug', revenue: 149000, target: 125000, previous: 104000, users: 3200, percentageOfMax: 87 },
    { id: 'sep', label: 'Sep', revenue: 156000, target: 132000, previous: 112000, users: 3320, percentageOfMax: 91 },
    { id: 'oct', label: 'Oct', revenue: 168000, target: 140000, previous: 119000, users: 3500, percentageOfMax: 98 },
    { id: 'nov', label: 'Nov', revenue: 172000, target: 145000, previous: 125000, users: 3610, percentageOfMax: 100 },
    { id: 'dec', label: 'Dec', revenue: 164000, target: 148000, previous: 129000, users: 3520, percentageOfMax: 95 }
  ]
};

export const initialTransactions: Transaction[] = [
  {
    id: 'tx_9841',
    customerName: 'Sarah Jenkins',
    customerEmail: 's.jenkins@acmecorp.io',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    plan: 'Enterprise',
    amount: 1490.00,
    status: 'completed',
    date: 'Oct 24, 2026',
    timeAgo: '4 mins ago',
    paymentMethod: 'Mastercard •••• 4829',
    invoiceNumber: 'INV-2026-0891'
  },
  {
    id: 'tx_9840',
    customerName: 'Alex Rivera',
    customerEmail: 'alex@novacrest.tech',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    plan: 'Scale',
    amount: 590.00,
    status: 'completed',
    date: 'Oct 24, 2026',
    timeAgo: '18 mins ago',
    paymentMethod: 'Visa •••• 1042',
    invoiceNumber: 'INV-2026-0890'
  },
  {
    id: 'tx_9839',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@hypergrowth.co',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    plan: 'Pro',
    amount: 199.00,
    status: 'pending',
    date: 'Oct 24, 2026',
    timeAgo: '42 mins ago',
    paymentMethod: 'Apple Pay',
    invoiceNumber: 'INV-2026-0889'
  },
  {
    id: 'tx_9838',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@solardata.ai',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    plan: 'Enterprise',
    amount: 2490.00,
    status: 'completed',
    date: 'Oct 24, 2026',
    timeAgo: '1 hour ago',
    paymentMethod: 'ACH Transfer',
    invoiceNumber: 'INV-2026-0888'
  },
  {
    id: 'tx_9837',
    customerName: 'David Chen',
    customerEmail: 'david@zenithscale.com',
    customerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    plan: 'Team Add-on',
    amount: 89.00,
    status: 'refunded',
    date: 'Oct 23, 2026',
    timeAgo: '3 hours ago',
    paymentMethod: 'Mastercard •••• 4829',
    invoiceNumber: 'INV-2026-0887'
  },
  {
    id: 'tx_9836',
    customerName: 'Amara Okafor',
    customerEmail: 'amara@stratalab.org',
    customerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    plan: 'Pro',
    amount: 199.00,
    status: 'completed',
    date: 'Oct 23, 2026',
    timeAgo: '5 hours ago',
    paymentMethod: 'PayPal',
    invoiceNumber: 'INV-2026-0886'
  },
  {
    id: 'tx_9835',
    customerName: 'Liam Gallagher',
    customerEmail: 'liam@vortexcloud.dev',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    plan: 'Starter',
    amount: 49.00,
    status: 'completed',
    date: 'Oct 23, 2026',
    timeAgo: '8 hours ago',
    paymentMethod: 'Visa •••• 1042',
    invoiceNumber: 'INV-2026-0885'
  }
];

export const revenueStreams: RevenueStream[] = [
  { category: 'Enterprise Tier', amount: 84200, growth: 24.5, color: '#6366f1', percentage: 52 },
  { category: 'Scale & Growth Plans', amount: 39500, growth: 16.2, color: '#06b6d4', percentage: 25 },
  { category: 'Pro Subscriptions', amount: 24100, growth: 8.7, color: '#10b981', percentage: 15 },
  { category: 'Usage Add-ons & Seats', amount: 12650, growth: 31.0, color: '#f59e0b', percentage: 8 }
];

export const cohortRetentionData: CohortMonth[] = [
  { month: 'May 2026', m0: 100, m1: 92, m2: 87, m3: 84, m4: 81, m5: 79 },
  { month: 'Jun 2026', m0: 100, m1: 94, m2: 89, m3: 86, m4: 83, m5: 80 },
  { month: 'Jul 2026', m0: 100, m1: 95, m2: 91, m3: 88, m4: 86, m5: 83 },
  { month: 'Aug 2026', m0: 100, m1: 96, m2: 93, m3: 90, m4: 88, m5: 85 },
  { month: 'Sep 2026', m0: 100, m1: 97, m2: 94, m3: 92, m4: 89, m5: 87 },
  { month: 'Oct 2026', m0: 100, m1: 98, m2: 95, m3: 93, m4: 91, m5: 89 }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'New Enterprise Conversion',
    message: 'SolarData AI upgraded to Enterprise tier ($2,490/mo).',
    timestamp: '1 hour ago',
    read: false,
    type: 'growth'
  },
  {
    id: 'n2',
    title: 'MRR Milestone Achieved',
    message: 'Monthly Recurring Revenue surpassed $140,000.',
    timestamp: '3 hours ago',
    read: false,
    type: 'payment'
  },
  {
    id: 'n3',
    title: 'Automated Billing Run Complete',
    message: 'Processed 284 subscription renewal invoices with 99.3% success.',
    timestamp: '6 hours ago',
    read: true,
    type: 'system'
  }
];

export const defaultSettings: AppSettings = {
  organizationName: 'Acme SaaS Global Inc.',
  supportEmail: 'billing@acmesaas.com',
  billingEmail: 'finance@acmesaas.com',
  timezone: 'America/New_York (EST)',
  autoInvoicing: true,
  slackAlerts: true,
  emailDigest: 'weekly',
  webhookUrl: 'https://api.acmesaas.com/v1/webhooks/revenue-events',
  apiKey: 'pm_live_sk_99a84f32e9b8417c80d192ae77f12',
  accentColor: 'indigo'
};
