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
    <header className="relative z-10 mb-8 flex max-w-full flex-wrap items-center justify-center gap-3 sm:mb-10">
      <AppIcon
        size={32}
        logoSrc={brand.logoSrc}
        accent={accent}
        accentRgb={accentRgb}
        surface={surface}
      />
      <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/65">
        {brand.name} · {brand.eyebrow}
      </span>
    </header>
  )
}
