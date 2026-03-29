'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
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
    { href: '/', label: 'Accueil' },
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/commander', label: 'Commander' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
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
                      Admin
                    </Link>
                  )}
                  <div className="relative group">
                    <button className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      scrolled
                        ? 'bg-wine text-white'
                        : 'bg-white/20 text-white'
                    }`}>
                      {user.firstName.charAt(0).toUpperCase()}
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-cream opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-3 border-b border-cream">
                        <p className="text-sm font-semibold text-charcoal">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-charcoal/50">{user.email}</p>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-b-xl transition-colors"
                      >
                        Se d&eacute;connecter
                      </button>
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
                  Connexion
                </Link>
              )}

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
                      {isAdmin && (
                        <Link href="/admin" className="block px-4 py-3 rounded-lg text-sm font-bold tracking-wide uppercase text-wine bg-wine/5 hover:bg-wine/10 transition-colors">
                          Panel Admin
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-3 rounded-lg text-sm font-medium tracking-wide uppercase text-red-500 hover:bg-red-50 transition-colors"
                      >
                        D&eacute;connexion
                      </button>
                    </>
                  ) : (
                    <Link href="/connexion" className="block px-4 py-3 rounded-lg text-sm font-medium tracking-wide uppercase text-wine hover:bg-wine/5 transition-colors">
                      Connexion
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
