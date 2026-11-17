// Minimal hash-based router. GitHub Pages serves static files only, so
// paths like /create would 404 on refresh; #/create always loads index.html.
import { useEffect, useState } from 'react';

let pendingState = null;

function currentPath() {
  return window.location.hash.replace(/^#/, '') || '/';
}

export function navigate(path, state = null) {
  pendingState = state;
  window.location.hash = path;
}

// Returns one-time state passed with navigate(), e.g. a status message.
export function takeNavigationState() {
  const state = pendingState;
  pendingState = null;
  return state;
}

export function useHashPath() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const onChange = () => setPath(currentPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

export function Link({ to, children, ...props }) {
  return <a href={`#${to}`} {...props}>{children}</a>;
}
