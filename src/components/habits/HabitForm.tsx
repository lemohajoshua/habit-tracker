'use client';
import { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { validateHabitName } from '@/lib/validators';

export default function HabitForm() {
  const { createHabit } = useHabits();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateHabitName(name);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    createHabit(validation.value, description);
    setName('');
    setDescription('');
    setError(null);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        data-testid="create-habit-button"
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Create Habit
      </button>

      {isOpen && (
        <form
          data-testid="habit-form"
          onSubmit={handleSubmit}
          className="mt-4 p-4 border rounded-lg space-y-3 bg-white dark:bg-gray-800"
        >
          <div>
            <label className="block font-medium mb-1">Habit Name *</label>
            <input
              data-testid="habit-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700"
              placeholder="e.g., Drink water"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Description (optional)</label>
            <textarea
              data-testid="habit-description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700"
              rows={2}
              placeholder="Why do you want to build this habit?"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Frequency</label>
            <select
              data-testid="habit-frequency-select"
              className="w-full p-2 border rounded dark:bg-gray-700"
              defaultValue="daily"
              disabled
            >
              <option value="daily">Daily</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Only daily frequency is supported in this version.</p>
          </div>

          <div className="flex gap-3">
            <button
              data-testid="habit-save-button"
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Save Habit
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}