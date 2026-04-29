'use client';

import { useEffect, useState, useCallback } from 'react';
import { getHabits, saveHabits } from '@/utils/storage';
import { Habit } from '@/types/habit';
import { useAuth } from './useAuth';

export function useHabits() {
  const { session } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setHabits([]);
      setLoading(false);
      return;
    }

    const all: Habit[] = getHabits();
    const userHabits = all.filter((h) => h.userId === session.userId);
    setHabits(userHabits);
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

    const all = getHabits();
    const updated = [...all, newHabit];
    saveHabits(updated);
    
    setHabits((prev) => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    if (!session) return;

    const all = getHabits();
    const updatedAll = all.map((h) => (h.id === id ? { ...h, ...updates } : h));
    
    saveHabits(updatedAll);
    setHabits(updatedAll.filter((h) => h.userId === session.userId));
  };

  const deleteHabit = (id: string) => {
    if (!session) return;

    const all = getHabits();
    const filtered = all.filter((h) => h.id !== id);
    
    saveHabits(filtered);
    setHabits(filtered.filter((h) => h.userId === session.userId));
  };

  const toggleCompletion = (habitId: string, date: string) => {
    if (!session) return;

    const all = getHabits();
    const habitIndex = all.findIndex((h) => h.id === habitId);
    
    if (habitIndex === -1) return;

    const habit = all[habitIndex];
    const isCompleted = habit.completions.includes(date);
    
    const newCompletions = isCompleted
      ? habit.completions.filter((d) => d !== date)
      : [...habit.completions, date];

    const updatedHabit = { ...habit, completions: newCompletions };
    const updatedAll = [...all];
    updatedAll[habitIndex] = updatedHabit;

    saveHabits(updatedAll);
    setHabits(updatedAll.filter((h) => h.userId === session.userId));
  };

  return {
    habits,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
  };
}