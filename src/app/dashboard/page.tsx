'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useHabits } from '@/hooks/useHabits';

import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';

export default function DashboardPage() {
  const { session, loading: authLoading, logout } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [session, authLoading, router]);

  if (authLoading) return <div>Loading...</div>;
  if (!session) return null;

  return (
    <div data-testid="dashboard-page" className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <HabitForm />
      <HabitList />
      <button
        data-testid="auth-logout-button"
        onClick={() => logout()} 
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}