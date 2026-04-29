export function calculateCurrentStreak(completions: string[], today?: string): number {
  const todayDate = today ?? new Date().toISOString().slice(0, 10);
  const uniqueSorted = [...new Set(completions)].sort();
  if (!uniqueSorted.includes(todayDate)) return 0;
  
  let streak = 1;
  let current = new Date(todayDate);
  for (let i = 1; i <= 365; i++) {
    const prevDate = new Date(current);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateStr = prevDate.toISOString().slice(0, 10);
    if (uniqueSorted.includes(prevDateStr)) {
      streak++;
      current = prevDate;
    } else {
      break;
    }
  }
  return streak;
}