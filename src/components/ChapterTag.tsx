type ChapterTagProps = {
  label: string
  accent: string
  accentRgb: string
}

export default function ChapterTag({
  label,
  accent,
  accentRgb,
}: ChapterTagProps) {
  return (
    <div
      className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
      style={{
        background: `rgba(${accentRgb},0.1)`,
        color: accent,
        border: `1px solid rgba(${accentRgb},0.2)`,
      }}
    >
      {label}
    </div>
  )
}
