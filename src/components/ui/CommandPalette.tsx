import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab, Transaction } from '../../types';
import { Search, LayoutDashboard, DollarSign, Settings, Download, Plus, ArrowRight, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
  onSimulateTx: () => void;
  onExport: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSimulateTx,
  onExport,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'nav-overview',
      title: 'Navigate to Overview Dashboard',
      subtitle: 'Key metrics, spring bar chart, recent transactions',
      icon: LayoutDashboard,
      run: () => {
        onNavigate('overview');
        onClose();
      },
    },
    {
      id: 'nav-revenue',
      title: 'Navigate to Revenue & Financials',
      subtitle: 'Cohort retention matrix, ARR models & simulator',
      icon: DollarSign,
      run: () => {
        onNavigate('revenue');
        onClose();
      },
    },
    {
      id: 'nav-settings',
      title: 'Navigate to Settings & API Config',
      subtitle: 'API keys, webhook endpoints, billing settings',
      icon: Settings,
      run: () => {
        onNavigate('settings');
        onClose();
      },
    },
    {
      id: 'action-simulate',
      title: 'Simulate Live Inflow Event',
      subtitle: 'Inject a new enterprise subscription checkout',
      icon: Plus,
      run: () => {
        onSimulateTx();
        onClose();
      },
    },
    {
      id: 'action-export',
      title: 'Export Financial Ledger (CSV / PDF)',
      subtitle: 'Download complete statement report',
      icon: Download,
      run: () => {
        onExport();
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden z-10"
        >
          {/* Search bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
            <Search className="w-5 h-5 text-indigo-400" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or jump to page..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Action List */}
          <div className="p-2 max-h-80 overflow-y-auto space-y-1">
            {filteredActions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No commands matching "{query}"
              </div>
            ) : (
              filteredActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.run}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 text-left text-slate-200 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-indigo-600 text-slate-300 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {action.title}
                        </div>
                        <div className="text-[11px] text-slate-400">{action.subtitle}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer quick tips */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 text-[11px] text-slate-500">
            <span>Use ↑↓ to navigate</span>
            <span>Press ↵ to select</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
