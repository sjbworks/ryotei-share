export const isTokenExpired = (expiresAt?: number) => {
  if (!expiresAt) return true
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime >= expiresAt
}
