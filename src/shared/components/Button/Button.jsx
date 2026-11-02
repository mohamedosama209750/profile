import styles from './Button.module.css';

export default function Button({
  href,
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}
