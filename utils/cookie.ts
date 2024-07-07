const parseCookies = (cookieString: string): Record<string, string> => {
  return cookieString
    .split('; ')
    .map((cookie) => cookie.split('='))
    .reduce(
      (acc, [key, value]) => {
        acc[key] = decodeURIComponent(value)
        return acc
      },
      {} as Record<string, string>
    )
}

export const getAccessTokenFromCookie = (cookieKeyPrefix: string): string | null => {
  const cookies = parseCookies(document.cookie)

  const authTokenParts = Object.keys(cookies)
    .filter((key) => key.startsWith(cookieKeyPrefix))
    .map((key) => cookies[key])
    .join('')

  if (!authTokenParts) {
    return null
  }

  try {
    // URLデコードされたクッキー値をパース
    const parsedToken = JSON.parse(authTokenParts)
    return parsedToken.access_token || null
  } catch (error) {
    console.error('Failed to parse auth token:', error)
    return null
  }
}
