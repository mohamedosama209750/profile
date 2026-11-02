import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { FiMapPin } from 'react-icons/fi';
import Button from '../../../../shared/components/Button/Button';
import GlassCard from '../../../../shared/components/GlassCard/GlassCard';
import styles from './ContactCard.module.css';

const LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' };

export default function ContactCard({ profile }) {
  const github = profile.socials.find((social) => social.icon === 'github');
  const linkedin = profile.socials.find((social) => social.icon === 'linkedin');

  return (
    <GlassCard
      as="section"
      interactive
      id="contact"
      className={styles.card}
      aria-labelledby="contact-title"
    >
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Contact</p>
          <h2 id="contact-title" className={styles.title}>
            Let&apos;s make something worth touching.
          </h2>
          <p className={styles.description}>
            Have a product, a wild idea, or just want to compare notes? The fastest way to reach
            me is LinkedIn.
          </p>
        </div>

        <div className={styles.actions}>
          {linkedin ? (
            <Button href={linkedin.url} {...LINK_PROPS}>
              <FaLinkedinIn aria-hidden="true" />
              Connect on LinkedIn
            </Button>
          ) : null}
          {github ? (
            <Button href={github.url} variant="ghost" {...LINK_PROPS}>
              <FaGithub aria-hidden="true" />
              View GitHub
            </Button>
          ) : null}
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <FiMapPin aria-hidden="true" />
          {profile.location}
        </span>
        <span className={styles.availability}>
          <span className={styles.dot} aria-hidden="true" />
          {profile.availability}
        </span>
      </div>
    </GlassCard>
  );
}
