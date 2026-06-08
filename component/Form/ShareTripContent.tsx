'use client'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PublicIcon from '@mui/icons-material/Public'

type Props = {
  onPublish?: () => void
  onClose?: () => void
}

export const ShareTripContent = ({ onPublish, onClose }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        style={{
          padding: '12px 14px',
          background: 'var(--sand)',
          border: '0.5px solid var(--border-md)',
          borderRadius: 12,
          fontSize: 13,
          color: 'var(--ink-2)',
          lineHeight: 1.6,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 17, color: 'var(--ink-3)', mt: '1px', flexShrink: 0 }} />
        <span>公開するとURLを知っている人が旅程を閲覧できます。公開後にいつでも停止できます。</span>
      </div>

      <button
        onClick={onPublish}
        style={{
          height: 48,
          borderRadius: 13,
          background: 'var(--sun)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 500,
          color: '#fff',
          width: '100%',
        }}
      >
        <PublicIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.85)' }} />
        公開してシェアする
      </button>

      <button
        onClick={onClose}
        style={{
          height: 44,
          borderRadius: 13,
          border: '0.5px solid var(--border-md)',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--ink-2)',
          width: '100%',
        }}
      >
        キャンセル
      </button>
    </div>
  )
}
