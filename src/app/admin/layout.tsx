'use client';

import { useState } from 'react';
import AdminProtected from '@/components/admin/AdminProtected';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-offwhite">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminProtected>
  );
}
