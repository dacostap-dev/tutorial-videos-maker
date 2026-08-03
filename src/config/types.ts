export type Chapter = {
  id: string
  label: string
  title: string
  description: string
  sourceStart: number | null
  sourceEnd?: number
  durationSeconds?: number
  tag: string
  narration?: {
    text: string
    audioSrc?: string
  }
}

export type TutorialConfig = {
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
  }
  timeline: {
    chapterGapSeconds: number
  }
  messages: {
    videoError: string
  }
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
