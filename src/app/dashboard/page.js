"use client";
import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://fgr2-backend.mooo.com";

const TYPE_COLORS = {
  helmet: '#ef4444',
  no_helmet: '#ef4444',
  red_light: '#facc15',
  tripling: '#f97316',
  modified: '#3b82f6',
  stop_line: '#8b5cf6',
  parking: '#06b6d4',
};

export default function DashboardAreaView() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${API_BASE}/api/violations/stats`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", gap: "1rem" }}>
        <div className="loader"></div>
        <span style={{ color: "var(--color-lane-dim)" }}>Loading dashboard data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", color: "var(--color-danger)" }}>
        Failed to load stats: {error}
      </div>
    );
  }

  const pieData = (stats?.by_type || []).map(t => ({
    ...t,
    color: TYPE_COLORS[t.name] || '#a3a3a3',
  }));

  const barData = (stats?.by_hour || []).map(h => ({
    name: h.hour,
    violations: h.count,
  }));

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "800" }}>Area Overview</h1>
          <p style={{ color: "var(--color-lane-dim)", marginTop: "0.5rem" }}>Live traffic violation analytics from all cameras.</p>
        </div>
      </header>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>Violations Today</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-danger)", marginTop: "0.5rem" }}>{stats?.total_today || 0}</div>
        </div>
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>This Week</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-caution)", marginTop: "0.5rem" }}>{stats?.total_week || 0}</div>
        </div>
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>This Month</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-safe)", marginTop: "0.5rem" }}>{stats?.total_month || 0}</div>
        </div>
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>All-Time Challans</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginTop: "0.5rem" }}>{stats?.challans_issued || 0}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>Violations by Hour (Today)</h3>
          <div style={{ width: "100%", height: "300px" }}>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} />
                  <Bar dataKey="violations" fill="var(--color-caution)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--color-lane-dim)" }}>No violations recorded today yet.</div>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>Violation Types (This Month)</h3>
          <div style={{ width: "100%", height: "250px" }}>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--color-lane-dim)" }}>No violation data this month.</div>
            )}
          </div>
          {pieData.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginTop: "1rem" }}>
              {pieData.map((type, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: type.color, flexShrink: 0 }}></div>
                  {type.name} ({type.value})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
