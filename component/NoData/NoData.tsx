import { HikingIcon } from '@/component/Icon'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full background">
      <div className="flex align-center items-center ">
        <HikingIcon fontSize="large" sx={{ color: grey[500] }} />
        <Typography color="grey.600" variant="body1">
          旅程を登録してあなたの旅程表を作りましょう！
        </Typography>
      </div>
    </div>
  )
}
