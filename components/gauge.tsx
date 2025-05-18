"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface GaugeProps {
  value: number
  max: number
  color: string
}

export function Gauge({ value, max, color }: GaugeProps) {
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

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [value, max - value],
            backgroundColor: [color, "#e5e7eb"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        rotation: -90,
        circumference: 180,
        cutout: "70%",
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [value, max, color])

  return (
    <div className="relative w-full aspect-[2/1]">
      <canvas ref={canvasRef} />
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">of {max}</div>
      </div>
    </div>
  )
}
