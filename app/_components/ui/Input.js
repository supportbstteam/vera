import clsx from 'clsx'
import React from 'react'

const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        className={clsx(
          "w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Input