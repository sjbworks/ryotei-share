import { HikingIcon } from '@/component/Icon'

export const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex align-center">
        <span className="mr-2">
          <HikingIcon />
        </span>
        <p>旅程を登録してあなたの旅程表を作りましょう！</p>
      </div>
    </div>
  )
}
