import { useEffect, useRef, useState, type CSSProperties } from "react";
import { tutorialConfig } from "./config/tutorial";
import type { TutorialConfig } from "./config/types";
import BrandHeader from "./components/BrandHeader";
import ChapterTag from "./components/ChapterTag";
import IntroScreen from "./components/IntroScreen";
import NavigationArrow from "./components/NavigationArrow";
import PhotoScreen from "./components/PhotoScreen";
import VideoScreen from "./components/VideoScreen";

const config: TutorialConfig = tutorialConfig;

export default function App() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chapter = config.chapters[current];
  const isIntro = chapter.sourceStart == null;

  const themeStyle = {
    "--app-background": config.theme.background,
    "--app-accent-rgb": config.theme.accentRgb,
  } as CSSProperties;

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= config.chapters.length) return;
    setCurrent(idx);
    setAnimKey((key) => key + 1);
  };

  useEffect(() => {
    document.title = config.metadata.title;
    document.documentElement.lang = config.metadata.language;

    const setMeta = (name: string, content?: string) => {
      let element = document.querySelector<HTMLMetaElement>(
        `meta[name="${name}"]`,
      );

      if (!content) {
        element?.remove();
        return;
      }

      if (!element) {
        element = document.createElement("meta");
        element.name = name;
        document.head.appendChild(element);
      }

      element.content = content;
    };

    setMeta("description", config.metadata.description);
    setMeta(
      "robots",
      config.metadata.noIndex ? "noindex, nofollow" : undefined,
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const timestamp = chapter.sourceStart;
    const chapterEnd = chapter.sourceEnd ?? config.video.durationSeconds;

    if (!video || timestamp == null) return;

    const playChapter = () => {
      video.currentTime = timestamp;
      void video.play().catch(() => {});
    };

    const stopAtChapterEnd = () => {
      if (video.currentTime < chapterEnd) return;

      video.pause();
      video.currentTime = chapterEnd;
    };

    video.addEventListener("timeupdate", stopAtChapterEnd);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      playChapter();
    } else {
      video.addEventListener("loadedmetadata", playChapter, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", playChapter);
      video.removeEventListener("timeupdate", stopAtChapterEnd);
    };
  }, [chapter.sourceEnd, chapter.sourceStart, current]);

  return (
    <div
      className="grain relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 py-8 sm:py-12"
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

      <h1 className="sr-only">{config.metadata.title}</h1>

      <main
        className="relative z-10 flex w-full max-w-4xl items-center gap-8"
        aria-label="Tutorial interactivo"
      >
        <div className="hidden flex-1 flex-col items-end gap-4 pr-4 md:flex">
          <ChapterTag
            label={chapter.tag}
            accent={config.theme.accent}
            accentRgb={config.theme.accentRgb}
          />
          <div
            key={`left-${animKey}`}
            className="animate-fade-up text-right"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
              {chapter.label}
            </p>
            <h2
              className="mb-3 text-3xl font-bold leading-tight text-white"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {chapter.title}
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">
              {chapter.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-5">
          <div
            className="w-full max-w-xs animate-fade-up text-center md:hidden"
            key={`mobile-${animKey}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
              {chapter.label}
            </p>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {chapter.title}
            </h2>
          </div>

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
            ) : config.mode === "photos" ? (
              <PhotoScreen
                key="photos"
                photos={chapter.photos ?? []}
                errorMessage={config.messages.videoError}
              />
            ) : (
              <VideoScreen
                key="video"
                videoRef={videoRef}
                video={config.video}
                errorMessage={config.messages.videoError}
                accent={config.theme.accent}
                accentRgb={config.theme.accentRgb}
                chapterStart={chapter.sourceStart ?? 0}
                chapterEnd={chapter.sourceEnd ?? config.video.durationSeconds}
              />
            )}

            <div className="absolute bottom-3 left-1/2 z-20 h-1 w-20 -translate-x-1/2 rounded-full bg-white/20" />
          </div>

          <div
            className="flex items-center gap-1 rounded-full bg-white/4 p-1"
            role="group"
            aria-label="Progreso del tutorial"
          >
            {config.chapters.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ir a ${item.label}`}
                aria-current={index === current ? "step" : undefined}
                className="relative flex h-7 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/8 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: index === current ? 24 : 6,
                    height: 6,
                    background:
                      index === current
                        ? config.theme.accent
                        : "rgba(255,255,255,0.3)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="hidden flex-1 flex-col items-start gap-6 pl-4 md:flex">
          <nav
            className="flex w-full max-w-52 flex-col gap-1"
            aria-label="Capítulos del tutorial"
          >
            {config.chapters.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-current={index === current ? "step" : undefined}
                className="group relative flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{
                  background:
                    index === current
                      ? `rgba(${config.theme.accentRgb},0.1)`
                      : "transparent",
                  border:
                    index === current
                      ? `1px solid rgba(${config.theme.accentRgb},0.22)`
                      : "1px solid transparent",
                }}
              >
                <div
                  className="shrink-0 rounded-full transition-all duration-300"
                  style={{
                    width: index === current ? 8 : 6,
                    height: index === current ? 8 : 6,
                    background:
                      index === current
                        ? config.theme.accent
                        : index < current
                          ? `rgba(${config.theme.accentRgb},0.4)`
                          : "rgba(255,255,255,0.18)",
                  }}
                />
                <span className="min-w-0">
                  <span
                    className="block text-xs font-semibold transition-colors duration-200"
                    style={{
                      color:
                        index === current
                          ? config.theme.accent
                          : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-white/45 transition-colors duration-200 group-hover:text-white/70">
                    {item.tag}
                  </span>
                </span>
              </button>
            ))}
          </nav>

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

          <p className="max-w-52 text-xs leading-relaxed text-white/50">
            {config.intro.navigationHint}
          </p>
        </div>
      </main>

      <p className="relative z-10 mt-5 max-w-xs text-center text-sm leading-relaxed text-white/60 md:hidden">
        {chapter.description}
      </p>

      <div
        className="relative z-10 mt-8 text-xs tracking-widest text-white/50"
        aria-live="polite"
      >
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(config.chapters.length).padStart(2, "0")}
      </div>
    </div>
  );
}
