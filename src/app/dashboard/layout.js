"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdDirectionsCar, MdDocumentScanner, MdTrackChanges } from "react-icons/md";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", path: "/dashboard", icon: <MdDashboard size={20} /> },
    { name: "Entity Search", path: "/dashboard/entity", icon: <MdDirectionsCar size={20} /> },
    { name: "Live Scan", path: "/dashboard/analyze", icon: <MdDocumentScanner size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-full md:w-[280px] md:min-w-[280px] shrink-0 bg-[#1a1a1a]/95 border-b md:border-b-0 md:border-r border-white/10 backdrop-blur-md pt-5 px-4 pb-2 md:p-8 flex flex-col md:sticky md:top-0 md:h-screen z-50">
        
        <div className="flex items-center justify-between mb-5 md:mb-12 px-1 md:px-0">
          <Link href="/" className="flex items-center gap-2">
            <MdTrackChanges size={28} color="var(--color-caution)" className="animate-heartbeat" style={{ filter: "drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))" }} />
            <h2 className="text-xl font-bold tracking-tight">Grid AI</h2>
          </Link>
          <div className="md:hidden flex items-center gap-3">
            <div className="text-xs font-medium text-white/50 uppercase tracking-wider">Officer</div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        <nav className="flex md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path} 
                href={link.path}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all text-[0.95rem] shrink-0 border ${
                  isActive 
                    ? "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.2)] text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                    : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
                }`}
                style={{
                  textShadow: isActive ? "0 0 10px rgba(239, 68, 68, 0.5)" : "none",
                }}
              >
                {link.icon}
                <span className={isActive ? "font-semibold tracking-wide" : "font-medium"}>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Desktop */}
        <div className="hidden md:flex mt-auto pt-4 border-t border-white/10 items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <div className="text-sm text-white/40">Traffic Officer</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
