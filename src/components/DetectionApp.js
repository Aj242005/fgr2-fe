"use client";
import { useState, useRef } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://fgr2-backend.mooo.com";

export default function DetectionApp() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
      setError(null);
    }
  };

  const analyzeImage = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/api/analyze/image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "800" }}>Live AI Scan</h1>
        <p style={{ color: "var(--color-lane-dim)", marginTop: "0.5rem" }}>
          Upload a traffic camera image to run the YOLOv8 detection engine. Violations are automatically saved.
        </p>
      </header>

      <div className="dashboard-grid">
        
        {/* Upload Zone */}
        <div>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: "none" }} 
          />
          
          {!preview ? (
            <div 
              className="dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <div style={{ background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "50%" }}>
                <Upload size={40} color="var(--color-lane)" />
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Drag & Drop Image</h3>
              <p>or click to browse from your computer</p>
              <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-lane-dim)", fontFamily: "var(--font-mono)" }}>
                Supports JPG, PNG, WEBP (Max 5MB)
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-lane-dim)" }}>
                  {file.name}
                </span>
                <button 
                  onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                  style={{ background: "transparent", border: "none", color: "var(--color-lane)", cursor: "pointer" }}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "8px", overflow: "hidden", marginBottom: "1.5rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              
              <motion.button 
                className="btn-primary" 
                style={{ width: "100%", justifyContent: "center" }}
                onClick={analyzeImage}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <><div className="loader" style={{ width: "1.5rem", height: "1.5rem", borderWidth: "2px" }}></div> Processing...</>
                ) : (
                  <>Analyze Frame</>
                )}
              </motion.button>
              
              {error && (
                <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px", display: "flex", gap: "0.5rem", color: "var(--color-danger)" }}>
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Zone */}
        <div>
          <div className="glass-panel" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
              Analysis Results
            </h3>
            
            {!result && !loading && (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-lane-dim)" }}>
                Awaiting input frame...
              </div>
            )}
            
            {loading && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div className="loader"></div>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--color-caution)" }}>RUNNING YOLOv8 INFERENCE...</div>
              </div>
            )}
            
            {result && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ flex: 1, overflowY: "auto" }}
              >
                {/* Data Summary */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Total Violations</div>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: result?.report?.violation_count > 0 ? "var(--color-danger)" : "var(--color-safe)" }}>
                      {result?.report?.violation_count || 0}
                    </div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-lane-dim)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Processing Time</div>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                      {result?.report?.processing_time_ms ? `${Math.round(result.report.processing_time_ms)}ms` : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Violations Table */}
                {result?.report?.violations && result.report.violations.length > 0 && (
                  <div>
                    <h4 style={{ marginBottom: "1rem", color: "var(--color-caution)" }}>Detected Violations</h4>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Confidence</th>
                          <th>Severity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.report.violations.map((v, i) => (
                          <tr key={i}>
                            <td>
                              <span className={`badge ${v.type === "helmet" || v.type === "no_helmet" ? "badge-danger" : "badge-warning"}`}>
                                {v.type}
                              </span>
                            </td>
                            <td style={{ fontFamily: "var(--font-mono)" }}>{(v.confidence * 100).toFixed(1)}%</td>
                            <td>
                              <span style={{ color: v.severity === "HIGH" ? "var(--color-danger)" : v.severity === "MEDIUM" ? "var(--color-caution)" : "var(--color-lane-dim)", fontWeight: "600", fontSize: "0.85rem" }}>
                                {v.severity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-safe)" }}>
                      ✓ Violations have been automatically saved to the database.
                    </p>
                  </div>
                )}
                
                {/* Plates Table */}
                {result?.report?.plates && result.report.plates.length > 0 && (
                  <div style={{ marginTop: "2rem" }}>
                    <h4 style={{ marginBottom: "1rem", color: "var(--color-safe)" }}>License Plates</h4>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Plate Text</th>
                          <th>OCR Conf.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.report.plates.map((p, i) => (
                          <tr key={i}>
                            <td style={{ fontFamily: "var(--font-mono)", fontWeight: "bold", letterSpacing: "1px" }}>{p.plate_text}</td>
                            <td style={{ fontFamily: "var(--font-mono)" }}>{(p.ocr_confidence * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
