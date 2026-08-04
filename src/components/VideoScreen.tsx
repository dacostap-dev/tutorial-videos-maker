import { useEffect, useState, type CSSProperties, type RefObject } from "react";
import type { TutorialConfig } from "../config/types";

type VideoScreenProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  video: TutorialConfig["video"];
  errorMessage: string;
  accent: string;
  accentRgb: string;
  chapterStart: number;
  chapterEnd: number;
};

const formatTime = (seconds: number) => {
  const wholeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = String(wholeSeconds % 60).padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

export default function VideoScreen({
  videoRef,
  video,
  errorMessage,
  accent,
  accentRgb,
  chapterStart,
  chapterEnd,
}: VideoScreenProps) {
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(chapterStart);

  const progress = Math.min(chapterEnd, Math.max(chapterStart, currentTime));

  useEffect(() => {
    setHasError(false);
  }, [video.src]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const handleTimeUpdate = () => setCurrentTime(element.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    element.addEventListener("timeupdate", handleTimeUpdate);
    element.addEventListener("play", handlePlay);
    element.addEventListener("pause", handlePause);
    setCurrentTime(element.currentTime);

    return () => {
      element.removeEventListener("timeupdate", handleTimeUpdate);
      element.removeEventListener("play", handlePlay);
      element.removeEventListener("pause", handlePause);
    };
  }, [chapterStart, videoRef]);

  const togglePlayback = () => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      if (element.currentTime >= chapterEnd - 0.05) {
        element.currentTime = chapterStart;
        setCurrentTime(chapterStart);
      }
      void element.play().catch(() => {});
      return;
    }

    element.pause();
  };

  const seek = (value: string) => {
    const element = videoRef.current;
    if (!element) return;

    const nextTime = Number(value);
    element.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

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
        <source
          src={video.src.startsWith("/") ? video.src : `/${video.src}`}
          type={video.type}
        />
      </video>

      {!hasError && (
        <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/85 via-black/45 to-transparent px-4 pb-8 pt-16">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pausar vídeo" : "Reproducir vídeo"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 2v8M9 2v8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="m4 2.5 5 3.5-5 3.5v-7Z" fill="currentColor" />
                </svg>
              )}
            </button>

            <input
              type="range"
              min={chapterStart}
              max={chapterEnd}
              step="0.01"
              value={progress}
              onChange={(event) => seek(event.target.value)}
              aria-label="Progreso del capítulo"
              className="h-1 min-w-0 flex-1 cursor-pointer accent-(--video-accent)"
              style={{ "--video-accent": accent } as CSSProperties}
            />

            <span className="w-8 text-right text-[10px] tabular-nums text-white/65">
              {formatTime(progress - chapterStart)}
            </span>
          </div>
        </div>
      )}

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
  );
}
