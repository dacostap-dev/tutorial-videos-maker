import { useEffect, useRef, type CSSProperties } from "react"
import {
  AbsoluteFill,
  Audio,
  Easing,
  Loop,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useRemotionEnvironment,
} from "remotion"
import type { TutorialConfig } from "../config/types"
import {
  getAudioCueStartSeconds,
  getOutroFrom,
  getPhotoRenderSlides,
  getRenderScenes,
  getTotalDurationInFrames,
  getVideoPlaybackDurationInFrames,
  type PhotoRenderSlide,
  type RenderScene,
} from "./timeline"

type TutorialCompositionProps = {
  config: TutorialConfig
}

const mediaSource = (src: string) => {
  if (src.startsWith("http://") || src.startsWith("https://")) return src
  return staticFile(src.replace(/^\/+/, ""))
}

const phoneFrame = {
  width: 360,
  height: 744,
  borderRadius: 52,
} as const

type AppIconProps = {
  config: TutorialConfig
  size: number
}

function AppIcon({ config, size }: AppIconProps) {
  const { accent, accentRgb, phoneSurface } = config.theme

  if (config.brand.logoSrc) {
    return (
      <img
        src={config.brand.logoSrc}
        alt=""
        width={size}
        height={size}
        style={{ borderRadius: size * 0.22, objectFit: "contain" }}
      />
    )
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: `linear-gradient(145deg, ${phoneSurface} 0%, #0f1c30 100%)`,
        boxShadow: `0 8px 32px rgba(${accentRgb},0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M4 28V8l8 12 6-9 6 9 8-12v20"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="18"
          cy="18"
          r="5"
          stroke={accent}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />
        <circle cx="18" cy="18" r="1.5" fill={accent} />
      </svg>
    </div>
  )
}

function IntroCard({ config }: { config: TutorialConfig }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  })
  const { brand, intro, theme } = config

  return (
    <AbsoluteFill
      style={{
        opacity,
        padding: "0 28px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(160deg, ${theme.introStart} 0%, ${theme.introEnd} 100%)`,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 38,
        }}
      >
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            style={{
              position: "absolute",
              width: 86 + ring * 44,
              height: 86 + ring * 44,
              borderRadius: "50%",
              border: `1px solid rgba(${theme.accentRgb},0.2)`,
              transform: `scale(${1 + Math.min(frame / 90, 0.55)})`,
              opacity: Math.max(0, 0.6 - frame / 90),
            }}
          />
        ))}
        <AppIcon config={config} size={88} />
      </div>

      <div
        style={{
          color: "white",
          fontFamily: "DM Serif Display, serif",
          fontSize: 31,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {brand.name}
      </div>
      <div
        style={{
          color: theme.accent,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 2.4,
          textTransform: "uppercase",
          marginBottom: 28,
        }}
      >
        {brand.eyebrow}
      </div>

      <div
        style={{
          width: "100%",
          borderRadius: 20,
          padding: "20px",
          textAlign: "center",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 5,
          }}
        >
          {intro.sectionLabel}
        </div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
          {intro.sectionName}
        </div>
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 14,
          lineHeight: 1.5,
          textAlign: "center",
        }}
      >
        {intro.description}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginTop: 38,
          color: "rgba(255,255,255,0.55)",
          fontSize: 13,
        }}
      >
        <div
          style={{ width: 18, height: 1, background: "rgba(255,255,255,0.2)" }}
        />
        <span>{intro.navigationHint}</span>
        <div
          style={{ width: 18, height: 1, background: "rgba(255,255,255,0.2)" }}
        />
      </div>
    </AbsoluteFill>
  )
}

type VideoSegment = {
  type: "video"
  from: number
  durationInFrames: number
  sourceStartFrame: number
  sourceEndFrame: number
} | {
  type: "hold"
  from: number
  durationInFrames: number
  sourceFrame: number
}

