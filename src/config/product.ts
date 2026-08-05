import type { TutorialConfig } from "./types"
import appIcon from "../appicon.jpg"

export const productDefaults = {
  brand: {
    name: "Maquinet",
    eyebrow: "Fondos Colectivos",
    logoSrc: appIcon,
  },

  output: {
    width: 1920,
    height: 1080,
    fps: 30,
    introDurationSeconds: 6,
    outroDurationSeconds: 4,
  },

  timeline: {
    chapterGapSeconds: 0,
    photoTransitionSeconds: 0.35,
  },

  messages: {
    videoError: "No se pudo cargar el vídeo del tutorial.",
  },

  theme: {
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    background: "#07090f",
    phoneSurface: "#0f1117",
    introStart: "#0f1520",
    introEnd: "#07090f",
  },
} satisfies Pick<TutorialConfig, "brand" | "output" | "timeline" | "messages" | "theme">
