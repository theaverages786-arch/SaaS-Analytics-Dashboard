import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, CurrencyCode } from '../../types';
import { X, CheckCircle2, Clock, RotateCcw, AlertCircle, FileText, Download, Mail, ExternalLink, ShieldCheck, CreditCard } from 'lucide-react';
import { Button } from './Button';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  currencySymbol: string;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  currencySymbol,
}) => {
  if (!transaction) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl z-10 overflow-hidden"
        >
          {/* Top glow accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-4 pb-5 border-b border-slate-800">
            <img
              src={transaction.customerAvatar}
              alt={transaction.customerName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{transaction.customerName}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                  {transaction.plan}
                </span>
              </div>
              <p className="text-xs text-slate-400">{transaction.customerEmail}</p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500 font-mono">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Subscription Member</span>
              </div>
            </div>
          </div>

          {/* Amount Card */}
          <div className="my-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Total Billed Amount</span>
              <span className="text-2xl font-bold text-white font-mono">
                {currencySymbol}
                {transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Billing Status</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold capitalize text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {transaction.status}
              </span>
            </div>
          </div>

          {/* Detailed Metadata Grid */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Invoice Identifier</span>
              <span className="font-mono text-slate-200 font-medium">{transaction.invoiceNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Payment Instrument</span>
              <span className="text-slate-200 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                {transaction.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Processing Timestamp</span>
              <span className="text-slate-200">{transaction.date} ({transaction.timeAgo})</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Tax Breakdown (VAT/Sales)</span>
              <span className="font-mono text-slate-200">{currencySymbol}{(transaction.amount * 0.08).toFixed(2)} (included)</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              icon={Mail}
              iconPosition="left"
              onClick={() => alert(`Receipt resent to ${transaction.customerEmail}`)}
            >
              Resend Receipt
            </Button>
            <Button
              variant="glow"
              size="sm"
              icon={Download}
              iconPosition="right"
              onClick={() => alert(`Downloading PDF invoice ${transaction.invoiceNumber}...`)}
            >
              Download PDF
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
