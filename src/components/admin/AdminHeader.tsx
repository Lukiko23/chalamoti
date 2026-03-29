'use client';

import { useAuth } from '@/context/AuthContext';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-cream flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-charcoal/60 hover:text-charcoal rounded-lg hover:bg-cream/50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-serif font-bold text-charcoal">Panel Administration</h1>
          <p className="text-xs text-charcoal/40">G&eacute;rez vos commandes et messages</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-charcoal">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-charcoal/40">{user?.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-wine text-white flex items-center justify-center text-sm font-bold">
          {user?.firstName?.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={logout}
          className="p-2 text-charcoal/40 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          title="Se d&eacute;connecter"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </button>
      </div>
    </header>
  );
}
