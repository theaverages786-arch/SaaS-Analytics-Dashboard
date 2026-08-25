import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  NavTab,
  TimeRange,
  CurrencyCode,
  Transaction,
  MetricData,
  BarChartDataPoint,
  NotificationItem,
  AppSettings,
} from './types';
import {
  initialMetrics,
  barChartDataSets,
  initialTransactions,
  revenueStreams,
  cohortRetentionData,
  initialNotifications,
  defaultSettings,
} from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewPage } from './pages/OverviewPage';
import { RevenuePage } from './pages/RevenuePage';
import { SettingsPage } from './pages/SettingsPage';
import { CommandPalette } from './components/ui/CommandPalette';
import { NotificationDrawer } from './components/ui/NotificationDrawer';
import { TransactionDetailModal } from './components/ui/TransactionDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  // Data states
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Modal / drawer states
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Simulate a live transaction inflow
  const simulateNewTransaction = useCallback(() => {
    const randomPlans: Transaction['plan'][] = ['Pro', 'Scale', 'Enterprise', 'Team Add-on'];
    const randomAmounts = [199.0, 590.0, 1490.0, 2490.0, 89.0];
    const names = [
      { name: 'Kavita Patel', email: 'kavita@synthetix.ai', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Jordan Hayes', email: 'jordan@cloudforge.dev', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Chloe Dubois', email: 'chloe@aeroverse.fr', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    ];

    const pick = names[Math.floor(Math.random() * names.length)];
    const plan = randomPlans[Math.floor(Math.random() * randomPlans.length)];
    const amount = randomAmounts[Math.floor(Math.random() * randomAmounts.length)];
    const idNum = Math.floor(1000 + Math.random() * 9000);

    const newTx: Transaction = {
      id: `tx_${idNum}`,
      customerName: pick.name,
      customerEmail: pick.email,
      customerAvatar: pick.avatar,
      plan,
      amount,
      status: 'completed',
      date: 'Just now',
      timeAgo: 'Just now',
      paymentMethod: 'Mastercard •••• 4829',
      invoiceNumber: `INV-2026-${idNum}`,
    };

    setTransactions((prev) => [newTx, ...prev.slice(0, 14)]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: `New ${plan} Checkout`,
      message: `${pick.name} subscribed (${currencySymbols[currency]}${amount.toFixed(2)})`,
      timestamp: 'Just now',
      read: false,
      type: 'growth',
    };

    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Live Inflow: ${pick.name} bought ${plan} plan (+${currencySymbols[currency]}${amount})`);
  }, [currency]);

  // Periodic streaming simulation
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      // 30% chance every 18 seconds to receive an inflow
      if (Math.random() > 0.65) {
        simulateNewTransaction();
      }
    }, 18000);
    return () => clearInterval(interval);
  }, [isStreaming, simulateNewTransaction]);

  const handleExportStatement = () => {
    // Generate CSV data from transactions
    const headers = 'Invoice,Customer,Email,Plan,Amount,Status,Date\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.invoiceNumber}","${t.customerName}","${t.customerEmail}","${t.plan}",${t.amount},"${t.status}","${t.date}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PulseMetrics_Ledger_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported transaction statement CSV');
  };

  const getPageHeader = () => {
    switch (activeTab) {
      case 'overview':
        return {
          title: 'Executive Analytics',
          subtitle: 'Real-time ARR velocity, conversion funnel, and staggered billing stream',
        };
      case 'revenue':
        return {
          title: 'Revenue & Growth Engine',
          subtitle: 'Cohort retention matrix, ARR projections, and interactive simulation model',
        };
      case 'settings':
        return {
          title: 'Platform Preferences',
          subtitle: 'Developer API credentials, webhook endpoints, and organization config',
        };
    }
  };

  const headerInfo = getPageHeader();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 bg-grid-pattern relative">
      {/* Top subtle radial atmospheric gradient */}
      <div className="pointer-events-none fixed inset-0 bg-radial-gradient z-0 opacity-80" />

      {/* Floating Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-indigo-500/40 text-xs sm:text-sm font-semibold text-indigo-200 shadow-2xl shadow-indigo-950/50 backdrop-blur-md flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Container Layout */}
      <div
        className={`
          flex flex-col min-h-screen transition-all duration-300 relative z-10
          ${sidebarCollapsed ? 'md:pl-20' : 'md:pl-64 sm:md:pl-72'}
        `}
      >
        {/* Sticky Header */}
        <Header
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          onOpenCommand={() => setIsCommandOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={unreadCount}
          currency={currency}
          onCurrencyChange={setCurrency}
          isStreaming={isStreaming}
          onToggleStreaming={() => {
            setIsStreaming(!isStreaming);
            showToast(isStreaming ? 'Data streaming paused' : 'Live data streaming resumed');
          }}
          onExport={handleExportStatement}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Dynamic Page Views with AnimatePresence fluid transitions */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewPage
                key="overview"
                metrics={initialMetrics[timeRange]}
                chartData={barChartDataSets[timeRange]}
                transactions={transactions}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
                currency={currency}
                currencySymbol={currencySymbols[currency]}
                onViewTransaction={setSelectedTx}
                onSimulateTx={simulateNewTransaction}
                onNavigateToRevenue={() => setActiveTab('revenue')}
              />
            )}

            {activeTab === 'revenue' && (
              <RevenuePage
                key="revenue"
                revenueStreams={revenueStreams}
                cohortData={cohortRetentionData}
                transactions={transactions}
                currency={currency}
                currencySymbol={currencySymbols[currency]}
                onExport={handleExportStatement}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsPage
                key="settings"
                settings={settings}
                onSaveSettings={(newSettings) => {
                  setSettings(newSettings);
                  showToast('Organization settings updated successfully');
                }}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={setActiveTab}
        onSimulateTx={simulateNewTransaction}
        onExport={handleExportStatement}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          showToast('Marked all notifications as read');
        }}
        onDismiss={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
      />

      <TransactionDetailModal
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
        currencySymbol={currencySymbols[currency]}
      />
    </div>
  );
}
