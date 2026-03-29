'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from '@/i18n/LanguageContext';

export default function ProfilPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [showTicket, setShowTicket] = useState(false);
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-8 h-8 border-4 border-wine/20 border-t-wine rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    router.push('/connexion');
    return null;
  }

  const handleTicketSubmit = async () => {
    if (!ticketMessage.trim()) return;
    try {
      const { saveMessage } = await import('@/lib/storage');
      await saveMessage({
        id: `ticket-${Date.now()}`,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: '',
        message: `[TICKET] ${ticketMessage}`,
        createdAt: new Date().toISOString(),
        read: false,
        replied: false,
      });
      setTicketSent(true);
      setTicketMessage('');
      setTimeout(() => {
        setTicketSent(false);
        setShowTicket(false);
      }, 3000);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-offwhite pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-cream overflow-hidden">
            {/* Header banner */}
            <div className="h-24 bg-gradient-to-r from-wine to-wine/80" />
            <div className="px-6 pb-6 -mt-10">
              <div className="flex items-end gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-wine text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-lg">
                  {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
                </div>
                <div className="pb-1">
                  <h1 className="text-xl font-serif font-bold text-charcoal">{user.firstName} {user.lastName}</h1>
                  <p className="text-sm text-charcoal/50">{user.role === 'admin' ? t('profile.admin') : t('profile.customer')}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-cream/30 rounded-xl">
                  <svg className="w-5 h-5 text-wine flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div>
                    <p className="text-xs text-charcoal/40">{t('profile.email')}</p>
                    <p className="text-sm font-medium text-charcoal">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-cream/30 rounded-xl">
                  <svg className="w-5 h-5 text-wine flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <div>
                    <p className="text-xs text-charcoal/40">{t('profile.role')}</p>
                    <p className="text-sm font-medium text-charcoal">{user.role === 'admin' ? t('profile.admin') : t('profile.customer')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            {/* Create Ticket */}
            <button
              onClick={() => setShowTicket(!showTicket)}
              className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl border border-cream hover:border-wine/20 hover:shadow-md transition-all text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">{t('profile.ticket')}</p>
                <p className="text-xs text-charcoal/40">{t('profile.ticket.desc')}</p>
              </div>
              <svg className={`w-5 h-5 text-charcoal/30 ml-auto transition-transform ${showTicket ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {showTicket && (
              <div className="bg-white rounded-2xl border border-cream p-5 space-y-4">
                {ticketSent ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <p className="text-sm text-green-700">{t('profile.ticket.success')}</p>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={ticketMessage}
                      onChange={e => setTicketMessage(e.target.value)}
                      placeholder={t('profile.ticket.placeholder')}
                      className="w-full p-4 rounded-xl border border-cream bg-cream/20 focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine resize-none h-28 text-sm transition-colors"
                    />
                    <button
                      onClick={handleTicketSubmit}
                      disabled={!ticketMessage.trim()}
                      className="px-6 py-2.5 bg-wine text-white rounded-xl text-sm font-medium hover:bg-wine/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {t('profile.ticket.submit')}
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Logout */}
            <button
              onClick={async () => { await logout(); router.push('/'); }}
              className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl border border-cream hover:border-red-200 hover:shadow-md transition-all text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-red-500">{t('profile.logout')}</p>
                <p className="text-xs text-charcoal/40">{t('profile.logout.desc')}</p>
              </div>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
