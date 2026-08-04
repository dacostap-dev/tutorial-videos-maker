import { useEffect, useState } from "react"
import type { PhotoSlide } from "../config/types"

type PhotoScreenProps = {
  photos: PhotoSlide[]
  errorMessage: string
}

export default function PhotoScreen({
  photos,
  errorMessage,
}: PhotoScreenProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setCurrent(0)
  }, [photos])

  useEffect(() => {
    if (photos.length < 2) return

    const duration = Math.max(1, photos[current]?.durationSeconds ?? 1) * 1000
    const timeout = window.setTimeout(() => {
      setCurrent((index) => (index + 1) % photos.length)
    }, duration)

    return () => window.clearTimeout(timeout)
  }, [current, photos])

  if (photos.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black px-6">
        <p className="text-center text-xs leading-relaxed text-white/50">
          {errorMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {photos.map((photo, index) => (
        <img
          key={`${photo.src}-${index}`}
          src={photo.src.startsWith("/") ? photo.src : `/${photo.src}`}
          alt=""
          className="absolute inset-0 h-full w-full transition-opacity duration-300"
          style={{
            objectFit: photo.fit ?? "contain",
            opacity: index === current ? 1 : 0,
          }}
        />
      ))}
    </div>
  )
}
