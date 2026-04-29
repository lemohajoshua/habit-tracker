export function calculateCurrentStreak(completions: string[], today?: string): number {
  if (!completions.length) return 0;
  
  const currentToday = today || new Date().toISOString().split('T')[0];
  const uniqueDates = Array.from(new Set(completions)).sort().reverse();
  
  if (!uniqueDates.includes(currentToday)) return 0;

  let streak = 0;
  let checkDate = new Date(currentToday);

  for (let i = 0; i < uniqueDates.length; i++) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (uniqueDates.includes(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}