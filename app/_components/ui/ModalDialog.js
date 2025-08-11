import React from "react"
import clsx from "clsx"
import { X } from "lucide-react"
import Button from "@/_components/ui/button" 

const ModalDialog = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#ffffff30] bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className={clsx(
          "bg-white rounded-lg shadow-lg w-full max-w-5xl relative",
          className
        )}
        // Prevent close on content click
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 cursor-pointer"
        >
          <X size={24} />
        </Button>

        {/* Title */}
        {title && (
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h2>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default ModalDialog
