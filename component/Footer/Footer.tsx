import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="py-4 w-full text-center" style={{ background: 'var(--sand)' }}>
      <div className="mb-2">
        <Link href="/legal" className="text-xs text-gray-500 hover:text-gray-700 underline">
          利用規約・プライバシーポリシー
        </Link>
      </div>
    </footer>
  )
}
