import useInView from '../../hooks/useInView';
import styles from './Reveal.module.css';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.12 });

  const classes = [styles.reveal, inView && styles.visible, className].filter(Boolean).join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
