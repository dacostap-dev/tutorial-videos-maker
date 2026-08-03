import { useState, useRef, useEffect } from "react"
import remateVideo from "./remate.mp4"

/* ── Chapter definitions ─────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 0,
    label: "Introducción",
    title: "Sección Remate",
    description:
      "Conocé cómo funciona el Remate dentro de Maquinet. Una herramienta que te permite licitar cuotas de tu fondo colectivo y obtener beneficios anticipados.",
    timestamp: null, // intro screen — no video
    tag: "Descripción general",
  },
  {
    id: 1,
    label: "Paso 1",
    title: "Seleccioná tus cuotas",
    description:
      "Elegí las cuotas con las que querés participar del remate. Podés seleccionar una o varias cuotas disponibles en tu fondo.",
    timestamp: 0,
    tag: "Selección de cuotas",
  },
  {
    id: 2,
    label: "Paso 2",
    title: "Aplicá el beneficio",
    description:
      "Decidí si preferís reducir el monto de cada cuota mensual o acortar el plazo total de tu plan de ahorro.",
    timestamp: 30,
    tag: "Reducir cuotas · Reducir plazo",
  },
  {
    id: 3,
    label: "Paso 3",
    title: "Confirmación",
    description:
      "El remate queda registrado y el beneficio se aplica en el próximo período de liquidación de tu fondo.",
    timestamp: 55,
    tag: "Remate confirmado",
  },
]

export default function App() {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const chapter = CHAPTERS[current]
  const isIntro = chapter.timestamp === null

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= CHAPTERS.length) return
    setCurrent(idx)
    setAnimKey((k) => k + 1)
  }

  useEffect(() => {
    const video = videoRef.current
    const timestamp = chapter.timestamp

    if (!video || timestamp === null) return

    const playChapter = () => {
      video.currentTime = timestamp
      void video.play().catch(() => {})
    }

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      playChapter()
      return
    }

    video.addEventListener("loadedmetadata", playChapter, { once: true })
    return () => video.removeEventListener("loadedmetadata", playChapter)
  }, [chapter.timestamp, current])

  return (
    <div className="grain relative min-h-screen bg-[#07090f] flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Ambient glow behind phone */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Top wordmark */}
      <div className="relative z-10 flex items-center gap-3 mb-10">
        <AppIcon size={32} />
        <span className="text-white/40 text-sm font-medium tracking-[0.2em] uppercase">
          Maquinet · Fondos Colectivos
        </span>
      </div>

      {/* Main layout: side label + phone + side label */}
      <div className="relative z-10 flex items-center gap-8 w-full max-w-4xl">
        {/* Left info panel */}
        <div className="flex-1 hidden md:flex flex-col items-end gap-4 pr-4">
          <ChapterTag label={chapter.tag} />
          <div key={`left-${animKey}`} className="animate-fade-up text-right">
            <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-2">
              {chapter.label}
            </p>
            <h2
              className="text-white text-3xl font-bold leading-tight mb-3"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {chapter.title}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {chapter.description}
            </p>
          </div>
        </div>

        {/* Phone frame */}
        <div className="flex-shrink-0 flex flex-col items-center gap-5">
          {/* Arrow up for mobile (hidden on md) */}
          <div className="flex md:hidden gap-4">
            <NavArrow
              dir="left"
              disabled={current === 0}
              onClick={() => goTo(current - 1)}
            />
            <NavArrow
              dir="right"
              disabled={current === CHAPTERS.length - 1}
              onClick={() => goTo(current + 1)}
            />
          </div>

          {/* The phone */}
          <div
            className="relative bg-[#0f1117] overflow-hidden flex-shrink-0"
            style={{
              width: 300,
              height: 620,
              borderRadius: 44,
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Notch */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#0f1117]"
              style={{
                width: 100,
                height: 28,
                borderBottomLeftRadius: 14,
                borderBottomRightRadius: 14,
              }}
            >
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-white/10 rounded-full" />
            </div>

            {/* Screen */}
            {isIntro ? (
              <IntroScreen key={`intro-${animKey}`} />
            ) : (
              <VideoScreen videoRef={videoRef} key="video" />
            )}

            {/* Home bar */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full z-20" />

            {/* Chapter overlay badge */}
            <div className="absolute top-10 left-0 right-0 flex justify-center z-20">
              <div
                className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{
                  background: "rgba(245,158,11,0.15)",
                  color: "#f59e0b",
                  border: "1px solid rgba(245,158,11,0.25)",
                }}
              >
                {chapter.label}
              </div>
            </div>
          </div>

          {/* Chapter dots */}
          <div className="flex items-center gap-2">
            {CHAPTERS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 6,
                  height: 6,
                  background:
                    i === current ? "#f59e0b" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: navigation arrows (desktop) + chapter info mobile */}
        <div className="flex-1 hidden md:flex flex-col items-start gap-6 pl-4">
          {/* Progress */}
          <div className="flex flex-col gap-2 w-full max-w-[180px]">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => goTo(i)}
                className="flex items-center gap-3 group transition-all duration-200"
              >
                <div
                  className="rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    width: 6,
                    height: 6,
                    background:
                      i === current
                        ? "#f59e0b"
                        : i < current
                          ? "rgba(245,158,11,0.4)"
                          : "rgba(255,255,255,0.18)",
                  }}
                />
                <span
                  className="text-xs font-medium transition-colors duration-200"
                  style={{
                    color: i === current ? "#f59e0b" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {ch.label} — {ch.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            <NavArrow
              dir="left"
              disabled={current === 0}
              onClick={() => goTo(current - 1)}
            />
            <NavArrow
              dir="right"
              disabled={current === CHAPTERS.length - 1}
              onClick={() => goTo(current + 1)}
            />
          </div>

          {/* Hint */}
          <p className="text-white/20 text-xs leading-relaxed max-w-[180px]">
            Usá las flechas o hacé clic en los puntos para navegar entre las
            secciones del tutorial.
          </p>
        </div>
      </div>

      {/* Mobile description */}
      <div
        key={`mob-${animKey}`}
        className="animate-fade-up md:hidden mt-8 text-center max-w-xs z-10 relative"
      >
        <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-1">
          {chapter.label}
        </p>
        <h2
          className="text-white text-xl font-bold mb-2"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {chapter.title}
        </h2>
        <p className="text-white/45 text-sm leading-relaxed">
          {chapter.description}
        </p>
      </div>

      {/* Bottom counter */}
      <div className="relative z-10 mt-10 text-white/20 text-xs tracking-widest">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(CHAPTERS.length).padStart(2, "0")}
      </div>
    </div>
  )
}

