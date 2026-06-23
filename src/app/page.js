import ShaderBackground from "@/components/landing/ShaderBackground";
import MotionNavbar from "@/components/landing/MotionNavbar";
import HeroSection from "@/components/HeroSection";
import StoryScroll from "@/components/StoryScroll";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main>
      {/* WebGL Shader Background (visual layer from SENTINEL template) */}
      <ShaderBackground />

      {/* Motion Navbar — original auth logic preserved, visual style from template */}
      <MotionNavbar userId={userId} />

      <HeroSection />
      
      {/* Visual separator line */}
      <div style={{ width: "1px", height: "100px", background: "linear-gradient(to bottom, transparent, var(--color-caution))", margin: "0 auto" }}></div>
      
      <StoryScroll />
      
      {/* Visual separator line to close off the page */}
      <div style={{ width: "1px", height: "100px", background: "linear-gradient(to bottom, var(--color-caution), transparent)", margin: "0 auto" }}></div>
      
      <footer style={{ padding: "4rem", textAlign: "center", color: "var(--color-lane-dim)", fontSize: "0.9rem" }}>
        &copy; {new Date().getFullYear()} Traffic Intelligence System. Flipkart Grid R2.
      </footer>
    </main>
  );
}
