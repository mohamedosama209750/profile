import { FiArrowUpRight } from 'react-icons/fi';
import GlassCard from '../../../../shared/components/GlassCard/GlassCard';
import SectionHeading from '../../../../shared/components/SectionHeading/SectionHeading';
import { socialIcons } from './socialIcons';
import styles from './SocialsCard.module.css';

export default function SocialsCard({ socials }) {
  return (
    <GlassCard
      as="section"
      interactive
      className={styles.card}
      aria-labelledby="socials-title"
    >
      <SectionHeading id="socials-title" eyebrow="Elsewhere" title="Find me online" />

      <ul className={styles.list}>
        {socials.map((social) => {
          const Icon = socialIcons[social.icon];

          return (
            <li key={social.label}>
              <a
                className={styles.link}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.iconWrap} aria-hidden="true">
                  {Icon ? <Icon /> : null}
                </span>
                <span className={styles.labelBlock}>
                  <span className={styles.label}>{social.label}</span>
                  <span className={styles.handle}>{social.handle}</span>
                </span>
                <FiArrowUpRight className={styles.arrow} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