/* ── Intro screen ─────────────────────────────────────────────── */
function IntroScreen() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 animate-fade-up"
      style={{
        background: "linear-gradient(160deg, #0f1520 0%, #07090f 100%)",
      }}
    >
      {/* Pulse rings */}
      <div className="relative flex items-center justify-center mb-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="absolute rounded-full border border-amber-400/20"
            style={{
              width: 72 + n * 36,
              height: 72 + n * 36,
              animation: `pulse-ring 2.4s ease-out ${n * 0.5}s infinite`,
            }}
          />
        ))}
        <AppIcon size={72} />
      </div>

      <h1
        className="text-white text-2xl font-bold text-center mb-2 leading-tight"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Maquinet
      </h1>
      <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
        Fondos Colectivos
      </p>

      <div
        className="w-full rounded-2xl px-4 py-4 text-center mb-6"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="text-white/40 text-[11px] uppercase tracking-widest font-semibold mb-1">
          Sección que verás
        </p>
        <p className="text-white text-base font-semibold">Remate de cuotas</p>
      </div>

      <p className="text-white/35 text-xs text-center leading-relaxed">
        Aprendé a licitar cuotas de tu fondo colectivo y elegir cómo aplicar el
        beneficio obtenido.
      </p>

      <div className="mt-8 flex items-center gap-2 text-white/25 text-[11px]">
        <div className="w-4 h-px bg-white/20" />
        <span>Navegá con las flechas</span>
        <div className="w-4 h-px bg-white/20" />
      </div>
    </div>
  )
}

/* ── Video screen ─────────────────────────────────────────────── */
function VideoScreen({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>
}) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        onError={() => setHasError(true)}
        playsInline
        preload="auto"
        style={{ borderRadius: 44 }}
      >
        <source src={remateVideo} type="video/mp4" />
      </video>

      {hasError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(7,9,15,0.9)", borderRadius: 44 }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 4l12 6-12 6V4z" fill="#f59e0b" />
            </svg>
          </div>
          <p className="text-white/50 text-xs text-center px-6 leading-relaxed">
            No se pudo cargar el vídeo del tutorial.
          </p>
        </div>
      )}
    </div>
  )
}

/* ── App icon SVG ─────────────────────────────────────────────── */
function AppIcon({ size = 64 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "linear-gradient(145deg, #1a2e4a 0%, #0f1c30 100%)",
        boxShadow:
          "0 8px 32px rgba(245,158,11,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 36 36"
        fill="none"
      >
        {/* M letter stylized */}
        <path
          d="M4 28V8l8 12 6-9 6 9 8-12v20"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Coin circle */}
        <circle
          cx="18"
          cy="18"
          r="5"
          stroke="rgba(245,158,11,0.35)"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />
        <circle cx="18" cy="18" r="1.5" fill="#f59e0b" />
      </svg>
    </div>
  )
}

/* ── Navigation arrow ─────────────────────────────────────────── */
function NavArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "left" | "right"
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="transition-all duration-200 flex items-center justify-center rounded-full"
      style={{
        width: 44,
        height: 44,
        background: disabled
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.08)",
        border: `1px solid ${
          disabled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.12)"
        }`,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === "left" ? (
          <path
            d="M10 3L5 8l5 5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 3l5 5-5 5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  )
}

/* ── Chapter tag ──────────────────────────────────────────────── */
function ChapterTag({ label }: { label: string }) {
  return (
    <div
      className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
      style={{
        background: "rgba(245,158,11,0.1)",
        color: "#f59e0b",
        border: "1px solid rgba(245,158,11,0.2)",
      }}
    >
      {label}
    </div>
  )
}
