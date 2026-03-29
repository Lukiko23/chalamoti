'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Order, OrderStatus } from '@/types';
import { getAllOrders } from '@/lib/storage';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

const statusFilters: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'new', label: 'Nouvelles' },
  { value: 'confirmed', label: 'Confirm\u00e9es' },
  { value: 'ready', label: 'Pr\u00eates' },
  { value: 'picked-up', label: 'Retir\u00e9es' },
];

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setOrders(await getAllOrders());
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

  const filtered = filter === 'all'
    ? orders
    : orders.filter(o => (o.status || 'new') === filter);

  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-1">Commandes</h2>
        <p className="text-charcoal/50 text-sm">{orders.length} commande{orders.length > 1 ? 's' : ''} au total</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map(sf => (
          <button
            key={sf.value}
            onClick={() => setFilter(sf.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === sf.value
                ? 'bg-wine text-white shadow-md'
                : 'bg-white text-charcoal/60 border border-cream hover:border-wine/30 hover:text-wine'
            }`}
          >
            {sf.label}
            {sf.value !== 'all' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({orders.filter(o => (o.status || 'new') === sf.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream p-12 text-center">
          <svg className="w-16 h-16 text-charcoal/15 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          <p className="text-charcoal/40">Aucune commande dans cette cat&eacute;gorie</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((order, i) => (
            <div
              key={order.id}
            >
              <Link
                href={`/admin/commandes/${order.id}`}
                className="block bg-white rounded-2xl border border-cream p-5 hover:shadow-lg hover:border-wine/20 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 text-wine flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-bold text-wine group-hover:underline">{order.id}</p>
                      <p className="text-sm text-charcoal/60">{order.info.firstName} {order.info.lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-charcoal">{order.total.toFixed(2)}&nbsp;&euro;</p>
                      <p className="text-xs text-charcoal/40">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status || 'new'} />
                    <svg className="w-5 h-5 text-charcoal/20 group-hover:text-wine transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
                {/* Items preview */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {order.items.map(item => (
                    <span key={item.product.id} className="text-xs bg-cream/50 text-charcoal/60 px-2.5 py-1 rounded-full">
                      {item.product.name} &times;{item.quantity}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
