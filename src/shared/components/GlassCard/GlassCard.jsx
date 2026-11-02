import { useRef } from 'react';
import styles from './GlassCard.module.css';

export default function GlassCard({
  as: Tag = 'section',
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!interactive) return;
    const node = cardRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const classes = [styles.card, interactive && styles.interactive, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={cardRef} className={classes} onPointerMove={handlePointerMove} {...rest}>
      {children}
    </Tag>
  );
}
