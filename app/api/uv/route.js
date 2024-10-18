const { NextRequest, NextResponse } = require("next/server");

export async function GET(req) {
  try {
    const { lat, lon } = Object.fromEntries(req.nextUrl.searchParams);
    
    if (!lat || !lon) {
      return new Response("Latitude and Longitude are required", { status: 400 });
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const uvData = await res.json();
    return NextResponse.json(uvData);
  } catch (error) {
    console.error("Error getting UV Data:", error.message || error);
    return new Response("Error getting UV Data", { status: 500 });
  }
}