function getVideoSegments(config: TutorialConfig): VideoSegment[] {
  const sourceDurationInFrames = Math.round(
    config.video.durationSeconds * config.output.fps,
  )
  const holds = [...(config.videoHolds ?? [])].sort(
    (a, b) => a.sourceAtSeconds - b.sourceAtSeconds,
  )
  const segments: VideoSegment[] = []
  let sourceCursor = 0
  let outputCursor = 0

  for (const hold of holds) {
    const sourceAtFrame = Math.min(
      sourceDurationInFrames,
      Math.max(0, Math.round(hold.sourceAtSeconds * config.output.fps)),
    )
    const holdDurationInFrames = Math.max(
      1,
      Math.round(hold.durationSeconds * config.output.fps),
    )

    if (sourceAtFrame > sourceCursor) {
      const durationInFrames = sourceAtFrame - sourceCursor
      segments.push({
        type: "video",
        from: outputCursor,
        durationInFrames,
        sourceStartFrame: sourceCursor,
        sourceEndFrame: sourceAtFrame,
      })
      outputCursor += durationInFrames
    }

    segments.push({
      type: "hold",
      from: outputCursor,
      durationInFrames: holdDurationInFrames,
      sourceFrame: sourceAtFrame,
    })
    outputCursor += holdDurationInFrames
    sourceCursor = sourceAtFrame
  }

  if (sourceCursor < sourceDurationInFrames) {
    segments.push({
      type: "video",
      from: outputCursor,
      durationInFrames: sourceDurationInFrames - sourceCursor,
      sourceStartFrame: sourceCursor,
      sourceEndFrame: sourceDurationInFrames,
    })
  }

  return segments
}

function PreviewVideoHold({
  src,
  sourceFrame,
  fps,
  muted,
  style,
}: {
  src: string
  sourceFrame: number
  fps: number
  muted?: boolean
  style: CSSProperties
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sourceTimeSeconds = sourceFrame / fps

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const seekToSourceFrame = () => {
      video.pause()
      video.currentTime = sourceTimeSeconds
    }
    const keepPaused = () => video.pause()

    video.addEventListener("loadedmetadata", seekToSourceFrame)
    video.addEventListener("seeked", keepPaused)

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      seekToSourceFrame()
    }

    return () => {
      video.removeEventListener("loadedmetadata", seekToSourceFrame)
      video.removeEventListener("seeked", keepPaused)
    }
  }, [sourceTimeSeconds])

  return (
    <video
      ref={videoRef}
      src={src}
      muted={muted}
      playsInline
      preload="auto"
      style={style}
    />
  )
}

function VideoHoldLayer({
  config,
  segment,
}: {
  config: TutorialConfig
  segment: Extract<VideoSegment, { type: "hold" }>
}) {
  const environment = useRemotionEnvironment()
  const style = { width: "100%", height: "100%", objectFit: "cover" } as const
  const src = mediaSource(config.video.src)

  if (!environment.isRendering) {
    return (
      <PreviewVideoHold
        src={src}
        sourceFrame={segment.sourceFrame}
        fps={config.output.fps}
        muted={config.video.muted}
        style={style}
      />
    )
  }

  return (
    <Loop durationInFrames={1}>
      <OffthreadVideo
        src={src}
        trimBefore={segment.sourceFrame}
        trimAfter={segment.sourceFrame + 1}
        muted={config.video.muted}
        style={style}
      />
    </Loop>
  )
}

