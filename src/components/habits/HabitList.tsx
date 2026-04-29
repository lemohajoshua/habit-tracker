'use client';
import { useHabits } from '@/hooks/useHabits';

export default function HabitList() {
  const { habits, loading, toggleCompletion, deleteHabit } = useHabits();

  if (loading) return <div className="animate-pulse">Loading habits...</div>;

  if (habits.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">No habits created yet. Start by adding one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <div 
          key={habit.id} 
          data-testid="habit-item"
          className="p-4 border rounded-lg flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm"
        >
          <div>
            <h3 className="font-bold text-lg">{habit.name}</h3>
            {habit.description && <p className="text-sm text-gray-600 dark:text-gray-400">{habit.description}</p>}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => toggleCompletion(habit.id, new Date().toISOString().split('T')[0])}
              className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
            >
              Check
            </button>
            <button
              onClick={() => deleteHabit(habit.id)}
              className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}