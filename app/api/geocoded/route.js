const axios = require("axios");
const { NextRequest, NextResponse } = require("next/server");

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get("search");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching geocoded data", error);
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
