'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/LanguageContext';
import CartDrawer from './CartDrawer';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { t } = useTranslation();
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/catalogue', label: t('nav.catalog') },
    { href: '/commander', label: t('nav.order') },
    { href: '/a-propos', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                scrolled ? 'bg-wine' : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-colors ${scrolled ? 'text-gold' : 'text-gold'}`} fill="currentColor">
                  <path d="M12 2C12 2 7 7 7 12c0 2.76 2.24 5 5 5s5-2.24 5-5C17 7 12 2 12 2zm0 14c-1.66 0-3-1.34-3-3 0-2.61 2.04-5.55 3-6.87.96 1.32 3 4.26 3 6.87 0 1.66-1.34 3-3 3z"/>
                  <path d="M12 17v5M9 22h6" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <span className={`text-2xl font-serif font-bold tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-wine' : 'text-white'
              }`}>
                Chalamoti
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                    scrolled
                      ? pathname === link.href
                        ? 'text-wine'
                        : 'text-charcoal/70 hover:text-wine'
                      : pathname === link.href
                        ? 'text-gold'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${scrolled ? 'bg-wine' : 'bg-gold'}`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* User / Admin */}
              {user ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className={`text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full transition-all duration-300 ${
                        scrolled
                          ? 'bg-wine/10 text-wine hover:bg-wine/20'
                          : 'bg-white/10 text-gold hover:bg-white/20'
                      }`}
                    >
                      {t('nav.admin')}
                    </Link>
                  )}
                  <div className="relative group">
                    <button className={`p-2 rounded-full transition-all duration-300 ${
                      scrolled
                        ? 'text-charcoal/60 hover:text-wine hover:bg-wine/5'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-cream opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {/* Profile header */}
                      <div className="p-3 border-b border-cream flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-wine text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {user.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-charcoal truncate">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-charcoal/50 truncate">{user.email}</p>
                        </div>
                      </div>
                      {/* Menu items */}
                      <div className="py-1">
                        <Link href="/profil" className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal/70 hover:bg-cream/50 hover:text-charcoal transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                          {t('nav.profile')}
                        </Link>
                        <Link href="/aide" className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal/70 hover:bg-cream/50 hover:text-charcoal transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                          </svg>
                          {t('nav.help')}
                        </Link>
                      </div>
                      <div className="border-t border-cream">
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-b-xl transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                          </svg>
                          {t('nav.logout')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/connexion"
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-charcoal/70 hover:text-wine'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  {t('nav.login')}
                </Link>
              )}

              {/* Language Switcher */}
              <LanguageSwitcher scrolled={scrolled} />

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'text-charcoal/70 hover:text-wine hover:bg-wine/5'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-wine text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Mobile Menu Button + Cart */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 rounded-full transition-colors ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-wine text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-cream overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                <div className="flex justify-center mb-3">
                  <LanguageSwitcher scrolled={true} />
                </div>
                {links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium tracking-wide uppercase transition-colors ${
                      pathname === link.href
                        ? 'bg-wine/10 text-wine'
                        : 'text-charcoal/70 hover:bg-cream/50 hover:text-wine'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-cream mt-2 pt-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 mb-1">
                        <p className="text-sm font-semibold text-charcoal">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-charcoal/50">{user.email}</p>
                      </div>
                      {isAdmin && (
                        <Link href="/admin" className="block px-4 py-3 rounded-lg text-sm font-bold tracking-wide uppercase text-wine bg-wine/5 hover:bg-wine/10 transition-colors">
                          {t('nav.panel')}
                        </Link>
                      )}
                      <Link href="/profil" className="block px-4 py-3 rounded-lg text-sm font-medium tracking-wide uppercase text-charcoal/70 hover:bg-cream/50 hover:text-wine transition-colors">
                        {t('nav.profile')}
                      </Link>
                      <Link href="/aide" className="block px-4 py-3 rounded-lg text-sm font-medium tracking-wide uppercase text-charcoal/70 hover:bg-cream/50 hover:text-wine transition-colors">
                        {t('nav.help')}
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-3 rounded-lg text-sm font-medium tracking-wide uppercase text-red-500 hover:bg-red-50 transition-colors"
                      >
                        {t('nav.logout')}
                      </button>
                    </>
                  ) : (
                    <Link href="/connexion" className="block px-4 py-3 rounded-lg text-sm font-medium tracking-wide uppercase text-wine hover:bg-wine/5 transition-colors">
                      {t('nav.login')}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer />
    </>
  );
}
