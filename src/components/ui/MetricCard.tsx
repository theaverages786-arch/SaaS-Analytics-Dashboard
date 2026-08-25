import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, CreditCard, Sparkles } from 'lucide-react';
import { MetricData } from '../../types';

interface MetricCardProps {
  metric: MetricData;
  currencySymbol: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, currencySymbol }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-indigo-400" />;
      case 'Users':
        return <Users className="w-4 h-4 text-cyan-400" />;
      case 'DollarSign':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-purple-400" />;
      default:
        return <CreditCard className="w-4 h-4 text-indigo-400" />;
    }
  };

  const isPositive = metric.change >= 0;

  // Generate SVG path for the mini sparkline
  const maxH = Math.max(...metric.history, 1);
  const minH = Math.min(...metric.history, 0);
  const range = maxH - minH || 1;
  const width = 110;
  const height = 36;
  const points = metric.history
    .map((val, idx) => {
      const x = (idx / (metric.history.length - 1)) * width;
      const y = height - ((val - minH) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-xl shadow-lg shadow-black/20 hover:border-slate-700/80 transition-all duration-300 overflow-hidden"
    >
      {/* Background glow orb */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-600/10 blur-2xl group-hover:bg-indigo-500/15 transition-all" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{metric.title}</span>
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
          {getIcon(metric.iconName)}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono"
        >
          {metric.formattedValue.startsWith('$')
            ? `${currencySymbol}${metric.formattedValue.slice(1)}`
            : metric.formattedValue}
        </motion.span>

        {/* Delta badge */}
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isPositive
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>
            {isPositive ? '+' : ''}
            {metric.change}%
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-slate-800/50 pt-3">
        <span className="text-[11px] text-slate-500">{metric.timeframe}</span>

        {/* Mini Sparkline Chart */}
        <div className="w-24 h-8">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={`grad-${metric.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.4" />
                <stop offset="100%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              fill={`url(#grad-${metric.id})`}
              points={`0,${height} ${points} ${width},${height}`}
            />
            <polyline
              fill="none"
              stroke={isPositive ? '#10b981' : '#f43f5e'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
