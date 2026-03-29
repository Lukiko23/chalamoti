'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}

export default function SectionTitle({ subtitle, title, description, light, center = true }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}
    >
      {subtitle && (
        <span className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${
          light ? 'text-gold' : 'text-gold'
        }`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-serif font-bold leading-tight ${
        light ? 'text-white' : 'text-charcoal'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${
          light ? 'text-white/60' : 'text-charcoal/60'
        }`}>
          {description}
        </p>
      )}
      <div className={`mt-6 mx-auto h-px w-16 ${center ? '' : 'mx-0'} ${light ? 'bg-gold/40' : 'bg-gold/40'}`} />
    </motion.div>
  );
}
