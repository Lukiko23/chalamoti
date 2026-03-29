'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { products } from '@/data/products';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const featuredProducts = products.filter(p => p.category === 'bouteille');

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-charcoal">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-wine/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
          <div className="grain absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-6">
                  Vins g&eacute;orgiens d&apos;exception
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6"
              >
                L&apos;art du vin
                <br />
                <span className="text-gold">g&eacute;orgien</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-white/60 max-w-lg leading-relaxed mb-10"
              >
                D&eacute;couvrez une s&eacute;lection de vins authentiques issus du berceau de la viticulture.
                8 000 ans de tradition, une qualit&eacute; d&apos;exception.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/catalogue"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-lg shadow-wine/30 hover:shadow-xl hover:shadow-wine/40 hover:-translate-y-0.5"
                >
                  D&eacute;couvrir le catalogue
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/commander"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold/40 text-gold font-semibold rounded-xl hover:bg-gold/10 hover:border-gold transition-all duration-300"
                >
                  Commander
                </Link>
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-wine/20 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="animate-float relative z-10 glass rounded-3xl p-12">
                  <svg viewBox="0 0 120 200" className="w-32 h-48 text-gold/80 mx-auto" fill="currentColor">
                    <rect x="50" y="0" width="20" height="40" rx="4" opacity="0.9" />
                    <path d="M50 40 C50 40, 20 70, 20 110 L20 175 C20 185, 28 193, 38 193 L82 193 C92 193, 100 185, 100 175 L100 110 C100 70, 70 40, 70 40 Z" opacity="0.6" />
                    <ellipse cx="60" cy="140" rx="25" ry="30" opacity="0.15" />
                    <text x="60" y="155" textAnchor="middle" fontSize="18" fontFamily="serif" fontWeight="bold" opacity="0.5">C</text>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== INTRODUCTION ========== */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Notre histoire
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal leading-tight mb-6">
                Chalamoti, l&apos;essence de la
                <span className="text-wine"> G&eacute;orgie</span> dans votre verre
              </h2>
              <p className="text-charcoal/60 leading-relaxed mb-4">
                La G&eacute;orgie est le berceau de la viticulture mondiale, avec plus de 8 000 ans d&apos;histoire viticole.
                Chalamoti perp&eacute;tue cette tradition ancestrale en vous proposant des vins d&apos;une authenticit&eacute; rare,
                &eacute;labor&eacute;s &agrave; partir de c&eacute;pages autochtones cultiv&eacute;s avec passion.
              </p>
              <p className="text-charcoal/60 leading-relaxed mb-8">
                Chaque bouteille Chalamoti raconte l&apos;histoire d&apos;un terroir unique, d&apos;un climat privil&eacute;gi&eacute;
                et d&apos;un savoir-faire transmis de g&eacute;n&eacute;ration en g&eacute;n&eacute;ration.
              </p>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 text-wine font-semibold hover:gap-3 transition-all duration-300"
              >
                D&eacute;couvrir notre histoire
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: '8 000+', label: 'Ans de tradition viticole' },
                { num: '525', label: 'Cépages autochtones' },
                { num: '100%', label: 'Vins authentiques' },
                { num: 'Qvevri', label: 'Vinification traditionnelle' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white p-6 rounded-2xl border border-cream shadow-sm text-center"
                >
                  <div className="text-2xl font-serif font-bold text-wine mb-1">{stat.num}</div>
                  <div className="text-xs text-charcoal/50 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== POURQUOI CHALAMOTI ========== */}
      <section className="py-24 bg-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Nos engagements"
            title="Pourquoi choisir Chalamoti ?"
            description="Des vins d'exception, une expérience d'achat simple et un engagement qualité sans compromis."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: 'Authenticité garantie',
                desc: 'Des vins 100% géorgiens, issus de cépages autochtones et vinifiés selon des méthodes traditionnelles éprouvées.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
                title: 'Qualité premium',
                desc: 'Une sélection rigoureuse des meilleurs crus géorgiens. Chaque vin est choisi pour son caractère unique et son excellence.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
                title: 'Passion & savoir-faire',
                desc: 'Derrière chaque bouteille, des vignerons passionnés et un héritage millénaire. Le vin géorgien est bien plus qu\'une boisson, c\'est une culture.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl border border-cream shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-wine/10 text-wine flex items-center justify-center mb-5 group-hover:bg-wine group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRODUITS PHARES ========== */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Notre sélection"
            title="Nos vins phares"
            description="Découvrez nos cuvées emblématiques, reflets du meilleur de la viticulture géorgienne."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-wine/20 text-wine font-semibold rounded-xl hover:bg-wine hover:text-white transition-all duration-300"
            >
              Voir tout le catalogue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== AUTHENTICITE ========== */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 grain" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-wine/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            light
            subtitle="Héritage millénaire"
            title="L'authenticité du vin géorgien"
            description="La Géorgie, berceau de la viticulture, cultive la vigne depuis plus de 8 000 ans. Un héritage unique au monde."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {[
              { title: 'Qvevri', desc: 'Vinification en jarres d\'argile enterrées, méthode ancestrale classée par l\'UNESCO.' },
              { title: '525 cépages', desc: 'La Géorgie possède l\'une des plus grandes diversités de cépages au monde.' },
              { title: 'Terroir unique', desc: 'Un climat idéal entre mer Noire et Caucase, des sols riches et variés.' },
              { title: 'UNESCO', desc: 'La méthode de vinification géorgienne en Qvevri est inscrite au patrimoine immatériel.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-500"
              >
                <h3 className="text-gold font-serif font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMMENT CA MARCHE ========== */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Simple & rapide"
            title="Comment commander ?"
            description="En quelques clics, réservez vos vins préférés et venez les récupérer quand vous le souhaitez."
          />

          <div className="grid md:grid-cols-4 gap-8 mt-4">
            {[
              {
                step: '01',
                title: 'Choisissez',
                desc: 'Parcourez notre catalogue et sélectionnez vos vins préférés.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Commandez',
                desc: 'Remplissez le formulaire et choisissez votre créneau de retrait.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Retirez',
                desc: 'Venez récupérer votre commande au créneau choisi, sans attente.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
              },
              {
                step: '04',
                title: 'Payez',
                desc: 'Réglez sur place en espèces ou par carte bancaire. Simple et flexible.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-wine/10 text-wine flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <span className="text-gold/40 text-3xl font-serif font-bold">{item.step}</span>
                <h3 className="text-lg font-serif font-bold text-charcoal mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== REASSURANCE ========== */}
      <section className="py-16 bg-cream/40 border-y border-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Commande simple', sub: 'En quelques clics', icon: '🛒' },
              { label: 'Retrait pratique', sub: 'Sur place, sans attente', icon: '📍' },
              { label: 'Paiement flexible', sub: 'Espèces ou carte', icon: '💳' },
              { label: 'Vins authentiques', sub: '100% géorgiens', icon: '✅' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <p className="font-semibold text-charcoal text-sm">{item.label}</p>
                <p className="text-xs text-charcoal/50 mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-24 bg-wine relative overflow-hidden">
        <div className="absolute inset-0 grain" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-black/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block text-gold/80 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Pr&ecirc;t &agrave; d&eacute;guster ?
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
              Offrez-vous le meilleur du vin g&eacute;orgien
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Commandez d&egrave;s maintenant et venez r&eacute;cup&eacute;rer vos vins au cr&eacute;neau de votre choix.
              Paiement sur place, en toute simplicit&eacute;.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explorer le catalogue
              </Link>
              <Link
                href="/commander"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Commander maintenant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
