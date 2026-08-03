import { useEffect, useRef, useState, type CSSProperties } from "react"
import { tutorialConfig as config } from "./config/tutorial"
import BrandHeader from "./components/BrandHeader"
import ChapterTag from "./components/ChapterTag"
import IntroScreen from "./components/IntroScreen"
import NavigationArrow from "./components/NavigationArrow"
import VideoScreen from "./components/VideoScreen"

export default function App() {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const chapter = config.chapters[current]
  const isIntro = chapter.sourceStart === null

  const themeStyle = {
    "--app-background": config.theme.background,
    "--app-accent-rgb": config.theme.accentRgb,
  } as CSSProperties

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= config.chapters.length) return
    setCurrent(idx)
    setAnimKey((key) => key + 1)
  }

  useEffect(() => {
    document.title = config.metadata.title
    document.documentElement.lang = config.metadata.language

    const setMeta = (name: string, content?: string) => {
      let element = document.querySelector<HTMLMetaElement>(
        `meta[name="${name}"]`,
      )

      if (!content) {
        element?.remove()
        return
      }

      if (!element) {
        element = document.createElement("meta")
        element.name = name
        document.head.appendChild(element)
      }

      element.content = content
    }

    setMeta("description", config.metadata.description)
    setMeta("robots", config.metadata.noIndex ? "noindex, nofollow" : undefined)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const timestamp = chapter.sourceStart

    if (!video || timestamp === null) return

    const playChapter = () => {
      video.currentTime = timestamp
      void video.play().catch(() => {})
    }

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      playChapter()
      return
    }

    video.addEventListener("loadedmetadata", playChapter, { once: true })
    return () => video.removeEventListener("loadedmetadata", playChapter)
  }, [chapter.sourceStart, current])

  return (
    <div
      className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12"
      style={{ ...themeStyle, background: "var(--app-background)" }}
    >
      <div
        className="pointer-events-none absolute"
        style={{
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--app-accent-rgb),0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.6s ease",
        }}
      />

      <BrandHeader
        brand={config.brand}
        accent={config.theme.accent}
        accentRgb={config.theme.accentRgb}
        surface={config.theme.phoneSurface}
      />

      <div className="relative z-10 flex w-full max-w-4xl items-center gap-8">
        <div className="hidden flex-1 flex-col items-end gap-4 pr-4 md:flex">
          <ChapterTag
            label={chapter.tag}
            accent={config.theme.accent}
            accentRgb={config.theme.accentRgb}
          />
          <div key={`left-${animKey}`} className="animate-fade-up text-right">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/35">
              {chapter.label}
            </p>
            <h2
              className="mb-3 text-3xl font-bold leading-tight text-white"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {chapter.title}
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              {chapter.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-5">
          <div className="flex gap-4 md:hidden">
            <NavigationArrow
              direction="left"
              disabled={current === 0}
              label="Capítulo anterior"
              onClick={() => goTo(current - 1)}
            />
            <NavigationArrow
              direction="right"
              disabled={current === config.chapters.length - 1}
              label="Capítulo siguiente"
              onClick={() => goTo(current + 1)}
            />
          </div>

          <div
            className="relative flex shrink-0 flex-col overflow-hidden"
            style={{
              width: "min(300px, calc(100vw - 32px))",
              height: "min(620px, calc((100vw - 32px) * 2.0667))",
              borderRadius: 44,
              background: config.theme.phoneSurface,
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute left-1/2 top-0 z-20 -translate-x-1/2"
              style={{
                width: 100,
                height: 28,
                borderBottomLeftRadius: 14,
                borderBottomRightRadius: 14,
                background: config.theme.phoneSurface,
              }}
            >
              <div className="absolute bottom-2 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-white/10" />
            </div>

            {isIntro ? (
              <IntroScreen
                key={`intro-${animKey}`}
                brand={config.brand}
                intro={config.intro}
                accent={config.theme.accent}
                accentRgb={config.theme.accentRgb}
                surface={config.theme.phoneSurface}
                introStart={config.theme.introStart}
                introEnd={config.theme.introEnd}
                animationKey={animKey}
              />
            ) : (
              <VideoScreen
                key="video"
                videoRef={videoRef}
                video={config.video}
                errorMessage={config.messages.videoError}
                accent={config.theme.accent}
                accentRgb={config.theme.accentRgb}
              />
            )}

            <div className="absolute bottom-3 left-1/2 z-20 h-1 w-20 -translate-x-1/2 rounded-full bg-white/20" />

            <div className="absolute left-0 right-0 top-10 z-20 flex justify-center">
              <div
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  background: `rgba(${config.theme.accentRgb},0.15)`,
                  color: config.theme.accent,
                  border: `1px solid rgba(${config.theme.accentRgb},0.25)`,
                }}
              >
                {chapter.label}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {config.chapters.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ir a ${item.label}`}
                aria-current={index === current ? "step" : undefined}
                className="rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{
                  width: index === current ? 24 : 6,
                  height: 6,
                  background:
                    index === current
                      ? config.theme.accent
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="hidden flex-1 flex-col items-start gap-6 pl-4 md:flex">
          <div className="flex w-full max-w-45 flex-col gap-2">
            {config.chapters.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-current={index === current ? "step" : undefined}
                className="group flex items-center gap-3 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <div
                  className="shrink-0 rounded-full transition-all duration-300"
                  style={{
                    width: 6,
                    height: 6,
                    background:
                      index === current
                        ? config.theme.accent
                        : index < current
                          ? `rgba(${config.theme.accentRgb},0.4)`
                          : "rgba(255,255,255,0.18)",
                  }}
                />
                <span
                  className="text-xs font-medium transition-colors duration-200"
                  style={{
                    color:
                      index === current
                        ? config.theme.accent
                        : "rgba(255,255,255,0.3)",
                  }}
                >
                  {item.label} — {item.tag}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <NavigationArrow
              direction="left"
              disabled={current === 0}
              label="Capítulo anterior"
              onClick={() => goTo(current - 1)}
            />
            <NavigationArrow
              direction="right"
              disabled={current === config.chapters.length - 1}
              label="Capítulo siguiente"
              onClick={() => goTo(current + 1)}
            />
          </div>

          <p className="max-w-45 text-xs leading-relaxed text-white/20">
            {config.intro.navigationHint}
          </p>
        </div>
      </div>

      <div
        key={`mobile-${animKey}`}
        className="relative z-10 mt-8 max-w-xs animate-fade-up text-center md:hidden"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/35">
          {chapter.label}
        </p>
        <h2
          className="mb-2 text-xl font-bold text-white"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {chapter.title}
        </h2>
        <p className="text-sm leading-relaxed text-white/45">
          {chapter.description}
        </p>
      </div>

      <div className="relative z-10 mt-10 text-xs tracking-widest text-white/20">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(config.chapters.length).padStart(2, "0")}
      </div>
    </div>
  )
}
