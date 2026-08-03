import { useEffect, useState, type RefObject } from "react"
import type { TutorialConfig } from "../config/types"

type VideoScreenProps = {
  videoRef: RefObject<HTMLVideoElement | null>
  video: TutorialConfig["video"]
  errorMessage: string
  accent: string
  accentRgb: string
}

export default function VideoScreen({
  videoRef,
  video,
  errorMessage,
  accent,
  accentRgb,
}: VideoScreenProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [video.src])

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay={video.autoPlay}
        muted={video.muted}
        onError={() => setHasError(true)}
        playsInline
        poster={video.poster}
        preload="auto"
        style={{ borderRadius: 44 }}
      >
        <source src={video.src} type={video.type} />
      </video>

      {hasError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(7,9,15,0.9)", borderRadius: 44 }}
        >
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: `rgba(${accentRgb},0.12)`,
              border: `1px solid rgba(${accentRgb},0.3)`,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 4l12 6-12 6V4z" fill={accent} />
            </svg>
          </div>
          <p className="px-6 text-center text-xs leading-relaxed text-white/50">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  )
}
