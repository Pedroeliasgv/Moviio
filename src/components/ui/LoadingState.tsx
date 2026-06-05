export default function LoadingState() {
  return (
    <div className="animate-pulse space-y-6 rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-panel">
      <div className="h-5 w-28 rounded-full bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-24 rounded-[20px] bg-slate-200" />
        <div className="h-24 rounded-[20px] bg-slate-200" />
      </div>
      <div className="h-10 rounded-[20px] bg-slate-200" />
    </div>
  )
}
