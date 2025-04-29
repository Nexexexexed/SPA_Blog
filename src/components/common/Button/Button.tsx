import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const Button = ({
  variant = "primary",
  onClick,
  children,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
