type AppIconProps = {
  size?: number
  logoSrc?: string
  accent: string
  accentRgb: string
  surface: string
}

export default function AppIcon({
  size = 64,
  logoSrc,
  accent,
  accentRgb,
  surface,
}: AppIconProps) {
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt=""
        width={size}
        height={size}
        className="shrink-0 object-contain"
        style={{ borderRadius: size * 0.22 }}
      />
    )
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: `linear-gradient(145deg, ${surface} 0%, #0f1c30 100%)`,
        boxShadow: `0 8px 32px rgba(${accentRgb},0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
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
        aria-hidden="true"
      >
        <path
          d="M4 28V8l8 12 6-9 6 9 8-12v20"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="18"
          cy="18"
          r="5"
          stroke={accent}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />
        <circle cx="18" cy="18" r="1.5" fill={accent} />
      </svg>
    </div>
  )
}
