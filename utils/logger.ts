export const logError = (message: string, context?: Record<string, unknown>) => {
  console.error(message, context)
  if (process.env.NODE_ENV !== 'production') return
  fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, context }),
  }).catch(() => {})
}
