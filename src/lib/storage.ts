import { db } from './firebase';
import {
  collection, doc, getDocs, getDoc, setDoc, updateDoc,
  query, orderBy
} from 'firebase/firestore';
import { Order, ContactMessage, OrderStatus } from '@/types';

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
