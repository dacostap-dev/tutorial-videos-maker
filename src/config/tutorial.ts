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
    introDurationSeconds: 6,
    outroDurationSeconds: 4,
  },

  timeline: {
    chapterGapSeconds: 0,
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
      startSeconds: 0,
      text: "¿Quieres realizar tu remate desde la app?",
      audioSrc: "audio/processed/intro-question.m4a",
    },
    {
      id: "intro-explanation",
      startSeconds: 2,
      text: "Te mostramos cómo hacerlo, paso a paso.",
      audioSrc: "audio/processed/intro-explanation.m4a",
    },
    {
      id: "open-remate",
      startSeconds: 6,
      text: "Desde la pantalla principal, ingresa a la opción Remate.",
      audioSrc: "audio/processed/open-remate.m4a",
    },
    {
      id: "select-installments",
      startSeconds: 11,
      text: "Escribe la cantidad de cuotas con las que deseas participar y pulsa Siguiente.",
      audioSrc: "audio/processed/select-installments.m4a",
    },
    {
      id: "choose-benefit",
      startSeconds: 17,
      text: "Ahora elige cómo aplicar tu propuesta.",
      audioSrc: "audio/processed/choose-benefit.m4a",
    },
    {
      id: "benefit-options",
      startSeconds: 19,
      text: "Puedes reducir el plazo o reducir el valor de tu cuota.",
      audioSrc: "audio/processed/benefit-options.m4a",
    },
    {
      id: "review-simulation",
      startSeconds: 24,
      text: "Revisa la simulación.",
      audioSrc: "audio/processed/review-simulation.m4a",
    },
    {
      id: "simulation-details",
      startSeconds: 26,
      text: "Verás las cuotas rematadas, el nuevo valor mensual, las cuotas restantes y la fecha de remate.",
      audioSrc: "audio/processed/simulation-details.m4a",
    },
    {
      id: "open-terms",
      startSeconds: 33,
      text: "Para conocer las condiciones, pulsa Términos y condiciones.",
      audioSrc: "audio/processed/open-terms.m4a",
    },
    {
      id: "read-terms",
      startSeconds: 37,
      text: "Lee la información con atención y luego vuelve a la propuesta.",
      audioSrc: "audio/processed/read-terms.m4a",
    },
    {
      id: "submit-remate",
      startSeconds: 41,
      text: "Si estás de acuerdo, marca la casilla y pulsa Rematar para generar tu propuesta.",
      audioSrc: "audio/processed/submit-remate.m4a",
    },
    {
      id: "success",
      startSeconds: 47,
      text: "¡Listo!",
      audioSrc: "audio/processed/success.m4a",
    },
    {
      id: "assembly",
      startSeconds: 49,
      text: "Tu propuesta quedará registrada para la próxima asamblea.",
      audioSrc: "audio/processed/assembly.m4a",
    },
    {
      id: "withdraw",
      startSeconds: 53,
      text: "Si cambias de opinión, puedes retirarla antes de que la asamblea inicie.",
      audioSrc: "audio/processed/withdraw.m4a",
    },
    {
      id: "delete-remate",
      startSeconds: 58,
      text: "Pulsa Eliminar Remate y confirma la eliminación.",
      audioSrc: "audio/processed/delete-remate.m4a",
    },
    {
      id: "outro",
      startSeconds: 62,
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
        "Conocé cómo funciona el Remate dentro de Maquinet. Una herramienta que te permite licitar cuotas de tu fondo colectivo y obtener beneficios anticipados.",
      sourceStart: null,
      tag: "Descripción general",
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
} satisfies TutorialConfig
