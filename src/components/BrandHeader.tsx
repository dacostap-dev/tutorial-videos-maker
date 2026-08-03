import type { TutorialConfig } from "../config/types"
import AppIcon from "./AppIcon"

type BrandHeaderProps = {
  brand: TutorialConfig["brand"]
  accent: string
  accentRgb: string
  surface: string
}

export default function BrandHeader({
  brand,
  accent,
  accentRgb,
  surface,
}: BrandHeaderProps) {
  return (
    <div className="relative z-10 mb-10 flex items-center gap-3">
      <AppIcon
        size={32}
        logoSrc={brand.logoSrc}
        accent={accent}
        accentRgb={accentRgb}
        surface={surface}
      />
      <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
        {brand.name} · {brand.eyebrow}
      </span>
    </div>
  )
}
