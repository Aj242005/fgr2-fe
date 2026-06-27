"use client";
import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Sector
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import DashboardGlassPanel from "@/components/DashboardGlassPanel";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://fgr2-backend.mooo.com";

const TYPE_COLORS = {
  RED_LIGHT_VIOLATION: '#ef4444',
  STOP_LINE_VIOLATION: '#dc2626',
  NO_HELMET: '#b91c1c',
  TRIPLING: '#991b1b',
  MODIFIED_SILENCER: '#f87171',
  WRONG_PARKING: '#fca5a5',
  helmet: '#ef4444',
  no_helmet: '#ef4444',
  red_light: '#facc15',
  tripling: '#f97316',
  modified: '#3b82f6',
  stop_line: '#8b5cf6',
  parking: '#06b6d4',
};

const chartConfigBar = {
  violations: {
    label: "Violations",
    color: "var(--color-caution)",
  },
};

const chartConfigPie = {
  value: { label: "Count" },
  RED_LIGHT_VIOLATION: { label: "Red Light", color: TYPE_COLORS.RED_LIGHT_VIOLATION },
  STOP_LINE_VIOLATION: { label: "Stop Line", color: TYPE_COLORS.STOP_LINE_VIOLATION },
  NO_HELMET: { label: "No Helmet", color: TYPE_COLORS.NO_HELMET },
  TRIPLING: { label: "Tripling", color: TYPE_COLORS.TRIPLING },
  MODIFIED_SILENCER: { label: "Modified", color: TYPE_COLORS.MODIFIED_SILENCER },
  WRONG_PARKING: { label: "Parking", color: TYPE_COLORS.WRONG_PARKING },
  helmet: { label: "Helmet", color: TYPE_COLORS.helmet },
  no_helmet: { label: "No Helmet", color: TYPE_COLORS.no_helmet },
  red_light: { label: "Red Light", color: TYPE_COLORS.red_light },
  tripling: { label: "Tripling", color: TYPE_COLORS.tripling },
  modified: { label: "Modified", color: TYPE_COLORS.modified },
  stop_line: { label: "Stop Line", color: TYPE_COLORS.stop_line },
  parking: { label: "Parking", color: TYPE_COLORS.parking },
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
    fill: TYPE_COLORS[t.name] || '#a3a3a3',
  }));

  const barData = (stats?.by_hour || []).map(h => ({
    name: h.hour,
    violations: h.count,
  }));

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="text-chromatic" style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--color-lane)" }}>Area Overview</h1>
          <p style={{ color: "var(--color-lane-dim)", marginTop: "0.5rem" }}>Live traffic violation analytics from all cameras.</p>
        </div>
      </header>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <DashboardGlassPanel style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>Violations Today</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-danger)", marginTop: "0.5rem" }}>{stats?.total_today || 0}</div>
        </DashboardGlassPanel>
        <DashboardGlassPanel style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>This Week</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-caution)", marginTop: "0.5rem" }}>{stats?.total_week || 0}</div>
        </DashboardGlassPanel>
        <DashboardGlassPanel style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>This Month</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-safe)", marginTop: "0.5rem" }}>{stats?.total_month || 0}</div>
        </DashboardGlassPanel>
        <DashboardGlassPanel style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase" }}>All-Time Challans</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginTop: "0.5rem" }}>{stats?.challans_issued || 0}</div>
        </DashboardGlassPanel>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <DashboardGlassPanel style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>Violations by Hour (Today)</h3>
          <div style={{ width: "100%", height: "300px" }}>
            {barData.length > 0 ? (
              <ChartContainer config={chartConfigBar} className="h-full w-full min-h-[300px]">
                <BarChart data={barData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<ChartTooltipContent />} />
                  <Bar dataKey="violations" fill="var(--color-violations)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--color-lane-dim)" }}>No violations recorded today yet.</div>
            )}
          </div>
        </DashboardGlassPanel>

        <DashboardGlassPanel style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>Violation Types (This Month)</h3>
          <div style={{ width: "100%", height: "250px" }}>
            {pieData.length > 0 ? (
              <ChartContainer config={chartConfigPie} className="h-full w-full min-h-[250px] aspect-square mx-auto">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    stroke="none"
                  >
                  </Pie>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                </PieChart>
              </ChartContainer>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--color-lane-dim)" }}>No violation data this month.</div>
            )}
          </div>
          {pieData.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginTop: "1rem" }}>
              {pieData.map((type, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: type.fill, flexShrink: 0 }}></div>
                  {chartConfigPie[type.name]?.label || type.name} ({type.value})
                </div>
              ))}
            </div>
          )}
        </DashboardGlassPanel>
      </div>
    </div>
  );
}
