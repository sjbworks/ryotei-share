import { render, screen } from '@testing-library/react'
import { Modal } from '../index'

describe('Modal', () => {
  beforeEach(() => {
    // Clear document.body before each test
    document.body.innerHTML = ''
  })

  describe('Visibility logic', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false}>
          <div>Modal content</div>
        </Modal>
      )

      expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
    })

    it('renders when isOpen is true', () => {
      render(
        <Modal isOpen={true}>
          <div>Modal content</div>
        </Modal>
      )

      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      render(
        <Modal isOpen={true}>
          <div>
            <h1>Modal Title</h1>
            <p>Modal description</p>
            <button>Close</button>
          </div>
        </Modal>
      )

      expect(screen.getByRole('heading', { name: 'Modal Title' })).toBeInTheDocument()
      expect(screen.getByText('Modal description')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    })

    it('hides modal when isOpen changes from true to false', () => {
      const { rerender } = render(
        <Modal isOpen={true}>
          <div>Modal content</div>
        </Modal>
      )

      expect(screen.getByText('Modal content')).toBeInTheDocument()

      rerender(
        <Modal isOpen={false}>
          <div>Modal content</div>
        </Modal>
      )

      expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
    })

    it('shows modal when isOpen changes from false to true', () => {
      const { rerender } = render(
        <Modal isOpen={false}>
          <div>Modal content</div>
        </Modal>
      )

      expect(screen.queryByText('Modal content')).not.toBeInTheDocument()

      rerender(
        <Modal isOpen={true}>
          <div>Modal content</div>
        </Modal>
      )

      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })
  })

  describe('Portal rendering', () => {
    it('renders modal into document.body', () => {
      render(
        <Modal isOpen={true}>
          <div data-testid="modal-content">Modal content</div>
        </Modal>
      )

      const modalContent = screen.getByTestId('modal-content')
      expect(modalContent).toBeInTheDocument()

      // Check that modal is rendered as a child of document.body
      expect(document.body.contains(modalContent)).toBe(true)
    })

    it('creates overlay with correct structure', () => {
      render(
        <Modal isOpen={true}>
          <div data-testid="modal-content">Modal content</div>
        </Modal>
      )

      const modalContent = screen.getByTestId('modal-content')
      const modalDiv = modalContent.parentElement
      const overlayDiv = modalDiv?.parentElement

      // Verify the overlay is the direct child of body
      expect(overlayDiv?.parentElement).toBe(document.body)

      // Verify overlay has correct styles
      expect(overlayDiv).toHaveStyle({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
      })

      // Verify modal div exists and has padding style
      expect(modalDiv).toHaveStyle({
        padding: '20px',
      })
    })

    it('removes modal from DOM when closed', () => {
      const { rerender } = render(
        <Modal isOpen={true}>
          <div data-testid="modal-content">Modal content</div>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).toBeInTheDocument()

      rerender(
        <Modal isOpen={false}>
          <div data-testid="modal-content">Modal content</div>
        </Modal>
      )

      expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument()
    })
  })

  describe('Multiple modals', () => {
    it('can render multiple modals simultaneously', () => {
      render(
        <>
          <Modal isOpen={true}>
            <div>First modal</div>
          </Modal>
          <Modal isOpen={true}>
            <div>Second modal</div>
          </Modal>
        </>
      )

      expect(screen.getByText('First modal')).toBeInTheDocument()
      expect(screen.getByText('Second modal')).toBeInTheDocument()
    })

    it('can show one modal while hiding another', () => {
      render(
        <>
          <Modal isOpen={true}>
            <div>First modal</div>
          </Modal>
          <Modal isOpen={false}>
            <div>Second modal</div>
          </Modal>
        </>
      )

      expect(screen.getByText('First modal')).toBeInTheDocument()
      expect(screen.queryByText('Second modal')).not.toBeInTheDocument()
    })
  })
})
