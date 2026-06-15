export function formatEventRange(startAt: number, endAt: number, allDay: boolean): string {
  const start = new Date(startAt);
  const end = new Date(endAt);

  if (allDay) {
    return start.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  const date = start.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const startTime = start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const endTime = end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${date} · ${startTime} – ${endTime}`;
}
