import { Habit } from "@/types/habit";

export function toggleHabitCompletion(habit: Habit, date: string): Habit {
  const isCompleted = habit.completions.includes(date);
  
  const newCompletions = isCompleted
    ? habit.completions.filter(d => d !== date)
    : [...habit.completions, date];

  // Return a new object to avoid mutation, ensuring unique dates
  return {
    ...habit,
    completions: Array.from(new Set(newCompletions))
  };
}