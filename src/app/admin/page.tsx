'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Order, ContactMessage } from '@/types';
import { getAllOrders, getAllMessages } from '@/lib/storage';
import StatCard from '@/components/admin/StatCard';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [o, m] = await Promise.all([getAllOrders(), getAllMessages()]);
      setOrders(o);
      setMessages(m);
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

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-1">Dashboard</h2>
        <p className="text-charcoal/50 text-sm">Vue d&apos;ensemble de votre activit&eacute;</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>}
          label="Total commandes"
          value={orders.length}
          color="wine"
          delay={0}
        />
        <StatCard
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Chiffre d'affaires"
          value={`${totalRevenue.toFixed(2)}\u00a0\u20ac`}
          color="gold"
          delay={0.1}
        />
        <StatCard
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="En attente"
          value={pendingOrders}
          subtitle="commandes nouvelles"
          color="blue"
          delay={0.2}
        />
        <StatCard
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
          label="Messages non lus"
          value={unreadMessages}
          color="green"
          delay={0.3}
        />
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
            <p className="text-charcoal/40 text-sm">Aucune commande pour le moment</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream/30">
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Commande</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Client</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Total</th>
                  <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wide px-6 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/commandes/${order.id}`} className="font-mono text-sm text-wine font-semibold hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal">
                      {order.info.firstName} {order.info.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/60">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-charcoal">
                      {order.total.toFixed(2)}&nbsp;&euro;
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.status || 'new'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
