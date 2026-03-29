'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  color?: 'wine' | 'gold' | 'green' | 'blue';
  delay?: number;
}

const colorMap = {
  wine: { bg: 'bg-wine/10', text: 'text-wine' },
  gold: { bg: 'bg-amber-100', text: 'text-amber-700' },
  green: { bg: 'bg-green-100', text: 'text-green-700' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
};

export default function StatCard({ icon, label, value, subtitle, color = 'wine', delay = 0 }: StatCardProps) {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-2xl border border-cream p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-charcoal/50 mb-1">{label}</p>
          <p className="text-3xl font-serif font-bold text-charcoal">{value}</p>
          {subtitle && <p className="text-xs text-charcoal/40 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
