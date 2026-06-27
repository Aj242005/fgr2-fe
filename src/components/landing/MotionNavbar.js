"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdTrackChanges, MdMenu, MdClose } from "react-icons/md";
import GlassSurface from "@/components/GlassSurface";

// Simple utility for Tailwind class merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // Fixed positioning for the navbar wrapper
      className={cn("fixed inset-x-0 top-0 z-50 w-full flex justify-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        width: visible ? "50%" : "100%",
        y: visible ? 24 : 0,
      }}
      initial={false}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden max-w-4xl self-start rounded-full lg:block h-[80px]",
        visible && "h-[64px]",
        className
      )}
    >
      {visible ? (
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={64}
          brightness={60}
          opacity={0.8}
          blur={15}
          displace={0}
          backgroundOpacity={0.05}
        >
          <div className="w-full h-full flex flex-row items-center justify-between px-8 lg:px-12">
            {children}
          </div>
        </GlassSurface>
      ) : (
        <div className="w-full h-full flex flex-row items-center justify-between px-8 lg:px-12 border-b border-white/5">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center gap-4 text-sm font-medium transition duration-200 lg:flex lg:gap-12",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative flex items-center justify-center h-12 w-25 px-4 text-white/80 hover:text-white uppercase tracking-[0.05em] text-[12px] font-semibold transition-colors rounded-full"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 rounded-full bg-white/10"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        width: visible ? "95%" : "100%",
        y: visible ? 24 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col self-start lg:hidden h-[80px]",
        visible && "h-[64px]",
        className
      )}
    >
      {visible ? (
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={32}
          brightness={60}
          opacity={0.8}
          blur={15}
          displace={0}
          backgroundOpacity={0.05}
        >
          <div className="w-full h-full flex flex-col items-center justify-between px-0">
            {children}
          </div>
        </GlassSurface>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-between px-0 py-2 border-b border-white/5">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div className={cn("flex w-full h-full flex-row items-center justify-between px-4", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className={cn(
            "absolute inset-x-0 top-[110%] z-50 mx-4 flex flex-col items-center justify-center gap-8 rounded-3xl bg-black/95 px-4 py-8 shadow-xl backdrop-blur-3xl border border-white/10",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return (
    <button className="flex items-center justify-center p-2 text-white/80 hover:text-white" onClick={onClick}>
                {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link href="/" className="relative z-20 flex items-center gap-2 group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.05] hover:-translate-y-0.5 " style={{margin:"0 0.5rem"}}>
      <MdTrackChanges size={24} color="var(--color-caution)" className="animate-heartbeat" style={{ filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))" }} />
      <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "white" ,margin :"0 0.5rem"}}>Grid AI</span>
    </Link>
  );
};

export default function MotionNavbar({ userId }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Problem", link: "#problem" },
    { name: "Workflow", link: "#workflow" },
    { name: "Outcome", link: "#outcome" },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="relative z-20 hidden lg:flex items-center gap-4">
          {userId ? (
            <>
              <Link href="/dashboard" className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", margin: "0 0.5rem" }}>
                Enter Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem",margin: "0 0.5rem" }}>
                Officer Login
              </button>
            </SignInButton>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl font-bold tracking-tight hover:text-red-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          {userId ? (
            <Link
              href="/dashboard"
              className="btn-primary"
              style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}
              onClick={() => setIsOpen(false)}
            >
              Enter Dashboard
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button
                className="btn-primary"
                style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}
                onClick={() => setIsOpen(false)}
              >
                Officer Login
              </button>
            </SignInButton>
          )}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
