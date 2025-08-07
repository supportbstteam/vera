const typeStyles = {
  primary: "bg-purple-100 text-purple-600",
  secondary: "bg-green-400 text-green-900",
  success: "bg-yellow-400 text-yellow-900",
  danger: "bg-red-400 text-red-900",
  warning: "bg-orange-400 text-orange-900",
  info: "bg-purple-400 text-purple-900",
}

const Badge = ({ title, type = "primary" }) => {
  const classes = typeStyles[type] || typeStyles.primary

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium ${classes}`}>
      <span className="font-medium">{title}</span>
    </div>
  )
}

export default Badge
