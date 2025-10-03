import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="py-4 w-full text-center">
      <div className="mb-2">
        <Link href="/legal" className="text-sm text-gray-500 hover:text-gray-700 underline">
          利用規約・プライバシーポリシー
        </Link>
      </div>
      <div className="text-xs text-gray-400">
        <a
          href="https://www.freepik.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600"
        >
          Image by Freepik
        </a>
      </div>
    </footer>
  )
}
