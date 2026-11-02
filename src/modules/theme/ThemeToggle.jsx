import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from './ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={[styles.toggle, !isDark && styles.light].filter(Boolean).join(' ')}
      onClick={toggleTheme}
    >
      <span className={[styles.icon, isDark && styles.active].filter(Boolean).join(' ')}>
        <FiMoon aria-hidden="true" />
      </span>
      <span className={[styles.icon, !isDark && styles.active].filter(Boolean).join(' ')}>
        <FiSun aria-hidden="true" />
      </span>
      <span className={styles.knob} aria-hidden="true" />
    </button>
  );
}
