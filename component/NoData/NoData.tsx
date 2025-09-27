import { HikingIcon } from '@/component/Icon'
import { grey } from '@mui/material/colors'
import { Text } from '@/component/Text'

export const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full background">
      <div className="flex flex-col items-center justify-center p-8 text-center gap-2">
        <Text variant="h6">予定を登録しましょう</Text>
        <Text color="grey.600" variant="body1">
          予定を登録して、あなたの旅程表を作りましょう！
        </Text>
      </div>
    </div>
  )
}
