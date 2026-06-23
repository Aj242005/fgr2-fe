"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSentinel() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="px-4 md:px-8 max-w-[1440px] mx-auto w-full flex flex-col items-center justify-center text-center mt-40 md:mt-56 mb-16">
      <motion.div style={{ y: y1, opacity }} className="flex flex-col items-center">
        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF5A00]/50 bg-[#FF5A00]/10 text-[#FF5A00] text-sm font-medium tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-[#FF5A00] animate-pulse" />
          LIVE SYSTEM ONLINE
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-[48px] font-bold text-[#e2e1eb] mb-6 max-w-4xl tracking-tighter leading-tight"
          style={{ fontFamily: "var(--font-geist)", lineHeight: "1.1", letterSpacing: "-0.04em" }}
        >
          Automating Road Safety with Precision AI
        </h1>

        {/* Subheading */}
        <p
          className="text-base md:text-lg text-[#c1c6d7] max-w-2xl mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Deploying real-time CCTV monitoring and high-speed Optical Character Recognition to detect, track, and ticket traffic violations with clinical accuracy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            className="bg-red-500/40 backdrop-blur-xl text-white text-xs font-semibold uppercase tracking-[0.05em] px-8 py-4 rounded-full border border-white/20 transition-all hover:bg-red-500/60 flex items-center justify-center gap-2"
            style={{ fontFamily: "var(--font-geist)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const workflowSection = document.getElementById("workflow");
              if (workflowSection) {
                workflowSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            View Live Demo
          </motion.button>
          <motion.button
            className="bg-white/10 backdrop-blur-xl text-white text-xs font-semibold uppercase tracking-[0.05em] px-8 py-4 rounded-full border border-white/10 transition-all hover:bg-white/20"
            style={{ fontFamily: "var(--font-geist)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const problemSection = document.getElementById("problem");
              if (problemSection) {
                problemSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Read Documentation
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
