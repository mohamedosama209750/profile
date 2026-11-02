import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const STORAGE_KEY = 'profile-theme';
const THEME_COLORS = {
  dark: '#000000',
  light: '#e5e5e5',
};

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage can be unavailable in private or restricted contexts.
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const switchTimerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(switchTimerRef.current), []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Persisting the theme is a progressive enhancement.
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;

    // Apply the new palette instantly so text never animates through an
    // unreadable low-contrast state while the background crossfades.
    root.classList.add('theme-switching');
    window.clearTimeout(switchTimerRef.current);
    switchTimerRef.current = window.setTimeout(() => {
      root.classList.remove('theme-switching');
    }, 220);

    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
