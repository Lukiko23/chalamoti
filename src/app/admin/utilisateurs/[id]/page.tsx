'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { User, Order } from '@/types';
import { getAllUsers, getAllOrders } from '@/lib/storage';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [allUsers, allOrders] = await Promise.all([getAllUsers(), getAllOrders()]);
      const found = allUsers.find(u => u.id === userId);
      setUser(found || null);
      if (found) {
        const orders = allOrders.filter(
          o => o.info.email.toLowerCase() === found.email.toLowerCase()
        );
        setUserOrders(orders);
      }
      setLoading(false);
    }
    load();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-wine/20 border-t-wine rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal/40 text-lg">Utilisateur introuvable</p>
        <Link href="/admin/utilisateurs" className="text-wine font-semibold hover:underline mt-4 inline-block">
          &larr; Retour aux utilisateurs
        </Link>
      </div>
    );
  }

  const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
  const completedOrders = userOrders.filter(o => o.status === 'picked-up').length;
  const pendingOrders = userOrders.filter(o => o.status === 'new' || o.status === 'confirmed').length;
  const avgOrder = userOrders.length > 0 ? totalSpent / userOrders.length : 0;

  // Get phone from most recent order
  const lastOrder = userOrders[0];
  const phone = lastOrder?.info?.phone || 'Non renseign\u00e9';

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/admin/utilisateurs" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-wine transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Retour aux utilisateurs
      </Link>

      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-cream p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white ${user.role === 'admin' ? 'bg-wine' : 'bg-charcoal/40'}`}>
            {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-serif font-bold text-charcoal">
                {user.firstName} {user.lastName}
              </h2>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                user.role === 'admin' ? 'bg-wine/10 text-wine' : 'bg-green-100 text-green-700'
              }`}>
                {user.role === 'admin' ? 'Administrateur' : 'Client'}
              </span>
            </div>
            <p className="text-charcoal/50 text-sm">
              Membre depuis le {new Date(user.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-cream">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-charcoal/40">Email</p>
              <p className="text-sm font-medium text-charcoal">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-charcoal/40">T&eacute;l&eacute;phone</p>
              <p className="text-sm font-medium text-charcoal">{phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-charcoal/40">Inscription</p>
              <p className="text-sm font-medium text-charcoal">
                {new Date(user.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-cream p-5">
          <p className="text-xs text-charcoal/40 mb-1">Commandes pass&eacute;es</p>
          <p className="text-3xl font-serif font-bold text-charcoal">{userOrders.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream p-5">
          <p className="text-xs text-charcoal/40 mb-1">Total d&eacute;pens&eacute;</p>
          <p className="text-3xl font-serif font-bold text-wine">{totalSpent.toFixed(2)}&nbsp;&euro;</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream p-5">
          <p className="text-xs text-charcoal/40 mb-1">Panier moyen</p>
          <p className="text-3xl font-serif font-bold text-charcoal">{avgOrder.toFixed(2)}&nbsp;&euro;</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream p-5">
          <p className="text-xs text-charcoal/40 mb-1">En cours / Termin&eacute;es</p>
          <p className="text-3xl font-serif font-bold text-charcoal">
            <span className="text-amber-600">{pendingOrders}</span>
            <span className="text-charcoal/20 mx-1">/</span>
            <span className="text-green-600">{completedOrders}</span>
          </p>
        </div>
      </div>

      {/* Orders list */}
      <div className="bg-white rounded-2xl border border-cream overflow-hidden">
        <div className="p-6 border-b border-cream">
          <h3 className="text-lg font-serif font-bold text-charcoal">Historique des commandes</h3>
          <p className="text-xs text-charcoal/40 mt-1">{userOrders.length} commande{userOrders.length > 1 ? 's' : ''}</p>
        </div>
        {userOrders.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 text-charcoal/15 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <p className="text-charcoal/40 text-sm">Aucune commande</p>
          </div>
        ) : (
          <div className="divide-y divide-cream">
            {userOrders.map(order => (
              <Link
                key={order.id}
                href={`/admin/commandes/${order.id}`}
                className="flex items-center justify-between p-5 hover:bg-cream/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-wine/10 text-wine flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{order.id}</p>
                    <p className="text-xs text-charcoal/40">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      {' \u2022 '}
                      {order.items.length} article{order.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-charcoal">{order.total.toFixed(2)}&nbsp;&euro;</span>
                  <OrderStatusBadge status={order.status || 'new'} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
