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

// ---- VISITS ----

export async function trackVisit(page: string): Promise<void> {
  try {
    await addDoc(collection(db, 'visits'), {
      page,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
    });
  } catch { /* ignore */ }
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
