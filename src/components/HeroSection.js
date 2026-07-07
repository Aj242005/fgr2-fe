"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import GlassSurface from "@/components/GlassSurface";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div style={{ height: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <motion.div style={{ y: y1, opacity, textAlign: "center", zIndex: 10 }}>
        <h1 className="h1-mega" style={{ marginBottom: "1rem", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          The Eye of the <br/><span className="text-accent">City</span>
        </h1>
        <p className="text-lead" style={{ maxWidth: "600px", margin: "0 auto 2rem auto", textShadow: "0 5px 15px rgba(0,0,0,0.5)" }}>
          Next-generation traffic intelligence. 
          Scanning the streets for violations in real-time.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", padding: "0 1rem" }}>
          <Link href="/dashboard">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: "pointer" }}
            >
              <GlassSurface
                width={160}
                height={50}
                borderRadius={25}
                brightness={60}
                opacity={0.8}
                blur={15}
                backgroundOpacity={0.05}
                contentClassName="flex items-center justify-center gap-2 px-6 py-2.5 w-full h-full text-white/90 font-medium transition-colors hover:text-white"
              >
                <MdDashboard size={20} /> Dashboard
              </GlassSurface>
            </motion.div>
          </Link>
        </div>
      </motion.div>


    </div>
  );
}
