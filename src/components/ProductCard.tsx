'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useTranslation } from '@/i18n/LanguageContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { t } = useTranslation();

  const isRed = product.type.includes('rouge');
  const isBidon = product.category === 'bidon';
  const coverImg = product.coverImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-cream/50 hover:border-gold/30"
    >
      {/* Image area */}
      <div className={`relative ${coverImg ? 'h-72' : 'h-64'} flex items-center justify-center overflow-hidden ${
        coverImg ? '' : isRed ? 'bg-gradient-to-br from-wine/5 to-wine/10' : 'bg-gradient-to-br from-gold/5 to-gold/10'
      }`}>
        {coverImg ? (
          <motion.div
            className="relative z-10 w-full h-full"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Image
              src={coverImg}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>
        ) : (
          <>
            {/* Decorative circles */}
            <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 ${isRed ? 'bg-wine' : 'bg-gold'}`} />
            <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-5 ${isRed ? 'bg-wine' : 'bg-gold'}`} />

            {/* Wine icon */}
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {isBidon ? (
                <svg viewBox="0 0 80 100" className={`w-20 h-24 ${isRed ? 'text-wine/60' : 'text-gold/70'}`} fill="currentColor">
                  <rect x="10" y="15" width="60" height="8" rx="2" opacity="0.8" />
                  <rect x="30" y="5" width="20" height="12" rx="3" opacity="0.6" />
                  <rect x="5" y="23" width="70" height="70" rx="6" opacity="0.3" />
                  <rect x="12" y="35" width="56" height="48" rx="3" opacity="0.15" />
                  <text x="40" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" opacity="0.4" fill="currentColor">5L</text>
                </svg>
              ) : (
                <svg viewBox="0 0 60 120" className={`w-16 h-28 ${isRed ? 'text-wine/60' : 'text-gold/70'}`} fill="currentColor">
                  <rect x="24" y="0" width="12" height="20" rx="2" opacity="0.8" />
                  <path d="M24 20 C24 20, 15 35, 15 55 L15 105 C15 110, 18 113, 22 113 L38 113 C42 113, 45 110, 45 105 L45 55 C45 35, 36 20, 36 20 Z" opacity="0.3" />
                  <ellipse cx="30" cy="75" rx="12" ry="15" opacity="0.1" />
                </svg>
              )}
            </motion.div>
          </>
        )}

        {/* Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
            coverImg
              ? 'bg-white/80 text-charcoal border border-white/50'
              : isRed
                ? 'bg-wine/10 text-wine border border-wine/20'
                : 'bg-gold/10 text-amber-700 border border-gold/30'
          }`}>
            {product.format}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-lg font-serif font-bold text-charcoal group-hover:text-wine transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-charcoal/50 uppercase tracking-wide">{product.type}</p>
          </div>
          <span className="text-xl font-bold text-wine whitespace-nowrap">
            {product.price.toFixed(2)}&nbsp;&euro;
          </span>
        </div>

        <p className="text-sm text-charcoal/60 leading-relaxed mt-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex gap-3 mt-5">
          <Link
            href={`/produit/${product.slug}`}
            className="flex-1 py-2.5 text-center text-sm font-semibold text-wine border-2 border-wine/20 rounded-xl hover:border-wine hover:bg-wine/5 transition-all duration-300"
          >
            {t('product.detail')}
          </Link>
          <button
            onClick={() => addItem(product)}
            className="flex-1 py-2.5 text-center text-sm font-semibold text-white bg-wine rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-md shadow-wine/20 hover:shadow-lg hover:shadow-wine/30 hover:-translate-y-0.5"
          >
            {t('product.order')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
