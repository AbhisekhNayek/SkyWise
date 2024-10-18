const axios = require("axios");
const { NextRequest, NextResponse } = require("next/server");

export async function GET(req) {
  try {
    const { lat, lon } = Object.fromEntries(req.nextUrl.searchParams);
    
    if (!lat || !lon) {
      return new Response("Latitude and Longitude are required", { status: 400 });
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const { data } = await axios.get(url);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pollution data:", error.message || error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
