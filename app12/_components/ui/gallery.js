"use client"
import Image from "next/image"
import React from "react"
import clsx from "clsx"

const Gallery = ({ images }) => {
  const columnCount = Math.min(images.length, 3) // max 3 columns

  return (
    <div
      className={clsx(
        "grid gap-4",
        columnCount === 1 && "grid-cols-1",
        columnCount === 2 && "grid-cols-2",
        columnCount >= 3 && "grid-cols-3"
      )}
    >
      {images.map((src, index) => (
        <div
          key={index}
          className="relative w-full h-64 overflow-hidden rounded-lg"
        >
          <Image
            src={src}
            alt={`Gallery Image ${index + 1}`}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}

export default Gallery
