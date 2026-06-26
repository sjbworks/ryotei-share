export const logError = (message: string, context?: Record<string, unknown>) => {
  console.error(message, context)
  fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, context }),
  }).catch(() => {})
}
