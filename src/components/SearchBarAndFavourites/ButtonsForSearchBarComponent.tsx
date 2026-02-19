import type { LucideIcon } from 'lucide-react';

type Variant = 'primary' | 'warning';

interface GradientButtonProps {
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
  warning:
    'bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
};

export default function ButtonsForSearchBarComonent({
  icon: Icon,
  children,
  onClick,
  href,
  disabled = false,
  variant = 'primary',
}: GradientButtonProps) {
  const base =
    'flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold ' +
    'shadow-md hover:shadow-lg transition-all duration-200 ' +
    'hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const className = `${base} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        <Icon className="w-5 h-5" />
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      <Icon className="w-5 h-5" />
      {children}
    </button>
  );
}
