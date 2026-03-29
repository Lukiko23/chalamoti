'use client';

import { OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  'new': { label: 'Nouvelle', bg: 'bg-blue-100', text: 'text-blue-700' },
  'confirmed': { label: 'Confirm\u00e9e', bg: 'bg-amber-100', text: 'text-amber-700' },
  'ready': { label: 'Pr\u00eate', bg: 'bg-green-100', text: 'text-green-700' },
  'picked-up': { label: 'Retir\u00e9e', bg: 'bg-charcoal/10', text: 'text-charcoal/60' },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status] || statusConfig['new'];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
