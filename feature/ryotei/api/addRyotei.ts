export const addRyotei = async (body: BodyInit) => {
  const res = await fetch('/api/ryotei', { method: 'POST', body })
  const data = await res.json()
  if (data.message) throw new Error(data.message)
}
