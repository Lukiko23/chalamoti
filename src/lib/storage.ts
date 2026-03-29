import { db } from './firebase';
import {
  collection, doc, getDocs, getDoc, setDoc, updateDoc, addDoc,
  query, orderBy, where
} from 'firebase/firestore';
import { Order, ContactMessage, OrderStatus, User } from '@/types';

// ---- ORDERS ----

export async function getAllOrders(): Promise<Order[]> {
  try {
    const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
    return snap.docs.map(d => d.data() as Order);
  } catch {
    return [];
  }
}

export async function getOrderById(orderId: string): Promise<Order | undefined> {
  try {
    const snap = await getDoc(doc(db, 'orders', orderId));
    return snap.exists() ? (snap.data() as Order) : undefined;
  } catch {
    return undefined;
  }
}

export async function saveOrder(order: Order): Promise<void> {
  await setDoc(doc(db, 'orders', order.id), order);
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  await updateDoc(doc(db, 'orders', orderId), { status });
}

// ---- MESSAGES ----

export async function getAllMessages(): Promise<ContactMessage[]> {
  try {
    const snap = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc')));
    return snap.docs.map(d => d.data() as ContactMessage);
  } catch {
    return [];
  }
}

export async function saveMessage(message: ContactMessage): Promise<void> {
  await setDoc(doc(db, 'messages', message.id), message);
}

export async function markMessageAsRead(messageId: string): Promise<void> {
  await updateDoc(doc(db, 'messages', messageId), { read: true });
}

export async function replyToMessage(messageId: string, replyText: string): Promise<void> {
  await updateDoc(doc(db, 'messages', messageId), {
    replied: true,
    replyText,
    repliedAt: new Date().toISOString(),
    read: true,
  });
}

// ---- USERS ----

export async function getAllUsers(): Promise<User[]> {
  try {
    const snap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as User));
  } catch {
    return [];
  }
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const snap = await getDocs(query(collection(db, 'users'), where('email', '==', email)));
    if (snap.empty) return undefined;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as User;
  } catch {
    return undefined;
  }
}

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  try {
    const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
    return snap.docs
      .map(d => d.data() as Order)
      .filter(o => o.info.email.toLowerCase() === email.toLowerCase());
  } catch {
    return [];
  }
}

// ---- VISITS ----

interface VisitorInfo {
  ip: string;
  city: string;
  country: string;
  region: string;
}

async function getVisitorInfo(): Promise<VisitorInfo | null> {
  try {
    const res = await fetch('http://ip-api.com/json/?fields=query,city,regionName,country', { cache: 'no-store' });
    const data = await res.json();
    return {
      ip: data.query || '',
      city: data.city || '',
      country: data.country || '',
      region: data.regionName || '',
    };
  } catch {
    // Fallback: get IP only
    try {
      const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
      const data = await res.json();
      return { ip: data.ip || '', city: '', country: '', region: '' };
    } catch {
      return null;
    }
  }
}

export async function trackVisit(page: string): Promise<void> {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    // Check sessionStorage to avoid repeated calls within same session
    if (typeof window !== 'undefined') {
      const tracked = sessionStorage.getItem('visit_tracked');
      if (tracked === todayStr) return;
    }

    const info = await getVisitorInfo();
    if (!info || !info.ip) return;

    // Check if this IP already visited today
    const existing = await getDocs(
      query(
        collection(db, 'visits'),
        where('date', '==', todayStr),
        where('ip', '==', info.ip)
      )
    );

    if (existing.empty) {
      await addDoc(collection(db, 'visits'), {
        page,
        ip: info.ip,
        city: info.city,
        country: info.country,
        region: info.region,
        timestamp: new Date().toISOString(),
        date: todayStr,
      });
    }

    // Mark this session as tracked for today
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('visit_tracked', todayStr);
    }
  } catch { /* ignore */ }
}

export interface VisitRecord {
  ip: string;
  city: string;
  country: string;
  region: string;
  date: string;
  timestamp: string;
  page: string;
}

export async function getAllVisits(): Promise<VisitRecord[]> {
  try {
    const snap = await getDocs(query(collection(db, 'visits'), orderBy('date', 'desc')));
    return snap.docs.map(d => d.data() as VisitRecord);
  } catch {
    return [];
  }
}

export interface VisitStats {
  today: number;
  week: number;
  month: number;
  dailyCounts: { date: string; count: number }[];
}

export async function getVisitStats(): Promise<VisitStats> {
  try {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString().split('T')[0];
    const monthAgo = new Date(now.getTime() - 30 * 86400000).toISOString().split('T')[0];

    const snap = await getDocs(
      query(collection(db, 'visits'), where('date', '>=', monthAgo), orderBy('date', 'asc'))
    );

    let today = 0;
    let week = 0;
    const month = snap.size;
    const countMap: Record<string, number> = {};

    // Fill last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400000).toISOString().split('T')[0];
      countMap[d] = 0;
    }

    snap.docs.forEach(d => {
      const date = d.data().date as string;
      if (date === todayStr) today++;
      if (date >= weekAgo) week++;
      if (date in countMap) countMap[date]++;
    });

    const dailyCounts = Object.entries(countMap).map(([date, count]) => ({ date, count }));

    return { today, week, month, dailyCounts };
  } catch {
    return { today: 0, week: 0, month: 0, dailyCounts: [] };
  }
}
