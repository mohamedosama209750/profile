import GlassCard from '../../../../shared/components/GlassCard/GlassCard';
import SectionHeading from '../../../../shared/components/SectionHeading/SectionHeading';
import useInView from '../../../../shared/hooks/useInView';
import styles from './SkillsCard.module.css';

export default function SkillsCard({ skills }) {
  const [listRef, inView] = useInView({ threshold: 0.25 });

  return (
    <GlassCard
      as="section"
      interactive
      id="skills"
      className={styles.card}
      aria-labelledby="skills-title"
    >
      <SectionHeading id="skills-title" eyebrow="Toolkit" title="What I work with" />

      <ul ref={listRef} className={[styles.list, inView && styles.animated].filter(Boolean).join(' ')}>
        {skills.map((skill, index) => (
          <li key={skill.name} className={styles.skill}>
            <div className={styles.row}>
              <span className={styles.name}>{skill.name}</span>
              <span className={styles.level}>{skill.level}%</span>
            </div>
            <div className={styles.track}>
              <span
                className={styles.fill}
                style={{ '--level': `${skill.level}%`, '--i': index }}
              />
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
