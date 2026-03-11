export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <p className="text-3xl animate-bounce">🐾</p>
        <p className="text-sm text-stone-400">Loading...</p>
      </div>
    </div>
  )
}