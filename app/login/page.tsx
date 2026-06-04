'use client'
import { login } from '@/feature/auth/api'
import { Provider } from '@supabase/auth-js'
import FlightIcon from '@mui/icons-material/Flight'
import PlaceIcon from '@mui/icons-material/Place'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ShareIcon from '@mui/icons-material/Share'
import LuggageIcon from '@mui/icons-material/Luggage'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

const featureCards = [
  {
    icon: <PlaceIcon style={{ fontSize: 24, color: 'var(--sun)' }} />,
    label: 'スポット登録',
    sub: '行きたい場所を追加',
  },
  {
    icon: <CalendarMonthIcon style={{ fontSize: 24, color: 'var(--sky)' }} />,
    label: '日程を管理',
    sub: '日付・時刻で整理',
  },
  { icon: <ShareIcon style={{ fontSize: 24, color: 'var(--sky)' }} />, label: '一緒に計画', sub: '旅仲間とシェア' },
  {
    icon: <LuggageIcon style={{ fontSize: 24, color: 'var(--sun)' }} />,
    label: '旅程を保存',
    sub: 'いつでも振り返れる',
  },
]

export default function Login() {
  return (
    <div
      style={{
        background: 'var(--sand)',
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className="flex flex-col items-center w-full max-w-[390px] px-7 pt-16 pb-10">
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background: 'var(--sun)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FlightIcon style={{ fontSize: 20, color: '#fff', transform: 'rotate(45deg)' }} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)' }}>Ryotei Share</span>
        </div>

        <p style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8 }}>旅程を作って、シェアしよう</p>

        <div className="grid grid-cols-2 gap-3 w-full" style={{ marginTop: 40 }}>
          {featureCards.map(({ icon, label, sub }) => (
            <div
              key={label}
              style={{
                background: '#fff',
                border: '0.5px solid var(--border)',
                borderRadius: 18,
                padding: '18px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {icon}
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{label}</span>
              <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{sub}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 w-full" style={{ marginTop: 48 }}>
          <button
            onClick={() => login('google' as Provider)}
            className="flex items-center justify-center gap-2.5 w-full cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
            style={{
              height: 50,
              borderRadius: 15,
              border: 'none',
              background: 'var(--sun)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <GoogleIcon style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)' }} />
            Google でログイン
          </button>

          <button
            onClick={() => login('github' as Provider)}
            className="flex items-center justify-center gap-2.5 w-full cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
            style={{
              height: 50,
              borderRadius: 15,
              border: '0.5px solid var(--border-md)',
              background: '#fff',
              color: 'var(--ink)',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <GitHubIcon style={{ fontSize: 20, color: 'var(--ink-3)' }} />
            GitHub でログイン
          </button>
        </div>
      </div>
    </div>
  )
}
