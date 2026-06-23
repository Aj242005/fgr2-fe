export default function FooterSentinel() {
  return (
    <footer
      className="w-full py-8 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0c0e14] border-t border-white/5 opacity-80 hover:opacity-100 transition-opacity"
    >
      <div
        className="text-xl font-semibold text-[#e2e1eb]"
        style={{ fontFamily: "var(--font-geist)", letterSpacing: "-0.01em" }}
      >
        SENTINEL.AI
      </div>
      <div
        className="text-xs font-semibold uppercase tracking-[0.05em] text-[#c1c6d7]"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        © {new Date().getFullYear()} SENTINEL TRAFFIC HACKATHON. ALL RIGHTS RESERVED.
      </div>
      <div className="flex gap-6">
        <a
          href="#"
          className="text-xs font-semibold uppercase tracking-[0.05em] text-[#c1c6d7] hover:text-[#ffb77d] transition-colors"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Documentation
        </a>
        <a
          href="#"
          className="text-xs font-semibold uppercase tracking-[0.05em] text-[#c1c6d7] hover:text-[#ffb77d] transition-colors"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          GitHub
        </a>
        <a
          href="#"
          className="text-xs font-semibold uppercase tracking-[0.05em] text-[#c1c6d7] hover:text-[#ffb77d] transition-colors"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Privacy
        </a>
      </div>
    </footer>
  );
}
