type NavigationArrowProps = {
  direction: "left" | "right";
  disabled: boolean;
  label: string;
  onClick: () => void;
};

export default function NavigationArrow({
  direction,
  disabled,
  label,
  onClick,
}: NavigationArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
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
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        {direction === "left" ? (
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
  );
}
