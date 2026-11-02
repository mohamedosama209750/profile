import styles from './Background.module.css';

export default function Background() {
  return (
    <div className={styles.background} aria-hidden="true">
      <span className={`${styles.orb} ${styles.navy}`} />
      <span className={`${styles.orb} ${styles.amber}`} />
      <span className={`${styles.orb} ${styles.light}`} />
      <span className={styles.grid} />
    </div>
  );
}
