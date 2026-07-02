'use client'

import { useEffect } from 'react'

/**
 * Service Worker (`/sw.js`) を登録するクライアントコンポーネント。
 * next-pwa の `register: true` 相当の処理を自前で行う。
 * 開発環境では登録しない（本番ビルドのみ有効）。
 */
export const ServiceWorkerRegister = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
    }

    // ページの読み込み完了後に登録して初期表示への影響を避ける
    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register)
      return () => window.removeEventListener('load', register)
    }
  }, [])

  return null
}
