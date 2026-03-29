'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-wine/10 blur-3xl" />
        <div className="grain absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Notre histoire</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">&Agrave; propos de Chalamoti</h1>
            <p className="text-white/50 max-w-xl mx-auto">
              Une passion pour le vin g&eacute;orgien, un engagement pour l&apos;authenticit&eacute;.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-3">
                <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">
                  L&apos;origine d&apos;une passion
                </h2>
                <p className="text-charcoal/60 leading-relaxed mb-4">
                  Chalamoti est n&eacute; d&apos;une rencontre entre deux mondes : la tradition viticole mill&eacute;naire de la G&eacute;orgie
                  et l&apos;exigence du march&eacute; fran&ccedil;ais pour des produits d&apos;exception. Notre mission est simple :
                  vous faire d&eacute;couvrir les meilleurs vins g&eacute;orgiens, s&eacute;lectionn&eacute;s avec soin et import&eacute;s
                  directement depuis les domaines viticoles les plus r&eacute;put&eacute;s de G&eacute;orgie.
                </p>
                <p className="text-charcoal/60 leading-relaxed mb-4">
                  La G&eacute;orgie, situ&eacute;e au carrefour de l&apos;Europe et de l&apos;Asie, est reconnue comme le berceau
                  de la viticulture mondiale. Des fouilles arch&eacute;ologiques ont r&eacute;v&eacute;l&eacute; des traces de
                  vinification datant de plus de 8 000 ans, faisant de cette r&eacute;gion du Caucase le lieu de naissance
                  du vin tel que nous le connaissons.
                </p>
                <p className="text-charcoal/60 leading-relaxed">
                  Chez Chalamoti, nous croyons que chaque bouteille est une invitation au voyage.
                  Un voyage vers des paysages grandioses, des traditions ancestrales et des saveurs uniques
                  qui ne demandent qu&apos;&agrave; &ecirc;tre partag&eacute;es.
                </p>
              </div>
              <div className="md:col-span-2">
                <div className="bg-cream/40 rounded-2xl p-8 border border-cream">
                  <div className="space-y-6">
                    {[
                      { label: 'Fondée en', value: '2024' },
                      { label: 'Origine des vins', value: 'Géorgie' },
                      { label: 'Région principale', value: 'Kakhétie' },
                      { label: 'Sélection', value: '5 références' },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <p className="text-xs text-charcoal/40 uppercase tracking-wide">{item.label}</p>
                        <p className="text-lg font-serif font-bold text-wine">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Notre philosophie"
            title="Ce qui nous anime"
            description="Des valeurs fortes qui guident chacune de nos décisions."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {[
              {
                title: 'Authenticité',
                desc: 'Nous sélectionnons exclusivement des vins géorgiens authentiques, élaborés à partir de cépages autochtones. Pas de compromis, pas d\’imitation : que du vrai.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                ),
              },
              {
                title: 'Qualité',
                desc: 'Chaque vin de notre catalogue a été goûté, analysé et validé par nos soins. Nous ne proposons que des crus qui répondent à nos standards d\’excellence.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
              },
              {
                title: 'Proximité',
                desc: 'Nous croyons au lien direct. Pas d\’intermédiaires inutiles, pas de logistique complexe. Vous commandez, vous venez chercher, vous dégustez. Simple et humain.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-8 rounded-2xl border border-cream shadow-sm text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-wine/10 text-wine flex items-center justify-center mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Georgian wine heritage */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            light
            subtitle="Savoir-faire ancestral"
            title="L'héritage viticole géorgien"
          />
          <motion.div {...fadeUp} className="space-y-6 text-white/60 leading-relaxed">
            <p>
              La G&eacute;orgie abrite plus de 525 c&eacute;pages autochtones, une richesse
              amp&eacute;lographique in&eacute;gal&eacute;e dans le monde. Les vignerons g&eacute;orgiens
              utilisent encore la m&eacute;thode traditionnelle de vinification en Qvevri &mdash; de grandes
              jarres en argile enterr&eacute;es dans le sol &mdash; une technique vieille de plusieurs mill&eacute;naires
              inscrite au patrimoine culturel immat&eacute;riel de l&apos;UNESCO depuis 2013.
            </p>
            <p>
              La r&eacute;gion de Kakh&eacute;tie, d&apos;o&ugrave; proviennent nos vins, est le c&oelig;ur
              battant de la viticulture g&eacute;orgienne. Ses vall&eacute;es fertiles, son climat temp&eacute;r&eacute;
              et ses sols riches offrent des conditions id&eacute;ales pour la culture de cépages d&apos;exception
              comme le Saperavi et le Rkatsiteli.
            </p>
            <p>
              Choisir Chalamoti, c&apos;est choisir de soutenir un h&eacute;ritage vivant,
              de go&ucirc;ter &agrave; l&apos;histoire et de partager un moment d&apos;authenticit&eacute;.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-wine relative overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Pr&ecirc;t &agrave; d&eacute;couvrir nos vins ?
            </h2>
            <p className="text-white/60 mb-8">
              Explorez notre catalogue et laissez-vous s&eacute;duire par l&apos;authenticit&eacute; du vin g&eacute;orgien.
            </p>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold rounded-xl hover:bg-gold-light transition-all duration-300"
            >
              D&eacute;couvrir le catalogue
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
