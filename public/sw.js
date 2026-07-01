/**
 * 自前実装の Service Worker
 *
 * キャッシュ戦略:
 * - ナビゲーション (HTML): network-first。オフライン時はキャッシュにフォールバック。
 * - 静的アセット (同一オリジンの JS/CSS/画像/フォント): stale-while-revalidate。
 * - それ以外 (API/GraphQL など): キャッシュせず常にネットワーク。
 *
 * バージョンを上げると古いキャッシュは activate 時に破棄される。
 */

/**
 * キャッシュ名前空間のバージョン。
 *
 * 運用ルール: この `sw.js`（＝キャッシュ戦略）を変更したときに手動で bump する。
 * bump すると sw.js のバイト列が変わりブラウザが SW 更新を検知、activate 時に
 * 旧バージョンのキャッシュが破棄される。
 *
 * アプリのコンテンツ更新（通常のデプロイ）ごとに上げる必要はない。
 * ナビゲーションは network-first、静的アセットは stale-while-revalidate で
 * 常に再検証されるため内容の陳腐化は起きず、Next.js の /_next/static/* は
 * ファイル名にハッシュを含む不変ファイルなので URL 自体が更新ごとに変わる。
 */
const VERSION = 'v1'
const RUNTIME_CACHE = `ryotei-share-runtime-${VERSION}`

// キャッシュ対象とする静的アセットの拡張子
const STATIC_ASSET = /\.(?:js|css|woff2?|ttf|otf|png|jpg|jpeg|gif|svg|webp|ico)$/i

self.addEventListener('install', () => {
  // 新しい Service Worker を即座に待機状態から有効化する
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // 現在のバージョン以外のキャッシュを削除
      const keys = await caches.keys()
      await Promise.all(keys.filter((key) => key !== RUNTIME_CACHE).map((key) => caches.delete(key)))
      // 制御をすぐに全クライアントへ適用
      await self.clients.claim()
    })()
  )
})

/**
 * network-first: ネットワークを優先し、失敗時のみキャッシュを返す。
 */
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE)
  try {
    const response = await fetch(request)
    if (response && response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await cache.match(request)
    if (cached) return cached
    // ナビゲーションのフォールバックとしてルートを試す
    const fallback = await cache.match('/')
    if (fallback) return fallback
    // キャッシュも無い場合は 503 を返す（staleWhileRevalidate と挙動を揃える）
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
    })
  }
}

/**
 * stale-while-revalidate: キャッシュを即返しつつ、裏でネットワークから更新する。
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE)
  const cached = await cache.match(request)
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => cached ?? new Response('Offline', { status: 503, statusText: 'Service Unavailable' }))
  return cached || fetchPromise
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  // GET 以外はキャッシュ対象外
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // 同一オリジンのみ扱う（外部 API / Supabase / Google Maps などは素通し）
  if (url.origin !== self.location.origin) return

  // ナビゲーション（HTML ドキュメント）
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
    return
  }

  // 同一オリジンの静的アセット
  if (STATIC_ASSET.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request))
  }
})
