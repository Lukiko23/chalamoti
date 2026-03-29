'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/lib/storage';

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackVisit(pathname);
    // Only run once on mount, not on every navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
