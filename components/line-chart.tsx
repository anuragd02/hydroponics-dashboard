"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartData, type ChartOptions, registerables } from "chart.js"

Chart.register(...registerables)

interface LineChartProps {
  data: ChartData
  options?: ChartOptions
}

export function LineChart({ data, options = {} }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const defaultOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            boxWidth: 6,
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: false,
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 2,
          hoverRadius: 4,
        },
      },
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data,
      options: { ...defaultOptions, ...options },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, options])

  return <canvas ref={canvasRef} />
}
