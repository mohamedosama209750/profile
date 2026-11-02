import styles from './SectionHeading.module.css';

export default function SectionHeading({ id, eyebrow, title, description, className = '' }) {
  return (
    <header className={[styles.heading, className].filter(Boolean).join(' ')}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
