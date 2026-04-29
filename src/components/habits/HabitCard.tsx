'use client';
import { useState } from 'react';
import { Habit } from '@/types/habit';
import { getHabitSlug } from '@/lib/slug';
import { calculateCurrentStreak } from '@/lib/streaks';
import { useHabits } from '@/hooks/useHabits';

interface HabitCardProps {
  habit: Habit;
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { updateHabit, deleteHabit, toggleCompletion } = useHabits();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  const [editDescription, setEditDescription] = useState(habit.description);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const slug = getHabitSlug(habit.name);
  const today = new Date().toISOString().slice(0, 10);
  const isCompletedToday = habit.completions.includes(today);
  const streak = calculateCurrentStreak(habit.completions);

  const handleToggleComplete = () => {
    toggleCompletion(habit.id, today);
  };

  const handleEdit = () => {
    updateHabit(habit.id, {
      name: editName,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className={`border rounded-lg p-4 shadow-sm transition ${
        isCompletedToday ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'
      }`}
    >
      {!isEditing ? (
        // View mode
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{habit.name}</h3>
              {habit.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{habit.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                data-testid={`habit-edit-${slug}`}
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
              <button
                data-testid={`habit-delete-${slug}`}
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div>
              <span data-testid={`habit-streak-${slug}`} className="text-sm font-medium">
                🔥 Streak: {streak} day{streak !== 1 ? 's' : ''}
              </span>
            </div>
            <button
              data-testid={`habit-complete-${slug}`}
              onClick={handleToggleComplete}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                isCompletedToday
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {isCompletedToday ? '✅ Completed' : '❌ Not done'}
            </button>
          </div>
        </div>
      ) : (
        // Edit mode
        <div className="space-y-3">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700"
            placeholder="Habit name"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700"
            rows={2}
            placeholder="Description (optional)"
          />
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete “{habit.name}”?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                data-testid="confirm-delete-button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}