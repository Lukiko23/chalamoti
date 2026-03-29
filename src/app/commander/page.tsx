'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { timeSlots } from '@/data/products';
import { OrderInfo } from '@/types';

type Step = 'cart' | 'info' | 'confirm';

export default function CommanderPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, addItem, total, placeOrder } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<OrderInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    note: '',
    paymentMethod: 'card',
    pickupDate: '',
    pickupSlot: '',
    ageConfirmed: false,
  });

  // Generate next 14 days
  const availableDates = useMemo(() => {
    const dates: { value: string; label: string; dayName: string }[] = [];
    const now = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      const day = date.getDay();
      // Skip Sunday (0)
      if (day === 0) continue;
      const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      const monthNames = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
      dates.push({
        value: date.toISOString().split('T')[0],
        label: `${date.getDate()} ${monthNames[date.getMonth()]}`,
        dayName: dayNames[day],
      });
    }
    return dates;
  }, []);

  const updateForm = (field: keyof OrderInfo, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateInfo = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'Prénom requis';
    if (!form.lastName.trim()) errs.lastName = 'Nom requis';
    if (!form.email.trim()) errs.email = 'Email requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email invalide';
    if (!form.phone.trim()) errs.phone = 'Téléphone requis';
    if (!form.pickupDate) errs.pickupDate = 'Date de retrait requise';
    if (!form.pickupSlot) errs.pickupSlot = 'Créneau requis';
    if (!form.ageConfirmed) errs.ageConfirmed = 'Vous devez confirmer votre majorité';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInfo()) return;
    const order = await placeOrder(form);
    router.push(`/confirmation?id=${order.id}`);
  };

  if (items.length === 0 && step === 'cart') {
    return (
      <>
        <div className="pt-32 pb-4 bg-cream/30" />
        <section className="py-24 bg-offwhite">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg className="w-20 h-20 text-cream mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">Votre panier est vide</h1>
              <p className="text-charcoal/50 mb-8">D&eacute;couvrez notre s&eacute;lection de vins g&eacute;orgiens et commencez votre commande.</p>
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 px-8 py-4 bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/20"
              >
                Voir le catalogue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="grain absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Finaliser votre commande
            </h1>
            <p className="text-white/50 max-w-xl mx-auto">
              V&eacute;rifiez votre panier, renseignez vos informations et choisissez votre cr&eacute;neau de retrait.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps indicator */}
      <div className="bg-white border-b border-cream sticky top-20 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            {[
              { key: 'cart' as Step, label: 'Panier', num: '1' },
              { key: 'info' as Step, label: 'Informations', num: '2' },
              { key: 'confirm' as Step, label: 'Confirmation', num: '3' },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                {i > 0 && <div className={`w-8 h-px ${step === s.key || (step === 'confirm' && i <= 2) || (step === 'info' && i <= 1) ? 'bg-wine' : 'bg-cream'}`} />}
                <button
                  onClick={() => {
                    if (s.key === 'cart') setStep('cart');
                    if (s.key === 'info' && items.length > 0) setStep('info');
                  }}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    step === s.key ? 'text-wine' : 'text-charcoal/40'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s.key ? 'bg-wine text-white' : 'bg-cream text-charcoal/40'
                  }`}>{s.num}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 bg-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* ===== STEP 1: CART ===== */}
            {step === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Votre panier</h2>

                {/* Quick add */}
                <div className="mb-8 p-4 bg-cream/30 rounded-xl border border-cream">
                  <p className="text-sm text-charcoal/50 mb-3 font-medium">Ajouter rapidement :</p>
                  <div className="flex flex-wrap gap-2">
                    {products.filter(p => !items.find(i => i.product.id === p.id)).map(p => (
                      <button
                        key={p.id}
                        onClick={() => addItem(p)}
                        className="px-4 py-2 bg-white text-sm text-charcoal/70 rounded-lg border border-cream hover:border-wine/30 hover:text-wine transition-all"
                      >
                        + {p.name} ({p.price.toFixed(2)}&euro;)
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4 bg-white p-5 rounded-xl border border-cream">
                      <div className={`w-14 h-16 rounded-lg flex-shrink-0 flex items-center justify-center ${
                        item.product.type.includes('rouge') ? 'bg-wine/10' : 'bg-gold/10'
                      }`}>
                        <svg viewBox="0 0 24 32" className={`w-6 h-8 ${
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
                        <h3 className="font-semibold text-charcoal">{item.product.name}</h3>
                        <p className="text-xs text-charcoal/50">{item.product.format} &middot; {item.product.type}</p>
                      </div>
                      <div className="flex items-center border border-cream rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-2 hover:bg-cream/50 text-charcoal/50">
                          &minus;
                        </button>
                        <span className="px-3 py-2 font-semibold text-sm border-x border-cream">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-2 hover:bg-cream/50 text-charcoal/50">
                          +
                        </button>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="font-bold text-wine">{(item.product.price * item.quantity).toFixed(2)}&euro;</p>
                        <p className="text-xs text-charcoal/40">{item.product.price.toFixed(2)}&euro;/u</p>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="p-2 text-charcoal/30 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total & next */}
                <div className="bg-white rounded-xl border border-cream p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-charcoal/60 font-medium">Total de la commande</span>
                    <span className="text-3xl font-bold text-wine">{total.toFixed(2)} &euro;</span>
                  </div>
                  <p className="text-xs text-charcoal/40 mb-4">Paiement au moment du retrait (esp&egrave;ces ou carte bancaire)</p>
                  <button
                    onClick={() => setStep('info')}
                    disabled={items.length === 0}
                    className="w-full py-4 bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 2: INFO ===== */}
            {step === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <button onClick={() => setStep('cart')} className="flex items-center gap-1 text-sm text-charcoal/50 hover:text-wine transition-colors mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Retour au panier
                </button>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Personal info */}
                    <div className="bg-white rounded-xl border border-cream p-6">
                      <h2 className="text-xl font-serif font-bold text-charcoal mb-6">Vos informations</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Pr&eacute;nom *</label>
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={e => updateForm('firstName', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border bg-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine ${errors.firstName ? 'border-red-400' : 'border-cream'}`}
                            placeholder="Jean"
                          />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Nom *</label>
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={e => updateForm('lastName', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border bg-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine ${errors.lastName ? 'border-red-400' : 'border-cream'}`}
                            placeholder="Dupont"
                          />
                          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Adresse e-mail *</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={e => updateForm('email', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border bg-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine ${errors.email ? 'border-red-400' : 'border-cream'}`}
                            placeholder="jean@email.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal/70 mb-1.5">T&eacute;l&eacute;phone *</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => updateForm('phone', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border bg-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine ${errors.phone ? 'border-red-400' : 'border-cream'}`}
                            placeholder="06 12 34 56 78"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Note ou commentaire</label>
                        <textarea
                          value={form.note}
                          onChange={e => updateForm('note', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine resize-none"
                          placeholder="Un message particulier ? (optionnel)"
                        />
                      </div>
                    </div>

                    {/* Pickup date */}
                    <div className="bg-white rounded-xl border border-cream p-6">
                      <h2 className="text-xl font-serif font-bold text-charcoal mb-2">Cr&eacute;neau de retrait</h2>
                      <p className="text-sm text-charcoal/50 mb-6">Choisissez la date et l&apos;heure de retrait de votre commande.</p>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-charcoal/70 mb-3">Date de retrait *</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          {availableDates.map(d => (
                            <button
                              key={d.value}
                              onClick={() => updateForm('pickupDate', d.value)}
                              className={`p-3 rounded-xl text-center transition-all duration-200 border ${
                                form.pickupDate === d.value
                                  ? 'bg-wine text-white border-wine shadow-lg shadow-wine/20'
                                  : 'bg-offwhite border-cream hover:border-wine/30 text-charcoal/70 hover:text-wine'
                              }`}
                            >
                              <span className="text-[10px] uppercase font-semibold block opacity-70">{d.dayName}</span>
                              <span className="text-sm font-bold block">{d.label}</span>
                            </button>
                          ))}
                        </div>
                        {errors.pickupDate && <p className="text-red-500 text-xs mt-2">{errors.pickupDate}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-3">Cr&eacute;neau horaire *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {timeSlots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => updateForm('pickupSlot', slot)}
                              className={`py-3 px-4 rounded-xl text-sm font-semibold text-center transition-all duration-200 border ${
                                form.pickupSlot === slot
                                  ? 'bg-wine text-white border-wine shadow-lg shadow-wine/20'
                                  : 'bg-offwhite border-cream hover:border-wine/30 text-charcoal/70 hover:text-wine'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        {errors.pickupSlot && <p className="text-red-500 text-xs mt-2">{errors.pickupSlot}</p>}
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white rounded-xl border border-cream p-6">
                      <h2 className="text-xl font-serif font-bold text-charcoal mb-2">Mode de paiement au retrait</h2>
                      <p className="text-sm text-charcoal/50 mb-6">Le paiement s&apos;effectue au moment du retrait sur place.</p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <button
                          onClick={() => updateForm('paymentMethod', 'card')}
                          className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                            form.paymentMethod === 'card'
                              ? 'border-wine bg-wine/5'
                              : 'border-cream hover:border-wine/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${form.paymentMethod === 'card' ? 'bg-wine text-white' : 'bg-cream text-charcoal/40'}`}>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-charcoal">Carte bancaire</p>
                              <p className="text-xs text-charcoal/50">Paiement par CB au retrait</p>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => updateForm('paymentMethod', 'cash')}
                          className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                            form.paymentMethod === 'cash'
                              ? 'border-wine bg-wine/5'
                              : 'border-cream hover:border-wine/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${form.paymentMethod === 'cash' ? 'bg-wine text-white' : 'bg-cream text-charcoal/40'}`}>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-charcoal">Esp&egrave;ces</p>
                              <p className="text-xs text-charcoal/50">Paiement en liquide au retrait</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Age confirmation */}
                    <div className="bg-white rounded-xl border border-cream p-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.ageConfirmed}
                          onChange={e => updateForm('ageConfirmed', e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-cream text-wine focus:ring-wine/20 accent-wine"
                        />
                        <div>
                          <p className="font-medium text-charcoal text-sm">
                            Je confirme avoir l&apos;&acirc;ge l&eacute;gal requis pour acheter de l&apos;alcool (18 ans minimum). *
                          </p>
                          <p className="text-xs text-charcoal/40 mt-1">
                            L&apos;abus d&apos;alcool est dangereux pour la sant&eacute;. &Agrave; consommer avec mod&eacute;ration.
                          </p>
                        </div>
                      </label>
                      {errors.ageConfirmed && <p className="text-red-500 text-xs mt-2">{errors.ageConfirmed}</p>}
                    </div>
                  </div>

                  {/* Sidebar - Order summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-cream p-6 sticky top-40">
                      <h3 className="font-serif font-bold text-charcoal mb-4">R&eacute;capitulatif</h3>

                      <div className="space-y-3 mb-6">
                        {items.map(item => (
                          <div key={item.product.id} className="flex justify-between text-sm">
                            <span className="text-charcoal/60">
                              {item.product.name} <span className="text-charcoal/40">x{item.quantity}</span>
                            </span>
                            <span className="font-semibold text-charcoal">{(item.product.price * item.quantity).toFixed(2)}&euro;</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-cream pt-4 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-charcoal/60">Total</span>
                          <span className="text-2xl font-bold text-wine">{total.toFixed(2)} &euro;</span>
                        </div>
                      </div>

                      {form.pickupDate && form.pickupSlot && (
                        <div className="bg-cream/30 rounded-lg p-3 mb-4 text-sm">
                          <p className="font-medium text-charcoal/70 mb-1">Retrait pr&eacute;vu :</p>
                          <p className="text-charcoal/60">{form.pickupDate} &middot; {form.pickupSlot}</p>
                        </div>
                      )}

                      <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/20 hover:shadow-xl hover:-translate-y-0.5"
                      >
                        Confirmer la commande
                      </button>

                      <p className="text-xs text-charcoal/40 text-center mt-3">
                        Paiement sur place au moment du retrait
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
