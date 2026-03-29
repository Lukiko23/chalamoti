'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const { lastOrder } = useCart();

  const order = lastOrder && lastOrder.id === orderId ? lastOrder : null;

  if (!order) {
    return (
      <section className="py-24 bg-offwhite">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-serif font-bold text-charcoal mb-4">Commande introuvable</h1>
          <p className="text-charcoal/50 mb-6">Cette commande n&apos;existe pas ou a expir&eacute;.</p>
          <Link href="/catalogue" className="text-wine font-semibold hover:underline">Retour au catalogue</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-offwhite">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
            Commande confirm&eacute;e !
          </h1>
          <p className="text-charcoal/50">
            Merci pour votre commande. Voici votre r&eacute;capitulatif.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-cream shadow-sm overflow-hidden"
        >
          {/* Order ID */}
          <div className="bg-wine p-6 text-center">
            <p className="text-white/60 text-sm">Num&eacute;ro de commande</p>
            <p className="text-white text-2xl font-bold font-mono mt-1">{order.id}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Products */}
            <div>
              <h3 className="font-serif font-bold text-charcoal mb-3">Produits command&eacute;s</h3>
              <div className="space-y-2">
                {order.items.map(item => (
                  <div key={item.product.id} className="flex justify-between py-2 border-b border-cream last:border-0">
                    <div>
                      <p className="font-medium text-charcoal text-sm">{item.product.name}</p>
                      <p className="text-xs text-charcoal/50">{item.product.format} &times; {item.quantity}</p>
                    </div>
                    <p className="font-bold text-charcoal text-sm">{(item.product.price * item.quantity).toFixed(2)} &euro;</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 pt-3 border-t border-cream">
                <span className="font-semibold text-charcoal">Total</span>
                <span className="text-xl font-bold text-wine">{order.total.toFixed(2)} &euro;</span>
              </div>
            </div>

            {/* Pickup info */}
            <div className="bg-cream/30 rounded-xl p-5">
              <h3 className="font-serif font-bold text-charcoal mb-3">Retrait</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-charcoal/50">Date</p>
                  <p className="font-medium text-charcoal">{order.info.pickupDate}</p>
                </div>
                <div>
                  <p className="text-charcoal/50">Cr&eacute;neau</p>
                  <p className="font-medium text-charcoal">{order.info.pickupSlot}</p>
                </div>
                <div>
                  <p className="text-charcoal/50">Paiement</p>
                  <p className="font-medium text-charcoal">{order.info.paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces'}</p>
                </div>
                <div>
                  <p className="text-charcoal/50">Adresse de retrait</p>
                  <p className="font-medium text-charcoal">12 Rue du Vignoble, 75011 Paris</p>
                </div>
              </div>
            </div>

            {/* Client info */}
            <div>
              <h3 className="font-serif font-bold text-charcoal mb-3">Vos coordonn&eacute;es</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-charcoal/50">Nom</p>
                  <p className="font-medium text-charcoal">{order.info.firstName} {order.info.lastName}</p>
                </div>
                <div>
                  <p className="text-charcoal/50">Email</p>
                  <p className="font-medium text-charcoal">{order.info.email}</p>
                </div>
                <div>
                  <p className="text-charcoal/50">T&eacute;l&eacute;phone</p>
                  <p className="font-medium text-charcoal">{order.info.phone}</p>
                </div>
              </div>
              {order.info.note && (
                <div className="mt-3">
                  <p className="text-charcoal/50 text-sm">Note</p>
                  <p className="font-medium text-charcoal text-sm">{order.info.note}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 space-y-4"
        >
          <p className="text-charcoal/50 text-sm">
            Un r&eacute;capitulatif vous sera envoy&eacute; par e-mail.
            Pr&eacute;sentez votre num&eacute;ro de commande lors du retrait.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/catalogue"
              className="px-6 py-3 border-2 border-wine/20 text-wine font-semibold rounded-xl hover:bg-wine hover:text-white transition-all duration-300"
            >
              Continuer mes achats
            </Link>
            <Link
              href="/"
              className="px-6 py-3 text-charcoal/50 font-medium rounded-xl hover:text-charcoal transition-colors"
            >
              Retour &agrave; l&apos;accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <div className="pt-20 bg-offwhite" />
      <Suspense fallback={
        <section className="py-24 bg-offwhite">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="animate-pulse">
              <div className="w-20 h-20 rounded-full bg-cream mx-auto mb-6" />
              <div className="h-8 bg-cream rounded w-64 mx-auto mb-4" />
              <div className="h-4 bg-cream rounded w-48 mx-auto" />
            </div>
          </div>
        </section>
      }>
        <ConfirmationContent />
      </Suspense>
    </>
  );
}
