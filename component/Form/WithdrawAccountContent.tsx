import Box from '@mui/material/Box'

export const WithdrawAccountContent = () => {
  return (
    <Box sx={{ paddingY: '16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ fontSize: '1.05rem', fontWeight: 600 }}>退会しますか？</Box>
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'grey.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ fontSize: '0.875rem', wordBreak: 'keep-all' }}>
          退会すると、今まで登録していた旅程や{'\n'}シェアしたページは全て失われます。
        </Box>
      </Box>
    </Box>
  )
}
