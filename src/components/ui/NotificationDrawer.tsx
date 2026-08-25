import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NotificationItem } from '../../types';
import { Bell, CheckCheck, TrendingUp, DollarSign, ShieldAlert, Sparkles, X } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onDismiss: (id: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onDismiss,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'growth':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-indigo-400" />;
      case 'alert':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Drawer panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Activity Feed</h3>
                    <p className="text-xs text-slate-400">
                      {unreadCount} unread system notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between py-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Live Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllRead}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification item list */}
              <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 rounded-xl bg-slate-950/40">
                    All caught up! No notifications.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3.5 rounded-xl border transition-all ${
                        item.read
                          ? 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                          : 'bg-slate-800/60 border-indigo-500/30 text-slate-200 shadow-md shadow-indigo-950/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            {getIcon(item.type)}
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                            <p className="text-xs text-slate-300 mt-0.5">{item.message}</p>
                            <span className="text-[10px] text-slate-500 mt-1.5 block font-mono">
                              {item.timestamp}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onDismiss(item.id)}
                          className="text-slate-500 hover:text-slate-300 p-1 text-xs"
                          title="Dismiss"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800/80 text-center">
              <span className="text-[11px] text-slate-500">
                Connected to SaaS Webhook Realtime Stream
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
