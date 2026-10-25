# Data Fetching, Caching, and Revalidation

## Overview

Ethio-Trip uses a combination of local destination data, API routes, browser storage, and data-fetching techniques.

## Data Sources

- Destination information is provided through the project's destination data module.
- API routes provide application data where implemented.
- Trip history and itinerary information may be stored in browser localStorage.
- Session information is checked through the authentication session API.

## Data Fetching

The application uses JavaScript fetch requests to communicate with API routes, including authentication and trip-related endpoints.

SWR is used in the parts of the application where it has been implemented. SWR can manage loading states, cached responses, and revalidation.

## Caching and Revalidation

SWR can reuse cached data and revalidate it when configured to do so. The exact behavior depends on the options used by each SWR hook.

Authentication session checks use `cache: "no-store"` where configured so that the application requests current session information rather than relying on a cached response.

Static destination data imported directly into the application does not require a separate browser API request.

## Browser Storage

Where implemented, localStorage keeps client-side trip information available across page refreshes in the same browser.

Browser storage is device-specific and should not be treated as secure storage for passwords, session secrets, or sensitive information.

## CSV Reports

The itinerary page can export selected destinations, regions, suggested days, daily budget, accommodation, and travel dates to a downloadable CSV file.

The report is generated in the browser from the currently selected itinerary.

## Limitations

Client-side storage does not automatically synchronize trips across different devices. Persistent account-linked trip storage would require a suitable backend data store.

Caching behavior depends on the individual API route and data-fetching configuration.