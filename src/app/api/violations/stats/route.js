const BACKEND_URL = process.env.BACKEND_API_URL || "https://primary-server.duckdns.org/fg-r2";

function getDemoStats() {
  return {
    total_today: 23,
    total_week: 147,
    total_month: 612,
    challans_issued: 489,
    by_type: [
      { name: "no_helmet", value: 187 },
      { name: "red_light", value: 134 },
      { name: "tripling", value: 98 },
      { name: "stop_line", value: 76 },
      { name: "modified", value: 63 },
      { name: "parking", value: 54 },
    ],
    by_hour: [
      { hour: "6AM", count: 3 },
      { hour: "7AM", count: 8 },
      { hour: "8AM", count: 15 },
      { hour: "9AM", count: 22 },
      { hour: "10AM", count: 18 },
      { hour: "11AM", count: 12 },
      { hour: "12PM", count: 9 },
      { hour: "1PM", count: 14 },
      { hour: "2PM", count: 19 },
      { hour: "3PM", count: 16 },
      { hour: "4PM", count: 21 },
      { hour: "5PM", count: 25 },
      { hour: "6PM", count: 20 },
      { hour: "7PM", count: 13 },
      { hour: "8PM", count: 10 },
      { hour: "9PM", count: 7 },
    ],
    _demo: true,
  };
}

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/violations/stats`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      // Backend is erroring — return demo data instead
      return Response.json(getDemoStats());
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    // Backend is unreachable — return demo data instead
    return Response.json(getDemoStats());
  }
}
