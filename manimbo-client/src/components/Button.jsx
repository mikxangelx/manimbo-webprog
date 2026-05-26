import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'border-transparent bg-[#2f241f] text-white hover:bg-[#43342d] shadow-[0_12px_24px_rgba(47,36,31,0.12)]',
  secondary:
    'border-[#e6d8ca] bg-white text-[#5b4538] hover:bg-[#faf6f1]',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
  ...props
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition duration-200',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
