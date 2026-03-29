'use client';

import { useState, useEffect } from 'react';

import { User } from '@/types';
import { getAllUsers } from '@/lib/storage';

export default function UtilisateursPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      setUsers(await getAllUsers());
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

  const filtered = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const admins = users.filter(u => u.role === 'admin').length;
  const customers = users.filter(u => u.role === 'customer').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-1">Utilisateurs</h2>
        <p className="text-charcoal/50 text-sm">
          {users.length} utilisateur{users.length > 1 ? 's' : ''} inscrits
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-cream p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-wine/10 text-wine flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">{users.length}</p>
              <p className="text-xs text-charcoal/50">Total inscrits</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-cream p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">{admins}</p>
              <p className="text-xs text-charcoal/50">Administrateurs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-cream p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">{customers}</p>
              <p className="text-xs text-charcoal/50">Clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors"
        />
      </div>

      {/* Users list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream p-12 text-center">
          <svg className="w-16 h-16 text-charcoal/15 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <p className="text-charcoal/40">Aucun utilisateur trouv&eacute;</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-cream overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream/30">
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Utilisateur</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Email</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">R&ocirc;le</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Inscrit le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {filtered.map((user, i) => (
                  <tr
                    key={user.id}
                    className="hover:bg-cream/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white ${user.role === 'admin' ? 'bg-wine' : 'bg-charcoal/30'}`}>
                          {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-charcoal">{user.firstName} {user.lastName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/60">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        user.role === 'admin'
                          ? 'bg-wine/10 text-wine'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {user.role === 'admin' ? 'Admin' : 'Client'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/50">
                      {user.createdAt && new Date(user.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
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
