import type { Chapter, PhotoSlide, TutorialConfig } from "../config/types"

export type RenderScene = {
  chapter: Chapter
  index: number
  from: number
  durationInFrames: number
  sourceStartFrame: number | null
  sourceEndFrame: number | null
}

export type PhotoRenderSlide = {
  photo: PhotoSlide
  from: number
  durationInFrames: number
  transitionInFrames: number
  transitionOutFrames: number
}

function getPhotoTransitionSeconds(photo: PhotoSlide, config: TutorialConfig) {
  return Math.max(
    0,
    photo.transitionSeconds ?? config.timeline.photoTransitionSeconds ?? 0,
  )
}

function getPhotoChapterDurationSeconds(
  chapter: Chapter,
  config: TutorialConfig,
) {
  const photos = chapter.photos ?? []
  const totalSeconds = photos.reduce(
    (total, photo) => total + photo.durationSeconds,
    0,
  )
  const transitionSeconds = photos
    .slice(0, -1)
    .reduce(
      (total, photo) => total + getPhotoTransitionSeconds(photo, config),
      0,
    )

  return Math.max(0, totalSeconds - transitionSeconds)
}

function getVideoHolds(config: TutorialConfig) {
  return [...(config.videoHolds ?? [])].sort(
    (a, b) => a.sourceAtSeconds - b.sourceAtSeconds,
  )
}

function getVideoHoldDurationBetween(
  config: TutorialConfig,
  sourceStart: number,
  sourceEnd: number,
) {
  if (config.mode !== "video") return 0

  return getVideoHolds(config)
    .filter(
      (hold) =>
        hold.sourceAtSeconds >= sourceStart && hold.sourceAtSeconds < sourceEnd,
    )
    .reduce((total, hold) => total + hold.durationSeconds, 0)
}

function getVideoHoldDurationBeforeSource(
  config: TutorialConfig,
  sourceSeconds: number,
) {
  return getVideoHolds(config)
    .filter((hold) => hold.sourceAtSeconds < sourceSeconds)
    .reduce((total, hold) => total + hold.durationSeconds, 0)
}

export function getVideoPlaybackDurationInFrames(config: TutorialConfig) {
  const holdDurationSeconds = getVideoHolds(config).reduce(
    (total, hold) => total + hold.durationSeconds,
    0,
  )

  return Math.round(
    (config.video.durationSeconds + holdDurationSeconds) * config.output.fps,
  )
}

export function getAudioCueStartSeconds(
  config: TutorialConfig,
  startSeconds: number,
) {
  if (config.mode !== "video") return startSeconds

  return (
    startSeconds +
    getVideoHolds(config).reduce((total, hold) => {
      const originalOutputTime =
        config.output.introDurationSeconds +
        hold.sourceAtSeconds +
        getVideoHoldDurationBeforeSource(config, hold.sourceAtSeconds)

      return (
        total + (startSeconds > originalOutputTime ? hold.durationSeconds : 0)
      )
    }, 0)
  )
}

function getChapterDurationSeconds(
  chapter: Chapter,
  index: number,
  config: TutorialConfig,
) {
  if (chapter.durationSeconds !== undefined) {
    return chapter.durationSeconds
  }

  if (chapter.sourceStart === null) {
    return config.output.introDurationSeconds
  }

  if (config.mode === "photos") {
    return getPhotoChapterDurationSeconds(chapter, config)
  }

  if (chapter.sourceStart === undefined) {
    return 0
  }

  const nextChapter = config.chapters[index + 1]
  const sourceEnd =
    chapter.sourceEnd ??
    (nextChapter?.sourceStart !== null && nextChapter?.sourceStart !== undefined
      ? nextChapter.sourceStart
      : config.video.durationSeconds)

  return (
    Math.max(0, sourceEnd - chapter.sourceStart) +
    getVideoHoldDurationBetween(config, chapter.sourceStart, sourceEnd)
  )
}

export function getRenderScenes(config: TutorialConfig): RenderScene[] {
  let from = 0

  return config.chapters.map((chapter, index) => {
    const durationInFrames = Math.max(
      1,
      Math.round(
        getChapterDurationSeconds(chapter, index, config) * config.output.fps,
      ),
    )
    const sourceStartFrame =
      config.mode === "video" && chapter.sourceStart !== null
        ? Math.round((chapter.sourceStart ?? 0) * config.output.fps)
        : null
    const sourceEnd =
      config.mode !== "video" || chapter.sourceStart === null
        ? null
        : (chapter.sourceEnd ??
          (chapter.sourceStart ?? 0) + durationInFrames / config.output.fps)
    const sourceEndFrame =
      sourceEnd === null ? null : Math.round(sourceEnd * config.output.fps)
    const scene = {
      chapter,
      index,
      from,
      durationInFrames,
      sourceStartFrame,
      sourceEndFrame,
    }

    from +=
      durationInFrames +
      Math.round(config.timeline.chapterGapSeconds * config.output.fps)

    return scene
  })
}

export function getPhotoRenderSlides(config: TutorialConfig) {
  const slides: PhotoRenderSlide[] = []
  const scenes = getRenderScenes(config)

  for (const scene of scenes) {
    const photos = scene.chapter.photos ?? []
    let from = scene.from

    photos.forEach((photo, index) => {
      const durationInFrames = Math.max(
        1,
        Math.round(photo.durationSeconds * config.output.fps),
      )
      const transitionInFrames =
        index === 0
          ? 0
          : Math.min(
              durationInFrames - 1,
              Math.round(
                getPhotoTransitionSeconds(photos[index - 1], config) *
                  config.output.fps,
              ),
            )
      const transitionOutFrames =
        index === photos.length - 1
          ? 0
          : Math.min(
              durationInFrames - 1,
              Math.round(
                getPhotoTransitionSeconds(photo, config) * config.output.fps,
              ),
            )

      slides.push({
        photo,
        from,
        durationInFrames,
        transitionInFrames,
        transitionOutFrames,
      })

      from += durationInFrames - transitionOutFrames
    })
  }

  return slides
}

export function getTotalDurationInFrames(config: TutorialConfig) {
  const scenes = getRenderScenes(config)
  const lastScene = scenes[scenes.length - 1]

  if (!lastScene) return 1

  return (
    lastScene.from +
    lastScene.durationInFrames +
    Math.round(config.output.outroDurationSeconds * config.output.fps)
  )
}

export function getOutroFrom(config: TutorialConfig) {
  const scenes = getRenderScenes(config)
  const lastScene = scenes[scenes.length - 1]

  if (!lastScene) return 0

  return lastScene.from + lastScene.durationInFrames
}
