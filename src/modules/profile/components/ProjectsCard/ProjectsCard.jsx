import { FiArrowUpRight } from 'react-icons/fi';
import GlassCard from '../../../../shared/components/GlassCard/GlassCard';
import SectionHeading from '../../../../shared/components/SectionHeading/SectionHeading';
import Tag from '../../../../shared/components/Tag/Tag';
import styles from './ProjectsCard.module.css';

export default function ProjectsCard({ projects }) {
  return (
    <GlassCard
      as="section"
      interactive
      id="work"
      className={styles.card}
      aria-labelledby="work-title"
    >
      <div className={styles.head}>
        <SectionHeading id="work-title" eyebrow="Selected work" title="Things I've shipped" />
        <span className={styles.count}>
          {String(projects.length).padStart(2, '0')} / featured
        </span>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <article key={project.title} className={styles.project}>
            <div className={styles.projectTop}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.year}>{project.year}</span>
            </div>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.role}>{project.role}</p>
            <p className={styles.description}>{project.description}</p>
            {project.url && (
              <a
                className={styles.link}
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${project.title} live demo in a new tab`}
              >
                Live demo
                <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            <ul className={styles.tags} aria-label={`${project.title} tags`}>
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag className={styles.tag}>{tag}</Tag>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}
