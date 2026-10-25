# Performance and Optimization

## Overview

Ethio-Trip uses Next.js and React to organize pages, components, and application routes.

## Optimization Strategies

- Use the Next.js App Router for structured routing.
- Separate reusable interface components where appropriate.
- Use SWR in implemented areas to manage fetching and cached responses.
- Use `cache: "no-store"` for session checks where configured.
- Use CSS for responsive layouts.
- Load interactive map functionality through dedicated map components.
- Keep trip calculations and CSV generation in the browser where appropriate.
- Use a production build to identify compilation errors before deployment.

## Performance Measurements

Performance measurements must be collected from actual tests. Do not enter estimated values as measured results.

| Metric | Before optimization | After optimization |
|---|---|---|
| Largest Contentful Paint (LCP) | Not measured | Not measured |
| First Contentful Paint (FCP) | Not measured | Not measured |
| Cumulative Layout Shift (CLS) | Not measured | Not measured |
| Production build | Verify using `npm run build` | Verify after final changes |

## How to Measure

1. Open the deployed application in Chrome.
2. Open Developer Tools.
3. Select the Lighthouse tab.
4. Run an audit for mobile and desktop.
5. Record the actual LCP, FCP, and CLS values.
6. Compare results before and after any optimization, using the same test conditions.

## Limitations

No before-and-after performance figures are claimed in this document because verified measurements have not yet been supplied.

## Future Optimization

- Measure and optimize image loading.
- Review bundle size and unnecessary JavaScript.
- Improve loading and error states.
- Audit accessibility and responsive behavior.
- Repeat Lighthouse tests after significant changes.