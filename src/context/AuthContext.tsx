'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AuthUser } from '@/types';

const ADMIN_EMAIL = 'lucamatiashvili@gmail.com';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: string }>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<{ success: boolean; error?: string; role?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getUserProfile(uid: string): Promise<AuthUser | null> {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      const data = snap.data();
      return {
        id: uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string; role?: string }> => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(cred.user.uid);
      if (profile) {
        setUser(profile);
        return { success: true, role: profile.role };
      }
      return { success: true, role: 'customer' };
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
        return { success: false, error: 'Email ou mot de passe incorrect.' };
      }
      if (code === 'auth/wrong-password') {
        return { success: false, error: 'Mot de passe incorrect.' };
      }
      if (code === 'auth/too-many-requests') {
        return { success: false, error: 'Trop de tentatives. R\u00e9essayez plus tard.' };
      }
      return { success: false, error: 'Erreur de connexion. V\u00e9rifiez vos identifiants.' };
    }
  }, []);

  const register = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string }): Promise<{ success: boolean; error?: string; role?: string }> => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const isAdmin = data.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const role: 'admin' | 'customer' = isAdmin ? 'admin' : 'customer';

      const profile = {
        email: data.email.toLowerCase(),
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: new Date().toISOString(),
        role,
      };
      await setDoc(doc(db, 'users', cred.user.uid), profile);

      const authUser: AuthUser = {
        id: cred.user.uid,
        ...profile,
      };
      setUser(authUser);
      return { success: true, role };
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/email-already-in-use') {
        return { success: false, error: 'Un compte existe d\u00e9j\u00e0 avec cet email.' };
      }
      if (code === 'auth/weak-password') {
        return { success: false, error: 'Le mot de passe doit contenir au moins 6 caract\u00e8res.' };
      }
      return { success: false, error: 'Erreur lors de l\'inscription.' };
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
