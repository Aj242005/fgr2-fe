const BACKEND_URL = process.env.BACKEND_API_URL || "https://primary-server.duckdns.org/fg-r2";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/violations/${id}/challan`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json(
        { error: `Backend returned ${res.status}` },
        { status: res.status }
      );
    }

    const blob = await res.arrayBuffer();
    return new Response(blob, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "application/pdf",
        "Content-Disposition": `attachment; filename="E-Challan-${id}.pdf"`,
      },
    });
  } catch (err) {
    return Response.json(
      { error: "Backend server is unreachable", detail: err.message },
      { status: 502 }
    );
  }
}
