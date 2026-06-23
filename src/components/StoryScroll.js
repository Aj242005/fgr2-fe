"use client";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, Cpu } from "lucide-react";

export default function StoryScroll() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div style={{ padding: "8rem 0" }} className="container">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ display: "flex", flexDirection: "column", gap: "10rem" }}
      >
        
        {/* Checkpoint 1 */}
        <motion.div id="problem" variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap", scrollMarginTop: "120px" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ background: "rgba(239, 68, 68, 0.1)", display: "inline-flex", padding: "1rem", borderRadius: "50%", marginBottom: "2rem" }}>
              <AlertTriangle size={48} className="text-danger" />
            </div>
            <h2 className="h2-title" style={{ marginBottom: "1rem" }}>The <span className="text-danger">Chaos</span></h2>
            <p className="text-lead">
              Every day, thousands of traffic rules are broken. Tripling on motorcycles, ignoring red lights, abandoning helmets. The traditional ways of monitoring are too slow, too manual, and prone to error.
            </p>
          </div>
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}>
            <div className="glass-panel" style={{ width: "100%", height: "300px", border: "1px solid rgba(239, 68, 68, 0.3)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "20%", left: "10%", border: "2px solid var(--color-danger)", padding: "0.5rem", borderRadius: "4px" }}>
                <span className="badge badge-danger">No Helmet</span>
              </div>
              <div style={{ position: "absolute", bottom: "30%", right: "20%", border: "2px solid var(--color-caution)", padding: "0.5rem", borderRadius: "4px" }}>
                <span className="badge badge-warning">Tripling</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Checkpoint 2 */}
        <motion.div id="workflow" variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap", flexDirection: "row-reverse", scrollMarginTop: "120px" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ background: "rgba(250, 204, 21, 0.1)", display: "inline-flex", padding: "1rem", borderRadius: "50%", marginBottom: "2rem" }}>
              <Cpu size={48} className="text-accent" />
            </div>
            <h2 className="h2-title" style={{ marginBottom: "1rem" }}>The <span className="text-accent">Technology</span></h2>
            <p className="text-lead">
              We leverage YOLOv8 custom-trained models and deep neural networks to instantly analyze thousands of frames per second. Our AI isolates vehicles, tracks riders, reads license plates, and computes violation overlap logic in milliseconds.
            </p>
          </div>
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}>
             <div className="glass-panel" style={{ width: "100%", height: "300px", border: "1px solid rgba(250, 204, 21, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div style={{ textAlign: "center" }}>
                 <div style={{ fontSize: "3rem", fontFamily: "var(--font-mono)", color: "var(--color-caution)", fontWeight: "bold" }}>
                   200ms
                 </div>
                 <div style={{ color: "var(--color-lane-dim)" }}>Inference Time</div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Checkpoint 3 */}
        <motion.div id="outcome" variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap", scrollMarginTop: "120px" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ background: "rgba(34, 197, 94, 0.1)", display: "inline-flex", padding: "1rem", borderRadius: "50%", marginBottom: "2rem" }}>
              <ShieldCheck size={48} color="var(--color-safe)" />
            </div>
            <h2 className="h2-title" style={{ marginBottom: "1rem" }}>The <span style={{ color: "var(--color-safe)" }}>Order</span></h2>
            <p className="text-lead">
              The result is a structured, automated flow of actionable intelligence. Law enforcement can automatically log violations, attach irrefutable photographic evidence, and issue citations without human bottleneck.
            </p>
          </div>
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}>
            <div className="glass-panel" style={{ width: "100%", height: "300px", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "var(--color-lane)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                    <td style={{ padding: "1rem" }}>MH01AB1234</td>
                    <td style={{ padding: "1rem", color: "var(--color-danger)" }}>HELMET</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                    <td style={{ padding: "1rem" }}>DL9CAA9999</td>
                    <td style={{ padding: "1rem", color: "var(--color-caution)" }}>TRIPLING</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "1rem" }}>KA05JJ0000</td>
                    <td style={{ padding: "1rem", color: "var(--color-danger)" }}>RED_LIGHT</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
