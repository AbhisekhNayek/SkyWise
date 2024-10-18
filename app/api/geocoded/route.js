const axios = require("axios");
const { NextRequest, NextResponse } = require("next/server");

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const city = req.nextUrl.searchParams.get("search");

    if (!city) {
      return new Response("City name is required", { status: 400 });
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    const { data } = await axios.get(url);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching geocoded data:", error.message || error);
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
