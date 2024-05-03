export const addRyotei = async (body: BodyInit) => {
  try {
    await fetch('/api/ryotei', { method: 'POST', body })
  } catch (error) {
    console.log(error)
  }
}
