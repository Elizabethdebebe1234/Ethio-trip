export const formatETB = (amount) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

export const formatEthiopianDateTime = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-ET", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Addis_Ababa",
  }).format(parsedDate);
};

export const formatEthiopianDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-ET", {
    dateStyle: "medium",
    timeZone: "Africa/Addis_Ababa",
  }).format(parsedDate);
};

export const formatRelativeTime = (date) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Time unavailable";
  }

  const seconds = Math.round(
    (parsedDate.getTime() - Date.now()) / 1000
  );

  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [unit, unitSeconds] of units) {
    if (Math.abs(seconds) >= unitSeconds || unit === "second") {
      return formatter.format(
        Math.round(seconds / unitSeconds),
        unit
      );
    }
  }
};
