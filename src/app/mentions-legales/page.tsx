'use client';

import { motion } from 'framer-motion';

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="grain absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Mentions l&eacute;gales</h1>
            <p className="text-white/50">Informations l&eacute;gales, CGV et politique de confidentialit&eacute;</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Mentions légales */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">Mentions l&eacute;gales</h2>
            <div className="bg-white rounded-xl border border-cream p-6 space-y-4 text-sm text-charcoal/70 leading-relaxed">
              <p><strong className="text-charcoal">Raison sociale :</strong> Chalamoti</p>
              <p><strong className="text-charcoal">Forme juridique :</strong> [&Agrave; compl&eacute;ter]</p>
              <p><strong className="text-charcoal">Si&egrave;ge social :</strong> 12 Rue du Vignoble, 75011 Paris, France</p>
              <p><strong className="text-charcoal">T&eacute;l&eacute;phone :</strong> +33 1 23 45 67 89</p>
              <p><strong className="text-charcoal">Email :</strong> contact@chalamoti.fr</p>
              <p><strong className="text-charcoal">SIRET :</strong> [&Agrave; compl&eacute;ter]</p>
              <p><strong className="text-charcoal">Num&eacute;ro de TVA intracommunautaire :</strong> [&Agrave; compl&eacute;ter]</p>
              <p><strong className="text-charcoal">Directeur de la publication :</strong> [&Agrave; compl&eacute;ter]</p>
              <p><strong className="text-charcoal">H&eacute;bergeur :</strong> [&Agrave; compl&eacute;ter]</p>
              <p className="pt-2">
                L&apos;abus d&apos;alcool est dangereux pour la sant&eacute;. &Agrave; consommer avec mod&eacute;ration.
                La vente d&apos;alcool est interdite aux mineurs de moins de 18 ans.
              </p>
            </div>
          </div>

          {/* CGV */}
          <div id="cgv">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">Conditions g&eacute;n&eacute;rales de vente</h2>
            <div className="bg-white rounded-xl border border-cream p-6 space-y-4 text-sm text-charcoal/70 leading-relaxed">
              <h3 className="font-bold text-charcoal text-base">Article 1 &mdash; Objet</h3>
              <p>Les pr&eacute;sentes conditions g&eacute;n&eacute;rales de vente r&eacute;gissent les relations contractuelles entre Chalamoti et ses clients dans le cadre de la vente de vins avec retrait sur place.</p>

              <h3 className="font-bold text-charcoal text-base">Article 2 &mdash; Produits</h3>
              <p>Les vins propos&eacute;s &agrave; la vente sont des vins g&eacute;orgiens authentiques. Les photos des produits sont non contractuelles. Chalamoti se r&eacute;serve le droit de modifier sa gamme de produits &agrave; tout moment.</p>

              <h3 className="font-bold text-charcoal text-base">Article 3 &mdash; Prix</h3>
              <p>Les prix sont indiqu&eacute;s en euros TTC. Chalamoti se r&eacute;serve le droit de modifier ses prix &agrave; tout moment, &eacute;tant entendu que les produits command&eacute;s seront factur&eacute;s sur la base des tarifs en vigueur au moment de la validation de la commande.</p>

              <h3 className="font-bold text-charcoal text-base">Article 4 &mdash; Commande</h3>
              <p>La commande est valid&eacute;e lorsque le client a rempli le formulaire de commande en ligne et confirm&eacute; sa commande. La commande constitue une r&eacute;servation de produits pour retrait sur place au cr&eacute;neau choisi.</p>

              <h3 className="font-bold text-charcoal text-base">Article 5 &mdash; Paiement</h3>
              <p>Le paiement s&apos;effectue exclusivement sur place, au moment du retrait de la commande. Les modes de paiement accept&eacute;s sont les esp&egrave;ces et la carte bancaire.</p>

              <h3 className="font-bold text-charcoal text-base">Article 6 &mdash; Retrait</h3>
              <p>Le client s&apos;engage &agrave; retirer sa commande au cr&eacute;neau horaire choisi lors de la commande. En cas d&apos;emp&ecirc;chement, le client doit contacter Chalamoti pour convenir d&apos;un nouveau cr&eacute;neau. Les commandes non retir&eacute;es dans un d&eacute;lai de 48 heures apr&egrave;s le cr&eacute;neau initial pourront &ecirc;tre annul&eacute;es.</p>

              <h3 className="font-bold text-charcoal text-base">Article 7 &mdash; V&eacute;rification de l&apos;&acirc;ge</h3>
              <p>Conform&eacute;ment &agrave; la l&eacute;gislation en vigueur, la vente d&apos;alcool est interdite aux mineurs. Le client confirme avoir l&apos;&acirc;ge l&eacute;gal requis (18 ans minimum) lors de la commande. Une pi&egrave;ce d&apos;identit&eacute; pourra &ecirc;tre demand&eacute;e lors du retrait.</p>

              <h3 className="font-bold text-charcoal text-base">Article 8 &mdash; Annulation</h3>
              <p>Le client peut annuler sa commande en contactant Chalamoti par t&eacute;l&eacute;phone ou par email au moins 24 heures avant le cr&eacute;neau de retrait pr&eacute;vu.</p>
            </div>
          </div>

          {/* Confidentialité */}
          <div id="confidentialite">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">Politique de confidentialit&eacute;</h2>
            <div className="bg-white rounded-xl border border-cream p-6 space-y-4 text-sm text-charcoal/70 leading-relaxed">
              <h3 className="font-bold text-charcoal text-base">Collecte des donn&eacute;es</h3>
              <p>Chalamoti collecte les donn&eacute;es personnelles n&eacute;cessaires au traitement des commandes : pr&eacute;nom, nom, adresse e-mail, num&eacute;ro de t&eacute;l&eacute;phone. Ces donn&eacute;es sont collect&eacute;es lors de la passation de commande ou de l&apos;utilisation du formulaire de contact.</p>

              <h3 className="font-bold text-charcoal text-base">Utilisation des donn&eacute;es</h3>
              <p>Les donn&eacute;es personnelles sont utilis&eacute;es uniquement dans le cadre du traitement des commandes et de la communication avec les clients. Elles ne sont en aucun cas c&eacute;d&eacute;es &agrave; des tiers.</p>

              <h3 className="font-bold text-charcoal text-base">Conservation des donn&eacute;es</h3>
              <p>Les donn&eacute;es personnelles sont conserv&eacute;es pour la dur&eacute;e n&eacute;cessaire au traitement de la commande et conform&eacute;ment aux obligations l&eacute;gales en vigueur.</p>

              <h3 className="font-bold text-charcoal text-base">Droits des utilisateurs</h3>
              <p>Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la Protection des Donn&eacute;es (RGPD), vous disposez d&apos;un droit d&apos;acc&egrave;s, de rectification, de suppression et de portabilit&eacute; de vos donn&eacute;es. Pour exercer ces droits, contactez-nous &agrave; contact@chalamoti.fr.</p>

              <h3 className="font-bold text-charcoal text-base">Cookies</h3>
              <p>Ce site utilise des cookies techniques n&eacute;cessaires &agrave; son bon fonctionnement (panier, pr&eacute;f&eacute;rences). Aucun cookie de tra&ccedil;age publicitaire n&apos;est utilis&eacute;.</p>
            </div>
          </div>

          {/* Conditions de retrait */}
          <div id="retrait">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">Conditions de retrait</h2>
            <div className="bg-white rounded-xl border border-cream p-6 space-y-4 text-sm text-charcoal/70 leading-relaxed">
              <p><strong className="text-charcoal">Adresse de retrait :</strong> 12 Rue du Vignoble, 75011 Paris</p>
              <p><strong className="text-charcoal">Horaires de retrait :</strong> Du lundi au samedi, de 10h &agrave; 18h (selon le cr&eacute;neau choisi)</p>
              <p><strong className="text-charcoal">Cr&eacute;neaux disponibles :</strong> 10h-12h, 12h-14h, 14h-16h, 16h-18h</p>
              <p>Le client devra pr&eacute;senter son num&eacute;ro de commande (re&ccedil;u par confirmation) lors du retrait. Une pi&egrave;ce d&apos;identit&eacute; pourra &ecirc;tre demand&eacute;e pour v&eacute;rifier la majorit&eacute; de l&apos;acheteur.</p>
              <p>En cas de retard ou d&apos;emp&ecirc;chement, merci de nous contacter par t&eacute;l&eacute;phone au +33 1 23 45 67 89 ou par email &agrave; contact@chalamoti.fr pour reporter votre cr&eacute;neau.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
