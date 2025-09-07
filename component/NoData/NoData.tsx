import { HikingIcon } from '@/component/Icon'
import { grey } from '@mui/material/colors'
import { Text } from '@/component/Text'

export const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full background">
      <div className="flex align-center items-center" style={{ marginTop: '16px' }}>
        <HikingIcon fontSize="large" sx={{ color: grey[500] }} />
        <Text color="grey.600" variant="body1">
          旅程を登録してあなたの旅程表を作りましょう！
        </Text>
      </div>
    </div>
  )
}
