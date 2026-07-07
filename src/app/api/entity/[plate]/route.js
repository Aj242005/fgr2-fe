const BACKEND_URL = process.env.BACKEND_API_URL || "https://primary-server.duckdns.org/fg-r2";

function getDemoEntity(plate) {
  const types = ["no_helmet", "red_light", "tripling", "stop_line", "modified", "parking"];
  const statuses = ["Unpaid", "Paid", "Paid", "Unpaid", "Paid"];
  const fines = { no_helmet: 1000, red_light: 2000, tripling: 1500, stop_line: 500, modified: 3000, parking: 500 };

  const violations = [];
  const count = 2 + Math.floor(Math.abs(hashCode(plate)) % 4);

  for (let i = 0; i < count; i++) {
    const type = types[Math.abs(hashCode(plate + i)) % types.length];
    const status = statuses[Math.abs(hashCode(plate + i + "s")) % statuses.length];
    const daysAgo = 3 + Math.abs(hashCode(plate + i + "d")) % 90;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    violations.push({
      id: `demo-${plate}-${i}`,
      violation_type: type,
      confidence: 0.82 + (Math.abs(hashCode(plate + i + "c")) % 15) / 100,
      fine_amount: fines[type] || 1000,
      status: status,
      created_at: date.toISOString(),
    });
  }

  const totalFines = violations.reduce((s, v) => s + (v.fine_amount || 0), 0);
  const unpaidFines = violations.filter(v => v.status === "Unpaid").reduce((s, v) => s + (v.fine_amount || 0), 0);

  return {
    plate_number: plate.toUpperCase(),
    total_violations: violations.length,
    total_fines: totalFines,
    unpaid_fines: unpaidFines,
    violations,
    _demo: true,
  };
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

export async function GET(request, { params }) {
  const { plate } = await params;
  const decoded = decodeURIComponent(plate);

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/entity/${encodeURIComponent(decoded)}`,
      { headers: { "Content-Type": "application/json" }, cache: "no-store" }
    );

    if (!res.ok) {
      if (res.status === 404) {
        // Return demo data for any plate when backend returns 404
        return Response.json(getDemoEntity(decoded));
      }
      // Backend error — return demo data
      return Response.json(getDemoEntity(decoded));
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    // Backend unreachable — return demo data
    return Response.json(getDemoEntity(decoded));
  }
}
