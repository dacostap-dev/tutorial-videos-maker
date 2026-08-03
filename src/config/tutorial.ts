import type { TutorialConfig } from "./types"

export const tutorialConfig = {
  brand: {
    name: "Maquinet",
    eyebrow: "Fondos Colectivos",
    // Reemplazá undefined por un asset importado para usar un logo propio.
    logoSrc: undefined,
  },

  metadata: {
    title: "Maquinet | Remate de cuotas",
    description:
      "Tutorial interactivo sobre el remate de cuotas de fondos colectivos.",
    language: "es",
    noIndex: true,
  },

  intro: {
    sectionLabel: "Sección que verás",
    sectionName: "Remate de cuotas",
    description:
      "Aprendé a licitar cuotas de tu fondo colectivo y elegir cómo aplicar el beneficio obtenido.",
    navigationHint: "Navegá con las flechas",
  },

  video: {
    src: "assets/remate.mp4",
    type: "video/mp4",
    durationSeconds: 56.381,
    autoPlay: true,
    muted: true,
  },

  output: {
    width: 1080,
    height: 1920,
    fps: 30,
    introDurationSeconds: 3,
  },

  timeline: {
    chapterGapSeconds: 0,
  },

  messages: {
    videoError: "No se pudo cargar el vídeo del tutorial.",
  },

  chapters: [
    {
      id: "intro",
      label: "Introducción",
      title: "Sección Remate",
      description:
        "Conocé cómo funciona el Remate dentro de Maquinet. Una herramienta que te permite licitar cuotas de tu fondo colectivo y obtener beneficios anticipados.",
      sourceStart: null,
      tag: "Descripción general",
      durationSeconds: 3,
      narration: {
        text: "Conocé cómo funciona el Remate dentro de Maquinet.",
      },
    },
    {
      id: "step-1",
      label: "Paso 1",
      title: "Seleccioná tus cuotas",
      description:
        "Elegí las cuotas con las que querés participar del remate. Podés seleccionar una o varias cuotas disponibles en tu fondo.",
      sourceStart: 0,
      sourceEnd: 30,
      tag: "Selección de cuotas",
      narration: {
        text: "Primero seleccioná las cuotas con las que querés participar del remate.",
      },
    },
    {
      id: "step-2",
      label: "Paso 2",
      title: "Aplicá el beneficio",
      description:
        "Decidí si preferís reducir el monto de cada cuota mensual o acortar el plazo total de tu plan de ahorro.",
      sourceStart: 30,
      sourceEnd: 55,
      tag: "Reducir cuotas · Reducir plazo",
      narration: {
        text: "Después decidí si querés reducir el monto de cada cuota o acortar el plazo.",
      },
    },
    {
      id: "step-3",
      label: "Paso 3",
      title: "Confirmación",
      description:
        "El remate queda registrado y el beneficio se aplica en el próximo período de liquidación de tu fondo.",
      sourceStart: 55,
      sourceEnd: 56.381,
      tag: "Remate confirmado",
      narration: {
        text: "Finalmente, el remate queda registrado y el beneficio se aplica en el próximo período.",
      },
    },
  ],

  theme: {
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    background: "#07090f",
    phoneSurface: "#0f1117",
    introStart: "#0f1520",
    introEnd: "#07090f",
  },
} satisfies TutorialConfig
