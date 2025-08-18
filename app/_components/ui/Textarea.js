import clsx from "clsx"
import React from "react"

const Textarea = ({ label, error, rows, className, ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-[#181818]">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={clsx(
          `w-full px-4 py-2 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm`,
          error ? "border-red-500" : "border-gray-300"
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Textarea
