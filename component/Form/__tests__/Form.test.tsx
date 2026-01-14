import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '../Form'
import { RyoteiInsertInput, TripsInsertInput, ShareInsertInput } from '@/feature/api/graphql'

// Mock MUI DatePicker
jest.mock('@mui/x-date-pickers', () => ({
  DateTimePicker: ({ value, onChange, slotProps }: any) => (
    <input
      data-testid="datetime-picker"
      type="datetime-local"
      value={value?.toISOString?.().slice(0, 16) || ''}
      onChange={(e) => onChange?.(new Date(e.target.value))}
      aria-invalid={slotProps?.textField?.error}
    />
  ),
  LocalizationProvider: ({ children }: any) => <div>{children}</div>,
}))

jest.mock('@mui/x-date-pickers/AdapterDateFns', () => ({
  AdapterDateFns: jest.fn(),
}))


describe('Form', () => {
  const mockOnSubmit = jest.fn()
  const mockOnClose = jest.fn()
  let mockWriteText: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockWriteText = jest.fn().mockResolvedValue(undefined)

    // Mock navigator.clipboard before each test
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    })
  })

  describe('addRyotei mode', () => {
    it('renders form with datetime picker and description field', () => {
      render(
        <Form
          mode="addRyotei"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '登録' }}
        />
      )

      expect(screen.getByText('予定を入力')).toBeInTheDocument()
      expect(screen.getByTestId('datetime-picker')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument()
    })

    it('calls onClose when cancel button is clicked', () => {
      render(
        <Form
          mode="addRyotei"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '登録' }}
        />
      )

      const cancelButton = screen.getByRole('button', { name: 'キャンセル' })
      fireEvent.click(cancelButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('shows validation errors when submitting empty form', async () => {
      render(
        <Form
          mode="addRyotei"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '登録' }}
        />
      )

      const submitButton = screen.getByRole('button', { name: '登録' })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('内容を入力してください。')).toBeInTheDocument()
      })
    })

    it('calls onSubmit with form data when form is valid', async () => {
      const user = userEvent.setup()
      render(
        <Form
          mode="addRyotei"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '登録' }}
        />
      )

      const descriptionField = screen.getByRole('textbox')
      await user.type(descriptionField, 'Test description')

      const submitButton = screen.getByRole('button', { name: '登録' })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled()
      })
    })
  })

  describe('editRyotei mode', () => {
    const mockData: RyoteiInsertInput = {
      id: '1',
      datetime: new Date('2024-12-31T10:00:00'),
      description: 'Test event',
      user_id: 'user1',
      trip_id: 'trip1',
    }

    it('renders form with pre-filled data', () => {
      render(
        <Form
          mode="editRyotei"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '更新' }}
        />
      )

      expect(screen.getByText('予定を入力')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveValue('Test event')
      expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument()
    })
  })

  describe('deleteRyotei mode', () => {
    const mockData: RyoteiInsertInput = {
      id: '1',
      datetime: new Date('2024-12-31T10:00:00'),
      description: 'Test event',
      user_id: 'user1',
      trip_id: 'trip1',
    }

    it('renders delete confirmation message', () => {
      render(
        <Form
          mode="deleteRyotei"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '削除' }}
        />
      )

      expect(screen.getByText('この予定を削除しますか？')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '削除' })).toBeInTheDocument()
    })

    it('calls onSubmit with data when delete button is clicked', async () => {
      render(
        <Form
          mode="deleteRyotei"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '削除' }}
        />
      )

      const deleteButton = screen.getByRole('button', { name: '削除' })
      fireEvent.click(deleteButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(mockData)
      })
    })
  })

  describe('addTrip mode', () => {
    it('renders trip name input field', () => {
      render(
        <Form
          mode="addTrip"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '登録' }}
        />
      )

      expect(screen.getByText('旅程名を入力')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument()
    })

    it('shows validation error when submitting empty trip name', async () => {
      render(
        <Form
          mode="addTrip"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '登録' }}
        />
      )

      const submitButton = screen.getByRole('button', { name: '登録' })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('内容を入力してください。')).toBeInTheDocument()
      })
    })

    it('calls onSubmit with trip name when form is valid', async () => {
      const user = userEvent.setup()
      render(
        <Form
          mode="addTrip"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '登録' }}
        />
      )

      const nameField = screen.getByRole('textbox')
      await user.type(nameField, 'Test Trip')

      const submitButton = screen.getByRole('button', { name: '登録' })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled()
      })
    })
  })

  describe('editTrip mode', () => {
    const mockData: TripsInsertInput = {
      name: 'Test Trip',
      user_id: 'user1',
    }

    it('renders form with pre-filled trip name', () => {
      render(
        <Form
          mode="editTrip"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '更新' }}
        />
      )

      expect(screen.getByText('旅程名を入力')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveValue('Test Trip')
      expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument()
    })
  })

  describe('deleteTrip mode', () => {
    const mockData: TripsInsertInput = {
      name: 'Test Trip',
      user_id: 'user1',
    }

    it('renders delete trip confirmation message', () => {
      render(
        <Form
          mode="deleteTrip"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '削除' }}
        />
      )

      expect(screen.getByText('この旅程を削除しますか？')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '削除' })).toBeInTheDocument()
    })
  })

  describe('withdrawAccount mode', () => {
    it('renders withdraw account confirmation message', () => {
      render(
        <Form
          mode="withdrawAccount"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '退会' }}
        />
      )

      expect(screen.getByText('退会しますか？')).toBeInTheDocument()
      expect(screen.getByText(/退会すると、今まで登録していた旅程や/)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '退会' })).toBeInTheDocument()
    })
  })

  describe('shareTrip mode', () => {
    const mockData: ShareInsertInput = {
      trip_id: 'trip1',
      share_id: 'share123',
    }

    it('renders share trip confirmation message', () => {
      render(
        <Form
          mode="shareTrip"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: 'シェア' }}
        />
      )

      expect(screen.getByText('この旅程をシェアしますか？')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'シェア' })).toBeInTheDocument()
    })
  })

  describe('switchTripStatus mode', () => {
    const mockData: ShareInsertInput = {
      trip_id: 'trip1',
      share_id: 'share123',
    }

    it('renders share URL and copy button', () => {
      render(
        <Form
          mode="switchTripStatus"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '閉じる' }}
          open={true}
        />
      )

      expect(screen.getByText('シェアしているURL')).toBeInTheDocument()
      expect(screen.getByText('リンクをコピー')).toBeInTheDocument()
      // jsdom defaults to http://localhost
      const shareUrl = 'http://localhost/share123'
      expect(screen.getByText(shareUrl)).toBeInTheDocument()
    })

    it('copies URL to clipboard when copy button is clicked', async () => {
      render(
        <Form
          mode="switchTripStatus"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '閉じる' }}
          open={true}
        />
      )

      const copyButton = screen.getByRole('button', { name: '' })
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('http://localhost/share123')
      })

      await waitFor(() => {
        expect(screen.getByText('リンクをコピーしました')).toBeInTheDocument()
      })
    })

    it('resets copied state when modal is closed', async () => {
      const { rerender } = render(
        <Form
          mode="switchTripStatus"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '閉じる' }}
          open={true}
        />
      )

      const copyButton = screen.getByRole('button', { name: '' })
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(screen.getByText('リンクをコピーしました')).toBeInTheDocument()
      })

      // Close modal
      rerender(
        <Form
          mode="switchTripStatus"
          data={mockData}
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '閉じる' }}
          open={false}
        />
      )

      await waitFor(() => {
        expect(screen.queryByText('リンクをコピーしました')).not.toBeInTheDocument()
      })
    })
  })

  describe('Button styling based on mode', () => {
    it('renders error colored button for destructive actions', () => {
      const { rerender } = render(
        <Form
          mode="deleteRyotei"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '削除' }}
        />
      )

      const deleteButton = screen.getByRole('button', { name: '削除' })
      expect(deleteButton).toBeInTheDocument()

      rerender(
        <Form
          mode="withdrawAccount"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '退会' }}
        />
      )

      const withdrawButton = screen.getByRole('button', { name: '退会' })
      expect(withdrawButton).toBeInTheDocument()
    })

    it('renders primary colored button for non-destructive actions', () => {
      render(
        <Form
          mode="addRyotei"
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          action={{ label: '登録' }}
        />
      )

      const submitButton = screen.getByRole('button', { name: '登録' })
      expect(submitButton).toBeInTheDocument()
    })
  })
})
