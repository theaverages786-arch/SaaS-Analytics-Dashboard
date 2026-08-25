import React from 'react';
import { motion } from 'motion/react';
import { NavTab } from '../../types';
import { LayoutDashboard, DollarSign, Settings, Layers, ChevronRight, Activity, Zap, Shield, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
}) => {
  const navItems: { id: NavTab; label: string; icon: any; description: string; badge?: string }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Key KPIs, velocity charts & events',
    },
    {
      id: 'revenue',
      label: 'Revenue & Growth',
      icon: DollarSign,
      description: 'Cohorts, ARR projections & simulator',
      badge: 'Live',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'API keys, webhooks & preferences',
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 bottom-0 z-30 flex flex-col justify-between
        bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64 sm:w-72'}
      `}
    >
      <div>
        {/* Logo & Brand Header */}
        <div className="h-18 flex items-center justify-between px-5 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-600/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white text-base tracking-tight font-mono">
                    PulseMetrics
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                    PRO
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block truncate">
                  Enterprise Analytics
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Workspace Switcher */}
        {!collapsed && (
          <div className="p-4 border-b border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-xs font-bold text-indigo-300">
                  AC
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-white block truncate">
                    Acme SaaS Global
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Production Pod
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </div>
          </div>
        )}

        {/* Navigation Item Links */}
        <nav className="p-3 space-y-1.5">
          {!collapsed && (
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
              Platform Views
            </span>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`
                  relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium text-xs sm:text-sm cursor-pointer
                  transition-all duration-200 group select-none
                  ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }
                  ${collapsed ? 'justify-center px-0' : ''}
                `}
              >
                {/* Active Sliding Pill Highlight */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/90 to-indigo-700/90 shadow-md shadow-indigo-600/30 border border-indigo-400/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className={`relative z-10 p-1 rounded-lg ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`}>
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>

                {!collapsed && (
                  <div className="relative z-10 flex-1 flex items-center justify-between min-w-0">
                    <div>
                      <span className="block font-medium truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info / User & Plan */}
      <div className="p-3 border-t border-slate-800/60 space-y-3">
        {!collapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Scale Quota
              </span>
              <span className="text-[11px] font-mono text-indigo-300">84%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-[84%]" />
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              1.2M API events / 1.5M monthly limit
            </span>
          </div>
        )}

        {/* User profile */}
        <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Dev Admin"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700"
            referrerPolicy="no-referrer"
          />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-white block truncate">
                Sarah Jenkins
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                Lead Ops Admin
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
