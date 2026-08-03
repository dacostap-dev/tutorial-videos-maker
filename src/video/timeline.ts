import type { Chapter, TutorialConfig } from "../config/types"

export type RenderScene = {
  chapter: Chapter
  index: number
  from: number
  durationInFrames: number
  sourceStartFrame: number | null
  sourceEndFrame: number | null
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

  const nextChapter = config.chapters[index + 1]
  const sourceEnd =
    chapter.sourceEnd ??
    (nextChapter?.sourceStart !== null && nextChapter?.sourceStart !== undefined
      ? nextChapter.sourceStart
      : config.video.durationSeconds)

  return Math.max(0, sourceEnd - chapter.sourceStart)
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
      chapter.sourceStart === null
        ? null
        : Math.round(chapter.sourceStart * config.output.fps)
    const sourceEnd =
      chapter.sourceStart === null
        ? null
        : (chapter.sourceEnd ??
          chapter.sourceStart + durationInFrames / config.output.fps)
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
