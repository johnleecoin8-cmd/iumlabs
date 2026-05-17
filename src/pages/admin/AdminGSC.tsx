import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { BarChart3, TrendingUp, Eye, MousePointer, Hash, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MOCK_DAILY = [
  { date: '05/04', clicks: 42, impressions: 1820, ctr: 2.3, position: 18.4 },
  { date: '05/05', clicks: 38, impressions: 1650, ctr: 2.3, position: 17.9 },
  { date: '05/06', clicks: 55, impressions: 2100, ctr: 2.6, position: 16.2 },
  { date: '05/07', clicks: 61, impressions: 2340, ctr: 2.6, position: 15.8 },
  { date: '05/08', clicks: 48, impressions: 1980, ctr: 2.4, position: 16.5 },
  { date: '05/09', clicks: 33, impressions: 1420, ctr: 2.3, position: 17.1 },
  { date: '05/10', clicks: 29, impressions: 1180, ctr: 2.5, position: 17.8 },
  { date: '05/11', clicks: 52, impressions: 2050, ctr: 2.5, position: 16.0 },
  { date: '05/12', clicks: 67, impressions: 2580, ctr: 2.6, position: 15.2 },
  { date: '05/13', clicks: 73, impressions: 2890, ctr: 2.5, position: 14.8 },
  { date: '05/14', clicks: 58, impressions: 2200, ctr: 2.6, position: 15.5 },
  { date: '05/15', clicks: 45, impressions: 1750, ctr: 2.6, position: 16.3 },
  { date: '05/16', clicks: 31, impressions: 1350, ctr: 2.3, position: 17.0 },
  { date: '05/17', clicks: 28, impressions: 1100, ctr: 2.5, position: 17.5 },
];

const MOCK_QUERIES = [
  { query: 'korea crypto marketing agency', clicks: 89, impressions: 3200, ctr: 2.8, position: 8.2 },
  { query: 'korean kol marketing', clicks: 67, impressions: 2800, ctr: 2.4, position: 11.5 },
  { query: 'web3 marketing korea', clicks: 54, impressions: 1900, ctr: 2.8, position: 9.8 },
  { query: 'crypto kol agency korea', clicks: 43, impressions: 1600, ctr: 2.7, position: 12.3 },
  { query: 'naver seo crypto', clicks: 38, impressions: 1400, ctr: 2.7, position: 14.1 },
  { query: 'korea blockchain event', clicks: 31, impressions: 1200, ctr: 2.6, position: 16.7 },
  { query: 'upbit listing strategy', clicks: 28, impressions: 980, ctr: 2.9, position: 13.2 },
  { query: 'crypto community management korea', clicks: 24, impressions: 850, ctr: 2.8, position: 15.4 },
];

const MOCK_PAGES = [
  { page: '/', clicks: 142, impressions: 5800, ctr: 2.4, position: 12.1 },
  { page: '/services/gtm', clicks: 87, impressions: 3200, ctr: 2.7, position: 9.5 },
  { page: '/crypto-marketing-korea', clicks: 76, impressions: 2900, ctr: 2.6, position: 8.8 },
  { page: '/blog/how-to-launch-token-in-korea', clicks: 54, impressions: 2100, ctr: 2.6, position: 11.2 },
  { page: '/services/influencer', clicks: 48, impressions: 1800, ctr: 2.7, position: 13.4 },
  { page: '/kol-marketing-korea', clicks: 42, impressions: 1600, ctr: 2.6, position: 10.1 },
  { page: '/blog/korean-crypto-kol-marketing-guide', clicks: 35, impressions: 1300, ctr: 2.7, position: 14.8 },
  { page: '/projects', clicks: 28, impressions: 1100, ctr: 2.5, position: 18.3 },
];

const MOCK_ERRORS = [
  { url: '/blog/old-post-removed', type: 'Not found (404)', detected: '2026-05-15', status: 'Error' },
  { url: '/services/branding', type: 'Redirect (301)', detected: '2026-05-12', status: 'Warning' },
  { url: '/research/some-slug', type: 'Redirect (301)', detected: '2026-05-10', status: 'Warning' },
];

type Tab = 'overview' | 'queries' | 'pages' | 'errors';

export default function AdminGSC() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isConnected] = useState(false);

  const totalClicks = MOCK_DAILY.reduce((s, d) => s + d.clicks, 0);
  const totalImpressions = MOCK_DAILY.reduce((s, d) => s + d.impressions, 0);
  const avgCTR = (totalClicks / totalImpressions * 100).toFixed(1);
  const avgPosition = (MOCK_DAILY.reduce((s, d) => s + d.position, 0) / MOCK_DAILY.length).toFixed(1);

  const stats = [
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: MousePointer, color: '#4285f4', delta: '+12%' },
    { label: 'Total Impressions', value: totalImpressions.toLocaleString(), icon: Eye, color: '#a855f7', delta: '+8%' },
    { label: 'Avg CTR', value: `${avgCTR}%`, icon: TrendingUp, color: '#22c55e', delta: '+0.3%' },
    { label: 'Avg Position', value: avgPosition, icon: Hash, color: '#f59e0b', delta: '-1.2' },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'queries', label: 'Top Queries' },
    { id: 'pages', label: 'Top Pages' },
    { id: 'errors', label: 'Crawl Errors' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs">
        <p className="text-white/60 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary" />
                Search Console
              </h1>
              <p className="text-white/50 mt-1">Google Search performance for iumlabs.io</p>
            </div>
            <div className="flex items-center gap-3">
              {!isConnected && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-500 text-xs">Demo data. Connect GSC API for live data.</span>
                </div>
              )}
              <a
                href="https://search.google.com/search-console?resource_id=sc-domain:iumlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm hover:text-white hover:border-white/20 transition-colors"
              >
                Open GSC <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Button variant="ghost" size="sm" className="text-white/40 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  <span className="text-xs font-medium" style={{ color: stat.color }}>{stat.delta}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/40 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mb-6 bg-[#111] border border-white/10 rounded-lg p-1 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Clicks & Impressions (14 days)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={MOCK_DAILY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area yAxisId="right" type="monotone" dataKey="impressions" stroke="#a855f7" fill="#a855f720" name="Impressions" />
                    <Area yAxisId="left" type="monotone" dataKey="clicks" stroke="#4285f4" fill="#4285f420" name="Clicks" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">CTR & Position (14 days)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={MOCK_DAILY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} domain={[0, 5]} />
                    <YAxis yAxisId="right" orientation="right" reversed tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} domain={[10, 25]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area yAxisId="left" type="monotone" dataKey="ctr" stroke="#22c55e" fill="#22c55e20" name="CTR %" />
                    <Area yAxisId="right" type="monotone" dataKey="position" stroke="#f59e0b" fill="#f59e0b20" name="Avg Position" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'queries' && (
            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-semibold">Top Search Queries (14 days)</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Query</th>
                    <th className="text-right px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Clicks</th>
                    <th className="text-right px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Impressions</th>
                    <th className="text-right px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">CTR</th>
                    <th className="text-right px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_QUERIES.map((q) => (
                    <tr key={q.query} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-white text-sm">{q.query}</td>
                      <td className="px-4 py-3 text-right text-blue-400 text-sm font-medium">{q.clicks}</td>
                      <td className="px-4 py-3 text-right text-purple-400 text-sm">{q.impressions.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-green-400 text-sm">{q.ctr}%</td>
                      <td className="px-4 py-3 text-right text-amber-400 text-sm">{q.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Clicks by Page</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={MOCK_PAGES} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} />
                    <YAxis type="category" dataKey="page" width={250} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="clicks" fill="#4285f4" radius={[0, 4, 4, 0]} name="Clicks" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-white font-semibold">Top Pages (14 days)</h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Page</th>
                      <th className="text-right px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Clicks</th>
                      <th className="text-right px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Impressions</th>
                      <th className="text-right px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">CTR</th>
                      <th className="text-right px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_PAGES.map((p) => (
                      <tr key={p.page} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 text-white text-sm font-mono">{p.page}</td>
                        <td className="px-4 py-3 text-right text-blue-400 text-sm font-medium">{p.clicks}</td>
                        <td className="px-4 py-3 text-right text-purple-400 text-sm">{p.impressions.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-green-400 text-sm">{p.ctr}%</td>
                        <td className="px-4 py-3 text-right text-amber-400 text-sm">{p.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'errors' && (
            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white font-semibold">Crawl & Index Errors</h3>
                <span className="text-xs text-white/40">Last checked: 2026-05-18</span>
              </div>
              {MOCK_ERRORS.length === 0 ? (
                <div className="p-8 text-center text-white/30">No crawl errors detected.</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">URL</th>
                      <th className="text-left px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Type</th>
                      <th className="text-left px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Detected</th>
                      <th className="text-left px-4 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ERRORS.map((e) => (
                      <tr key={e.url} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 text-white text-sm font-mono">{e.url}</td>
                        <td className="px-4 py-3 text-white/60 text-sm">{e.type}</td>
                        <td className="px-4 py-3 text-white/40 text-sm">{e.detected}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                            e.status === 'Error' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
                <p className="text-xs text-white/30">
                  Connect the Google Search Console API to see live crawl and indexing errors.
                  Requires a service account with Search Console API access for sc-domain:iumlabs.io
                </p>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
