export default async function Share({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  return <div>{shareId}</div>
}
