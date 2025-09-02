const parseCookies = (cookieString: string): Record<string, string> => {
  const cookies = cookieString
    .split('; ')
    .map((cookie) => cookie.split('='))
    .reduce(
      (acc, [key, value]) => {
        acc[key] = decodeURIComponent(value)
        return acc
      },
      {} as Record<string, string>
    )
  return cookies
}
const base64Decode = (str: string): string => {
  if (str.startsWith('base64-')) str = str.substring(7)
  while (str.length % 4 !== 0) str += '='
  try {
    return atob(str)
  } catch (error) {
    console.error('Failed to decode base64:', error)
    return ''
  }
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
    const decodedToken = base64Decode(authTokenParts)
    if (!decodedToken) return null

    const parsedToken = JSON.parse(decodedToken)
    return parsedToken.access_token || null
  } catch (error) {
    console.error('Failed to parse auth token:', error)
    return null
  }
}
