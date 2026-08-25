import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/ui/PageTransition';
import { RevenueStream, CohortMonth, Transaction, CurrencyCode } from '../types';
import {
  DollarSign,
  TrendingUp,
  Sliders,
  Sparkles,
  PieChart,
  ShieldCheck,
  Download,
  ArrowUpRight,
  RefreshCw,
  Calculator,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface RevenuePageProps {
  revenueStreams: RevenueStream[];
  cohortData: CohortMonth[];
  transactions: Transaction[];
  currency: CurrencyCode;
  currencySymbol: string;
  onExport: () => void;
}

export const RevenuePage: React.FC<RevenuePageProps> = ({
  revenueStreams,
  cohortData,
  transactions,
  currencySymbol,
  onExport,
}) => {
  // Interactive Simulator State
  const [baseMRR, setBaseMRR] = useState(142000);
  const [growthRate, setGrowthRate] = useState(12); // monthly growth %
  const [targetChurn, setTargetChurn] = useState(1.2); // target churn %
  const [expansionRate, setExpansionRate] = useState(4.5); // expansion %

  // Projected calculation
  const netMonthlyGrowth = (growthRate + expansionRate - targetChurn) / 100;
  const projected12MonthMRR = Math.round(baseMRR * Math.pow(1 + netMonthlyGrowth, 12));
  const projectedARR = projected12MonthMRR * 12;

  const totalMonthlyRevenue = revenueStreams.reduce((acc, s) => acc + s.amount, 0);

  const getHeatmapColor = (value: number) => {
    if (value >= 95) return 'bg-emerald-500/80 text-white font-bold';
    if (value >= 90) return 'bg-emerald-600/60 text-emerald-100';
    if (value >= 85) return 'bg-indigo-600/60 text-indigo-100';
    if (value >= 80) return 'bg-indigo-700/50 text-indigo-200';
    return 'bg-slate-800 text-slate-400';
  };

  return (
    <PageTransition pageKey="revenue">
      <div className="space-y-6 sm:space-y-8">
        {/* Top Financial Overview Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl shadow-black/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/60">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Revenue Architecture & Stream Diversification
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                  ARR $1.71M
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Granular revenue attribution across tier segments, billing cadence, and retention cohorts.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                iconPosition="right"
                onClick={onExport}
              >
                Download Statement
              </Button>
              <Button
                variant="glow"
                size="sm"
                icon={Sparkles}
                iconPosition="left"
                onClick={() => {
                  setGrowthRate(15);
                  setTargetChurn(0.9);
                }}
              >
                Optimize Projections
              </Button>
            </div>
          </div>

          {/* Revenue Streams breakdown with custom spring animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {revenueStreams.map((stream, idx) => (
              <motion.div
                key={stream.category}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: idx * 0.08 }}
                className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/70 hover:border-indigo-500/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{stream.category}</span>
                  <span className="text-xs text-emerald-400 font-semibold font-mono">
                    +{stream.growth}%
                  </span>
                </div>
                <div className="mt-2 text-xl font-bold text-white font-mono">
                  {currencySymbol}
                  {stream.amount.toLocaleString()}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Contribution</span>
                    <span className="font-mono">{stream.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stream.percentage}%` }}
                      transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.1 + idx * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: stream.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2-Column: Cohort Retention Heatmap + Interactive Financial Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cohort Matrix (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-black/40">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Customer Retention & Cohort Heatmap
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Percentage of subscribers retained across subsequent billing months.
                </p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                89% 6M Ret.
              </span>
            </div>

            {/* Matrix Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="py-2.5 pr-4 font-medium">Cohort</th>
                    <th className="px-2 py-2.5 text-center font-mono">Month 0</th>
                    <th className="px-2 py-2.5 text-center font-mono">Month 1</th>
                    <th className="px-2 py-2.5 text-center font-mono">Month 2</th>
                    <th className="px-2 py-2.5 text-center font-mono">Month 3</th>
                    <th className="px-2 py-2.5 text-center font-mono">Month 4</th>
                    <th className="px-2 py-2.5 text-center font-mono">Month 5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 font-mono">
                  {cohortData.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 pr-4 font-sans text-slate-200 font-medium whitespace-nowrap">
                        {row.month}
                      </td>
                      <td className="p-1 text-center">
                        <span className={`inline-block w-full py-1.5 rounded-md ${getHeatmapColor(row.m0)}`}>
                          {row.m0}%
                        </span>
                      </td>
                      <td className="p-1 text-center">
                        <span className={`inline-block w-full py-1.5 rounded-md ${getHeatmapColor(row.m1)}`}>
                          {row.m1}%
                        </span>
                      </td>
                      <td className="p-1 text-center">
                        <span className={`inline-block w-full py-1.5 rounded-md ${getHeatmapColor(row.m2)}`}>
                          {row.m2}%
                        </span>
                      </td>
                      <td className="p-1 text-center">
                        <span className={`inline-block w-full py-1.5 rounded-md ${getHeatmapColor(row.m3)}`}>
                          {row.m3}%
                        </span>
                      </td>
                      <td className="p-1 text-center">
                        <span className={`inline-block w-full py-1.5 rounded-md ${getHeatmapColor(row.m4)}`}>
                          {row.m4}%
                        </span>
                      </td>
                      <td className="p-1 text-center">
                        <span className={`inline-block w-full py-1.5 rounded-md ${getHeatmapColor(row.m5)}`}>
                          {row.m5}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-800/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Industry Top Quartile (&gt;85% retention)
              </span>
              <span>Updated in real-time</span>
            </div>
          </div>

          {/* Interactive Simulation Sandbox (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-black/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-base font-semibold text-white">ARR Growth Simulator</h3>
                </div>
                <span className="text-xs text-indigo-400 font-mono">Dynamic Model</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Adjust key levers to project 12-month Annual Run Rate trajectories.
              </p>

              {/* Sliders */}
              <div className="space-y-4 mt-5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Monthly Net Organic Growth</span>
                    <span className="font-mono text-indigo-300 font-semibold">{growthRate}%/mo</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={25}
                    step={0.5}
                    value={growthRate}
                    onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Account Expansion Rate</span>
                    <span className="font-mono text-cyan-300 font-semibold">{expansionRate}%/mo</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={expansionRate}
                    onChange={(e) => setExpansionRate(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Target Monthly Churn</span>
                    <span className="font-mono text-rose-300 font-semibold">{targetChurn}%/mo</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={5.0}
                    step={0.1}
                    value={targetChurn}
                    onChange={(e) => setTargetChurn(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projected Outcome Card */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30">
              <span className="text-xs text-slate-400 block">Projected 12-Month ARR Target</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                  {currencySymbol}
                  {(projectedARR / 1000000).toFixed(2)}M
                </span>
                <span className="text-xs text-indigo-300 font-mono font-medium">
                  {currencySymbol}
                  {projected12MonthMRR.toLocaleString()}/mo MRR
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Simulates compounding net growth of {(netMonthlyGrowth * 100).toFixed(1)}% monthly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
