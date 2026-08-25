import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-medium gap-1.5 rounded-lg',
    md: 'px-4 py-2 text-sm font-medium gap-2 rounded-xl',
    lg: 'px-5 py-2.5 text-base font-semibold gap-2.5 rounded-xl'
  };

  const variantClasses = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500/30',
    secondary:
      'bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 border border-slate-700/60 shadow-sm',
    outline:
      'bg-transparent hover:bg-slate-800/60 text-slate-200 border border-slate-700/80 hover:border-slate-600',
    danger:
      'bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 shadow-sm shadow-rose-950/20',
    ghost:
      'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white border border-transparent',
    glow:
      'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40 hover:shadow-indigo-500/50'
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.015 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled || isLoading}
      className={`
        group relative inline-flex items-center justify-center overflow-hidden cursor-pointer select-none
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Dynamic light sweep animation on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      {/* Loading spinner */}
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}

      {/* Left Icon with subtle hover shift */}
      {!isLoading && Icon && iconPosition === 'left' && (
        <Icon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:scale-110" />
      )}

      <span className="relative z-10">{children}</span>

      {/* Right Icon with subtle forward translation on hover */}
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-110" />
      )}
    </motion.button>
  );
};
