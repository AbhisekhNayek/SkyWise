const { NextRequest, NextResponse } = require("next/server");

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const { lat, lon } = Object.fromEntries(req.nextUrl.searchParams);

    if (!lat || !lon) {
      return new Response("Latitude and Longitude are required", { status: 400 });
    }

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    });

    const dailyData = await dailyRes.json();

    return NextResponse.json(dailyData);
  } catch (error) {
    console.error("Error in getting daily data:", error);
    return new Response("Error in getting daily data", { status: 500 });
  }
}
