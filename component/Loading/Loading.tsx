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
            className="animate-plane-float"
          >
            {/* plane icon */}
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
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
