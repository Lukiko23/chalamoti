'use client';

import { useState, useEffect } from 'react';
import { getAllVisits, getVisitStats, type VisitRecord, type VisitStats } from '@/lib/storage';

const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export default function VisitesPage() {
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [stats, setStats] = useState<VisitStats>({ today: 0, week: 0, month: 0, dailyCounts: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const [v, s] = await Promise.all([getAllVisits(), getVisitStats()]);
      setVisits(v);
      setStats(s);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-wine/20 border-t-wine rounded-full animate-spin" />
      </div>
    );
  }

  // Group by IP for unique visitors table
  const visitorMap: Record<string, { ip: string; city: string; country: string; region: string; visitCount: number; lastVisit: string; firstVisit: string }> = {};
  visits.forEach(v => {
    if (!v.ip) return;
    if (!visitorMap[v.ip]) {
      visitorMap[v.ip] = {
        ip: v.ip,
        city: v.city || '',
        country: v.country || '',
        region: v.region || '',
        visitCount: 0,
        lastVisit: v.timestamp || v.date,
        firstVisit: v.timestamp || v.date,
      };
    }
    visitorMap[v.ip].visitCount++;
    if ((v.timestamp || v.date) > visitorMap[v.ip].lastVisit) {
      visitorMap[v.ip].lastVisit = v.timestamp || v.date;
    }
    if ((v.timestamp || v.date) < visitorMap[v.ip].firstVisit) {
      visitorMap[v.ip].firstVisit = v.timestamp || v.date;
    }
    // Update location if available
    if (v.city && !visitorMap[v.ip].city) {
      visitorMap[v.ip].city = v.city;
      visitorMap[v.ip].country = v.country || '';
      visitorMap[v.ip].region = v.region || '';
    }
  });

  const uniqueVisitors = Object.values(visitorMap).sort(
    (a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
  );

  const filtered = uniqueVisitors.filter(v =>
    `${v.ip} ${v.city} ${v.country} ${v.region}`.toLowerCase().includes(search.toLowerCase())
  );

  const maxVisits = Math.max(...stats.dailyCounts.map(d => d.count), 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-1">Visites</h2>
        <p className="text-charcoal/50 text-sm">Suivi des visiteurs uniques de votre site</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-cream p-5">
          <p className="text-xs text-charcoal/40 mb-1">Aujourd&apos;hui</p>
          <p className="text-3xl font-serif font-bold text-wine">{stats.today}</p>
          <p className="text-xs text-charcoal/40 mt-1">visiteurs uniques</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream p-5">
          <p className="text-xs text-charcoal/40 mb-1">Cette semaine</p>
          <p className="text-3xl font-serif font-bold text-charcoal">{stats.week}</p>
          <p className="text-xs text-charcoal/40 mt-1">visiteurs uniques</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream p-5">
          <p className="text-xs text-charcoal/40 mb-1">Ce mois</p>
          <p className="text-3xl font-serif font-bold text-charcoal">{stats.month}</p>
          <p className="text-xs text-charcoal/40 mt-1">visiteurs uniques</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream p-5">
          <p className="text-xs text-charcoal/40 mb-1">IPs uniques</p>
          <p className="text-3xl font-serif font-bold text-charcoal">{uniqueVisitors.length}</p>
          <p className="text-xs text-charcoal/40 mt-1">total</p>
        </div>
      </div>

      {/* Recurring Visitors Widget */}
      {(() => {
        const recurring = uniqueVisitors.filter(v => v.visitCount > 1).sort((a, b) => b.visitCount - a.visitCount);
        return (
          <div className="bg-white rounded-2xl border border-cream p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-charcoal">Visiteurs r&eacute;currents</h3>
                <p className="text-xs text-charcoal/40">{recurring.length} visiteur{recurring.length !== 1 ? 's' : ''} avec plusieurs visites</p>
              </div>
            </div>
            {recurring.length === 0 ? (
              <p className="text-sm text-charcoal/40 italic py-4 text-center">Aucun visiteur r&eacute;current pour le moment</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recurring.slice(0, 10).map(v => (
                  <div key={v.ip} className="flex items-center justify-between px-4 py-3 rounded-xl bg-cream/30 hover:bg-cream/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-wine/10 text-wine flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0v.243" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-mono font-medium text-charcoal">{v.ip}</p>
                        {v.city || v.country ? (
                          <p className="text-xs text-charcoal/40">{[v.city, v.region, v.country].filter(Boolean).join(', ')}</p>
                        ) : (
                          <p className="text-xs text-charcoal/30 italic">Localisation inconnue</p>
                        )}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-wine/10 text-wine">
                      {v.visitCount} visites
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* Line Chart */}
      <div className="bg-white rounded-2xl border border-cream p-6">
        <h3 className="text-lg font-serif font-bold text-charcoal mb-1">Visites - 7 derniers jours</h3>
        <p className="text-xs text-charcoal/40 mb-6">Visiteurs uniques par jour</p>
        {(() => {
          const data = stats.dailyCounts;
          const chartW = 600;
          const chartH = 220;
          const padX = 40;
          const padY = 20;
          const w = chartW - padX * 2;
          const h = chartH - padY * 2;

          const points = data.map((d, i) => ({
            x: padX + (data.length > 1 ? (i / (data.length - 1)) * w : w / 2),
            y: padY + h - (d.count / maxVisits) * h,
            count: d.count,
            day: dayLabels[new Date(d.date + 'T12:00:00').getDay()],
            date: d.date,
          }));

          const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
          const areaPath = linePath + ` L${points[points.length - 1]?.x ?? 0},${padY + h} L${points[0]?.x ?? 0},${padY + h} Z`;

          return (
            <svg viewBox={`0 0 ${chartW} ${chartH + 30}`} className="w-full" style={{ maxHeight: '280px' }} preserveAspectRatio="xMidYMid meet">
              {[0, 0.25, 0.5, 0.75, 1].map(pct => (
                <line key={pct} x1={padX} x2={padX + w} y1={padY + h - pct * h} y2={padY + h - pct * h} stroke="#f0ece4" strokeWidth={1} />
              ))}
              <path d={areaPath} fill="url(#wineGrad2)" opacity={0.15} />
              <path d={linePath} fill="none" stroke="#722F37" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={5} fill="#722F37" stroke="white" strokeWidth={2.5} />
                  <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#333" fontSize={11} fontWeight="bold">{p.count}</text>
                  <text x={p.x} y={chartH + 20} textAnchor="middle" fill="#999" fontSize={10}>{p.day}</text>
                </g>
              ))}
              <defs>
                <linearGradient id="wineGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#722F37" />
                  <stop offset="100%" stopColor="#722F37" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          );
        })()}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher par IP, ville, pays..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
        />
      </div>

      {/* Visitors table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream p-12 text-center">
          <svg className="w-16 h-16 text-charcoal/15 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-charcoal/40">Aucune visite trouv&eacute;e</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-cream overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream/30">
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">IP</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Localisation</th>
                  <th className="text-center text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Visites</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Premi&egrave;re visite</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Derni&egrave;re visite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {filtered.map((visitor) => (
                  <tr key={visitor.ip} className="hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-wine/10 text-wine flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0v.243" />
                          </svg>
                        </div>
                        <span className="text-sm font-mono font-medium text-charcoal">{visitor.ip}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {visitor.city || visitor.country ? (
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {[visitor.city, visitor.region].filter(Boolean).join(', ')}
                          </p>
                          <p className="text-xs text-charcoal/40">{visitor.country}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-charcoal/30 italic">Inconnu</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-xs font-bold bg-wine/10 text-wine">
                        {visitor.visitCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/50">
                      {new Date(visitor.firstVisit).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/50">
                      {new Date(visitor.lastVisit).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      <span className="text-charcoal/30 ml-1">
                        {new Date(visitor.lastVisit).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
