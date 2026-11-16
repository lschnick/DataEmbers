import { NextResponse } from "next/server";

export async function GET() {
  const mapKey = "9f50e9bf0a7a281ebb96b8207c26ceb9";

  if (!mapKey) {
    return NextResponse.json(
      { error: "MAP_KEY is not configured" },
      { status: 500 },
    );
  }

  const nasaUrl = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/9f50e9bf0a7a281ebb96b8207c26ceb9/VIIRS_NOAA21_SP/world/1/2026-02-01`;

  try {
    const response = await fetch(nasaUrl, {
      // Optional: cache the response for 10 minutes to save API transactions
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `NASA API responded with ${response.status}` },
        { status: response.status },
      );
    }

    const csvText = await response.text();
    //console.log(csvText);

    return new NextResponse(csvText, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
