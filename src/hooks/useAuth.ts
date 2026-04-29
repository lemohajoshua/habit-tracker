import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, saveSession, getUsers, saveUsers } from '@/utils/storage';
import { User, Session } from '@/types/auth';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setSession(getSession());
    setLoading(false);
  }, []);

  const signup = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'User already exists' };
    }
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    const newSession: Session = { userId: newUser.id, email: newUser.email };
    saveSession(newSession);
    setSession(newSession);
    return { success: true };
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }
    const newSession: Session = { userId: user.id, email: user.email };
    saveSession(newSession);
    setSession(newSession);
    return { success: true };
  };

  const logout = () => {
    saveSession(null);
    setSession(null);
    router.push('/login');
  };

  return { session, loading, signup, login, logout };
}