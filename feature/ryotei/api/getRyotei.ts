export const getRyotei = async () => {
  try {
    const res = await fetch('/api/ryotei')
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
