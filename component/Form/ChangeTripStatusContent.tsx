'use client'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { InputAdornment, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useState } from 'react'
import { ShareInsertInput } from '@/feature/api/graphql'

export const ChangeTripStatusContent = ({ data }: { data?: ShareInsertInput | null }) => {
  const [copied, setCopied] = useState(false)
  const shareUrl = data?.share_id ? `${window.location.origin}/${data.share_id}` : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <Box sx={{ paddingY: '16px', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'grey.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 1, color: 'grey.700' }}>シェアしているURL</Box>
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
          style={{ wordBreak: 'break-all', display: 'inline', fontSize: '0.875rem' }}
        >
          {shareUrl}
          <OpenInNewIcon
            fontSize="small"
            sx={{ color: 'primary.main', marginLeft: '4px', verticalAlign: 'text-bottom' }}
          />
        </a>
      </Box>
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'grey.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
          marginBottom: 4,
        }}
      >
        <Box sx={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 1, color: 'grey.700' }}>リンクをコピー</Box>
        <TextField
          value={shareUrl}
          fullWidth
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyLink} edge="end">
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
            formHelperText: {
              sx: { marginLeft: 0 },
            },
          }}
          helperText={copied ? 'リンクをコピーしました' : ''}
        />
      </Box>
    </Box>
  )
}
