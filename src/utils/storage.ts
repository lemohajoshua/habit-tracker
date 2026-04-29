import { User, Session } from '@/types/auth';
import { Habit } from '@/types/habit';

const USERS_KEY = 'habit-tracker-users';
const SESSION_KEY = 'habit-tracker-session';
const HABITS_KEY = 'habit-tracker-habits';

// Helper to check if we are in the browser
const isClient = typeof window !== 'undefined';

export const getUsers = (): User[] => {
  if (!isClient) return [];
  const raw = localStorage.getItem(USERS_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveUsers = (users: User[]) => {
  if (isClient) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

export const getSession = (): Session | null => {
  if (!isClient) return null;
  const raw = localStorage.getItem(SESSION_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveSession = (session: Session | null) => {
  if (!isClient) return;
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

export const getHabits = (): Habit[] => {
  if (!isClient) return [];
  const raw = localStorage.getItem(HABITS_KEY);
  try {
    // If raw is "undefined" (common mistake), JSON.parse crashes. 
    // This check handles that:
    return (raw && raw !== "undefined") ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("JSON Parse Error in getHabits:", e);
    return [];
  }
};

export const saveHabits = (habits: Habit[]) => {
  if (isClient) {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  }
};