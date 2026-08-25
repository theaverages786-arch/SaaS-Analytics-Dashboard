import React from 'react';
import { motion } from 'motion/react';
import { CurrencyCode, TimeRange } from '../../types';
import { Search, Bell, Download, RefreshCw, Radio, Menu, Globe, DollarSign, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onOpenCommand: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
  onExport: () => void;
  onToggleSidebar: () => void;
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommand,
  onOpenNotifications,
  unreadCount,
  currency,
  onCurrencyChange,
  isStreaming,
  onToggleStreaming,
  onExport,
  onToggleSidebar,
  title,
  subtitle,
}) => {
  return (
    <header className="sticky top-0 z-20 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left title & mobile menu toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Command Search button */}
        <button
          onClick={onOpenCommand}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Quick find...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-950 text-slate-400 rounded border border-slate-800">
            ⌘K
          </kbd>
        </button>

        {/* Currency Switcher */}
        <div className="flex items-center rounded-xl bg-slate-900/90 p-0.5 border border-slate-800 text-xs">
          {(['USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => onCurrencyChange(c)}
              className={`px-2 py-1 rounded-lg font-mono font-medium transition-colors cursor-pointer ${
                currency === c
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {c === 'USD' ? '$ USD' : c === 'EUR' ? '€ EUR' : '£ GBP'}
            </button>
          ))}
        </div>

        {/* Live Stream Pulse Toggle */}
        <button
          onClick={onToggleStreaming}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
            isStreaming
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
          title="Toggle live simulated data stream"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isStreaming ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
            }`}
          />
          <span className="hidden lg:inline">{isStreaming ? 'Live Syncing' : 'Stream Paused'}</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          title="Activity notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-slate-950 font-mono">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Export Button with complex sweep hover state */}
        <Button
          variant="primary"
          size="sm"
          icon={Download}
          iconPosition="right"
          onClick={onExport}
          className="hidden sm:inline-flex"
        >
          Export
        </Button>
      </div>
    </header>
  );
};
