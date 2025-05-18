import { Suspense } from "react"
import Dashboard from "@/components/dashboard"
import DashboardSkeleton from "@/components/dashboard-skeleton"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950 dark:to-teal-900">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  )
}
