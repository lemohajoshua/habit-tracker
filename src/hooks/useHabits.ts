import { useEffect, useState } from 'react';
import { getHabits, saveHabits } from '@/utils/storage';
import { Habit } from '@/types/habit';
import { useAuth } from './useAuth';

export function useHabits() {
  const { session } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const all = getHabits();
      setHabits(all.filter(h => h.userId === session.userId));
    }
    setLoading(false);
  }, [session]);

  const createHabit = (name: string, description: string) => {
    if (!session) return;
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session.userId,
      name,
      description,
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };
    const updated = [...getHabits(), newHabit];
    saveHabits(updated);
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    const all = getHabits();
    const updatedAll = all.map(h => h.id === id ? { ...h, ...updates } : h);
    saveHabits(updatedAll);
    if (session) setHabits(updatedAll.filter(h => h.userId === session.userId));
  };

  const deleteHabit = (id: string) => {
    const all = getHabits();
    const filtered = all.filter(h => h.id !== id);
    saveHabits(filtered);
    if (session) setHabits(filtered.filter(h => h.userId === session.userId));
  };

  const toggleCompletion = (habitId: string, date: string) => {
    const all = getHabits();
    const habit = all.find(h => h.id === habitId);
    if (!habit) return;
    const completions = habit.completions.includes(date)
      ? habit.completions.filter(d => d !== date)
      : [...habit.completions, date];
    const updated = { ...habit, completions: [...new Set(completions)] };
    const updatedAll = all.map(h => h.id === habitId ? updated : h);
    saveHabits(updatedAll);
    if (session) setHabits(updatedAll.filter(h => h.userId === session.userId));
  };

  return { habits, loading, createHabit, updateHabit, deleteHabit, toggleCompletion };
}