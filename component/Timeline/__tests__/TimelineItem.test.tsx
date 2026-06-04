import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TimelineItem, TimelineItemProps, Plan } from '../TimelineItem'

jest.mock('../../Icon', () => ({
  AccessTimeIcon: ({ sx: _sx }: { sx?: unknown }) => (
    <span data-testid="access-time-icon">🕒</span>
  ),
  MoreHorizIcon: () => <span data-testid="more-horiz-icon">⋯</span>,
  EditIcon: () => <span data-testid="edit-icon">✏️</span>,
  DeleteIcon: () => <span data-testid="delete-icon">🗑️</span>,
}))

describe('TimelineItem', () => {
  const mockPlan: Plan = {
    id: 'test-id-1',
    datetime: '2024-12-25T14:30:00',
    description: 'Test event description',
    trip_id: 'trip-1',
  }

  const defaultProps: TimelineItemProps = {
    ...mockPlan,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Data display', () => {
    it('renders timeline item with time and description', () => {
      render(<TimelineItem {...defaultProps} />)

      expect(screen.getByText('14:30')).toBeInTheDocument()
      expect(screen.getByText('Test event description')).toBeInTheDocument()
    })

    it('displays formatted time correctly', () => {
      render(<TimelineItem {...defaultProps} />)

      expect(screen.getByText('14:30')).toBeInTheDocument()
    })

    it('displays time icon', () => {
      render(<TimelineItem {...defaultProps} />)

      expect(screen.getByTestId('access-time-icon')).toBeInTheDocument()
    })

    it('displays description', () => {
      render(<TimelineItem {...defaultProps} />)

      expect(screen.getByText('Test event description')).toBeInTheDocument()
    })

    it('formats different times correctly', () => {
      const { rerender } = render(<TimelineItem {...defaultProps} datetime="2024-12-25T09:05:00" />)
      expect(screen.getByText('09:05')).toBeInTheDocument()

      rerender(<TimelineItem {...defaultProps} datetime="2024-12-25T23:59:00" />)
      expect(screen.getByText('23:59')).toBeInTheDocument()

      rerender(<TimelineItem {...defaultProps} datetime="2024-12-25T00:00:00" />)
      expect(screen.getByText('00:00')).toBeInTheDocument()
    })

    it('displays long description correctly', () => {
      const longDescription = 'This is a very long description that contains multiple sentences. '.repeat(5).trim()
      render(<TimelineItem {...defaultProps} description={longDescription} />)

      expect(screen.getByText(longDescription)).toBeInTheDocument()
    })
  })

  describe('MenuControl interactions', () => {
    it('shows menu control by default (readOnly is false)', () => {
      render(<TimelineItem {...defaultProps} />)

      expect(screen.getByLabelText('open menu - edit or delete')).toBeInTheDocument()
    })

    it('hides menu control when readOnly is true', () => {
      render(<TimelineItem {...defaultProps} readOnly={true} />)

      expect(screen.queryByLabelText('open menu - edit or delete')).not.toBeInTheDocument()
    })

    it('opens menu when menu button is clicked', async () => {
      render(<TimelineItem {...defaultProps} />)

      const menuButton = screen.getByLabelText('open menu - edit or delete')
      fireEvent.click(menuButton)

      await waitFor(() => {
        expect(screen.getByText('編集')).toBeInTheDocument()
        expect(screen.getByText('削除')).toBeInTheDocument()
      })
    })

    it('calls onClick with editRyotei action when edit is clicked', async () => {
      const mockOnClick = jest.fn()
      render(<TimelineItem {...defaultProps} onClick={mockOnClick} />)

      const menuButton = screen.getByLabelText('open menu - edit or delete')
      fireEvent.click(menuButton)

      await waitFor(() => {
        const editOption = screen.getByText('編集')
        fireEvent.click(editOption)
      })

      await waitFor(() => {
        expect(mockOnClick).toHaveBeenCalledWith('editRyotei', mockPlan)
      })
    })

    it('calls onClick with deleteRyotei action when delete is clicked', async () => {
      const mockOnClick = jest.fn()
      render(<TimelineItem {...defaultProps} onClick={mockOnClick} />)

      const menuButton = screen.getByLabelText('open menu - edit or delete')
      fireEvent.click(menuButton)

      await waitFor(() => {
        const deleteOption = screen.getByText('削除')
        fireEvent.click(deleteOption)
      })

      await waitFor(() => {
        expect(mockOnClick).toHaveBeenCalledWith('deleteRyotei', mockPlan)
      })
    })

    it('closes menu after selecting an action', async () => {
      const mockOnClick = jest.fn()
      render(<TimelineItem {...defaultProps} onClick={mockOnClick} />)

      const menuButton = screen.getByLabelText('open menu - edit or delete')
      fireEvent.click(menuButton)

      await waitFor(() => {
        expect(screen.getByText('編集')).toBeInTheDocument()
      })

      const editOption = screen.getByText('編集')
      fireEvent.click(editOption)

      await waitFor(() => {
        expect(screen.queryByText('編集')).not.toBeInTheDocument()
      })
    })

    it('does not call onClick when readOnly is true', () => {
      const mockOnClick = jest.fn()
      render(<TimelineItem {...defaultProps} onClick={mockOnClick} readOnly={true} />)

      expect(screen.queryByLabelText('open menu - edit or delete')).not.toBeInTheDocument()
      expect(mockOnClick).not.toHaveBeenCalled()
    })
  })

  describe('Multiple TimelineItems', () => {
    it('renders multiple timeline items with different data', () => {
      const plan1: Plan = {
        id: 'item-1',
        datetime: '2024-12-25T10:00:00',
        description: 'First event',
        trip_id: 'trip-1',
      }

      const plan2: Plan = {
        id: 'item-2',
        datetime: '2024-12-25T15:30:00',
        description: 'Second event',
        trip_id: 'trip-1',
      }

      render(
        <>
          <TimelineItem {...plan1} />
          <TimelineItem {...plan2} />
        </>
      )

      expect(screen.getByText('10:00')).toBeInTheDocument()
      expect(screen.getByText('15:30')).toBeInTheDocument()
      expect(screen.getByText('First event')).toBeInTheDocument()
      expect(screen.getByText('Second event')).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles empty description', () => {
      const { container } = render(<TimelineItem {...defaultProps} description="" />)

      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles special characters in description', () => {
      const specialDescription = 'Test <script>alert("xss")</script> & special chars: @#$%'
      render(<TimelineItem {...defaultProps} description={specialDescription} />)

      expect(screen.getByText(specialDescription)).toBeInTheDocument()
    })

    it('passes all Plan properties to onClick handler', async () => {
      const mockOnClick = jest.fn()
      const planWithAllProps: Plan = {
        id: 'full-id',
        datetime: '2024-12-25T18:45:00',
        description: 'Complete event',
        trip_id: 'trip-123',
      }

      render(<TimelineItem {...planWithAllProps} onClick={mockOnClick} />)

      const menuButton = screen.getByLabelText('open menu - edit or delete')
      fireEvent.click(menuButton)

      await waitFor(() => {
        const editOption = screen.getByText('編集')
        fireEvent.click(editOption)
      })

      await waitFor(() => {
        expect(mockOnClick).toHaveBeenCalledWith('editRyotei', planWithAllProps)
      })
    })
  })
})
