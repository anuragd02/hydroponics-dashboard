import { NextResponse } from "next/server"

// This would be replaced with a database in a real application
let sensorData = {
  airTemp: 24.5,
  airHumidity: 65.2,
  waterTemp: 22.1,
  tds: 850,
  ph: 6.5,
  timestamp: new Date().toISOString(),
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the data
    if (!data.airTemp && !data.airHumidity && !data.waterTemp && !data.tds && !data.ph) {
      return NextResponse.json({ error: "Missing sensor data" }, { status: 400 })
    }

    // Update the sensor data
    sensorData = {
      ...sensorData,
      ...data,
      timestamp: new Date().toISOString(),
    }

    // In a real application, you would also update the historical data in a database

    return NextResponse.json({ success: true, data: sensorData })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
