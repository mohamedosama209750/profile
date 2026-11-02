import GlassCard from '../../../../shared/components/GlassCard/GlassCard';
import SectionHeading from '../../../../shared/components/SectionHeading/SectionHeading';
import Tag from '../../../../shared/components/Tag/Tag';
import styles from './AboutCard.module.css';

export default function AboutCard({ profile }) {
  return (
    <GlassCard
      as="section"
      interactive
      id="about"
      className={styles.card}
      aria-labelledby="about-title"
    >
      <SectionHeading id="about-title" eyebrow="About" title="Designer's eye, engineer's hands." />

      <div className={styles.body}>
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className={styles.toolbox}>
        <p className={styles.toolboxLabel}>Daily tools</p>
        <ul className={styles.tags} aria-label="Daily tools">
          {profile.toolbox.map((tool) => (
            <li key={tool}>
              <Tag>{tool}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
}
