'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

import { Order, OrderStatus } from '@/types';
import { getOrderById, updateOrderStatus } from '@/lib/storage';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

const statusSteps: { value: OrderStatus; label: string; icon: string }[] = [
  { value: 'new', label: 'Nouvelle', icon: '\ud83d\udce5' },
  { value: 'confirmed', label: 'Confirm\u00e9e', icon: '\u2705' },
  { value: 'ready', label: 'Pr\u00eate', icon: '\ud83d\udce6' },
  { value: 'picked-up', label: 'Retir\u00e9e', icon: '\ud83c\udfc1' },
];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function load() {
      const found = await getOrderById(id);
      if (found) setOrder(found);
    }
    load();
  }, [id]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return;
    await updateOrderStatus(order.id, newStatus);
    setOrder({ ...order, status: newStatus });
  };

  if (!order) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 text-charcoal/15 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        <p className="text-charcoal/40 mb-4">Commande introuvable</p>
        <Link href="/admin/commandes" className="text-wine font-semibold hover:underline">&larr; Retour aux commandes</Link>
      </div>
    );
  }

  const currentStatus = order.status || 'new';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/commandes" className="text-sm text-charcoal/40 hover:text-wine transition-colors mb-2 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Retour aux commandes
          </Link>
          <h2 className="text-2xl font-serif font-bold text-charcoal flex items-center gap-3">
            {order.id}
            <OrderStatusBadge status={currentStatus} />
          </h2>
          <p className="text-charcoal/50 text-sm mt-1">
            Pass&eacute;e le {new Date(order.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Status stepper */}
      <div
        className="bg-white rounded-2xl border border-cream p-6"
      >
        <h3 className="text-sm font-semibold text-charcoal/50 uppercase tracking-wide mb-4">Mettre &agrave; jour le statut</h3>
        <div className="flex flex-wrap gap-3">
          {statusSteps.map(step => (
            <button
              key={step.value}
              onClick={() => handleStatusChange(step.value)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentStatus === step.value
                  ? 'bg-wine text-white shadow-lg shadow-wine/20'
                  : 'bg-cream/50 text-charcoal/60 hover:bg-wine/10 hover:text-wine border border-transparent hover:border-wine/20'
              }`}
            >
              <span>{step.icon}</span>
              {step.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Order items */}
        <div
          className="bg-white rounded-2xl border border-cream p-6"
        >
          <h3 className="text-lg font-serif font-bold text-charcoal mb-4">Articles command&eacute;s</h3>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.product.id} className="flex items-center justify-between py-3 border-b border-cream last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-wine" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C12 2 7 7 7 12c0 2.76 2.24 5 5 5s5-2.24 5-5C17 7 12 2 12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{item.product.name}</p>
                    <p className="text-xs text-charcoal/40">{item.product.format}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-charcoal">{(item.product.price * item.quantity).toFixed(2)}&nbsp;&euro;</p>
                  <p className="text-xs text-charcoal/40">&times;{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t-2 border-wine/10 flex justify-between">
            <span className="font-serif font-bold text-charcoal">Total</span>
            <span className="text-xl font-serif font-bold text-wine">{order.total.toFixed(2)}&nbsp;&euro;</span>
          </div>
        </div>

        {/* Customer info + pickup */}
        <div className="space-y-6">
          <div
            className="bg-white rounded-2xl border border-cream p-6"
          >
            <h3 className="text-lg font-serif font-bold text-charcoal mb-4">Informations client</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/50">Nom</span>
                <span className="font-medium text-charcoal">{order.info.firstName} {order.info.lastName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/50">Email</span>
                <span className="font-medium text-charcoal">{order.info.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/50">T&eacute;l&eacute;phone</span>
                <span className="font-medium text-charcoal">{order.info.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/50">Paiement</span>
                <span className="font-medium text-charcoal">{order.info.paymentMethod === 'cash' ? 'Esp\u00e8ces' : 'Carte bancaire'}</span>
              </div>
              {order.info.note && (
                <div className="pt-3 border-t border-cream">
                  <p className="text-xs text-charcoal/40 mb-1">Note</p>
                  <p className="text-sm text-charcoal bg-cream/30 rounded-lg p-3">{order.info.note}</p>
                </div>
              )}
            </div>
          </div>

          <div
            className="bg-white rounded-2xl border border-cream p-6"
          >
            <h3 className="text-lg font-serif font-bold text-charcoal mb-4">Retrait</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/50">Date</span>
                <span className="font-medium text-charcoal">
                  {order.info.pickupDate && new Date(order.info.pickupDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/50">Cr&eacute;neau</span>
                <span className="font-medium text-charcoal">{order.info.pickupSlot}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/50">Adresse</span>
                <span className="font-medium text-charcoal">12 Rue du Vignoble, 75011 Paris</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
