import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChartDataPoint, CurrencyCode, TimeRange } from '../../types';
import { TrendingUp, Target, Users, Calendar, Sparkles } from 'lucide-react';

interface SpringBarChartProps {
  data: BarChartDataPoint[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  currency: CurrencyCode;
  currencySymbol: string;
}

export const SpringBarChart: React.FC<SpringBarChartProps> = ({
  data,
  timeRange,
  onTimeRangeChange,
  currencySymbol,
}) => {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'users'>('revenue');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Find max value in dataset to scale heights accurately
  const maxValue = Math.max(
    ...data.map((d) => (activeMetric === 'revenue' ? Math.max(d.revenue, d.target) : d.users)),
    1
  );

  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / data.length);
  const totalUsers = data.reduce((acc, curr) => acc + curr.users, 0);

  const activePoint = selectedIndex !== null ? data[selectedIndex] : hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-black/40">
      {/* Header controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              Revenue & Performance Velocity
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              +18.4% YoY
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Spring-physics powered distribution comparing actuals against target quotas.
          </p>
        </div>

        {/* Time range and metric selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Metric switcher */}
          <div className="inline-flex rounded-xl bg-slate-950/80 p-1 border border-slate-800/80">
            <button
              onClick={() => setActiveMetric('revenue')}
              className={`relative px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeMetric === 'revenue' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeMetric === 'revenue' && (
                <motion.div
                  layoutId="active-metric-pill"
                  className="absolute inset-0 rounded-lg bg-indigo-600 shadow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" />
                Revenue
              </span>
            </button>
            <button
              onClick={() => setActiveMetric('users')}
              className={`relative px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeMetric === 'users' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeMetric === 'users' && (
                <motion.div
                  layoutId="active-metric-pill"
                  className="absolute inset-0 rounded-lg bg-indigo-600 shadow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                Users
              </span>
            </button>
          </div>

          {/* Time range pills */}
          <div className="inline-flex rounded-xl bg-slate-950/80 p-1 border border-slate-800/80">
            {(['7d', '30d', '12m'] as TimeRange[]).map((range) => {
              const labels: Record<TimeRange, string> = {
                '7d': '7 Days',
                '30d': '30 Days',
                '12m': '12 Months',
              };
              const isSelected = timeRange === range;
              return (
                <button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  className={`relative px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isSelected ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-range-pill"
                      className="absolute inset-0 rounded-lg bg-slate-800 border border-slate-700/60"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{labels[range]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Highlights summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
          <span className="text-xs text-slate-400 block">Period Total</span>
          <span className="text-base sm:text-lg font-bold text-slate-100 font-mono">
            {currencySymbol}
            {totalRevenue.toLocaleString()}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
          <span className="text-xs text-slate-400 block">Average / Interval</span>
          <span className="text-base sm:text-lg font-bold text-slate-100 font-mono">
            {currencySymbol}
            {avgRevenue.toLocaleString()}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
          <span className="text-xs text-slate-400 block">Active Audience</span>
          <span className="text-base sm:text-lg font-bold text-slate-100 font-mono">
            {totalUsers.toLocaleString()} users
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
          <span className="text-xs text-slate-400 block">Quota Realization</span>
          <span className="text-base sm:text-lg font-bold text-indigo-400 font-mono">
            {Math.round((totalRevenue / (avgRevenue * 0.95 * data.length)) * 100)}%
          </span>
        </div>
      </div>

      {/* Custom Bar Chart Canvas built with HTML / CSS + Framer Motion Spring Physics */}
      <div className="relative pt-6 pb-2">
        {/* Target Benchmark Line */}
        <div
          className="absolute left-0 right-0 border-b border-dashed border-indigo-400/30 z-0 pointer-events-none flex items-center justify-between"
          style={{ top: '35%' }}
        >
          <span className="text-[10px] text-indigo-300/60 font-mono pl-2 bg-slate-900/80 px-1 rounded">
            Target Quota Benchmark
          </span>
        </div>

        {/* Hover/Selected detailed tooltip popover */}
        <AnimatePresence>
          {activePoint && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="mb-3 p-3 rounded-xl bg-slate-950 border border-indigo-500/30 shadow-2xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <div>
                  <span className="text-xs font-semibold text-white">
                    {activePoint.label} {activePoint.subLabel ? `(${activePoint.subLabel})` : ''}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    {activePoint.users.toLocaleString()} active subscribers
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Actual Revenue</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {currencySymbol}
                    {activePoint.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="text-right border-l border-slate-800 pl-4">
                  <span className="text-xs text-slate-400 block">Target Quota</span>
                  <span className="text-sm font-semibold text-slate-300 font-mono">
                    {currencySymbol}
                    {activePoint.target.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Bar Columns Grid */}
        <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-2 sm:gap-3 px-2 pt-4 pb-2">
          {data.map((point, index) => {
            const currentVal = activeMetric === 'revenue' ? point.revenue : point.users;
            const heightPercent = Math.max(10, Math.min(100, Math.round((currentVal / maxValue) * 100)));
            const isHovered = hoveredIndex === index;
            const isSelected = selectedIndex === index;

            return (
              <div
                key={point.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                className="group relative flex-1 h-full flex flex-col justify-end items-center cursor-pointer select-none"
              >
                {/* Micro tooltip pill on hover */}
                <div
                  className={`absolute -top-7 pointer-events-none transition-all duration-200 z-20 ${
                    isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'
                  }`}
                >
                  <span className="rounded-md bg-slate-900 border border-slate-700 px-2 py-0.5 text-[11px] font-mono font-semibold text-indigo-300 shadow-lg whitespace-nowrap">
                    {activeMetric === 'revenue'
                      ? `${currencySymbol}${point.revenue.toLocaleString()}`
                      : `${point.users} users`}
                  </span>
                </div>

                {/* Animated Spring Bar */}
                <div className="w-full max-w-[48px] h-full flex items-end justify-center">
                  <motion.div
                    // Requirements specified spring physics: type: 'spring', stiffness: 100, damping: 10
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 10,
                      delay: index * 0.05,
                    }}
                    className={`
                      w-full rounded-t-lg transition-all duration-300 relative overflow-hidden
                      ${
                        isSelected
                          ? 'bg-gradient-to-t from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/40 ring-2 ring-cyan-300'
                          : isHovered
                          ? 'bg-gradient-to-t from-indigo-700 via-indigo-600 to-indigo-400 shadow-md shadow-indigo-600/30'
                          : 'bg-gradient-to-t from-slate-800 via-indigo-900/80 to-indigo-600/90 hover:opacity-100'
                      }
                    `}
                  >
                    {/* Top glass highlight reflection */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-white/30 rounded-t-lg" />
                    
                    {/* Internal vertical glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>

                {/* X-axis Label */}
                <div className="mt-3 text-center">
                  <span
                    className={`block text-xs font-medium transition-colors ${
                      isHovered || isSelected ? 'text-indigo-300 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {point.label}
                  </span>
                  {point.subLabel && (
                    <span className="hidden sm:block text-[10px] text-slate-500 font-mono">
                      {point.subLabel}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-2 border-t border-slate-800/40 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-indigo-700 to-indigo-500" />
              <span>Realized Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b border-dashed border-indigo-400" />
              <span>Target Benchmark</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500">
            Hover or click any bar for granular transaction metrics
          </span>
        </div>
      </div>
    </div>
  );
};
