import { FiArrowUp } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer({ profile }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {profile.name}
        </p>
        <p className={styles.note}>Built with React, Vite &amp; glass.</p>
        <a className={styles.top} href="#top">
          Back to top
          <FiArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
