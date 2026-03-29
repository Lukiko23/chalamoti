'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';


export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-charcoal mb-4">Produit introuvable</h1>
          <Link href="/catalogue" className="text-wine font-semibold hover:underline">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const isRed = product.type.includes('rouge');
  const similarProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleOrder = () => {
    addItem(product, quantity);
    router.push('/commander');
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-charcoal/50">
            <Link href="/" className="hover:text-wine transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-wine transition-colors">Catalogue</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`rounded-3xl overflow-hidden ${
                product.detailImage
                  ? 'bg-gradient-to-br from-cream/50 to-white'
                  : 'p-16 flex items-center justify-center ' + (isRed ? 'bg-gradient-to-br from-wine/5 to-wine/15' : 'bg-gradient-to-br from-gold/5 to-gold/15')
              }`}
            >
              <div className={`relative w-full ${product.detailImage ? 'min-h-[500px]' : 'h-full min-h-[400px]'}`}>
                {product.detailImage ? (
                  <Image
                    src={product.detailImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <>
                    <div className={`absolute -top-8 -right-8 w-40 h-40 rounded-full blur-2xl opacity-20 ${isRed ? 'bg-wine' : 'bg-gold'}`} />
                    <div className="flex items-center justify-center h-full">
                      {product.category === 'bouteille' ? (
                        <svg viewBox="0 0 120 240" className={`w-32 h-56 ${isRed ? 'text-wine/50' : 'text-gold/60'}`} fill="currentColor">
                          <rect x="48" y="0" width="24" height="45" rx="4" opacity="0.9" />
                          <path d="M48 45 C48 45, 18 80, 18 120 L18 210 C18 222, 28 232, 40 232 L80 232 C92 232, 102 222, 102 210 L102 120 C102 80, 72 45, 72 45 Z" opacity="0.4" />
                          <ellipse cx="60" cy="160" rx="28" ry="35" opacity="0.12" />
                          <text x="60" y="170" textAnchor="middle" fontSize="22" fontFamily="serif" fontWeight="bold" opacity="0.35">{product.name[0]}</text>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 140 160" className={`w-36 h-40 ${isRed ? 'text-wine/50' : 'text-gold/60'}`} fill="currentColor">
                          <rect x="20" y="20" width="100" height="14" rx="3" opacity="0.8" />
                          <rect x="55" y="5" width="30" height="18" rx="4" opacity="0.6" />
                          <rect x="10" y="34" width="120" height="115" rx="8" opacity="0.3" />
                          <rect x="22" y="50" width="96" height="85" rx="4" opacity="0.12" />
                          <text x="70" y="100" textAnchor="middle" fontSize="24" fontWeight="bold" opacity="0.3">5L</text>
                        </svg>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  isRed
                    ? 'bg-wine/10 text-wine border border-wine/20'
                    : 'bg-gold/10 text-amber-700 border border-gold/30'
                }`}>
                  {product.type}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cream text-charcoal/60">
                  {product.format}
                </span>
              </div>

              <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">{product.name}</h1>
              <p className="text-charcoal/50 text-sm mb-4">Origine : {product.origin}</p>

              <div className="text-3xl font-bold text-wine mb-6">{product.price.toFixed(2)} &euro;</div>

              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm text-green-700 font-medium">En stock &mdash; Disponible au retrait</span>
              </div>

              <p className="text-charcoal/70 leading-relaxed mb-8">{product.longDescription}</p>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-cream rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-charcoal/50 hover:bg-cream/50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" d="M5 12h14" />
                    </svg>
                  </button>
                  <span className="px-6 py-3 font-semibold text-charcoal border-x border-cream min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-3 text-charcoal/50 hover:bg-cream/50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>

                <span className="text-lg font-bold text-charcoal">
                  {(product.price * quantity).toFixed(2)} &euro;
                </span>
              </div>

              <div className="flex gap-4 mb-10">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 text-center font-semibold text-wine border-2 border-wine/20 rounded-xl hover:border-wine hover:bg-wine/5 transition-all duration-300"
                >
                  Ajouter &agrave; la commande
                </button>
                <button
                  onClick={handleOrder}
                  className="flex-1 py-4 text-center font-semibold text-white bg-wine rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                  R&eacute;server un retrait
                </button>
              </div>

              {/* Details */}
              <div className="space-y-6 border-t border-cream pt-8">
                <div>
                  <h3 className="font-serif font-bold text-charcoal mb-2">Notes de d&eacute;gustation</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{product.tastingNotes}</p>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-charcoal mb-2">Accords mets &amp; vins</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{product.foodPairing}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <section className="py-20 bg-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-charcoal text-center mb-10">
            Vous aimerez aussi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {similarProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
