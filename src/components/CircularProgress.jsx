export default function CircularProgress({ percent, size = 46 }) {
  const stroke = 4
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  if (percent === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm font-semibold text-slate-400"
        style={{ width: size, height: size }}
      >
        0
      </div>
    )
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2F5CE0"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-brand-light">
        {percent}%
      </span>
    </div>
  )
}
