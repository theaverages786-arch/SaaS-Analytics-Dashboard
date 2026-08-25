import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/ui/PageTransition';
import { AppSettings } from '../types';
import {
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  Globe,
  Bell,
  Shield,
  Save,
  Send,
  Sparkles,
  Building,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface SettingsPageProps {
  settings: AppSettings;
  onSaveSettings: (newSettings: AppSettings) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(formData.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleTestWebhook = () => {
    setIsTestingWebhook(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTestingWebhook(false);
      setTestResult('HTTP 200 OK — Test webhook payload delivered in 48ms.');
      setTimeout(() => setTestResult(null), 4000);
    }, 900);
  };

  const handleGenerateNewKey = () => {
    const randomHex = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setFormData((prev) => ({ ...prev, apiKey: `pm_live_sk_${randomHex}` }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <PageTransition pageKey="settings">
      <form onSubmit={handleSave} className="space-y-6 sm:space-y-8 max-w-5xl">
        {/* Header summary banner */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl shadow-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Organization & Developer Settings
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configure webhook event endpoints, API credentials, and reporting alerts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs text-emerald-400 flex items-center gap-1 font-medium"
              >
                <Check className="w-4 h-4" />
                Preferences Saved
              </motion.span>
            )}
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              iconPosition="right"
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Organization Profile */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl shadow-black/40 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/60">
              <Building className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm sm:text-base font-semibold text-white">Organization Profile</h3>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Organization Display Name
              </label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Finance & Billing Email
              </label>
              <input
                type="email"
                value={formData.billingEmail}
                onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Default Reporting Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="America/New_York (EST)">America/New_York (EST - UTC-5)</option>
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST - UTC-8)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT - UTC+0)</option>
                <option value="Europe/Berlin (CET)">Europe/Berlin (CET - UTC+1)</option>
                <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST - UTC+9)</option>
              </select>
            </div>
          </div>

          {/* API Keys & Developer Access */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl shadow-black/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm sm:text-base font-semibold text-white">Live API Secret Key</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Production
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Restricted Secret Key
              </label>
              <div className="relative flex items-center">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  readOnly
                  value={formData.apiKey}
                  className="w-full pl-3.5 pr-20 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                    title="Copy Key"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">Created Oct 2026 • Never expires</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={RefreshCw}
                iconPosition="left"
                onClick={handleGenerateNewKey}
              >
                Roll Key
              </Button>
            </div>
          </div>

          {/* Webhooks & Integration endpoints */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl shadow-black/40 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/60">
              <Globe className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm sm:text-base font-semibold text-white">Webhook Endpoints</h3>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                HTTP Webhook Target URL
              </label>
              <input
                type="url"
                value={formData.webhookUrl}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">Subscribed to all 14 checkout & refund events</span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                icon={Send}
                iconPosition="right"
                isLoading={isTestingWebhook}
                onClick={handleTestWebhook}
              >
                Send Test Ping
              </Button>
            </div>

            {testResult && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono text-emerald-300"
              >
                {testResult}
              </motion.div>
            )}
          </div>

          {/* Notification Automations */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl shadow-black/40 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/60">
              <Bell className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm sm:text-base font-semibold text-white">Alert Automations</h3>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Slack Deal Alert Bot</span>
                  <span className="text-[11px] text-slate-400">Post &gt;$1,000 upgrades to #revenue-feed</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.slackAlerts}
                  onChange={(e) => setFormData({ ...formData, slackAlerts: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Automated Receipt Delivery</span>
                  <span className="text-[11px] text-slate-400">Dispatch tax-compliant PDF invoices</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoInvoicing}
                  onChange={(e) => setFormData({ ...formData, autoInvoicing: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </PageTransition>
  );
};
