import clsx from "clsx"
import React from "react"

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  href,
  fullWidth,
  disabled,
  className,
  onClick
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors"

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg"
  }

  const variantStyles = {
    primary:
      "bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
    secondary:
      "bg-secondary text-white hover:text-gray-800 hover:bg-secondary/50",
    outline: "border border-stock text-white hover:bg-primary"
  }

  const content = (
    <span
      className={clsx(
        "flex items-center gap-2",
        fullWidth && "w-full justify-center"
      )}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </span>
  )

  const classes = clsx(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {content}
    </button>
  )
}

export default Button
