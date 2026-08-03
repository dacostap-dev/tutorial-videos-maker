import remateVideo from "../remate.mp4"
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
    src: remateVideo,
    type: "video/mp4",
    autoPlay: true,
    muted: true,
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
      timestamp: null,
      tag: "Descripción general",
    },
    {
      id: "step-1",
      label: "Paso 1",
      title: "Seleccioná tus cuotas",
      description:
        "Elegí las cuotas con las que querés participar del remate. Podés seleccionar una o varias cuotas disponibles en tu fondo.",
      timestamp: 0,
      tag: "Selección de cuotas",
    },
    {
      id: "step-2",
      label: "Paso 2",
      title: "Aplicá el beneficio",
      description:
        "Decidí si preferís reducir el monto de cada cuota mensual o acortar el plazo total de tu plan de ahorro.",
      timestamp: 30,
      tag: "Reducir cuotas · Reducir plazo",
    },
    {
      id: "step-3",
      label: "Paso 3",
      title: "Confirmación",
      description:
        "El remate queda registrado y el beneficio se aplica en el próximo período de liquidación de tu fondo.",
      timestamp: 55,
      tag: "Remate confirmado",
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
