import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{ flex: 1, background: 'var(--sand)', width: '100%' }}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center p-8 text-center gap-4 max-w-sm w-full">
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: '#fff',
            border: '0.5px solid var(--border-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
          }}
        >
          <SearchOffOutlinedIcon style={{ fontSize: 44, color: 'var(--sun-mid)' }} aria-hidden />
        </div>

        <p style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink)', margin: 0 }}>
          旅程が見つかりませんでした
        </p>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>
          旅程が削除されたか、非公開になっています。
          <br />
          URLをご確認ください。
        </p>

        <Link
          href="/"
          style={{
            marginTop: 8,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 44,
            padding: '0 24px',
            borderRadius: 12,
            background: 'var(--sun)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          トップへ戻る
        </Link>
      </div>
    </div>
  )
}
