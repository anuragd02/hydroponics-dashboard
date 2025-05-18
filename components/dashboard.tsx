"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gauge } from "@/components/gauge"
import { LineChart } from "@/components/line-chart"
import { Droplet, Thermometer, Waves, Activity, Leaf } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data - this would be replaced with real API calls
const mockHistoricalData = {
  airTemp: Array.from({ length: 24 }, () => Math.floor(Math.random() * 10) + 20),
  airHumidity: Array.from({ length: 24 }, () => Math.floor(Math.random() * 30) + 50),
  waterTemp: Array.from({ length: 24 }, () => Math.floor(Math.random() * 8) + 18),
  tds: Array.from({ length: 24 }, () => Math.floor(Math.random() * 300) + 700),
  ph: Array.from({ length: 24 }, () => (Math.random() * 2 + 5.5).toFixed(1)),
}

export default function Dashboard() {
  const [data, setData] = useState({
    airTemp: 24.5,
    airHumidity: 65.2,
    waterTemp: 22.1,
    tds: 850,
    ph: 6.5,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        airTemp: Number.parseFloat((Math.random() * 5 + 22).toFixed(1)),
        airHumidity: Number.parseFloat((Math.random() * 10 + 60).toFixed(1)),
        waterTemp: Number.parseFloat((Math.random() * 4 + 20).toFixed(1)),
        tds: Math.floor(Math.random() * 200 + 750),
        ph: Number.parseFloat((Math.random() * 1 + 6).toFixed(1)),
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, type: string) => {
    switch (type) {
      case "airTemp":
        return value < 18 ? "text-blue-500" : value > 30 ? "text-red-500" : "text-green-500"
      case "airHumidity":
        return value < 40 ? "text-yellow-500" : value > 80 ? "text-blue-500" : "text-green-500"
      case "waterTemp":
        return value < 18 ? "text-blue-500" : value > 26 ? "text-red-500" : "text-green-500"
      case "tds":
        return value < 500 ? "text-yellow-500" : value > 1200 ? "text-red-500" : "text-green-500"
      case "ph":
        return value < 5.5 ? "text-red-500" : value > 7.5 ? "text-red-500" : "text-green-500"
      default:
        return "text-green-500"
    }
  }

  const getStatusText = (value: number, type: string) => {
    switch (type) {
      case "airTemp":
        return value < 18 ? "Too Cold" : value > 30 ? "Too Hot" : "Optimal"
      case "airHumidity":
        return value < 40 ? "Too Dry" : value > 80 ? "Too Humid" : "Optimal"
      case "waterTemp":
        return value < 18 ? "Too Cold" : value > 26 ? "Too Hot" : "Optimal"
      case "tds":
        return value < 500 ? "Too Low" : value > 1200 ? "Too High" : "Optimal"
      case "ph":
        return value < 5.5 ? "Too Acidic" : value > 7.5 ? "Too Alkaline" : "Optimal"
      default:
        return "Optimal"
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 flex items-center gap-2">
            <Leaf className="h-8 w-8" />
            myFarm Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Real-time Monitoring for Hydroponics System</p>
        </div>
        <ThemeToggle />
      </header>

      <Tabs defaultValue="gauges" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="gauges">Gauges</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="gauges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Air Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <Gauge value={data.airTemp} max={50} color="#ef4444" />
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-2xl font-bold">{data.airTemp}°C</div>
                  <div className={`text-sm font-medium ${getStatusColor(data.airTemp, "airTemp")}`}>
                    {getStatusText(data.airTemp, "airTemp")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Air Humidity</CardTitle>
                <Droplet className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <Gauge value={data.airHumidity} max={100} color="#3b82f6" />
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-2xl font-bold">{data.airHumidity}%</div>
                  <div className={`text-sm font-medium ${getStatusColor(data.airHumidity, "airHumidity")}`}>
                    {getStatusText(data.airHumidity, "airHumidity")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Water Temperature</CardTitle>
                <Waves className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <Gauge value={data.waterTemp} max={50} color="#10b981" />
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-2xl font-bold">{data.waterTemp}°C</div>
                  <div className={`text-sm font-medium ${getStatusColor(data.waterTemp, "waterTemp")}`}>
                    {getStatusText(data.waterTemp, "waterTemp")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">TDS Level</CardTitle>
                <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <Gauge value={data.tds} max={1500} color="#8b5cf6" />
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-2xl font-bold">{data.tds} ppm</div>
                  <div className={`text-sm font-medium ${getStatusColor(data.tds, "tds")}`}>
                    {getStatusText(data.tds, "tds")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">pH Level</CardTitle>
                <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <Gauge value={data.ph} max={14} color="#f59e0b" />
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-2xl font-bold">{data.ph}</div>
                  <div className={`text-sm font-medium ${getStatusColor(data.ph, "ph")}`}>
                    {getStatusText(data.ph, "ph")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature History (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={{
                    labels: Array.from({ length: 24 }, (_, i) => `${23 - i}h ago`).reverse(),
                    datasets: [
                      {
                        label: "Air Temp (°C)",
                        data: mockHistoricalData.airTemp,
                        borderColor: "#ef4444",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                      },
                      {
                        label: "Water Temp (°C)",
                        data: mockHistoricalData.waterTemp,
                        borderColor: "#10b981",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Humidity History (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={{
                    labels: Array.from({ length: 24 }, (_, i) => `${23 - i}h ago`).reverse(),
                    datasets: [
                      {
                        label: "Humidity (%)",
                        data: mockHistoricalData.airHumidity,
                        borderColor: "#3b82f6",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TDS History (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={{
                    labels: Array.from({ length: 24 }, (_, i) => `${23 - i}h ago`).reverse(),
                    datasets: [
                      {
                        label: "TDS (ppm)",
                        data: mockHistoricalData.tds,
                        borderColor: "#8b5cf6",
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>pH History (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={{
                    labels: Array.from({ length: 24 }, (_, i) => `${23 - i}h ago`).reverse(),
                    datasets: [
                      {
                        label: "pH Level",
                        data: mockHistoricalData.ph,
                        borderColor: "#f59e0b",
                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Last updated: {new Date().toLocaleString()}</p>
        <p className="mt-1">&copy; 2025 myFarm. All rights reserved.</p>
      </footer>
    </div>
  )
}
