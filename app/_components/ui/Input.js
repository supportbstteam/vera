import clsx from "clsx"
import { Asterisk } from "lucide-react"
import React from "react"

const Input = ({ label, error, className, mandatory, ...props }) => {
  return (
    <div className="space-y-1 w-full">
      <div className="flex">
        {label && (
          <label className="block text-sm font-medium text-[#181818]">
            {label}
          </label>
        )}
        {mandatory ? <Asterisk size={12} color="#E33629" /> : ""}
      </div>
      <input
        className={clsx(
          "w-full px-4 py-2 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm",
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
