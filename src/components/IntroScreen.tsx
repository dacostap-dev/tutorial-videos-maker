import type { TutorialConfig } from "../config/types"
import AppIcon from "./AppIcon"

type IntroScreenProps = {
  brand: TutorialConfig["brand"]
  intro: TutorialConfig["intro"]
  accent: string
  surface: string
  accentRgb: string
  introStart: string
  introEnd: string
  animationKey: number
}

export default function IntroScreen({
  brand,
  intro,
  accent,
  surface,
  accentRgb,
  introStart,
  introEnd,
  animationKey,
}: IntroScreenProps) {
  return (
    <div
      key={animationKey}
      className="absolute inset-0 flex animate-fade-up flex-col items-center justify-center px-6"
      style={{
        background: `linear-gradient(160deg, ${introStart} 0%, ${introEnd} 100%)`,
      }}
    >
      <div className="relative mb-8 flex items-center justify-center">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border"
            style={{
              width: 72 + ring * 36,
              height: 72 + ring * 36,
              borderColor: `rgba(${accentRgb},0.2)`,
              animation: `pulse-ring 2.4s ease-out ${ring * 0.5}s infinite`,
            }}
          />
        ))}
        <AppIcon
          size={72}
          logoSrc={brand.logoSrc}
          accent={accent}
          accentRgb={accentRgb}
          surface={surface}
        />
      </div>

      <h1
        className="mb-2 text-center text-2xl font-bold leading-tight text-white"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {brand.name}
      </h1>
      <p
        className="mb-6 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: accent }}
      >
        {brand.eyebrow}
      </p>

      <div
        className="mb-6 w-full rounded-2xl px-4 py-4 text-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/40">
          {intro.sectionLabel}
        </p>
        <p className="text-base font-semibold text-white">
          {intro.sectionName}
        </p>
      </div>

      <p className="text-center text-xs leading-relaxed text-white/35">
        {intro.description}
      </p>

      <div className="mt-8 flex items-center gap-2 text-[11px] text-white/25">
        <div className="h-px w-4 bg-white/20" />
        <span>{intro.navigationHint}</span>
        <div className="h-px w-4 bg-white/20" />
      </div>
    </div>
  )
}
