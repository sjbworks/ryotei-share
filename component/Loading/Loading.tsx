export const Loading = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F1] flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-[#FF8C42] flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96" />
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
            <line x1="2" y1="2" x2="22" y2="22" />
            <path d="M10.68 10.68a2 2 0 0 0 2.64 2.64" />
            <path d="M14.12 14.12A2 2 0 0 0 16 12c0-.34-.06-.67-.17-.98" />
            <path d="M20.5 20.5L14 14" />
            <path d="M3.5 3.5L10 10" />
            {/* plane icon */}
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
          {/* Tabler icons を使っている場合はこちらに差し替え:
          <i className="ti ti-plane text-white text-[28px]" />
          */}
        </div>
        <span className="text-[#1C1917] text-[18px] font-medium tracking-tight">Ryotei Share</span>
      </div>

      <div className="flex gap-[7px] items-center" role="status" aria-label="読み込み中">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[7px] h-[7px] rounded-full bg-[#FFD4B3] animate-loading-dot"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  )
}
