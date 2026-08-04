import type { TutorialConfig } from "./types";
import appIcon from "../appicon.jpg";

export const tutorialConfig = {
  mode: "video",
  brand: {
    name: "Maquinet",
    eyebrow: "Fondos Colectivos",
    logoSrc: appIcon,
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
      "Aprende a licitar cuotas de tu fondo colectivo y elegir cómo aplicar el beneficio obtenido.",
    navigationHint: "Navega con las flechas",
  },

  video: {
    src: "assets/remate.mp4",
    type: "video/mp4",
    durationSeconds: 56.381,
    autoPlay: true,
    muted: true,
  },

  videoHolds: [
    {
      sourceAtSeconds: 33,
      durationSeconds: 4,
    },
    {
      sourceAtSeconds: 36,
      durationSeconds: 3,
    },
  ],

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

  outro: {
    title: "¡Listo!",
    description: "Con Maquinet, gestionar tu remate es fácil, claro y seguro.",
  },

  audioCues: [
    {
      id: "intro-question",
      timebase: "render",
      startSeconds: 0,
      text: "¿Quieres hacer tu remate desde la app?",
      audioSrc: "audio/processed/intro-question.m4a",
    },
    {
      id: "intro-explanation",
      timebase: "render",
      startSeconds: 2,
      text: "Te mostramos cómo hacerlo, paso a paso.",
      audioSrc: "audio/processed/intro-explanation.m4a",
    },
    {
      id: "open-remate",
      timebase: "render",
      startSeconds: 6,
      text: "Desde la pantalla principal, ingresa a la opción “Remate”.",
      audioSrc: "audio/processed/open-remate.m4a",
    },
    {
      id: "open-winner-history",
      timebase: "render",
      startSeconds: 11,
      text: "Antes de realizar tu remate, puedes revisar el “Historial de ganadores”.",
      audioSrc: "audio/processed/open-winner-history.m4a",
    },
    {
      id: "review-winner-history",
      timebase: "render",
      startSeconds: 15.5,
      text: "Ahí encontrarás los resultados de las últimas asambleas.",
      audioSrc: "audio/processed/review-winner-history.m4a",
    },
    {
      id: "select-installments",
      timebase: "render",
      startSeconds: 20,
      text: "Escribe cuántas cuotas quieres rematar y toca “Siguiente”.",
      audioSrc: "audio/processed/select-installments.m4a",
    },
    {
      id: "choose-benefit",
      timebase: "render",
      startSeconds: 25,
      text: "Elige cómo aplicar tu propuesta.",
      audioSrc: "audio/processed/choose-benefit.m4a",
    },
    {
      id: "benefit-options",
      timebase: "render",
      startSeconds: 28,
      text: "Puedes reducir el plazo o el valor de tu cuota.",
      audioSrc: "audio/processed/benefit-options.m4a",
    },
    {
      id: "review-simulation",
      timebase: "render",
      startSeconds: 33,
      text: "Revisa la simulación.",
      audioSrc: "audio/processed/review-simulation.m4a",
    },
    {
      id: "simulation-details",
      timebase: "render",
      startSeconds: 35,
      text: "Verás las cuotas rematadas, el nuevo valor mensual, las cuotas restantes y la fecha de remate.",
      audioSrc: "audio/processed/simulation-details.m4a",
    },
    {
      id: "open-terms",
      timebase: "render",
      startSeconds: 42,
      text: "Consulta las condiciones en “Términos y condiciones”.",
      audioSrc: "audio/processed/open-terms.m4a",
    },
    {
      id: "read-terms",
      timebase: "render",
      startSeconds: 46,
      text: "Lee la información y vuelve a la propuesta.",
      audioSrc: "audio/processed/read-terms.m4a",
    },
    {
      id: "submit-remate",
      timebase: "render",
      startSeconds: 50,
      text: "Si estás de acuerdo, marca la casilla y toca “Rematar”.",
      audioSrc: "audio/processed/submit-remate.m4a",
    },
    {
      id: "success",
      timebase: "render",
      startSeconds: 56.5,
      text: "¡Listo!",
      audioSrc: "audio/processed/success.m4a",
    },
    {
      id: "assembly",
      timebase: "render",
      startSeconds: 57.5,
      text: "Tu propuesta quedará registrada para la próxima asamblea.",
      audioSrc: "audio/processed/assembly.m4a",
    },
    {
      id: "withdraw",
      timebase: "render",
      startSeconds: 61.2,
      text: "Si cambias de opinión, puedes retirarla antes de que comience la asamblea.",
      audioSrc: "audio/processed/withdraw.m4a",
    },
    {
      id: "delete-remate",
      timebase: "render",
      startSeconds: 65,
      text: "Toca “Eliminar remate” y confirma la eliminación.",
      audioSrc: "audio/processed/delete-remate.m4a",
    },
    {
      id: "outro",
      timebase: "render",
      startSeconds: 69,
      text: "Con Maquinet, gestionar tu remate es fácil, claro y seguro.",
      audioSrc: "audio/processed/outro.m4a",
    },
  ],

  chapters: [
    {
      id: "intro",
      label: "Introducción",
      title: "Sección Remate",
      description:
        "Conoce cómo funciona el Remate dentro de Maquinet. Una herramienta que te permite licitar cuotas de tu fondo colectivo y obtener beneficios anticipados.",
      sourceStart: null,
      tag: "Descripción general",
    },
    {
      id: "step-1",
      label: "Paso 1",
      title: "Selecciona tus cuotas",
      description:
        "Elige las cuotas con las que quieres participar del remate. Puedes seleccionar una o varias cuotas disponibles en tu fondo.",
      sourceStart: 0,
      sourceEnd: 30,
      tag: "Selección de cuotas",
    },
    {
      id: "step-2",
      label: "Paso 2",
      title: "Aplica el beneficio",
      description:
        "Decide si prefieres reducir el monto de cada cuota mensual o acortar el plazo total de tu plan de ahorro.",
      sourceStart: 30,
      sourceEnd: 55,
      tag: "Reducir cuotas · Reducir plazo",
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
} satisfies TutorialConfig;
