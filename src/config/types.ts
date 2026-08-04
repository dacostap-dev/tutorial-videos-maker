export type TutorialMode = "video" | "photos"

export type PhotoSlide = {
  src: string
  durationSeconds: number
  transitionSeconds?: number
  fit?: "contain" | "cover"
}

export type Chapter = {
  id: string
  label: string
  title: string
  description: string
  sourceStart?: number | null
  sourceEnd?: number
  durationSeconds?: number
  tag: string
  photos?: PhotoSlide[]
}

export type AudioCue = {
  id: string
  startSeconds: number
  text: string
  audioSrc?: string
}

export type TutorialConfig = {
  mode: TutorialMode
  brand: {
    name: string
    eyebrow: string
    logoSrc?: string
  }
  metadata: {
    title: string
    description: string
    language: string
    noIndex?: boolean
  }
  intro: {
    sectionLabel: string
    sectionName: string
    description: string
    navigationHint: string
  }
  video: {
    src: string
    type: string
    durationSeconds: number
    autoPlay?: boolean
    muted?: boolean
    poster?: string
  }
  output: {
    width: number
    height: number
    fps: number
    introDurationSeconds: number
    outroDurationSeconds: number
  }
  timeline: {
    chapterGapSeconds: number
    photoTransitionSeconds?: number
  }
  messages: {
    videoError: string
  }
  outro: {
    title: string
    description: string
  }
  audioCues: AudioCue[]
  chapters: Chapter[]
  theme: {
    accent: string
    accentRgb: string
    background: string
    phoneSurface: string
    introStart: string
    introEnd: string
  }
}
