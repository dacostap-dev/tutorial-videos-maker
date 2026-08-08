import type { TutorialConfig } from "../types";
import { productDefaults } from "../product";

export const homeConfig = {
  ...productDefaults,
  mode: "video",

  metadata: {
    title: "Maquinet | Inicio de la aplicación",
    description:
      "Tutorial interactivo sobre las funcionalidades disponibles desde el inicio de Maquinet.",
    language: "es",
    noIndex: true,
  },

  intro: {
    sectionLabel: "Sección que verás",
    sectionName: "Inicio de la aplicación",
    description:
      "Conoce la información de tu contrato y las opciones para revisar tus pagos y solicitar tu estado de cuenta desde Inicio.",
    navigationHint: "Explora con las flechas o elige un paso",
  },

  // Duración medida del MP4 convertido a partir de la grabación original.
  video: {
    src: "assets/tutorials/home/home_corto.mp4",
    type: "video/mp4",
    durationSeconds: 59.523333,
    autoPlay: true,
    muted: true,
  },

  output: {
    ...productDefaults.output,
    introDurationSeconds: 10,
  },

  videoZooms: [
    {
      id: "contract-code",
      sourceStartSeconds: 4.0,
      sourceEndSeconds: 5.0,
      scale: 3.5,
      originX: 10,
      originY: 10,
      transitionSeconds: 1,
    },
    {
      id: "contract-situation",
      sourceStartSeconds: 7.0,
      sourceEndSeconds: 8.0,
      scale: 3.5,
      originX: 90,
      originY: 10,
      transitionSeconds: 1,
    },

    {
      id: "contract-certificado",
      sourceStartSeconds: 10,
      sourceEndSeconds: 11,
      scale: 3.6,
      originX: 90,
      originY: 26,
      transitionSeconds: 1,
    },
  ],

  outro: {
    title: "¡Listo!",
    description:
      "Desde el inicio de Maquinet puedes consultar la información de tu contrato de forma rápida y sencilla.",
  },

  audioCues: [
    {
      id: "home-overview",
      timebase: "render",
      startSeconds: 0,
      text: "Desde el inicio de la aplicación puedes consultar la información de tu contrato y revisar tus principales movimientos.",
      audioSrc: "audio/tutorials/home/processed/home-overview.m4a",
    },
    {
      id: "contract-information",
      timebase: "source",
      startSeconds: 1,
      text: "En esta sección podrás ver el programa, el código de asociado y la situación de tu contrato.",
      audioSrc: "audio/tutorials/home/processed/contract-information.m4a",
    },
    {
      id: "certificate-value",
      timebase: "source",
      startSeconds: 7,
      text: "También encontrarás el valor del certificado asociado a tu contrato.",
      audioSrc: "audio/tutorials/home/processed/certificate-value.m4a",
    },
    {
      id: "capital-progress",
      timebase: "source",
      startSeconds: 12,
      text: "Además, podrás consultar el avance de tu cuota capital.",
      audioSrc: "audio/tutorials/home/processed/capital-progress.m4a",
    },
    {
      id: "open-contract-selector",
      timebase: "source",
      startSeconds: 16,
      text: "Para cambiar de contrato, toca el código de asociado.",
      audioSrc: "audio/tutorials/home/processed/open-contract-selector.m4a",
    },
    {
      id: "switch-contract",
      timebase: "source",
      startSeconds: 20,
      text: "Selecciona otro contrato y la información de la pantalla se actualizará.",
      audioSrc: "audio/tutorials/home/processed/switch-contract.m4a",
    },
    {
      id: "payment-status",
      timebase: "source",
      startSeconds: 26,
      text: "En estado de pago podrás verificar si tus pagos se encuentran al día o pendientes.",
      audioSrc: "audio/tutorials/home/processed/payment-status.m4a",
    },
    {
      id: "open-pending-payments",
      timebase: "source",
      startSeconds: 32,
      text: "Si el estado aparece como Pendiente, toca Pagar para continuar con la gestión de tus pagos.",
      audioSrc: "audio/tutorials/home/processed/open-pending-payments.m4a",
    },
    {
      id: "open-recent-payments",
      timebase: "source",
      startSeconds: 38,
      text: "En la sección Mis últimos pagos encontrarás el historial de los pagos realizados recientemente.",
      audioSrc: "audio/tutorials/home/processed/open-recent-payments.m4a",
    },
    {
      id: "payment-summary",
      timebase: "source",
      startSeconds: 44,
      text: "Cada registro muestra la fecha y el importe correspondiente al pago.",
      audioSrc: "audio/tutorials/home/processed/payment-summary.m4a",
    },
    {
      id: "payment-details",
      timebase: "source",
      startSeconds: 48,
      text: "Para consultar más información, toca el botón de detalle del pago que deseas revisar.",
      audioSrc: "audio/tutorials/home/processed/payment-details.m4a",
    },
    {
      id: "account-statement",
      timebase: "source",
      startSeconds: 55,
      text: "Toca Estado de cuenta para solicitar que la información de tu contrato sea enviada a tu correo electrónico.",
      audioSrc: "audio/tutorials/home/processed/account-statement.m4a",
    },
  ],

  chapters: [
    {
      id: "intro",
      label: "Introducción",
      title: "Sección Inicio",
      description:
        "Conoce las opciones disponibles desde la pantalla principal de Maquinet para consultar la información de tu contrato.",
      sourceStart: null,
      tag: "Descripción general",
    },
    {
      id: "contract-review",
      label: "Paso 1",
      title: "Revisa la información de tu contrato",
      description:
        "Consulta el programa, el código de asociado, la situación del contrato, el valor de tu certificado y el avance de tu cuota capital. También aprenderás cómo cambiar entre tus contratos desde el selector.",
      sourceStart: 0,
      sourceEnd: 26,
      tag: "Información del contrato",
    },
    {
      id: "pending-payments",
      label: "Paso 2",
      title: "Accede a tus pagos pendientes",
      description:
        "Si tu estado de pago aparece como Pendiente, toca Pagar para continuar con la gestión de tus pagos.",
      sourceStart: 26,
      sourceEnd: 38,
      tag: "Pagos pendientes",
    },
    {
      id: "recent-payments",
      label: "Paso 3",
      title: "Revisa tus últimos pagos",
      description:
        "Consulta la fecha, el importe y el detalle de los pagos que has realizado recientemente.",
      sourceStart: 38,
      sourceEnd: 55,
      tag: "Historial de pagos",
    },
    {
      id: "account-statement",
      label: "Paso 4",
      title: "Consulta tu estado de cuenta",
      description:
        "Solicita el estado de cuenta y recíbelo en el correo registrado del asociado.",
      sourceStart: 55,
      sourceEnd: 59.523333,
      tag: "Resumen del contrato",
    },
  ],
} satisfies TutorialConfig;
