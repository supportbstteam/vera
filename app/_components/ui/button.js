import clsx from "clsx"
import Link from "next/link"
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
  onClick,
  color,
  type
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer h-fit"

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-lg",
    full: "w-full px-4 py-2 text-base"
  }

  const colorStyles = {
    black: "text-black",
    white: "text-white",
    gray: "text-gray-400",
    primary: "text-primary",
    secondary: "text-secondary"
  }

  const variantStyles = {
    primary:
      "border border-primary text-white bg-primary hover:bg-primary hover:text-white",
    secondary:
      "border border-stock text-black bg-black text-primary hover:bg-secondary/50 hover",
    outline: "border border-stock text-black hover:bg-primary hover:text-white",
    gray: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    icon: "bg-transparent text-gray-500 hover:bg-gray-100",
    none: ""
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
    colorStyles[color],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

export default Button
