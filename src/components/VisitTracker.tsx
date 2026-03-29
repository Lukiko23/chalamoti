'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/lib/storage';

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackVisit(pathname);
  }, [pathname]);

  return null;
}
