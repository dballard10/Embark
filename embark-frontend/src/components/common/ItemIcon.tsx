interface ItemIconProps {
  size?: number;
  swordColor?: string;
  gemColor?: string;
  className?: string;
}

/**
 * Custom SVG icon representing an item (sword with gem)
 * Used as placeholder when no item image is available
 */
function ItemIcon({
  size = 64,
  swordColor = "currentColor",
  gemColor = "currentColor",
  className = "",
}: ItemIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sword Blade */}
      <path
        d="M 32 8 L 34 8 L 34 38 L 32 38 Z"
        fill={swordColor}
        stroke={swordColor}
        strokeWidth="0.5"
      />

      {/* Sword Tip (pointed) */}
      <path
        d="M 32 8 L 28 12 L 36 12 Z"
        fill={swordColor}
        stroke={swordColor}
        strokeWidth="0.5"
      />

      {/* Crossguard */}
      <rect
        x="24"
        y="37"
        width="16"
        height="3"
        rx="1"
        fill={swordColor}
        stroke={swordColor}
        strokeWidth="0.5"
      />

      {/* Hilt/Handle */}
      <rect
        x="30"
        y="40"
        width="4"
        height="12"
        rx="1"
        fill={swordColor}
        opacity="0.8"
      />

      {/* Pommel (bottom of handle) */}
      <circle
        cx="32"
        cy="53"
        r="2.5"
        fill={swordColor}
        stroke={swordColor}
        strokeWidth="0.5"
      />

      {/* Gem/Crystal (diamond shape at crossguard) */}
      <path
        d="M 32 34 L 28 38.5 L 32 43 L 36 38.5 Z"
        fill={gemColor}
        stroke={gemColor}
        strokeWidth="0.5"
        opacity="0.9"
      />

      {/* Gem Inner Shine */}
      <path
        d="M 32 36 L 30 38.5 L 32 41 L 34 38.5 Z"
        fill="white"
        opacity="0.4"
      />

      {/* Gem Highlight */}
      <circle cx="31" cy="37" r="1" fill="white" opacity="0.6" />
    </svg>
  );
}

export default ItemIcon;
