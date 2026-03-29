'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Order, ContactMessage, User } from '@/types';
import { getAllOrders, getAllMessages, getAllUsers, getVisitStats, type VisitStats } from '@/lib/storage';
import StatCard from '@/components/admin/StatCard';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [visits, setVisits] = useState<VisitStats>({ today: 0, week: 0, month: 0, dailyCounts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [o, m, u, v] = await Promise.all([
        getAllOrders(),
        getAllMessages(),
        getAllUsers(),
        getVisitStats(),
      ]);
      setOrders(o);
      setMessages(m);
      setUsers(u);
      setVisits(v);
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

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'new').length;
  const unreadMessages = messages.filter(m => !m.read).length;
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentUsers = [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const maxVisits = Math.max(...visits.dailyCounts.map(d => d.count), 1);

  // Orders by status
  const confirmedOrders = orders.filter(o => o.status === 'confirmed').length;
  const readyOrders = orders.filter(o => o.status === 'ready').length;
  const pickedUpOrders = orders.filter(o => o.status === 'picked-up').length;

  // Average order value
  const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-1">Dashboard</h2>
        <p className="text-charcoal/50 text-sm">Vue d&apos;ensemble de votre activit&eacute;</p>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          label="Visites aujourd'hui"
          value={visits.today}
          subtitle={`${visits.week} cette semaine`}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
          label="Utilisateurs inscrits"
          value={users.length}
          subtitle={`${users.filter(u => u.role === 'admin').length} admin`}
          color="green"
          delay={0.05}
        />
        <StatCard
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>}
          label="Total commandes"
          value={orders.length}
          subtitle={`${pendingOrders} en attente`}
          color="wine"
          delay={0.1}
        />
        <StatCard
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Chiffre d'affaires"
          value={`${totalRevenue.toFixed(2)}\u00a0\u20ac`}
          subtitle={`Moy. ${avgOrder.toFixed(2)}\u00a0\u20ac/cmd`}
          color="gold"
          delay={0.15}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-cream p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-charcoal">Visites</h3>
              <p className="text-xs text-charcoal/40">7 derniers jours</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-wine">{visits.month}</p>
              <p className="text-xs text-charcoal/40">ce mois</p>
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {visits.dailyCounts.map((d, i) => {
              const height = maxVisits > 0 ? (d.count / maxVisits) * 100 : 0;
              const dayIndex = new Date(d.date + 'T12:00:00').getDay();
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-charcoal/60">{d.count}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(height, 4)}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-wine to-wine/60 min-h-[4px]"
                  />
                  <span className="text-[10px] text-charcoal/40">{dayLabels[dayIndex]}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Orders breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-cream p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-charcoal">Commandes</h3>
              <p className="text-xs text-charcoal/40">R&eacute;partition par statut</p>
            </div>
            <Link href="/admin/commandes" className="text-xs text-wine font-semibold hover:underline">
              Voir tout &rarr;
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Nouvelles', count: pendingOrders, color: 'bg-blue-500', bgColor: 'bg-blue-100' },
              { label: 'Confirm\u00e9es', count: confirmedOrders, color: 'bg-amber-500', bgColor: 'bg-amber-100' },
              { label: 'Pr\u00eates', count: readyOrders, color: 'bg-green-500', bgColor: 'bg-green-100' },
              { label: 'Retir\u00e9es', count: pickedUpOrders, color: 'bg-charcoal/40', bgColor: 'bg-charcoal/10' },
            ].map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-charcoal/70 font-medium">{s.label}</span>
                  <span className="font-bold text-charcoal">{s.count}</span>
                </div>
                <div className={`h-2.5 rounded-full ${s.bgColor}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: orders.length > 0 ? `${(s.count / orders.length) * 100}%` : '0%' }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className={`h-full rounded-full ${s.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          {orders.length === 0 && (
            <p className="text-center text-charcoal/30 text-sm mt-4">Aucune commande</p>
          )}
        </motion.div>
      </div>

      {/* Second widgets row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-cream p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-wine/10 text-wine flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </div>
            <p className="text-xs text-charcoal/50">Messages non lus</p>
          </div>
          <p className="text-2xl font-bold text-charcoal">{unreadMessages}</p>
          <Link href="/admin/messages" className="text-xs text-wine font-semibold hover:underline mt-1 inline-block">Voir messages &rarr;</Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl border border-cream p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-xs text-charcoal/50">Messages r&eacute;pondus</p>
          </div>
          <p className="text-2xl font-bold text-charcoal">{messages.filter(m => m.replied).length}</p>
          <p className="text-xs text-charcoal/40 mt-1">sur {messages.length} total</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl border border-cream p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>
            </div>
            <p className="text-xs text-charcoal/50">Visites ce mois</p>
          </div>
          <p className="text-2xl font-bold text-charcoal">{visits.month}</p>
          <p className="text-xs text-charcoal/40 mt-1">{visits.week} cette semaine</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white rounded-2xl border border-cream p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-xs text-charcoal/50">Panier moyen</p>
          </div>
          <p className="text-2xl font-bold text-charcoal">{avgOrder.toFixed(2)}&nbsp;&euro;</p>
          <p className="text-xs text-charcoal/40 mt-1">{orders.length} commandes</p>
        </motion.div>
      </div>

      {/* Bottom row: Recent orders + Recent users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-cream overflow-hidden"
        >
          <div className="p-6 border-b border-cream flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-charcoal">Commandes r&eacute;centes</h3>
            <Link href="/admin/commandes" className="text-sm text-wine font-semibold hover:underline">
              Voir tout &rarr;
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-12 h-12 text-charcoal/20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <p className="text-charcoal/40 text-sm">Aucune commande</p>
            </div>
          ) : (
            <div className="divide-y divide-cream">
              {recentOrders.map(order => (
                <Link
                  key={order.id}
                  href={`/admin/commandes/${order.id}`}
                  className="flex items-center justify-between p-4 hover:bg-cream/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 text-wine flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{order.info.firstName} {order.info.lastName}</p>
                      <p className="text-xs text-charcoal/40">{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-charcoal">{order.total.toFixed(2)}&nbsp;&euro;</span>
                    <OrderStatusBadge status={order.status || 'new'} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl border border-cream overflow-hidden"
        >
          <div className="p-6 border-b border-cream flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-charcoal">Derniers inscrits</h3>
            <Link href="/admin/utilisateurs" className="text-sm text-wine font-semibold hover:underline">
              Voir tout &rarr;
            </Link>
          </div>
          {recentUsers.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-12 h-12 text-charcoal/20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <p className="text-charcoal/40 text-sm">Aucun utilisateur</p>
            </div>
          ) : (
            <div className="divide-y divide-cream">
              {recentUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white ${user.role === 'admin' ? 'bg-wine' : 'bg-charcoal/30'}`}>
                      {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-charcoal/40">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      user.role === 'admin' ? 'bg-wine/10 text-wine' : 'bg-green-100 text-green-700'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Client'}
                    </span>
                    <p className="text-[10px] text-charcoal/30 mt-1">
                      {user.createdAt && new Date(user.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
