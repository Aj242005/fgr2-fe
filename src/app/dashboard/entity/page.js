"use client";
import { useState } from "react";
import { MdSearch, MdFileDownload, MdDescription, MdErrorOutline } from "react-icons/md";
import DashboardGlassPanel from "@/components/DashboardGlassPanel";

// API calls go through local Next.js proxy routes to avoid CORS issues

export default function EntityView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [entity, setEntity] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const plate = searchQuery.trim();
    if (!plate) return;

    setLoading(true);
    setError(null);
    setEntity(null);

    try {
      const res = await fetch(`/api/entity/${encodeURIComponent(plate)}`);
      const data = await res.json();
      setEntity(data);
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadChallan = async (violationId) => {
    try {
      const res = await fetch(`/api/violations/${violationId}/challan`);
      if (!res.ok) throw new Error("Failed to download challan");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `E-Challan-${violationId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error downloading challan: " + err.message);
    }
  };

  const downloadAuditReport = async (plate) => {
    try {
      const res = await fetch(`/api/entity/${encodeURIComponent(plate)}/report`);
      if (!res.ok) throw new Error("Failed to download report");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Audit-Report-${plate}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error downloading report: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 className="text-chromatic" style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--color-lane)" }}>Entity Search</h1>
        <p style={{ color: "var(--color-lane-dim)", marginTop: "0.5rem" }}>Search for a vehicle by license plate to view its violation history.</p>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <MdSearch size={20} color="var(--color-lane-dim)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
          <input 
            type="text" 
            placeholder="Enter License Plate (e.g. MH01AB1234)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
            style={{ 
              width: "100%", 
              padding: "1rem 1rem 1rem 3rem", 
              background: "rgba(255,255,255,0.05)", 
              border: "1px solid rgba(255,255,255,0.2)", 
              borderRadius: "8px",
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "var(--font-mono)",
              outline: "none"
            }}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ padding: "0 2rem" }} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div style={{ padding: "1.5rem", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px", color: "var(--color-danger)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <MdErrorOutline size={20} />
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem", gap: "1rem" }}>
          <div className="loader"></div>
          <span style={{ color: "var(--color-lane-dim)" }}>Searching database...</span>
        </div>
      )}

      {/* Search Results */}
      {entity && !loading && (
        <DashboardGlassPanel style={{ padding: "2rem" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                <h2 style={{ fontSize: "2rem", fontFamily: "var(--font-mono)", fontWeight: "bold", letterSpacing: "2px" }}>
                  {entity.plate_number}
                </h2>
                {entity._demo && (
                  <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "4px", background: "rgba(99, 102, 241, 0.15)", color: "rgba(165, 180, 252, 0.9)", border: "1px solid rgba(99, 102, 241, 0.25)" }}>DEMO</span>
                )}
                {entity.total_violations >= 3 && (
                  <span className="badge badge-warning">Repeat Offender</span>
                )}
              </div>
              <div style={{ color: "var(--color-lane-dim)", fontSize: "1rem" }}>
                {entity.total_violations} violation{entity.total_violations !== 1 ? "s" : ""} on record
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "2rem", textAlign: "right" }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>Total Fines</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>₹{entity.total_fines?.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-danger)", textTransform: "uppercase" }}>Unpaid</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--color-danger)" }}>₹{entity.unpaid_fines?.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem" }}>Violation History</h3>
            <button 
              className="btn-primary" 
              style={{ background: "rgba(255,255,255,0.1)", color: "white", padding: "0.5rem 1rem", fontSize: "0.9rem" }}
              onClick={() => downloadAuditReport(entity.plate_number)}
            >
              <MdFileDownload size={16} /> Download Audit Report
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Violation</th>
                  <th>Confidence</th>
                  <th>Fine</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {entity.violations.map((v) => (
                  <tr key={v.id}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                      {v.created_at ? new Date(v.created_at).toLocaleDateString() : "N/A"}
                    </td>
                    <td>
                      <span className={`badge ${v.violation_type === "helmet" || v.violation_type === "no_helmet" ? "badge-danger" : "badge-warning"}`}>
                        {v.violation_type}
                      </span>
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>{(v.confidence * 100).toFixed(1)}%</td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>₹{v.fine_amount?.toLocaleString()}</td>
                    <td>
                      <span style={{ color: v.status === "Paid" ? "var(--color-safe)" : "var(--color-danger)", fontWeight: "bold", fontSize: "0.85rem" }}>
                        {v.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => downloadChallan(v.id)}
                        style={{ background: "none", border: "none", color: "var(--color-caution)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}
                      >
                        <MdDescription size={14} /> E-Challan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </DashboardGlassPanel>
      )}

      {!entity && !loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem", color: "var(--color-lane-dim)", textAlign: "center", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.1)" }}>
          <MdErrorOutline size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p>Enter a license plate number above to retrieve the entity&apos;s complete traffic violation history and pending challans.</p>
        </div>
      )}
    </div>
  );
}
