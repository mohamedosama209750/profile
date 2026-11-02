import GlassCard from '../shared/components/GlassCard/GlassCard';
import { ThemeToggle } from '../modules/theme';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Toolkit', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ profile }) {
  return (
    <header className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <GlassCard as="div" className={styles.header}>
          <a className={styles.brand} href="#top">
            <span className={styles.mark}>{profile.initials}</span>
            <span className={styles.wordmark}>{profile.handle}</span>
            <span className="sr-only">— back to top</span>
          </a>

          <nav className={styles.nav} aria-label="Sections">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} className={styles.navLink} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <span className={styles.badge}>
              <span className={styles.dot} aria-hidden="true" />
              Available
            </span>
            <ThemeToggle />
          </div>
        </GlassCard>
      </div>
    </header>
  );
}
