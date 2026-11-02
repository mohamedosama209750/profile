import Reveal from '../../shared/components/Reveal/Reveal';
import AboutCard from './components/AboutCard/AboutCard';
import ContactCard from './components/ContactCard/ContactCard';
import Hero from './components/Hero/Hero';
import ProjectsCard from './components/ProjectsCard/ProjectsCard';
import SkillsCard from './components/SkillsCard/SkillsCard';
import SocialsCard from './components/SocialsCard/SocialsCard';
import StatsCard from './components/StatsCard/StatsCard';
import profile from './data/profile.json';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  return (
    <div id="top" className={styles.page}>
      <Reveal>
        <Hero profile={profile} />
      </Reveal>

      <div className={styles.grid}>
        <Reveal className={styles.about} delay={60}>
          <AboutCard profile={profile} />
        </Reveal>
        <Reveal className={styles.stats} delay={140}>
          <StatsCard stats={profile.stats} />
        </Reveal>
        <Reveal className={styles.skills} delay={60}>
          <SkillsCard skills={profile.skills} />
        </Reveal>
        <Reveal className={styles.socials} delay={140}>
          <SocialsCard socials={profile.socials} />
        </Reveal>
        <Reveal className={styles.projects} delay={60}>
          <ProjectsCard projects={profile.projects} />
        </Reveal>
        <Reveal className={styles.contact} delay={120}>
          <ContactCard profile={profile} />
        </Reveal>
      </div>
    </div>
  );
}
