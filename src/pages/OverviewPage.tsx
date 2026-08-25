import React from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/ui/PageTransition';
import { MetricCard } from '../components/ui/MetricCard';
import { SpringBarChart } from '../components/ui/SpringBarChart';
import { StaggeredTransactionList } from '../components/ui/StaggeredTransactionList';
import { MetricData, BarChartDataPoint, Transaction, TimeRange, CurrencyCode } from '../types';
import { TrendingUp, Users, ShieldAlert, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface OverviewPageProps {
  metrics: MetricData[];
  chartData: BarChartDataPoint[];
  transactions: Transaction[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  currency: CurrencyCode;
  currencySymbol: string;
  onViewTransaction: (tx: Transaction) => void;
  onSimulateTx: () => void;
  onNavigateToRevenue: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  metrics,
  chartData,
  transactions,
  timeRange,
  onTimeRangeChange,
  currency,
  currencySymbol,
  onViewTransaction,
  onSimulateTx,
  onNavigateToRevenue,
}) => {
  return (
    <PageTransition pageKey="overview">
      <div className="space-y-6 sm:space-y-8">
        {/* Top KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} currencySymbol={currencySymbol} />
          ))}
        </div>

        {/* Main Spring Bar Chart Component */}
        <SpringBarChart
          data={chartData}
          timeRange={timeRange}
          onTimeRangeChange={onTimeRangeChange}
          currency={currency}
          currencySymbol={currencySymbol}
        />

        {/* Secondary Insights & Growth Funnel Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversion Funnel */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-black/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                <h3 className="text-base font-semibold text-white">Acquisition Funnel</h3>
                <span className="text-xs text-emerald-400 font-mono font-semibold">+22.4% conv</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Visitor to paying customer conversion flow this cycle.
              </p>

              <div className="space-y-3.5 mt-5">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">1. Landing Page Visits</span>
                    <span className="font-mono text-slate-200">42,800 (100%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">2. Account Creation</span>
                    <span className="font-mono text-slate-200">12,450 (29.1%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-[29.1%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">3. Product Activated</span>
                    <span className="font-mono text-slate-200">6,120 (14.3%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full w-[14.3%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">4. Paid Conversion</span>
                    <span className="font-mono text-emerald-400 font-semibold">2,840 (6.6%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[6.6%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/60">
              <Button
                variant="outline"
                size="sm"
                icon={ArrowUpRight}
                iconPosition="right"
                onClick={onNavigateToRevenue}
                className="w-full"
              >
                Inspect Cohort Breakdown
              </Button>
            </div>
          </div>

          {/* Staggered Transactions section takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <StaggeredTransactionList
              transactions={transactions}
              currencySymbol={currencySymbol}
              onViewDetails={onViewTransaction}
              onAddSimulatedTx={onSimulateTx}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
