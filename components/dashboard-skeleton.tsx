import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Leaf } from "lucide-react"

export default function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 flex items-center gap-2">
            <Leaf className="h-8 w-8" />
            myFarm Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Loading sensor data...</p>
        </div>
        <div className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </header>

      <Tabs defaultValue="gauges" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="gauges">Gauges</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="gauges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-24" />
                  </CardTitle>
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[120px] w-full rounded-md" />
                  <div className="mt-4 flex justify-between items-center">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
