'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, total } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cream">
              <h2 className="text-xl font-serif font-bold text-wine">Votre commande</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-cream/50 transition-colors text-charcoal/50 hover:text-charcoal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-16 h-16 text-cream mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-charcoal/50 font-medium">Votre panier est vide</p>
                  <p className="text-charcoal/40 text-sm mt-1">Découvrez notre sélection de vins géorgiens</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4 p-4 bg-cream/30 rounded-xl"
                      >
                        {/* Product image placeholder */}
                        <div className={`w-16 h-20 rounded-lg flex-shrink-0 flex items-center justify-center ${
                          item.product.type.includes('rouge') ? 'bg-wine/10' : 'bg-gold/10'
                        }`}>
                          <svg viewBox="0 0 24 32" className={`w-8 h-10 ${
                            item.product.type.includes('rouge') ? 'text-wine/40' : 'text-gold/60'
                          }`} fill="currentColor">
                            {item.product.category === 'bouteille' ? (
                              <path d="M10 0h4v8c3 2 5 5 5 10v10c0 2-2 4-4 4H9c-2 0-4-2-4-4V18c0-5 2-8 5-10V0z" />
                            ) : (
                              <path d="M4 4h16v2H4zm-2 4h20v20c0 1-1 2-2 2H4c-1 0-2-1-2-2V8zm4 4v12h12V12H6z" />
                            )}
                          </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-charcoal text-sm">{item.product.name}</h3>
                          <p className="text-xs text-charcoal/50 mt-0.5">{item.product.format}</p>
                          <p className="text-wine font-bold text-sm mt-1">{item.product.price.toFixed(2)} &euro;</p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-cream flex items-center justify-center text-charcoal/50 hover:border-wine hover:text-wine transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" d="M5 12h14" />
                              </svg>
                            </button>
                            <span className="text-sm font-semibold text-charcoal w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-cream flex items-center justify-center text-charcoal/50 hover:border-wine hover:text-wine transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-charcoal/30 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                          <p className="text-sm font-bold text-charcoal">
                            {(item.product.price * item.quantity).toFixed(2)} &euro;
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60 font-medium">Total</span>
                  <span className="text-2xl font-bold text-wine">{total.toFixed(2)} &euro;</span>
                </div>
                <p className="text-xs text-charcoal/40 text-center">Paiement sur place au moment du retrait</p>
                <Link
                  href="/commander"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-4 bg-wine text-white text-center font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/20 hover:shadow-xl hover:shadow-wine/30 hover:-translate-y-0.5"
                >
                  Finaliser la commande
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
