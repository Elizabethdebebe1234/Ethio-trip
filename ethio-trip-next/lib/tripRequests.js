
const STORAGE_KEY = "ethio-trip-requests";

export function getTripRequests() {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const requests = stored ? JSON.parse(stored) : [];

    return Array.isArray(requests) ? requests : [];
  } catch {
    return [];
  }
}

export function createTripRequest(request) {
  const requests = getTripRequests();

  const newRequest = {
    ...request,
    id: crypto.randomUUID(),
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...requests, newRequest])
  );

  return newRequest;
}

export function updateTripRequestStatus(id, status) {
  const allowedStatuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Completed",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid trip status.");
  }

  const requests = getTripRequests();

  const updatedRequests = requests.map((request) =>
    request.id === id ? { ...request, status } : request
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedRequests)
  );

  return updatedRequests;
}
