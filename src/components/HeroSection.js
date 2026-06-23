"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
        <motion.button 
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          Begin the Journey <ChevronDown size={20} />
        </motion.button>
      </motion.div>


    </div>
  );
}
