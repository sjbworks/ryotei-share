export const addRyotei = async (body: string | null | undefined) => {
  try {
    await fetch('/api/ryotei', { body, method: 'POST' })
  } catch (error) {
    console.log(error)
  }
}
