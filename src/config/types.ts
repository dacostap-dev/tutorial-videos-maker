export type Chapter = {
  id: string
  label: string
  title: string
  description: string
  timestamp: number | null
  tag: string
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
    autoPlay?: boolean
    muted?: boolean
    poster?: string
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
