import { FiArrowUpRight, FiDownload, FiMapPin } from 'react-icons/fi';
import Button from '../../../../shared/components/Button/Button';
import GlassCard from '../../../../shared/components/GlassCard/GlassCard';
import styles from './Hero.module.css';

// Public assets live at the site base (`/` locally, `/profile/` on GitHub Pages).
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Hero({ profile }) {
  return (
    <GlassCard as="section" interactive className={styles.hero} aria-labelledby="profile-name">
      <span className={styles.aurora} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.avatarColumn}>
          <div className={styles.avatarWrap}>
            <img
              className={styles.avatar}
              src={asset(profile.avatar)}
              alt={`Portrait of ${profile.name}`}
              width="176"
              height="176"
            />
          </div>
          <div className={styles.avatarBadge} aria-hidden="true">
            <strong>{profile.stats[0]?.value ?? '8+'}</strong>
            <span>years of craft</span>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="profile-name" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.tagline}>{profile.tagline}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <FiMapPin aria-hidden="true" />
              {profile.location}
            </span>
            <span className={styles.metaItem}>{profile.handle}</span>
          </div>

          <div className={styles.actions}>
            <Button href="#contact">
              Get in touch
              <FiArrowUpRight aria-hidden="true" />
            </Button>
            <Button
              href={asset('/resume.pdf')}
              download="Mohamed-Osama-Resume.pdf"
              variant="ghost"
            >
              See my resume
              <FiDownload aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
