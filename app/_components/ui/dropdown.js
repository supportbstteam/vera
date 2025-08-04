import React from "react"
import clsx from "clsx"

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  error,
  name,
  className
}) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={clsx(
          "w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Dropdown
