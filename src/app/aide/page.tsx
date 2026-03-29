'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    q: 'Comment passer une commande ?',
    a: 'Rendez-vous sur la page Commander, choisissez vos vins, remplissez vos informations de livraison et validez votre commande.',
  },
  {
    q: 'Quels sont les d\u00e9lais de livraison ?',
    a: 'Les livraisons sont effectu\u00e9es sous 3 \u00e0 5 jours ouvrables en France m\u00e9tropolitaine.',
  },
  {
    q: 'Comment suivre ma commande ?',
    a: 'Vous recevrez un email de confirmation avec les d\u00e9tails de votre commande. Pour toute question, contactez-nous via la page Contact.',
  },
  {
    q: 'Comment modifier ou annuler une commande ?',
    a: 'Contactez-nous le plus rapidement possible via la page Contact ou en cr\u00e9ant un ticket depuis votre profil.',
  },
  {
    q: 'Un probl\u00e8me avec votre compte ?',
    a: 'Si vous rencontrez un probl\u00e8me de connexion ou avec votre compte, cr\u00e9ez un ticket depuis votre page Profil ou contactez-nous.',
  },
];

export default function AidePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-offwhite pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-wine/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">Centre d&apos;aide</h1>
            <p className="text-charcoal/50">Questions fr&eacute;quentes et assistance</p>
          </div>

          {/* FAQ */}
          <div className="space-y-3 mb-10">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-cream overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-charcoal pr-4">{faq.q}</span>
                  <svg className={`w-5 h-5 text-charcoal/30 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-charcoal/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="bg-white rounded-2xl border border-cream p-6 text-center">
            <h2 className="text-lg font-serif font-bold text-charcoal mb-2">Vous n&apos;avez pas trouv&eacute; votre r&eacute;ponse ?</h2>
            <p className="text-sm text-charcoal/50 mb-4">Contactez-nous directement, nous vous r&eacute;pondrons rapidement.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-wine text-white rounded-xl text-sm font-medium hover:bg-wine/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Nous contacter
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
