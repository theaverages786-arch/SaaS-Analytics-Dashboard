import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, CurrencyCode } from '../../types';
import { Search, Filter, ArrowUpRight, CheckCircle2, Clock, RotateCcw, AlertCircle, Eye, Download, Plus } from 'lucide-react';
import { Button } from './Button';

interface StaggeredTransactionListProps {
  transactions: Transaction[];
  currencySymbol: string;
  onViewDetails: (tx: Transaction) => void;
  onAddSimulatedTx?: () => void;
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 14,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

export const StaggeredTransactionList: React.FC<StaggeredTransactionListProps> = ({
  transactions,
  currencySymbol,
  onViewDetails,
  onAddSimulatedTx,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'refunded'>('all');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.plan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            Settled
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'refunded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <RotateCcw className="w-3 h-3" />
            Refunded
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertCircle className="w-3 h-3" />
            Failed
          </span>
        );
    }
  };

  const getPlanBadge = (plan: Transaction['plan']) => {
    const colorMap: Record<Transaction['plan'], string> = {
      Starter: 'bg-slate-800 text-slate-300 border-slate-700',
      Pro: 'bg-indigo-950/60 text-indigo-300 border-indigo-700/50',
      Scale: 'bg-cyan-950/60 text-cyan-300 border-cyan-700/50',
      Enterprise: 'bg-purple-950/60 text-purple-300 border-purple-700/50',
      'Team Add-on': 'bg-amber-950/60 text-amber-300 border-amber-700/50',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${colorMap[plan]}`}>
        {plan}
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-black/40">
      {/* Header and Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              Recent Transactions & Billing Ledger
            </h3>
            <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20 font-mono">
              {filteredTransactions.length} events
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Staggered real-time stream of subscription checkouts, upgrades, and billing events.
          </p>
        </div>

        {/* Action button */}
        {onAddSimulatedTx && (
          <Button
            size="sm"
            variant="outline"
            icon={Plus}
            iconPosition="left"
            onClick={onAddSimulatedTx}
            className="self-start sm:self-auto"
          >
            Simulate Inflow
          </Button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, email, plan or invoice ID..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
          {(['all', 'completed', 'pending', 'refunded'] as const).map((status) => {
            const isSelected = statusFilter === status;
            const labels = {
              all: 'All',
              completed: 'Settled',
              pending: 'Pending',
              refunded: 'Refunded',
            };
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`relative px-3 py-1 text-xs font-medium rounded-lg capitalize whitespace-nowrap cursor-pointer transition-colors ${
                  isSelected ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="tx-filter-pill"
                    className="absolute inset-0 rounded-lg bg-slate-800 border border-slate-700/60"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{labels[status]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Staggered Animated Transaction List */}
      <div className="space-y-2.5 mt-2">
        <AnimatePresence mode="popLayout">
          {filteredTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-400"
            >
              <Filter className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-medium text-slate-300">No transactions match your search filter</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for a different keyword or resetting status</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${statusFilter}-${searchQuery}`}
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              {filteredTransactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.008, backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                  onClick={() => onViewDetails(tx)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-950/50 border border-slate-800/70 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer gap-3 sm:gap-4 shadow-sm"
                >
                  {/* Left: Avatar & Customer info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={tx.customerAvatar}
                      alt={tx.customerName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-indigo-500/50 transition-all"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                          {tx.customerName}
                        </span>
                        {getPlanBadge(tx.plan)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="truncate">{tx.customerEmail}</span>
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-[11px] text-slate-500">{tx.invoiceNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount, Status, Timestamp & Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 border-t sm:border-t-0 border-slate-800/40 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="text-sm sm:text-base font-bold text-white font-mono block">
                        {tx.status === 'refunded' ? '-' : '+'}
                        {currencySymbol}
                        {tx.amount.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{tx.timeAgo}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(tx.status)}
                      <div className="p-1.5 rounded-lg text-slate-500 group-hover:text-slate-200 group-hover:bg-slate-800/80 transition-all">
                        <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