function getVideoZoomStyle(config: TutorialConfig, sourceSeconds: number) {
  const zoom = (config.videoZooms ?? []).find((candidate) => {
    const transition = candidate.transitionSeconds ?? 0

    return (
      sourceSeconds >= candidate.sourceStartSeconds - transition &&
      sourceSeconds <= candidate.sourceEndSeconds + transition
    )
  })

  if (!zoom) {
    return {
      scale: 1,
      originX: 50,
      originY: 50,
    }
  }

  const transition = zoom.transitionSeconds ?? 0
  let scale = zoom.scale

  if (transition > 0 && sourceSeconds < zoom.sourceStartSeconds) {
    scale = interpolate(
      sourceSeconds,
      [zoom.sourceStartSeconds - transition, zoom.sourceStartSeconds],
      [1, zoom.scale],
      {
        easing: Easing.inOut(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    )
  } else if (transition > 0 && sourceSeconds > zoom.sourceEndSeconds) {
    scale = interpolate(
      sourceSeconds,
      [zoom.sourceEndSeconds, zoom.sourceEndSeconds + transition],
      [zoom.scale, 1],
      {
        easing: Easing.inOut(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    )
  }

  return {
    scale,
    originX: zoom.originX,
    originY: zoom.originY,
  }
}

function ZoomedVideoSegment({
  config,
  segment,
}: {
  config: TutorialConfig
  segment: VideoSegment
}) {
  const frame = useCurrentFrame()
  const sourceFrame =
    segment.type === "hold"
      ? segment.sourceFrame
      : segment.sourceStartFrame + frame
  const zoom = getVideoZoomStyle(config, sourceFrame / config.output.fps)
  const zoomStyle = {
    position: "absolute",
    inset: 0,
    transform: `scale(${zoom.scale})`,
    transformOrigin: `${zoom.originX}% ${zoom.originY}%`,
  } as const

  return (
    <div style={zoomStyle}>
      {segment.type === "hold" ? (
        <VideoHoldLayer config={config} segment={segment} />
      ) : (
        <OffthreadVideo
          src={mediaSource(config.video.src)}
          trimBefore={segment.sourceStartFrame}
          trimAfter={segment.sourceEndFrame}
          muted={config.video.muted}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  )
}

function ContinuousVideoPhone({ config }: { config: TutorialConfig }) {
  const segments = getVideoSegments(config)

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: phoneFrame.width,
        height: phoneFrame.height,
        transform: "translate(-50%, -50%)",
        borderRadius: phoneFrame.borderRadius,
        background: config.theme.phoneSurface,
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {segments.map((segment) => (
        <Sequence
          key={`${segment.type}-${segment.from}`}
          from={segment.from}
          durationInFrames={segment.durationInFrames}
        >
          <ZoomedVideoSegment config={config} segment={segment} />
        </Sequence>
      ))}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 34,
          borderBottomLeftRadius: 17,
          borderBottomRightRadius: 17,
          background: config.theme.phoneSurface,
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 68,
            height: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          width: 96,
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.2)",
          zIndex: 2,
        }}
      />
    </div>
  )
}

function PhotoSlideLayer({
  config,
  slide,
}: {
  config: TutorialConfig
  slide: PhotoRenderSlide
}) {
  const frame = useCurrentFrame()
  const fadeIn =
    slide.transitionInFrames > 0
      ? interpolate(frame, [0, slide.transitionInFrames], [0, 1], {
          extrapolateRight: "clamp",
        })
      : 1
  const fadeOut =
    slide.transitionOutFrames > 0
      ? interpolate(
          frame,
          [
            slide.durationInFrames - slide.transitionOutFrames,
            slide.durationInFrames,
          ],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 1

  return (
    <img
      src={mediaSource(slide.photo.src)}
      alt=""
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: slide.photo.fit ?? "contain",
        background: config.theme.phoneSurface,
        opacity: Math.min(fadeIn, fadeOut),
      }}
    />
  )
}

function PhotoSequencePhone({ config }: { config: TutorialConfig }) {
  const photoFrom = Math.round(
    config.output.introDurationSeconds * config.output.fps,
  )
  const slides = getPhotoRenderSlides(config)

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: phoneFrame.width,
        height: phoneFrame.height,
        transform: "translate(-50%, -50%)",
        borderRadius: phoneFrame.borderRadius,
        background: config.theme.phoneSurface,
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {slides.map((slide) => (
        <Sequence
          key={`${slide.photo.src}-${slide.from}`}
          from={slide.from - photoFrom}
          durationInFrames={slide.durationInFrames}
        >
          <PhotoSlideLayer config={config} slide={slide} />
        </Sequence>
      ))}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 34,
          borderBottomLeftRadius: 17,
          borderBottomRightRadius: 17,
          background: config.theme.phoneSurface,
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 68,
            height: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          width: 96,
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.2)",
          zIndex: 2,
        }}
      />
    </div>
  )
}

