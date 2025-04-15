export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(mins).padStart(2, '0');

  return `${hh}:${mm}:00`;
};
