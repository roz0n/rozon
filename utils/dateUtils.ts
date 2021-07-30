import { DateTime } from "luxon";

function formatDateToLocale(timestamp: string): string {
  const date = DateTime.fromISO(timestamp);
  return date.toLocaleString(DateTime.DATETIME_FULL);
}

export { formatDateToLocale };
