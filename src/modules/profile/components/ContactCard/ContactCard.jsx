import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import Button from '../../../../shared/components/Button/Button';
import GlassCard from '../../../../shared/components/GlassCard/GlassCard';
import styles from './ContactCard.module.css';

const LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' };

export default function ContactCard({ profile }) {
  const github = profile.socials.find((social) => social.icon === 'github');
  const linkedin = profile.socials.find((social) => social.icon === 'linkedin');
  const { phone } = profile;

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
            Have a product, a wild idea, or just want to compare notes? Call, send a WhatsApp
            message, or reach out on LinkedIn.
          </p>

          {phone ? (
            <div className={styles.phoneBlock}>
              <span className={styles.phoneLabel}>Call or WhatsApp</span>
              <a className={styles.phoneNumber} href={`tel:${phone.tel}`}>
                {phone.display}
              </a>
              <div className={styles.phoneActions}>
                <a
                  className={`${styles.phoneAction} ${styles.phoneActionPrimary}`}
                  href={`https://wa.me/${phone.whatsapp}`}
                  {...LINK_PROPS}
                >
                  <FaWhatsapp aria-hidden="true" />
                  WhatsApp
                </a>
                <a className={styles.phoneAction} href={`tel:${phone.tel}`}>
                  <FiPhone aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          ) : null}
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
