'use client'

import { BottomDrawer, Snackbar } from '@/component'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useGetRyotei } from '../hooks/useGetRyotei'
import { useRyoteiList } from '../hooks/useRyoteiList'
import { TimelineView } from './TimelineView'
import { useRouter } from 'next/navigation'
import { logout } from '@/feature/auth/api'
import { UserMenu } from '@/component/Menu/UserMenu'
import { useState, useContext, lazy, Suspense } from 'react'
import { TripListDrawer } from './TripListDrawer'
import { SnackbarContext } from '@/feature/provider/SnackbarContextProvider'
import { GetTripsQuery, GetRyoteiQuery } from '@/feature/api/graphql'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add'
import IosShareIcon from '@mui/icons-material/IosShare'
import { Text } from '@/component/Text'
import { Button } from '@/component/Button'

const Form = lazy(() => import('@/component/Form').then((mod) => ({ default: mod.Form })))

type MainViewProps = {
  initialTripsData?: GetTripsQuery | null
  initialRyoteiData?: GetRyoteiQuery | null
  initialSelectedTripId?: string
  user?: { email?: string | null; name?: string | null }
}

export const MainView = ({ initialTripsData, initialRyoteiData, initialSelectedTripId, user }: MainViewProps) => {
  const snackbarState = useContext(SnackbarContext)
  const {
    handleMenuClick,
    sideOpen,
    onSideClose,
    onSideOpen,
    trips,
    selectedTripId,
    onChangeTripId,
    title,
    refetchTrip,
    loading: tripLoading,
    error: tripError,
  } = useRyoteiList(initialTripsData, initialSelectedTripId)
  const { data, refetch, loading: ryoteiLoading, error: ryoteiError } = useGetRyotei(selectedTripId, initialRyoteiData)
  const loading = tripLoading || ryoteiLoading

  const router = useRouter()

  const handleWithdrawAccount = async () => {
    try {
      const response = await fetch('/api/user/delete', { method: 'DELETE' })
      if (response.ok) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  const {
    handleClick,
    bottomSheet,
    bottomFormProps,
    onMenuClick,
    onClickAddTrip,
    onClickWithdrawAccount,
    formState,
    onClickShareTrip,
  } = useTimeline(refetch, refetchTrip, selectedTripId, onSideClose, onChangeTripId, handleWithdrawAccount)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleClickAdd = () => {
    formState.setAddRyoteiMode()
    handleClick()
  }

  return (
    <div
      style={{
        background: '#fff',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 640,
      }}
    >
      <header
        style={{
          background: 'var(--sand)',
          padding: '14px 18px',
          borderBottom: '0.5px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={handleMenuClick}
          aria-label="旅程一覧"
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            border: '0.5px solid var(--border-md)',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <MenuIcon sx={{ fontSize: 17, color: 'var(--ink-2)' }} />
        </button>

        <Text
          noWrap
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--ink)',
            flex: 1,
          }}
        >
          {title}
        </Text>

        {selectedTripId && trips.length > 0 && (
          <button
            onClick={() => onClickShareTrip({ trip_id: selectedTripId })}
            aria-label="旅程をシェア"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: '0.5px solid var(--border-md)',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <IosShareIcon sx={{ fontSize: 17, color: 'var(--sky-dark)' }} />
          </button>
        )}

        <button
          onClick={handleMenuOpen}
          aria-label="アカウントメニュー"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'var(--sun-light)',
            border: '0.5px solid var(--sun-mid)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 17, color: 'var(--sun-dark)' }} />
        </button>
        <UserMenu
          open={menuOpen}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          email={user?.email}
          name={user?.name}
          onLogout={handleLogout}
          onWithdraw={onClickWithdrawAccount}
          onLegal={() => router.push('/legal')}
        />
      </header>

      <main style={{ background: 'var(--sand)', flex: 1, padding: '0 18px 100px' }}>
        {tripError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center gap-2">
            <Text variant="h6">旅程の取得に失敗しました</Text>
            <Text color="grey.600" variant="body1">
              しばらく時間をおいてから再度お試しください。
            </Text>
          </div>
        ) : loading || trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center gap-2">
            <Text variant="h6">旅程を作成しましょう</Text>
            <Text variant="body1">旅行の予定を立てるために、まず旅程を作成してください。</Text>
            {!loading && (
              <Button variant="primary" onClick={onSideOpen} sx={{ mt: '4px', px: '24px' }}>
                旅程を作成
              </Button>
            )}
          </div>
        ) : ryoteiError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center gap-2">
            <Text variant="h6">予定の取得に失敗しました</Text>
            <Text color="grey.600" variant="body1">
              しばらく時間をおいてから再度お試しください。
            </Text>
          </div>
        ) : (
          <TimelineView data={data} onMenuClick={onMenuClick} onAdd={handleClickAdd} />
        )}
      </main>

      {trips.length > 0 && (
        <button
          onClick={handleClickAdd}
          aria-label="予定を追加"
          style={{
            position: 'fixed',
            bottom: 28,
            right: 18,
            width: 52,
            height: 52,
            borderRadius: 16,
            background: 'var(--sun)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            boxShadow: '0 4px 12px rgba(255,140,66,0.4)',
          }}
        >
          <AddIcon sx={{ fontSize: 24, color: '#fff' }} />
        </button>
      )}

      <TripListDrawer
        open={sideOpen}
        onClose={onSideClose}
        onOpen={onSideOpen}
        trips={trips}
        selectedTripId={selectedTripId}
        onChangeTripId={onChangeTripId}
        onClickAddTrip={onClickAddTrip}
        refetchTrip={refetchTrip}
        formState={formState}
        onOpenBottomDrawer={handleClick}
      />

      <BottomDrawer {...bottomSheet}>
        <Suspense fallback={<div style={{ padding: '20px' }}>読み込み中...</div>}>
          <Form {...bottomFormProps} open={bottomSheet.open} />
        </Suspense>
      </BottomDrawer>

      <Snackbar {...snackbarState} />
    </div>
  )
}