function ChapterScene({
  config,
  scene,
}: {
  config: TutorialConfig
  scene: RenderScene
}) {
  const frame = useCurrentFrame()
  const { chapter } = scene
  const { accent, accentRgb, phoneSurface } = config.theme
  const isIntro = chapter.sourceStart === null
  const opacity =
    isIntro || config.mode === "photos"
      ? interpolate(frame, [0, 15], [0, 1], {
          extrapolateRight: "clamp",
        })
      : 1

  return (
    <AbsoluteFill style={{ opacity, color: "white" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
        }}
      >
        <div
          style={{
            width: 350,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 20,
            paddingRight: 20,
            textAlign: "right",
          }}
        >
          <div
            style={{
              background: `rgba(${accentRgb},0.1)`,
              border: `1px solid rgba(${accentRgb},0.2)`,
              borderRadius: 999,
              color: accent,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1.7,
              textTransform: "uppercase",
            }}
          >
            {chapter.tag}
          </div>
          <div>
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {chapter.label}
            </div>
            <div
              style={{
                color: "white",
                fontFamily: "DM Serif Display, serif",
                fontSize: 38,
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 15,
              }}
            >
              {chapter.title}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 17,
                lineHeight: 1.5,
              }}
            >
              {chapter.description}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: phoneFrame.width,
            height: phoneFrame.height,
            borderRadius: phoneFrame.borderRadius,
            background: isIntro ? phoneSurface : "transparent",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: isIntro
              ? "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 34,
              borderBottomLeftRadius: 17,
              borderBottomRightRadius: 17,
              background: phoneSurface,
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 68,
                height: 6,
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
              }}
            />
          </div>

          {isIntro ? <IntroCard config={config} /> : null}

          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: 96,
              height: 6,
              borderRadius: 999,
              background: "rgba(255,255,255,0.2)",
              zIndex: 3,
            }}
          />
        </div>

        <div
          style={{
            width: 350,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 28,
            paddingLeft: 20,
          }}
        >
          <div
            style={{
              width: 280,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {config.chapters.map((item, index) => (
              <div
                key={item.id}
                style={{
                  minHeight: 62,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 16px",
                  borderRadius: 16,
                  background:
                    index === scene.index
                      ? `rgba(${accentRgb},0.1)`
                      : "transparent",
                  border:
                    index === scene.index
                      ? `1px solid rgba(${accentRgb},0.22)`
                      : "1px solid transparent",
                }}
              >
                <div
                  style={{
                    width: index === scene.index ? 9 : 7,
                    height: index === scene.index ? 9 : 7,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      index === scene.index
                        ? accent
                        : index < scene.index
                          ? `rgba(${accentRgb},0.4)`
                          : "rgba(255,255,255,0.18)",
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color:
                        index === scene.index
                          ? accent
                          : "rgba(255,255,255,0.7)",
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      marginTop: 5,
                      color: "rgba(255,255,255,0.45)",
                      fontSize: 13,
                      lineHeight: 1.25,
                    }}
                  >
                    {item.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              maxWidth: 280,
              color: "rgba(255,255,255,0.5)",
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            {config.intro.navigationHint}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 58,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <AppIcon config={config} size={38} />
        <div
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 3,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {config.brand.name} · {config.brand.eyebrow}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 58,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)",
          fontSize: 14,
          letterSpacing: 3,
        }}
      >
        {String(scene.index + 1).padStart(2, "0")} /{" "}
        {String(config.chapters.length).padStart(2, "0")}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(circle at 50% 50%, rgba(${accentRgb},0.07) 0%, transparent 36%)`,
        }}
      />
    </AbsoluteFill>
  )
}

function OutroScene({ config }: { config: TutorialConfig }) {
  const frame = useCurrentFrame()
  const reveal = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  })
  const contentY = interpolate(frame, [0, 18], [24, 0], {
    extrapolateRight: "clamp",
  })
  const { accent, accentRgb, introStart, introEnd } = config.theme

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: `linear-gradient(145deg, ${introStart} 0%, ${introEnd} 72%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 620,
          height: 620,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(${accentRgb},0.1) 0%, rgba(${accentRgb},0.025) 38%, transparent 70%)`,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          color: "white",
        }}
      >
        <div
          style={{
            width: 560,
            textAlign: "center",
            opacity: reveal,
            transform: `translateY(${contentY}px)`,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 28,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: `0 0 28px rgba(${accentRgb},0.12)`,
            }}
          >
            <AppIcon config={config} size={72} />
          </div>

          <div
            style={{
              marginTop: 28,
              color: "white",
              fontFamily: "DM Serif Display, serif",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {config.outro.title}
          </div>
          <div
            style={{
              margin: "16px auto 0",
              maxWidth: 500,
              color: "rgba(255,255,255,0.68)",
              fontSize: 17,
              lineHeight: 1.5,
            }}
          >
            {config.outro.description}
          </div>
          <div
            style={{
              width: 48,
              height: 2,
              margin: "24px auto 0",
              borderRadius: 999,
              background: accent,
              opacity: 0.8,
            }}
          />
          <div
            style={{
              marginTop: 16,
              color: "rgba(255,255,255,0.38)",
              fontSize: 12,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            {config.brand.name} · {config.intro.sectionName}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

function AudioCueLayer({ config }: { config: TutorialConfig }) {
  const totalDurationInFrames = getTotalDurationInFrames(config)

  return (
    <>
      {config.audioCues.map((cue) => {
        if (!cue.audioSrc) return null

        const from = Math.round(
          getAudioCueStartSeconds(config, cue.startSeconds, cue.timebase) *
            config.output.fps,
        )

        return (
          <Sequence
            key={cue.id}
            from={from}
            durationInFrames={Math.max(1, totalDurationInFrames - from)}
          >
            <Audio src={mediaSource(cue.audioSrc)} volume={cue.volume ?? 1} />
          </Sequence>
        )
      })}
    </>
  )
}

function VideoTutorialComposition({ config }: TutorialCompositionProps) {
  const scenes = getRenderScenes(config)
  const outroFrom = getOutroFrom(config)
  const outroDurationInFrames = Math.round(
    config.output.outroDurationSeconds * config.output.fps,
  )
  const videoFrom = Math.round(
    config.output.introDurationSeconds * config.output.fps,
  )
  const videoDurationInFrames = getVideoPlaybackDurationInFrames(config)

  return (
    <AbsoluteFill style={{ background: config.theme.background }}>
      <Sequence from={videoFrom} durationInFrames={videoDurationInFrames}>
        <ContinuousVideoPhone config={config} />
      </Sequence>
      {scenes.map((scene) => (
        <Sequence
          key={scene.chapter.id}
          from={scene.from}
          durationInFrames={scene.durationInFrames}
        >
          <ChapterScene config={config} scene={scene} />
        </Sequence>
      ))}
      <Sequence from={outroFrom} durationInFrames={outroDurationInFrames}>
        <OutroScene config={config} />
      </Sequence>
      <AudioCueLayer config={config} />
    </AbsoluteFill>
  )
}

function PhotoTutorialComposition({ config }: TutorialCompositionProps) {
  const scenes = getRenderScenes(config)
  const outroFrom = getOutroFrom(config)
  const outroDurationInFrames = Math.round(
    config.output.outroDurationSeconds * config.output.fps,
  )
  const photoFrom = Math.round(
    config.output.introDurationSeconds * config.output.fps,
  )

  return (
    <AbsoluteFill style={{ background: config.theme.background }}>
      <Sequence
        from={photoFrom}
        durationInFrames={Math.max(1, outroFrom - photoFrom)}
      >
        <PhotoSequencePhone config={config} />
      </Sequence>
      {scenes.map((scene) => (
        <Sequence
          key={scene.chapter.id}
          from={scene.from}
          durationInFrames={scene.durationInFrames}
        >
          <ChapterScene config={config} scene={scene} />
        </Sequence>
      ))}
      <Sequence from={outroFrom} durationInFrames={outroDurationInFrames}>
        <OutroScene config={config} />
      </Sequence>
      <AudioCueLayer config={config} />
    </AbsoluteFill>
  )
}

export default function TutorialComposition(props: TutorialCompositionProps) {
  return props.config.mode === "photos" ? (
    <PhotoTutorialComposition {...props} />
  ) : (
    <VideoTutorialComposition {...props} />
  )
}
