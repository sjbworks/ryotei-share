'use client'
import { useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ShareInsertInput } from '@/feature/api/graphql'

type Props = {
  data?: ShareInsertInput | null
  onStopSharing?: () => void
}

export const ChangeTripStatusContent = ({ data, onStopSharing }: Props) => {
  const [copied, setCopied] = useState(false)
  const shareUrl = data?.share_id ? `${window.location.origin}/${data.share_id}` : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const handleShare = (platform: string) => {
    if (!shareUrl) return
    const encodedUrl = encodeURIComponent(shareUrl)
    if (platform === 'x') window.open(`https://x.com/intent/tweet?url=${encodedUrl}`, '_blank', 'noopener')
    if (platform === 'line') window.open(`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`, '_blank', 'noopener')
    if (platform === 'email') window.open(`mailto:?body=${encodedUrl}`)
    if (platform === 'other' && navigator.share) navigator.share({ url: shareUrl }).catch(() => {})
  }

  const socialApps = [
    {
      label: 'X',
      icon: <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1 }}>X</span>,
      bg: '#000',
      border: '#333',
      platform: 'x',
    },
    {
      label: 'LINE',
      icon: <ChatBubbleOutlineIcon sx={{ fontSize: 20, color: '#06c755' }} />,
      bg: '#e8f8ee',
      border: '#b5e8c8',
      platform: 'line',
    },
    {
      label: 'メール',
      icon: <MailOutlineIcon sx={{ fontSize: 20, color: 'var(--sun-dark)' }} />,
      bg: 'var(--sun-light)',
      border: 'var(--sun-mid)',
      platform: 'email',
    },
    {
      label: 'その他',
      icon: <MoreHorizIcon sx={{ fontSize: 20, color: 'var(--ink-2)' }} />,
      bg: 'var(--sand)',
      border: 'var(--border-md)',
      platform: 'other',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 10,
          padding: '10px 14px',
          background: '#f0fdf4',
          border: '0.5px solid #bbf7d0',
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#16a34a',
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 13, fontWeight: 500, color: '#16a34a' }}>公開中</span>
      </div>

      <div
        style={{
          marginBottom: 12,
          background: 'var(--sand)',
          border: '0.5px solid var(--border-md)',
          borderRadius: 12,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: 'var(--ink-2)',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {shareUrl}
        </span>
        <button
          onClick={handleCopyLink}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 12,
            fontWeight: 500,
            color: copied ? 'var(--sky-dark)' : 'var(--sky-dark)',
            background: copied ? 'var(--sky-mid)' : 'var(--sky-light)',
            border: '0.5px solid var(--sky-mid)',
            borderRadius: 8,
            padding: '5px 10px',
            flexShrink: 0,
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
        >
          <ContentCopyIcon sx={{ fontSize: 14 }} />
          <span>{copied ? 'コピー済み' : 'コピー'}</span>
        </button>
      </div>

      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 14,
          padding: '9px 14px',
          borderRadius: 12,
          border: '0.5px solid var(--border-md)',
          background: '#fff',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--sky-dark)',
          textDecoration: 'none',
        }}
      >
        <OpenInNewIcon sx={{ fontSize: 16 }} />
        <span>ブラウザで開く</span>
      </a>

      <div style={{ height: '0.5px', background: 'var(--border)', marginBottom: 16 }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {socialApps.map((app) => (
          <button
            key={app.label}
            onClick={() => handleShare(app.platform)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 15,
                border: `0.5px solid ${app.border}`,
                background: app.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {app.icon}
            </div>
            <span style={{ fontSize: 11, color: 'var(--ink-2)', textAlign: 'center' }}>{app.label}</span>
          </button>
        ))}
      </div>

      <div style={{ height: '0.5px', background: 'var(--border)', marginBottom: 14 }} />

      <button
        onClick={onStopSharing}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          height: 46,
          borderRadius: 12,
          border: '0.5px solid #fecaca',
          background: '#fef2f2',
          fontSize: 14,
          fontWeight: 500,
          color: '#dc2626',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        <VisibilityOffIcon sx={{ fontSize: 17, color: '#dc2626' }} />
        公開を停止する
      </button>
    </div>
  )
}
