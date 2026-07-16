/**
 * Simple client-side routing helper for React SPA.
 * Triggers popstate event so the App component updates its current path.
 */
export function navigate(path: string) {
  window.history.pushState({}, '', path);
  // Dispatch popstate event to trigger route changes in state listeners
  window.dispatchEvent(new Event('popstate'));
  
  // Smoothly scroll to the top of the page on route transition
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
