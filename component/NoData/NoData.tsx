import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import AddIcon from '@mui/icons-material/Add'

type Props = {
  onAdd?: () => void
}

const steps = [
  { num: 1, label: '＋ボタン', suffix: 'から予定を追加' },
  { num: 2, label: null, suffix: '日時・場所・カテゴリを入力' },
  { num: 3, label: null, suffix: 'シェアボタンで旅仲間に共有' },
]

export const NoData = ({ onAdd }: Props) => {
  return (
    <div
      style={{
        background: 'var(--sand)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 28,
          background: '#fff',
          border: '0.5px solid var(--border-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          position: 'relative',
        }}
      >
        <MapOutlinedIcon style={{ fontSize: 44, color: 'var(--sun-mid)' }} aria-hidden />
        <div
          style={{
            position: 'absolute',
            bottom: -8,
            right: -8,
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'var(--sun)',
            border: '2px solid var(--sand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AddIcon style={{ fontSize: 14, color: '#fff' }} aria-hidden />
        </div>
      </div>

      <p style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink)', marginBottom: 8, textAlign: 'center' }}>
        予定を登録しましょう
      </p>
      <p style={{ fontSize: 14, color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.6, marginBottom: 32 }}>
        旅の行程を日時順に追加して
        <br />
        旅仲間とシェアできます
      </p>

      <div
        style={{
          width: '100%',
          background: '#fff',
          border: '0.5px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: onAdd ? 28 : 0,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.num}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 16px',
              borderBottom: i < steps.length - 1 ? '0.5px solid var(--border)' : 'none',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: 'var(--sky-light)',
                border: '0.5px solid var(--sky-mid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--sky-dark)',
              }}
            >
              {step.num}
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4 }}>
              {step.label ? <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>{step.label}</strong> : null}
              {step.suffix}
            </p>
          </div>
        ))}
      </div>

      {onAdd && (
        <button
          onClick={onAdd}
          aria-label="最初の予定を追加する"
          style={{
            width: '100%',
            height: 50,
            borderRadius: 15,
            background: 'var(--sun)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            fontSize: 15,
            fontWeight: 500,
            color: '#fff',
          }}
        >
          <AddIcon style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)' }} aria-hidden />
          最初の予定を追加する
        </button>
      )}
    </div>
  )
}
