const BACKEND_URL = process.env.BACKEND_API_URL || "https://primary-server.duckdns.org/fg-r2";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const res = await fetch(`${BACKEND_URL}/api/analyze/image`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return Response.json(
        { error: `Backend returned ${res.status}`, detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: "Backend server is unreachable", detail: err.message },
      { status: 502 }
    );
  }
}
