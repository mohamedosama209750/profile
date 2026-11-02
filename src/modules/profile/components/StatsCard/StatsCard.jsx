import GlassCard from '../../../../shared/components/GlassCard/GlassCard';
import SectionHeading from '../../../../shared/components/SectionHeading/SectionHeading';
import styles from './StatsCard.module.css';

export default function StatsCard({ stats }) {
  return (
    <GlassCard
      as="section"
      interactive
      className={styles.card}
      aria-labelledby="stats-title"
    >
      <SectionHeading id="stats-title" eyebrow="Snapshot" title="By the numbers" />

      <dl className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.label}>{stat.label}</dt>
            <dd className={styles.value}>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </GlassCard>
  );
}
