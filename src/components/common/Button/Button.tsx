type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return <button className={`button ${variant}`} {...props} />;
};
