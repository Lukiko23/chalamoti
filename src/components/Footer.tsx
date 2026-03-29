import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
                  <path d="M12 2C12 2 7 7 7 12c0 2.76 2.24 5 5 5s5-2.24 5-5C17 7 12 2 12 2z"/>
                  <path d="M12 17v5M9 22h6" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-2xl font-serif font-bold text-white">Chalamoti</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mt-2">
              Vins géorgiens d&apos;exception, issus d&apos;un savoir-faire millénaire.
              Authenticité, qualité et passion du terroir.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/catalogue', label: 'Catalogue' },
                { href: '/commander', label: 'Commander' },
                { href: '/a-propos', label: 'À propos' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Informations</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/mentions-legales" className="text-white/50 hover:text-gold transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales#cgv" className="text-white/50 hover:text-gold transition-colors text-sm">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales#confidentialite" className="text-white/50 hover:text-gold transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales#retrait" className="text-white/50 hover:text-gold transition-colors text-sm">
                  Conditions de retrait
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>12 Rue du Vignoble<br />75011 Paris, France</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>contact@chalamoti.fr</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Lun - Sam : 10h - 18h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Chalamoti. Tous droits réservés.
          </p>
          <p className="text-white/30 text-xs">
            L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </div>
    </footer>
  );
}
